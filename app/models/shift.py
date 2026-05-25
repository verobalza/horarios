from sqlalchemy import Column, Integer, String, Time
from datetime import time
from app.database import Base


class Shift(Base):
    __tablename__ = "shifts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(10), unique=True, nullable=False)  # M1, M3, T1, T3
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    hours = Column(Integer, nullable=False)  # horas de duración
