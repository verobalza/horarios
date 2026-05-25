from sqlalchemy.orm import Session
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeUpdate
from typing import List, Optional


class EmployeeService:
    @staticmethod
    def create(db: Session, employee: EmployeeCreate) -> Employee:
        db_employee = Employee(**employee.dict())
        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)
        return db_employee

    @staticmethod
    def get(db: Session, employee_id: int) -> Optional[Employee]:
        return db.query(Employee).filter(Employee.id == employee_id).first()

    @staticmethod
    def get_all(db: Session) -> List[Employee]:
        return db.query(Employee).all()

    @staticmethod
    def get_by_occupation(db: Session, occupation: str) -> List[Employee]:
        return db.query(Employee).filter(Employee.occupation == occupation).all()

    @staticmethod
    def update(db: Session, employee_id: int, employee_update: EmployeeUpdate) -> Optional[Employee]:
        db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
        if db_employee:
            update_data = employee_update.dict(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_employee, key, value)
            db.commit()
            db.refresh(db_employee)
        return db_employee

    @staticmethod
    def delete(db: Session, employee_id: int) -> bool:
        db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
        if db_employee:
            db.delete(db_employee)
            db.commit()
            return True
        return False
