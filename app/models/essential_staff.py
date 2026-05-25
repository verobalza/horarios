from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class EssentialStaff(Base):
    __tablename__ = "essential_staff"

    id = Column(Integer, primary_key=True, index=True)
    schedule_id = Column(Integer, ForeignKey("schedules.id"), nullable=False)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    area = Column(String(50), nullable=False)  # Cocina o Barra
    position = Column(Integer, nullable=False)  # 1-10 (posición en lista)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    schedule = relationship("Schedule", back_populates="essential_staff")
    employee = relationship("Employee", back_populates="essential_staff")
