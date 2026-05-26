from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ScheduleAssignmentBase(BaseModel):
    schedule_id: int
    employee_id: int
    day_of_month: int
    shift_name: Optional[str] = None
    is_day_off: bool = False
    has_conflict: bool = False
    excess_staff: bool = False


class ScheduleAssignmentCreate(ScheduleAssignmentBase):
    pass


class ScheduleAssignmentRead(ScheduleAssignmentBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
