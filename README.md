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
ESCRIBE AQUÍ CON TUS PALABRAS la diferencia.

## Reflexión
ESCRIBE AQUÍ CON TUS PALABRAS las ventajas de usar middlewares en vez de poner todo en cada controller.

## Evidencias
Las pruebas están en la carpeta `evidencias/`.