from pydantic import BaseModel
from datetime import datetime


class EssentialStaffBase(BaseModel):
    schedule_id: int
    employee_id: int
    area: str  # Cocina o Barra
    position: int  # 1-10


class EssentialStaffCreate(EssentialStaffBase):
    pass


class EssentialStaffRead(EssentialStaffBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
