from sqlalchemy.orm import Session
from app.models.schedule import Schedule
from app.schemas.schedule import ScheduleCreate
from typing import List, Optional


class ScheduleService:
    @staticmethod
    def create(db: Session, schedule: ScheduleCreate) -> Schedule:
        db_schedule = Schedule(**schedule.dict())
        db.add(db_schedule)
        db.commit()
        db.refresh(db_schedule)
        return db_schedule

    @staticmethod
    def get(db: Session, schedule_id: int) -> Optional[Schedule]:
        return db.query(Schedule).filter(Schedule.id == schedule_id).first()

    @staticmethod
    def get_by_month_year(db: Session, month: int, year: int) -> Optional[Schedule]:
        return db.query(Schedule).filter(
            Schedule.month == month,
            Schedule.year == year
        ).first()

    @staticmethod
    def get_all(db: Session) -> List[Schedule]:
        return db.query(Schedule).all()

    @staticmethod
    def delete(db: Session, schedule_id: int) -> bool:
        db_schedule = db.query(Schedule).filter(Schedule.id == schedule_id).first()
        if db_schedule:
            db.delete(db_schedule)
            db.commit()
            return True
        return False
