from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schedule import ScheduleCreate, ScheduleRead
from app.services.schedule_service import ScheduleService
from app.services.shift_service import ShiftService
from typing import List

router = APIRouter(prefix="/schedules", tags=["schedules"])


@router.post("/", response_model=ScheduleRead)
def create_schedule(schedule: ScheduleCreate, db: Session = Depends(get_db)):
    # Inicializar turnos predefinidos si no existen
    ShiftService.create_default_shifts(db)
    return ScheduleService.create(db, schedule)


@router.get("/{schedule_id}", response_model=ScheduleRead)
def get_schedule(schedule_id: int, db: Session = Depends(get_db)):
    schedule = ScheduleService.get(db, schedule_id)
    if not schedule:
        raise HTTPException(status_code=404, detail="Cuadrante no encontrado")
    return schedule


@router.get("/month/{month}/year/{year}", response_model=ScheduleRead)
def get_schedule_by_month_year(month: int, year: int, db: Session = Depends(get_db)):
    schedule = ScheduleService.get_by_month_year(db, month, year)
    if not schedule:
        raise HTTPException(status_code=404, detail="Cuadrante no encontrado")
    return schedule


@router.get("/", response_model=List[ScheduleRead])
def get_all_schedules(db: Session = Depends(get_db)):
    return ScheduleService.get_all(db)


@router.delete("/{schedule_id}")
def delete_schedule(schedule_id: int, db: Session = Depends(get_db)):
    if not ScheduleService.delete(db, schedule_id):
        raise HTTPException(status_code=404, detail="Cuadrante no encontrado")
    return {"message": "Cuadrante eliminado"}
