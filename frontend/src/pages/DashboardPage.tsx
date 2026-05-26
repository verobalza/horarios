import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ScheduleGeneratorSection } from '../components/ScheduleGeneratorSection';
import { EmployeeConfigurationSection } from '../components/EmployeeConfigurationSection';
import { EssentialStaffSection } from '../components/EssentialStaffSection';
import { ScheduleQuadrant } from '../components/ScheduleQuadrant';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">📅 Gestión de Horarios</h1>
          <div className="flex items-center gap-6">
            <span className="text-sm">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Selector de Semana, Mes y Año */}
        <ScheduleGeneratorSection
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />

        {/* Cuadrante Visual */}
        <ScheduleQuadrant month={month} year={year} selectedDays={selectedDays} />

        {/* Configuración de Empleados */}
        <EmployeeConfigurationSection />

        {/* Imprescindibles */}
        <EssentialStaffSection />

        {/* Placeholder para más secciones */}
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
          <p className="mb-4">Secciones en desarrollo:</p>
          <ul className="space-y-2 text-left max-w-md mx-auto">
            <li>✓ Motor de asignación automática</li>
            <li>✓ Validación de reglas</li>
            <li>✓ Exportar a Excel</li>
            <li>✓ Guardar configuración</li>
          </ul>
        </div>
      </main>
    </div>
  );
};
