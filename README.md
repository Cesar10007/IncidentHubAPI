# IncidentHub API

## Problema que soluciona
Las novedades tecnológicas (equipos dañados, fallas de red, impresoras) se reportan por llamadas y mensajes informales. Esta API permite registrar, consultar, actualizar, atender y eliminar incidentes con trazabilidad.

## Tecnologías
Node.js, Express y TypeScript. Los datos se guardan en memoria (arrays).

## Instalación
```bash
npm install
```

## Ejecución
```bash
npm run dev
```
Servidor en `http://localhost:3000`.

## Endpoints
| Método | Ruta | Descripción | Respuesta |
|---|---|---|---|
| GET | /api/incidents | Listar incidentes | 200 |
| GET | /api/incidents/:id | Consultar por ID | 200 / 404 |
| POST | /api/incidents | Crear incidente | 201 |
| PUT | /api/incidents/:id | Actualizar incidente | 200 / 404 |
| PATCH | /api/incidents/:id/status | Cambiar estado | 200 / 400 / 404 |
| DELETE | /api/incidents/:id | Eliminar (solo admin) | 204 / 401 / 403 / 404 |
| GET | /api/incidents/critical | Incidentes críticos | 200 |
| GET | /api/incidents/pending | Incidentes pendientes | 200 |
| GET | /api/incidents/stats | Estadísticas | 200 |

Tokens: `Bearer instructor-token` (admin) y `Bearer technician-token` (técnico).

## Middlewares
- **logger:** registra fecha, método y ruta de cada petición.
- **requestInfo:** agrega `req.requestInfo` con timestamp, método y ruta.
- **auth:** valida el token; si falta o es incorrecto responde 401.
- **admin:** solo permite `instructor-token`; si no, responde 403.
- **validateId:** el id debe ser un entero positivo (400).
- **validateIncident:** valida los campos del incidente (400).
- **validatePriority:** solo LOW, MEDIUM, HIGH o CRITICAL (400).
- **validateTime:** estimatedMinutes numérico, mayor que 0 y máximo 480 (400).
- **notFound:** ruta inexistente responde 404.
- **error:** convierte los `AppError` en respuestas uniformes.

# DTO vs Model

* **Model:** Es el incidente completo tal cual vive en la aplicación. Lleva absolutamente todo: `id`, `title`, `description`, `reporter`, `location`, `priority`, `status`, `estimatedMinutes` y `createdAt`.
* **DTO:** Son únicamente los datos que el usuario nos manda al hacer una petición. Para un `POST`, por ejemplo, solo necesitamos `title`, `description`, `reporter`, `location`, `priority` y `estimatedMinutes`.

**¿La diferencia clave?** Piensa en el DTO como el formulario que llena la persona, mientras que el Model es la ficha completa que guarda el sistema con sus datos automáticos (como el ID, la fecha de creación y el estado inicial).

---

# Reflexión

Usar middlewares nos evita reinventar la rueda en cada *controller*, porque la lógica de validar datos o revisar tokens se escribe una sola vez y se aplica a las rutas que necesitemos. Esto deja los *controllers* impecables, enfocados únicamente en su tarea principal (como crear, buscar o eliminar), y hace que mantener el código sea facilísimo: si el día de mañana cambia una regla, solo ajustas un archivo y listo.

## Evidencias

Pruebas hechas con Thunder Client. Las capturas están en la carpeta `evidencias/`.
Tokens: `Bearer instructor-token` (admin) y `Bearer technician-token` (técnico).

| # | Prueba | Método y ruta | Token | Esperado | Captura |
|---|--------|---------------|-------|----------|---------|
| 1 | Listar incidentes | GET /api/incidents | — | 200 | ![01](evidencias/01-get-all.png) |
| 2 | Incidente por ID | GET /api/incidents/1 | — | 200 | ![02](evidencias/02-get-by-id.png) |
| 3 | ID inválido | GET /api/incidents/abc | — | 400 | ![03](evidencias/03-get-id-invalido.png) |
| 4 | ID que no existe | GET /api/incidents/999 | — | 404 | ![04](evidencias/04-get-id-no-existe.png) |
| 5 | Incidentes críticos | GET /api/incidents/critical | — | 200 | ![05](evidencias/05-critical.png) |
| 6 | Incidentes pendientes | GET /api/incidents/pending | — | 200 | ![06](evidencias/06-pending.png) |
| 7 | Estadísticas | GET /api/incidents/stats | — | 200 | ![07](evidencias/07-stats.png) |
| 8 | Ruta que no existe | GET /api/noexiste | — | 404 | ![08](evidencias/08-ruta-404.png) |
| 9 | Crear sin token | POST /api/incidents | ninguno | 401 | ![09](evidencias/09-post-sin-token.png) |
| 10 | Crear con token inválido | POST /api/incidents | token-falso | 401 | ![10](evidencias/10-post-token-invalido.png) |
| 11 | Crear incidente válido | POST /api/incidents | technician-token | 201 | ![11](evidencias/11-post-valido.png) |
| 12 | Crear con campos faltantes | POST /api/incidents | technician-token | 400 | ![12](evidencias/12-post-campos-faltantes.png) |
| 13 | Crear con prioridad inválida | POST /api/incidents | technician-token | 400 | ![13](evidencias/13-post-prioridad-invalida.png) |
| 14 | Crear CRITICAL con tiempo excedido | POST /api/incidents | technician-token | 400 | ![14](evidencias/14-post-critical-tiempo.png) |
| 15 | Actualizar incidente | PUT /api/incidents/1 | technician-token | 200 | ![15](evidencias/15-put-valido.png) |
| 16 | Cambiar estado válido | PATCH /api/incidents/1/status | technician-token | 200 | ![16](evidencias/16-patch-valido.png) |
| 17 | Transición de estado inválida | PATCH /api/incidents/1/status | technician-token | 400 | ![17](evidencias/17-patch-transicion-invalida.png) |
| 18 | Borrar sin token | DELETE /api/incidents/1 | ninguno | 401 | ![18](evidencias/18-delete-sin-token.png) |
| 19 | Borrar como técnico | DELETE /api/incidents/1 | technician-token | 403 | ![19](evidencias/19-delete-tecnico.png) |
| 20 | Borrar como admin | DELETE /api/incidents/1 | instructor-token | 204 | ![20](evidencias/20-delete-admin.png) |
