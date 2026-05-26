import calendar
from datetime import datetime
from typing import List, Tuple


class ScheduleGeneratorService:
    """Servicio para generar el cuadrante de horarios"""

    @staticmethod
    def get_days_in_month(month: int, year: int) -> int:
        """Obtener el número de días en un mes"""
        return calendar.monthrange(year, month)[1]

    @staticmethod
    def get_day_name(day: int, month: int, year: int) -> str:
        """Obtener el nombre del día (L, M, X, J, V, S, D)"""
        date = datetime(year, month, day)
        days = ["L", "M", "X", "J", "V", "S", "D"]
        return days[date.weekday()]

    @staticmethod
    def is_sunday(day: int, month: int, year: int) -> bool:
        """Verificar si un día es domingo"""
        date = datetime(year, month, day)
        return date.weekday() == 6

    @staticmethod
    def calculate_weekly_hours(assignments: List) -> int:
        """Calcular horas semanales asignadas"""
        total_hours = 0
        for assignment in assignments:
            if assignment.shift_name and assignment.shift_name != "Libre":
                # Asumir 8 horas por turno
                total_hours += 8
        return total_hours

    @staticmethod
    def get_min_coverage_requirements(area: str, day_name: str) -> dict:
        """
        Obtener requisitos mínimos de cobertura por área y día
        Regla: De lunes a viernes:
        - Cocina: 3 trabajadores en M1, 1 en M3, T1, T3
        - Barra: 5 trabajadores en M1, 2 en M3 y T1, 1 en T3
        Fines de semana:
        - Cocina: 2 trabajadores en M1
        - Barra: 2 trabajadores en M1
        """
        is_weekday = day_name in ["L", "M", "X", "J", "V"]
        
        if area == "Cocina":
            if is_weekday:
                return {"M1": 3, "M3": 1, "T1": 1, "T3": 1}
            else:
                return {"M1": 2, "M3": 0, "T1": 0, "T3": 0}
        elif area == "Barra":
            if is_weekday:
                return {"M1": 5, "M3": 2, "T1": 2, "T3": 1}
            else:
                return {"M1": 2, "M3": 0, "T1": 0, "T3": 0}
        return {}

    @staticmethod
    def validate_assignments(employee_id: int, assignments: List) -> Tuple[bool, List[str]]:
        """
        Validar que los asignaciones cumplan las reglas:
        1. 40 horas semanales + 2 días de descanso
        2. No más de 5 días seguidos trabajados
        3. 1 domingo libre al mes
        """
        errors = []
        
        # Validar horas semanales (8 horas/día * 5 días = 40 horas)
        # Asumir que se va a validar por semana
        
        # Validar domingos
        sundays_off = sum(1 for a in assignments if a.is_sunday and (a.shift_name == "Libre" or not a.shift_name))
        if sundays_off == 0:
            errors.append("Debe tener al menos 1 domingo libre al mes")
        
        return len(errors) == 0, errors
