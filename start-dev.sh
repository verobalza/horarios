#!/bin/bash
# Script para iniciar el proyecto en desarrollo (Linux/Mac)

echo "🚀 Iniciando Gestión de Horarios..."

# Backend
echo "📦 Iniciando Backend (FastAPI)..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload &
BACKEND_PID=$!

# Frontend
echo "⚛️  Iniciando Frontend (React)..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Aplicación iniciada!"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:8000"
echo "📚 Documentación API: http://localhost:8000/docs"
echo ""
echo "Para detener, presiona Ctrl+C"

wait
