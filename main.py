from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.database import init_db
from app.routes import employees, schedules, shifts
from app.auth import get_current_user
import os

# Inicializar base de datos
init_db()

# Crear aplicación FastAPI
app = FastAPI(
    title="Horario API",
    description="API para gestión de horarios de restaurante",
    version="1.0.0"
)

# Configurar CORS
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
RENDER_URL = os.getenv("RENDER_EXTERNAL_URL", "")

allowed_origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    FRONTEND_URL
]
if RENDER_URL:
    allowed_origins.append(RENDER_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
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


@app.get("/auth/me")
async def get_me(user = Depends(get_current_user)):
    """Endpoint protegido para obtener datos del usuario autenticado"""
    return {
        "user_id": user["user_id"],
        "email": user["email"]
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

@app.get("/healthz")
def health_check():
    return {"status": "ok"}
