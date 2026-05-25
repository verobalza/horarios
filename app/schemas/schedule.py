from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class ScheduleBase(BaseModel):
    month: int
    year: int


class ScheduleCreate(ScheduleBase):
    pass


class ScheduleRead(ScheduleBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
