# Backend - Gestión de Horarios

## Instalación

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

## Configuración

1. Copiar `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Ajustar variables de entorno en `.env`

## Ejecutar

```bash
uvicorn main:app --reload
```

La API estará disponible en `http://localhost:8000`

## Documentación

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
