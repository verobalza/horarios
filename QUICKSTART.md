# Guía de Inicio Rápido - Gestión de Horarios 📅

## 🚀 Inicio Rápido

### Opción 1: Con Docker (Recomendado)

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Docs: http://localhost:8000/docs

### Opción 2: Instalación Manual

#### Windows

1. **Backend**:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

2. **Frontend** (nueva terminal):
```bash
cd frontend
npm install
npm run dev
```

#### Linux/Mac

1. **Backend**:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

2. **Frontend** (nueva terminal):
```bash
cd frontend
npm install
npm run dev
```

## 📱 Acceso a la Aplicación

- **Frontend**: http://localhost:5173
- **API Backend**: http://localhost:8000
- **Documentación Swagger**: http://localhost:8000/docs
- **Documentación ReDoc**: http://localhost:8000/redoc

## 🔐 Credenciales de Prueba

- Email: `test@example.com`
- Contraseña: cualquiera

## 📋 Estructura de Carpetas

```
Horario/
├── backend/          # FastAPI + SQLAlchemy
│   ├── app/
│   │   ├── models/   # Modelos de BD
│   │   ├── schemas/  # Schemas Pydantic
│   │   ├── routes/   # Endpoints
│   │   ├── services/ # Lógica de negocio
│   │   └── database.py
│   ├── main.py
│   └── requirements.txt
├── frontend/         # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── types/
│   └── package.json
└── docker-compose.yml
```

## 🎯 Funcionalidades Principales

✅ **Login Simple** - Autenticación básica con email/contraseña

✅ **Gestión de Empleados** - CRUD completo

✅ **Panel de Control** - Dashboard principal

✅ **Módulo Imprescindibles** - Asignación de trabajadores críticos

✅ **Cuadrante Visual** - Tabla mensual de turnos (básico)

🔄 **En Desarrollo**:
- Motor de asignación automática avanzado
- Validación de reglas complejas
- Exportación a Excel
- Más características...

## 🔧 Configuración

### Backend (.env)

```
DATABASE_URL=sqlite:///./horario.db
DEBUG=True
SECRET_KEY=dev-secret-key
```

### Frontend (.env.local)

```
VITE_API_URL=http://localhost:8000
```

## 📚 API Endpoints

### Empleados
- `GET /employees/` - Listar todos
- `POST /employees/` - Crear nuevo
- `GET /employees/{id}` - Obtener por ID
- `PUT /employees/{id}` - Actualizar
- `DELETE /employees/{id}` - Eliminar

### Cuadrantes
- `GET /schedules/` - Listar todos
- `POST /schedules/` - Crear nuevo
- `GET /schedules/{id}` - Obtener por ID
- `GET /schedules/month/{month}/year/{year}` - Por mes/año

### Turnos
- `GET /shifts/` - Obtener turnos disponibles

## 🐛 Solución de Problemas

### Puerto 5173 en uso
```bash
# En Windows
netstat -ano | findstr :5173

# En Linux/Mac
lsof -i :5173
```

### Puerto 8000 en uso
```bash
# En Windows
netstat -ano | findstr :8000

# En Linux/Mac
lsof -i :8000
```

## 📝 Próximas Funcionalidades

1. Motor de asignación automática completo
2. Validaciones avanzadas de reglas
3. Exportación a Excel
4. Duplicar mes anterior
5. Tests unitarios e integración
6. Autenticación JWT
7. Interfaz mejorada

## 👥 Equipo de Desarrollo

Proyecto desarrollado con React, FastAPI y TypeScript.

---

**Última actualización**: 23 de mayo de 2026
