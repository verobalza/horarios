# Gestión de Horarios para Restaurante 📅

Una aplicación fullstack moderna para la gestión automática de horarios de personal en restaurantes.

## Características Principales

### 🔐 Autenticación
- Login simple con email y contraseña
- Validación básica de credenciales
- Redirección automática al panel principal

### 📋 Panel Principal - Generador de Horarios
- Selector de mes y año con generación automática de cuadrante
- Configuración editable de empleados
- Turnos predefinidos: M1, M3, T1, T3
- Visualización de cuadrante mensual con celdas de colores

### 👥 Gestión de Empleados
- Crear, editar y eliminar empleados
- Campos configurables:
  - Nombre
  - Ocupación (Cocina / Barra / Encargado)
  - Turnos de preferencia
  - Días libres fijos y solicitados
  - Disponibilidad semanal (L-V o L-D)
  - Vacaciones y festivos

### 🎯 Módulo de Imprescindibles
- Gestión de trabajadores críticos por área
- Hasta 10 trabajadores por área (Cocina/Barra)
- Asignación obligatoria a turnos
- Detección automática de conflictos

### ⚙️ Reglas Automáticas del Cuadrante
- **40 horas semanales + 2 días de descanso** - Validación y marcado en rojo si se excede
- **Cobertura mínima obligatoria:**
  - L-V: Cocina 3 (M1), 1 (M3/T1/T3) | Barra 5 (M1), 2 (M3/T1), 1 (T3)
  - Fines de semana: Cocina 2, Barra 2 en M1
- **Máximo 5 días seguidos trabajados**
- **1 domingo libre al mes por trabajador**
- **Marcado en rojo de personal sobrante**

### 🤖 Motor de Asignación Automática
- Algoritmo inteligente que respeta todas las reglas
- Prioridad: Imprescindibles → Preferencias → Días libres → Otros
- Garantiza cobertura mínima de turnos
- Validación automática de conflictos

### 📊 Funcionalidades Adicionales
- Regenerar cuadrante
- Exportar a Excel
- Guardar configuración de empleados
- Duplicar mes anterior
- Vista semanal y mensual

## Stack Tecnológico

### Frontend
- React 18+ con TypeScript
- Vite (build tool)
- Tailwind CSS (estilos)
- React Router (navegación)
- Axios (cliente HTTP)

### Backend
- FastAPI (framework web)
- SQLAlchemy (ORM)
- Pydantic (validación)
- PostgreSQL (base de datos)
- Python 3.11+

### DevOps
- Docker & Docker Compose
- PostgreSQL 15

## Instalación Rápida

### Opción 1: Con Docker

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Base de datos: PostgreSQL en localhost:5432

### Opción 2: Instalación Manual

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend en http://localhost:8000

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend en http://localhost:5173

## Configuración

### Backend (.env)

```
DATABASE_URL=postgresql://user:password@localhost:5432/horario_db
DEBUG=True
SECRET_KEY=your-secret-key-here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_JWT_SECRET=your-supabase-jwt-secret
```

### Frontend (.env.local)

```
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## API Endpoints

### Empleados
- `GET /employees/` - Obtener todos
- `POST /employees/` - Crear nuevo
- `GET /employees/{id}` - Obtener por ID
- `PUT /employees/{id}` - Actualizar
- `DELETE /employees/{id}` - Eliminar

### Cuadrantes
- `GET /schedules/` - Obtener todos
- `POST /schedules/` - Crear nuevo
- `GET /schedules/{id}` - Obtener por ID
- `GET /schedules/month/{month}/year/{year}` - Obtener por mes/año

### Turnos
- `GET /shifts/` - Obtener turnos predefinidos

## Documentación Interactiva

Una vez que el backend esté corriendo:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Estructura del Proyecto

```
Horario/
├── backend/
│   ├── app/
│   │   ├── models/         # Modelos SQLAlchemy
│   │   ├── schemas/        # Esquemas Pydantic
│   │   ├── routes/         # Endpoints FastAPI
│   │   ├── services/       # Lógica de negocio
│   │   └── database.py     # Configuración DB
│   ├── main.py             # Aplicación principal
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/          # Páginas
│   │   ├── services/       # Servicios API
│   │   ├── context/        # Context API
│   │   ├── types/          # Tipos TypeScript
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── README.md
├── docker-compose.yml
└── README.md
```

## Convenciones de Código

- **TypeScript**: Tipado estricto en todo el frontend
- **Componentes**: Funcionales con hooks en React
- **Python**: Type hints en todas las funciones
- **Modularidad**: Separación clara de lógica de negocio y presentación
- **Validación**: En ambos lados (frontend + backend)

## Próximos Pasos

1. ✅ Estructura base completada
2. 🔄 Implementar motor de asignación completo
3. 🔄 Agregar validaciones complejas
4. 🔄 Implementar exportación a Excel
5. 🔄 Agregar tests unitarios
6. 🔄 Mejorar UI/UX

## Licencia

Este proyecto es privado y está destinado para uso interno.

---

**Última actualización**: 23 de mayo de 2026

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
