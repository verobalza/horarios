# Copilot Instructions - Gestión de Horarios para Restaurante

## Descripción del Proyecto
Aplicación fullstack para gestión automática de horarios en restaurantes. Incluye:
- **Frontend**: React + TypeScript + Vite
- **Backend**: FastAPI + Python
- **Base de Datos**: PostgreSQL
- **Autenticación**: Login simple (validación local)

## Requisitos Principales

### 1. Login Simple
- Email y contraseña
- Validación básica
- Redirección al panel principal

### 2. Panel Principal - Generador de Horarios
- Selector de mes y año con generación de cuadrante
- Configuración de empleados (nombre, ocupación, turnos de preferencia, etc.)
- Turnos predefinidos: M1 (07:00-15:00), M3 (07:30-15:30), T1 (15:00-23:00), T3 (15:00-23:00)
- Reglas automáticas:
  - 40 horas semanales + 2 días de descanso
  - Cobertura mínima obligatoria por turno
  - Máx 5 días seguidos trabajados
  - 1 domingo libre al mes
  - Marcar en rojo si sobra personal

### 3. Motor de Asignación Automática
- Leer preferencias y días libres
- Respetar disponibilidad (L-V o L-D)
- Aplicar todas las reglas automáticamente
- Garantizar 40h + 2 días libres + 1 domingo

### 4. Módulo de Imprescindibles
- Editable por área (Cocina/Barra)
- Hasta 10 trabajadores por área
- Asignación obligatoria a turnos críticos
- Marcar conflictos en rojo

### 5. Funcionalidades Adicionales
- Regenerar cuadrante
- Exportar a Excel
- Guardar configuración de empleados
- Duplicar mes anterior
- Vista semanal y mensual

## Stack Tecnológico
- **Frontend**: React 18+, TypeScript, Vite, Tailwind CSS
- **Backend**: FastAPI, SQLAlchemy, Pydantic
- **Base de Datos**: PostgreSQL
- **Otras**: Excel export (openpyxl), JWT para auth, CORS

## Estructura del Proyecto
```
/Horario
  ├── /backend          # FastAPI + PostgreSQL
  ├── /frontend         # React + Vite
  ├── /docs             # Documentación
  └── docker-compose.yml # Configuración Docker
```

## Convenciones de Código
- Usar TypeScript estrictamente
- Componentes funcionales con hooks en React
- Type-safe en Python con type hints
- Modularidad: separar lógica de negocio de presentación
- Validación en ambos lados (frontend + backend)

## Pasos de Desarrollo
1. Crear estructura de carpetas
2. Configurar backend con modelos y endpoints
3. Configurar frontend con componentes base
4. Implementar login
5. Implementar panel principal
6. Implementar motor de asignación
7. Integrar todas las características
8. Testing y validación

