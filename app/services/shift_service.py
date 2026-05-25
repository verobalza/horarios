from sqlalchemy.orm import Session
from app.models.shift import Shift
from app.schemas.shift import ShiftCreate
from datetime import time
from typing import List, Optional


class ShiftService:
    @staticmethod
    def create_default_shifts(db: Session):
        """Crear turnos predefinidos"""
        shifts = [
            {"name": "M1", "start_time": time(7, 0), "end_time": time(15, 0), "hours": 8},
            {"name": "M3", "start_time": time(7, 30), "end_time": time(15, 30), "hours": 8},
            {"name": "T1", "start_time": time(15, 0), "end_time": time(23, 0), "hours": 8},
            {"name": "T3", "start_time": time(15, 30), "end_time": time(23, 30), "hours": 8},
        ]
        for shift_data in shifts:
            existing = db.query(Shift).filter(Shift.name == shift_data["name"]).first()
            if not existing:
                shift = Shift(**shift_data)
                db.add(shift)
        db.commit()

    @staticmethod
    def get(db: Session, shift_id: int) -> Optional[Shift]:
        return db.query(Shift).filter(Shift.id == shift_id).first()

    @staticmethod
    def get_by_name(db: Session, name: str) -> Optional[Shift]:
        return db.query(Shift).filter(Shift.name == name).first()

    @staticmethod
    def get_all(db: Session) -> List[Shift]:
        return db.query(Shift).all()
