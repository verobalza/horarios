# Frontend - Gestión de Horarios

## Instalación

```bash
cd frontend
npm install
```

## Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Build

```bash
npm run build
```

## Variables de Entorno

Crear un archivo `.env.local`:

```
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Estructura

- `src/pages/` - Páginas principales (Login, Dashboard)
- `src/components/` - Componentes reutilizables
- `src/services/` - Servicios de API
- `src/context/` - Contexto de autenticación
- `src/types/` - Tipos de TypeScript
