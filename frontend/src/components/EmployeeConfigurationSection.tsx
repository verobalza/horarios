import React, { useState, useEffect } from 'react';
import { Employee } from '../types';
import { EmployeeService } from '../services/employeeService';

export const EmployeeConfigurationSection: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    occupation: 'Cocina' as const,
    preferred_shifts: [] as string[],
    fixed_days_off: [] as number[],
    requested_days_off: [] as number[],
    occupied_type: 'Ninguno' as const,
    vacation_start: '',
    vacation_end: '',
    weekly_availability: 'L-D' as const,
    vacation_days: [] as number[],
    holiday_days: [] as number[],
  });
  const [fixedDaysOffInput, setFixedDaysOffInput] = useState('');
  const [requestedDaysOffInput, setRequestedDaysOffInput] = useState('');
  const occupiedOptions = ['Ninguno', 'Provincial', 'Guardia'];

  const parseDaysInput = (value: string) => {
    return value
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean)
      .map(Number)
      .filter((day) => !Number.isNaN(day) && day >= 1 && day <= 31);
  };

  const formatDayList = (days: number[]) => {
    return days.length > 0 ? days.join(', ') : 'Ninguno';
  };

  const shifts = ['M1', 'M3', 'T1', 'T3'];
  const occupations = ['Cocina', 'Barra', 'Encargado'];

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

  const handleAddEmployee = async () => {
    if (!formData.name.trim()) {
      alert('El nombre es requerido');
      return;
    }

    const fixed_days_off = parseDaysInput(fixedDaysOffInput);
    const requested_days_off = parseDaysInput(requestedDaysOffInput);

    try {
      const newEmployee = await EmployeeService.create({
        ...formData,
        fixed_days_off,
        requested_days_off,
      });
      setEmployees([...employees, newEmployee]);
      setFormData({
        name: '',
        occupation: 'Cocina',
        preferred_shifts: [],
        fixed_days_off: [],
        requested_days_off: [],
        occupied_type: 'Ninguno',
        vacation_start: '',
        vacation_end: '',
        weekly_availability: 'L-D',
        vacation_days: [],
        holiday_days: [],
      });
      setFixedDaysOffInput('');
      setRequestedDaysOffInput('');
      setShowForm(false);
    } catch (err) {
      console.error('Error creating employee:', err);
      alert('Error al crear empleado');
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    if (confirm('¿Eliminar empleado?')) {
      try {
        await EmployeeService.delete(id);
        setEmployees(employees.filter((e) => e.id !== id));
      } catch (err) {
        console.error('Error deleting employee:', err);
        alert('Error al eliminar empleado');
      }
    }
  };

  const toggleShift = (shift: string) => {
    setFormData((prev) => ({
      ...prev,
      preferred_shifts: prev.preferred_shifts.includes(shift)
        ? prev.preferred_shifts.filter((s) => s !== shift)
        : [...prev.preferred_shifts, shift],
    }));
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Cargando empleados...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Configuración de Empleados</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {showForm ? 'Cancelar' : 'Agregar Empleado'}
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <select
              value={formData.occupation}
              onChange={(e) =>
                setFormData({ ...formData, occupation: e.target.value as any })
              }
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {occupations.map((occ) => (
                <option key={occ} value={occ}>
                  {occ}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Turnos de Preferencia
            </label>
            <div className="flex gap-2">
              {shifts.map((shift) => (
                <label key={shift} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.preferred_shifts.includes(shift)}
                    onChange={() => toggleShift(shift)}
                    className="mr-2"
                  />
                  {shift}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Días libres asignados
            </label>
            <input
              type="text"
              placeholder="Ej. 2, 5, 12"
              value={fixedDaysOffInput}
              onChange={(e) => setFixedDaysOffInput(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Ingresa los días del mes que deben quedarse libres en este empleado.
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Días libres solicitados
            </label>
            <input
              type="text"
              placeholder="Ej. 8, 15, 22"
              value={requestedDaysOffInput}
              onChange={(e) => setRequestedDaysOffInput(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Días que el empleado solicita como descanso; el generador intentará respetarlos.
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ocupado
            </label>
            <select
              value={formData.occupied_type}
              onChange={(e) =>
                setFormData({ ...formData, occupied_type: e.target.value as any })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {occupiedOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vacaciones - inicio
              </label>
              <input
                type="date"
                value={formData.vacation_start}
                onChange={(e) => setFormData({ ...formData, vacation_start: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vacaciones - fin
              </label>
              <input
                type="date"
                value={formData.vacation_end}
                onChange={(e) => setFormData({ ...formData, vacation_end: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <select
            value={formData.weekly_availability}
            onChange={(e) =>
              setFormData({ ...formData, weekly_availability: e.target.value as any })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
          >
            <option value="L-V">Lunes a Viernes</option>
            <option value="L-D">Lunes a Domingo</option>
          </select>

          <button
            onClick={handleAddEmployee}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Guardar Empleado
          </button>
        </div>
      )}

      {/* Lista de Empleados */}
      <div className="space-y-3">
        {employees.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No hay empleados registrados</p>
        ) : (
          employees.map((emp) => (
            <div key={emp.id} className="flex flex-col gap-3 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold text-gray-800">{emp.name}</p>
                  <p className="text-sm text-gray-600">
                    {emp.occupation} • {emp.weekly_availability}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteEmployee(emp.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Eliminar
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">Asignados:</span>{' '}
                  {emp.fixed_days_off.length > 0 ? emp.fixed_days_off.join(', ') : 'Ninguno'}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Solicitados:</span>{' '}
                  {emp.requested_days_off.length > 0 ? emp.requested_days_off.join(', ') : 'Ninguno'}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">Ocupado:</span>{' '}
                  {emp.occupied_type || 'Ninguno'}
                </p>
                <p className="md:col-span-2">
                  <span className="font-medium text-gray-800">Vacaciones:</span>{' '}
                  {emp.vacation_start && emp.vacation_end
                    ? `${emp.vacation_start} → ${emp.vacation_end}`
                    : 'No definido'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
