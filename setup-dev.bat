@echo off
REM Script para iniciar el proyecto en desarrollo (Windows)

echo.
echo === Gestion de Horarios - Modo Desarrollo ===
echo.

cd backend
echo [1/2] Backend Setup...
python -m venv venv
call venv\Scripts\activate.bat
pip install -r requirements.txt

echo.
echo [2/2] Frontend Setup...
cd ..\frontend
npm install

echo.
echo === Para ejecutar manualmente ===
echo.
echo Backend:
echo   cd backend
echo   venv\Scripts\activate
echo   uvicorn main:app --reload
echo.
echo Frontend:
echo   cd frontend
echo   npm run dev
echo.
