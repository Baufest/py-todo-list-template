# TODO List API

Backend REST API para gestión de tareas (TODO list) construido con FastAPI y SQLAlchemy.

Los datos se almacenan en una base de datos SQLite en memoria, por lo que se reinician al detener el servidor.

## Requisitos

- Python 3.12+
- Node.js 18+

## Backend

### Instalación

```bash
pip install -r requirements.txt
```

### Ejecución

```bash
python -m uvicorn app.main:app --reload
```

El servidor se levanta en `http://localhost:8000`.

## Frontend

Interfaz web construida con Vite + React + TypeScript, usando shadcn/ui, Tailwind CSS y TanStack Query.

### Instalación

```bash
cd frontend
npm install
```

### Ejecución en desarrollo

```bash
cd frontend
npm run dev
```

La aplicación se levanta en `http://localhost:5173`.

### Build de producción

```bash
cd frontend
npm run build
```

### Variables de entorno

Copia `frontend/.env.example` a `frontend/.env` y ajusta la URL de la API si es necesario:

```bash
cp frontend/.env.example frontend/.env
```

## Endpoints

| Método   | Ruta            | Descripción                                      |
|----------|-----------------|--------------------------------------------------|
| `POST`   | `/todos/`       | Crear un nuevo todo                              |
| `GET`    | `/todos/`       | Listar todos (filtro opcional `?completed=true`) |
| `GET`    | `/todos/{id}`   | Obtener un todo por ID                           |
| `PUT`    | `/todos/{id}`   | Actualizar un todo                               |
| `DELETE` | `/todos/{id}`   | Eliminar un todo                                 |

## Ejemplos

Crear un todo:

```bash
curl -X POST http://localhost:8000/todos/ \
  -H "Content-Type: application/json" \
  -d '{"title": "Comprar leche", "description": "En el supermercado"}'
```

Listar todos:

```bash
curl http://localhost:8000/todos/
```

Actualizar un todo:

```bash
curl -X PUT http://localhost:8000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

Eliminar un todo:

```bash
curl -X DELETE http://localhost:8000/todos/1
```
