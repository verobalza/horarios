import React, { useState, useEffect } from 'react';
import { Employee } from '../types';
import { EmployeeService } from '../services/employeeService';

export const EssentialStaffSection: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [essentialKitchen, setEssentialKitchen] = useState<(number | null)[]>(
    Array(10).fill(null)
  );
  const [essentialBar, setEssentialBar] = useState<(number | null)[]>(
    Array(10).fill(null)
  );
  const [loading, setLoading] = useState(true);

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

  const handleSelectEmployee = (
    index: number,
    employeeId: number | null,
    area: 'kitchen' | 'bar'
  ) => {
    if (area === 'kitchen') {
      const newEssential = [...essentialKitchen];
      newEssential[index] = employeeId;
      setEssentialKitchen(newEssential);
    } else {
      const newEssential = [...essentialBar];
      newEssential[index] = employeeId;
      setEssentialBar(newEssential);
    }
  };

  const handleClear = (index: number, area: 'kitchen' | 'bar') => {
    handleSelectEmployee(index, null, area);
  };

  const getEmployeesByArea = (area: string) => {
    return employees.filter((emp) => emp.occupation === area);
  };

  const getUsedEmployees = (list: (number | null)[]) => {
    return list.filter((id) => id !== null) as number[];
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Cargando empleados...</div>;
  }

  const kitchenEmployees = getEmployeesByArea('Cocina');
  const barEmployees = getEmployeesByArea('Barra');

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Imprescindibles por Área</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cocina */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded mr-2 text-sm">
              Cocina
            </span>
          </h3>
          <div className="space-y-3">
            {essentialKitchen.map((employeeId, index) => (
              <div key={`kitchen-${index}`} className="flex gap-2">
                <select
                  value={employeeId || ''}
                  onChange={(e) =>
                    handleSelectEmployee(
                      index,
                      e.target.value ? parseInt(e.target.value) : null,
                      'kitchen'
                    )
                  }
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                  <option value="">Vacío</option>
                  {kitchenEmployees.map((emp) => (
                    <option
                      key={emp.id}
                      value={emp.id}
                      disabled={
                        getUsedEmployees(essentialKitchen).includes(emp.id) &&
                        employeeId !== emp.id
                      }
                    >
                      {emp.name}
                    </option>
                  ))}
                </select>
                {employeeId && (
                  <button
                    onClick={() => handleClear(index, 'kitchen')}
                    className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded text-sm font-medium"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Barra */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded mr-2 text-sm">
              Barra
            </span>
          </h3>
          <div className="space-y-3">
            {essentialBar.map((employeeId, index) => (
              <div key={`bar-${index}`} className="flex gap-2">
                <select
                  value={employeeId || ''}
                  onChange={(e) =>
                    handleSelectEmployee(
                      index,
                      e.target.value ? parseInt(e.target.value) : null,
                      'bar'
                    )
                  }
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                  <option value="">Vacío</option>
                  {barEmployees.map((emp) => (
                    <option
                      key={emp.id}
                      value={emp.id}
                      disabled={
                        getUsedEmployees(essentialBar).includes(emp.id) &&
                        employeeId !== emp.id
                      }
                    >
                      {emp.name}
                    </option>
                  ))}
                </select>
                {employeeId && (
                  <button
                    onClick={() => handleClear(index, 'bar')}
                    className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded text-sm font-medium"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
        <p className="font-semibold mb-2">ℹ️ Información</p>
        <p>
          Los empleados marcados como imprescindibles serán asignados obligatoriamente a
          los turnos mínimos requeridos para su área.
        </p>
      </div>
    </div>
  );
};
