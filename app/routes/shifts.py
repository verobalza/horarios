from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.shift_service import ShiftService
from app.schemas.shift import ShiftRead
from typing import List

router = APIRouter(prefix="/shifts", tags=["shifts"])


@router.get("/", response_model=List[ShiftRead])
def get_all_shifts(db: Session = Depends(get_db)):
    # Inicializar turnos predefinidos si no existen
    ShiftService.create_default_shifts(db)
    return ShiftService.get_all(db)
