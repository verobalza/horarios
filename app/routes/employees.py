from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.employee import EmployeeCreate, EmployeeUpdate, EmployeeRead
from app.services.employee_service import EmployeeService
from app.auth import get_current_user
from typing import List

router = APIRouter(
    prefix="/employees",
    tags=["employees"],
    dependencies=[Depends(get_current_user)]
)


@router.post("/", response_model=EmployeeRead)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    return EmployeeService.create(db, employee)


@router.get("/{employee_id}", response_model=EmployeeRead)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = EmployeeService.get(db, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    return employee


@router.get("/", response_model=List[EmployeeRead])
def get_all_employees(db: Session = Depends(get_db)):
    return EmployeeService.get_all(db)


@router.get("/occupation/{occupation}", response_model=List[EmployeeRead])
def get_employees_by_occupation(occupation: str, db: Session = Depends(get_db)):
    return EmployeeService.get_by_occupation(db, occupation)


@router.put("/{employee_id}", response_model=EmployeeRead)
def update_employee(employee_id: int, employee: EmployeeUpdate, db: Session = Depends(get_db)):
    updated_employee = EmployeeService.update(db, employee_id, employee)
    if not updated_employee:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    return updated_employee


@router.delete("/{employee_id}")
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    if not EmployeeService.delete(db, employee_id):
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    return {"message": "Empleado eliminado"}
