from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class ScheduleAssignment(Base):
    __tablename__ = "schedule_assignments"

    id = Column(Integer, primary_key=True, index=True)
    schedule_id = Column(Integer, ForeignKey("schedules.id"), nullable=False)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    day_of_month = Column(Integer, nullable=False)  # 1-31
    shift_name = Column(String(10), nullable=True)  # M1, M3, T1, T3, or Libre
    is_day_off = Column(Boolean, default=False)
    has_conflict = Column(Boolean, default=False)  # Marcar en rojo si hay conflicto
    excess_staff = Column(Boolean, default=False)  # Marcar en rojo si sobra personal
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    schedule = relationship("Schedule", back_populates="assignments")
    employee = relationship("Employee", back_populates="schedule_assignments")
