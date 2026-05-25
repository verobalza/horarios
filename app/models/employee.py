from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, index=True)
    occupation = Column(String(50), nullable=False)  # Cocina, Barra, Encargado
    preferred_shifts = Column(JSON, default=[])  # [M1, M3, T1, T3]
    fixed_days_off = Column(JSON, default=[])  # días del mes
    requested_days_off = Column(JSON, default=[])  # días solicitados
    weekly_availability = Column(String(10), default="L-D")  # L-V o L-D
    vacation_days = Column(JSON, default=[])  # días de vacaciones
    holiday_days = Column(JSON, default=[])  # festivos
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    schedule_assignments = relationship("ScheduleAssignment", back_populates="employee")
    essential_staff = relationship("EssentialStaff", back_populates="employee")
