import React from 'react';

interface Props {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  selectedDays: number[];
  setSelectedDays: React.Dispatch<React.SetStateAction<number[]>>;
  onGenerate?: () => void;
}

export const ScheduleGeneratorSection: React.FC<Props> = ({ month, setMonth, year, setYear, selectedDays, setSelectedDays, onGenerate }) => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayIndex = new Date(year, month - 1, 1).getDay(); // 0 = Sunday

  const toggleDay = (day: number) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day].sort((a, b) => a - b));
    }
  };

  const handleGenerateSchedule = () => {
    console.log(`Generando cuadrante para ${months[month - 1]} ${year} — días: ${selectedDays.join(', ')}`);
    if (onGenerate) onGenerate();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Selector de Días (Calendario) — Mes y Año</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Dropdown Mes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mes
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {months.map((m, index) => (
              <option key={index + 1} value={index + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Año */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Año
          </label>
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {[year - 1, year, year + 1, year + 2].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Calendario (visual) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Selecciona los días</label>
          <div className="bg-white border rounded p-3">
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-600 mb-2">
              <div>D</div><div>L</div><div>M</div><div>X</div><div>J</div><div>V</div><div>S</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-sm">
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10"></div>
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const selected = selectedDays.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`h-10 flex items-center justify-center rounded ${selected ? 'bg-green-100 border border-green-300' : 'hover:bg-gray-100'} transition`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Botón Aceptar */}
        <div className="flex items-end md:col-span-1">
          <button
            onClick={handleGenerateSchedule}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Generar Cuadrante
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Seleccionado: <strong>{months[month - 1]} de {year}</strong> — Días: <strong>{selectedDays.length ? selectedDays.join(', ') : 'ninguno'}</strong>
      </div>
    </div>
  );
};
