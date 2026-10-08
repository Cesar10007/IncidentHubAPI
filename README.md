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

## DTO vs Model
Model: es cómo existe el incidente dentro de la aplicación. Tiene todos los campos: id, title, description, reporter, location, priority, status, estimatedMinutes y createdAt.

DTO: son los datos que el cliente puede enviar en una operación. En POST son solo title, description, reporter, location, priority y estimatedMinutes.

Diferencias:el DTO es el formulario que llena el usuario, y el Model es el registro completo que guarda el sistema, con lo que el sistema agregó.

## Reflexión
La pregunta es: ¿qué ventajas tiene usar middlewares para validaciones, autenticación y errores, en vez de escribir todo en cada controller?

Ideas para que las escribas con tus palabras (2 o 3 frases bastan):

No repites código: la validación y el token se escriben una vez y sirven para todas las rutas.
El controller queda limpio: solo hace su trabajo (crear, buscar, borrar).
Es más fácil cambiar algo: si cambia una regla (por ejemplo, los 480 minutos), la modificas en un solo archivo.

## Evidencias
