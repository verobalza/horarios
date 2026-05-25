from sqlalchemy.orm import Session
from app.models.schedule_assignment import ScheduleAssignment
from app.schemas.schedule_assignment import ScheduleAssignmentCreate
from typing import List, Optional


class ScheduleAssignmentService:
    @staticmethod
    def create(db: Session, assignment: ScheduleAssignmentCreate) -> ScheduleAssignment:
        db_assignment = ScheduleAssignment(**assignment.dict())
        db.add(db_assignment)
        db.commit()
        db.refresh(db_assignment)
        return db_assignment

    @staticmethod
    def get(db: Session, assignment_id: int) -> Optional[ScheduleAssignment]:
        return db.query(ScheduleAssignment).filter(ScheduleAssignment.id == assignment_id).first()

    @staticmethod
    def get_by_schedule_and_day(db: Session, schedule_id: int, day: int) -> List[ScheduleAssignment]:
        return db.query(ScheduleAssignment).filter(
            ScheduleAssignment.schedule_id == schedule_id,
            ScheduleAssignment.day_of_month == day
        ).all()

    @staticmethod
    def get_by_schedule(db: Session, schedule_id: int) -> List[ScheduleAssignment]:
        return db.query(ScheduleAssignment).filter(ScheduleAssignment.schedule_id == schedule_id).all()

    @staticmethod
    def update(db: Session, assignment_id: int, data: dict) -> Optional[ScheduleAssignment]:
        db_assignment = db.query(ScheduleAssignment).filter(ScheduleAssignment.id == assignment_id).first()
        if db_assignment:
            for key, value in data.items():
                setattr(db_assignment, key, value)
            db.commit()
            db.refresh(db_assignment)
        return db_assignment

    @staticmethod
    def delete(db: Session, assignment_id: int) -> bool:
        db_assignment = db.query(ScheduleAssignment).filter(ScheduleAssignment.id == assignment_id).first()
        if db_assignment:
            db.delete(db_assignment)
            db.commit()
            return True
        return False
