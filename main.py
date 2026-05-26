from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import init_db
from app.routes import employees, schedules, shifts

# Inicializar base de datos
init_db()

# Crear aplicación FastAPI
app = FastAPI(
    title="Horario API",
    description="API para gestión de horarios de restaurante",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(employees.router)
app.include_router(schedules.router)
app.include_router(shifts.router)


@app.get("/")
async def root():
    return {
        "message": "Bienvenido a la API de Gestión de Horarios",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
