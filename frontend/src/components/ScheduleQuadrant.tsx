import React, { useEffect, useState } from 'react';
import { Employee } from '../types';
import { EmployeeService } from '../services/employeeService';

interface QuadrantProps {
  month: number;
  year: number;
  week?: number;
  selectedDays?: number[];
}

export const ScheduleQuadrant: React.FC<QuadrantProps> = ({ month, year, week, selectedDays }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const daysInMonth = new Date(year, month, 0).getDate();
  
  const dayNames = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await EmployeeService.getAll();
        setEmployees(data);
      } catch (err) {
        console.error('Error loading employees:', err);
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
  }, []);

  const isWeekend = (day: number): boolean => {
    const date = new Date(year, month - 1, day);
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const isSunday = (day: number): boolean => {
    const date = new Date(year, month - 1, day);
    return date.getDay() === 0;
  };

  const getCellColor = (dayOfMonth: number, isConflict: boolean): string => {
    if (isConflict) return 'bg-red-200 border-red-400';
    if (selectedDays && selectedDays.includes(dayOfMonth)) return 'bg-green-50 border-green-300';
    if (isSunday(dayOfMonth)) return 'bg-blue-100 border-blue-300';
    return 'bg-yellow-100 border-yellow-300';
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Cargando cuadrante...</div>;
  }

  if (employees.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-600">
        <p>No hay empleados registrados. Agregue empleados para generar el cuadrante.</p>
      </div>
    );
  }

  // Si se recibe una semana, renderizamos solo esa semana dentro del mes
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        {typeof week !== 'undefined' ? `📅 Cuadrante - Semana ${week} de ${monthNames[month - 1]} de ${year}` : `📅 Cuadrante de ${monthNames[month - 1]} de ${year}`}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-center text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 font-semibold min-w-32">Empleado</th>
              {(() => {
                if (typeof week === 'number') {
                  const startDay = (week - 1) * 7 + 1;
                  const endDay = Math.min(startDay + 6, daysInMonth);
                  const headers: JSX.Element[] = [];
                  for (let day = startDay; day <= endDay; day++) {
                    const date = new Date(year, month - 1, day);
                    const dayName = dayNames[date.getDay()];
                    headers.push(
                      <th
                        key={day}
                        className={`border p-1 font-semibold ${isWeekend(day) ? 'bg-gray-100' : 'bg-gray-50'} ${selectedDays && selectedDays.includes(day) ? 'ring-2 ring-green-300' : ''}`}
                      >
                        <div className="text-xs">{dayName}</div>
                        <div>{day}</div>
                      </th>
                    );
                  }
                  return headers;
                }

                return Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const date = new Date(year, month - 1, day);
                  const dayName = dayNames[date.getDay()];
                  return (
                    <th
                      key={day}
                      className={`border p-1 font-semibold ${isWeekend(day) ? 'bg-gray-100' : 'bg-gray-50'}`}
                    >
                      <div className="text-xs">{dayName}</div>
                      <div>{day}</div>
                    </th>
                  );
                });
              })()}
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="border p-2 text-left font-medium text-gray-800 bg-gray-50">
                  <div>{emp.name}</div>
                  <div className="text-xs text-gray-600">{emp.occupation}</div>
                </td>

                {(() => {
                  if (typeof week === 'number') {
                    const startDay = (week - 1) * 7 + 1;
                    const endDay = Math.min(startDay + 6, daysInMonth);
                    const cells: JSX.Element[] = [];
                    for (let day = startDay; day <= endDay; day++) {
                      const cellColorClass = getCellColor(day, false);
                      cells.push(
                        <td
                          key={`${emp.id}-${day}`}
                          className={`border p-1 text-xs font-semibold cursor-pointer hover:shadow-md transition ${cellColorClass}`}
                          title={`${emp.name} - Día ${day}`}
                        >
                          <div className="min-h-8 flex items-center justify-center">Libre</div>
                        </td>
                      );
                    }
                    return cells;
                  }

                  return Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const cellColorClass = getCellColor(day, false);

                    return (
                      <td
                        key={`${emp.id}-${day}`}
                        className={`border p-1 text-xs font-semibold cursor-pointer hover:shadow-md transition ${cellColorClass}`}
                        title={`${emp.name} - Día ${day}`}
                      >
                        <div className="min-h-8 flex items-center justify-center">Libre</div>
                      </td>
                    );
                  });
                })()}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leyenda */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="font-semibold text-gray-800 mb-3">Leyenda:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span>Día libre</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-50 border border-gray-300 rounded"></div>
            <span>Turno asignado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-100 border border-blue-300 rounded"></div>
            <span>Domingo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-200 border border-red-400 rounded"></div>
            <span>Conflicto</span>
          </div>
        </div>
      </div>
    </div>
  );
};
