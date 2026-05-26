from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class EmployeeBase(BaseModel):
    name: str
    occupation: str  # Cocina, Barra, Encargado
    preferred_shifts: List[str] = []
    fixed_days_off: List[int] = []
    requested_days_off: List[int] = []
    occupied_type: str = "Ninguno"
    vacation_start: str = ""
    vacation_end: str = ""
    weekly_availability: str = "L-D"
    vacation_days: List[int] = []
    holiday_days: List[int] = []


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    occupation: Optional[str] = None
    preferred_shifts: Optional[List[str]] = None
    fixed_days_off: Optional[List[int]] = None
    requested_days_off: Optional[List[int]] = None
    occupied_type: Optional[str] = None
    vacation_start: Optional[str] = None
    vacation_end: Optional[str] = None
    weekly_availability: Optional[str] = None
    vacation_days: Optional[List[int]] = None
    holiday_days: Optional[List[int]] = None


class EmployeeRead(EmployeeBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
