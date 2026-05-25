from pydantic import BaseModel
from datetime import time


class ShiftBase(BaseModel):
    name: str
    start_time: time
    end_time: time
    hours: int


class ShiftCreate(ShiftBase):
    pass


class ShiftRead(ShiftBase):
    id: int

    class Config:
        from_attributes = True
