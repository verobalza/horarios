from sqlalchemy.orm import Session
from app.models.essential_staff import EssentialStaff
from app.schemas.essential_staff import EssentialStaffCreate
from typing import List, Optional


class EssentialStaffService:
    @staticmethod
    def create(db: Session, essential: EssentialStaffCreate) -> EssentialStaff:
        db_essential = EssentialStaff(**essential.dict())
        db.add(db_essential)
        db.commit()
        db.refresh(db_essential)
        return db_essential

    @staticmethod
    def get(db: Session, essential_id: int) -> Optional[EssentialStaff]:
        return db.query(EssentialStaff).filter(EssentialStaff.id == essential_id).first()

    @staticmethod
    def get_by_schedule_and_area(db: Session, schedule_id: int, area: str) -> List[EssentialStaff]:
        return db.query(EssentialStaff).filter(
            EssentialStaff.schedule_id == schedule_id,
            EssentialStaff.area == area
        ).all()

    @staticmethod
    def get_by_schedule(db: Session, schedule_id: int) -> List[EssentialStaff]:
        return db.query(EssentialStaff).filter(EssentialStaff.schedule_id == schedule_id).all()

    @staticmethod
    def delete(db: Session, essential_id: int) -> bool:
        db_essential = db.query(EssentialStaff).filter(EssentialStaff.id == essential_id).first()
        if db_essential:
            db.delete(db_essential)
            db.commit()
            return True
        return False
