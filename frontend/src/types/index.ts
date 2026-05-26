export interface Employee {
  id: number;
  name: string;
  occupation: "Cocina" | "Barra" | "Encargado";
  preferred_shifts: string[];
  fixed_days_off: number[];
  requested_days_off: number[];
  occupied_type?: string;
  vacation_start?: string;
  vacation_end?: string;
  weekly_availability: "L-V" | "L-D";
  vacation_days: number[];
  holiday_days: number[];
  created_at: string;
  updated_at: string;
}

export interface Schedule {
  id: number;
  month: number;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface Shift {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
  hours: number;
}

export interface ScheduleAssignment {
  id: number;
  schedule_id: number;
  employee_id: number;
  day_of_month: number;
  shift_name: string | null;
  is_day_off: boolean;
  has_conflict: boolean;
  excess_staff: boolean;
  created_at: string;
  updated_at: string;
}

export interface EssentialStaff {
  id: number;
  schedule_id: number;
  employee_id: number;
  area: "Cocina" | "Barra";
  position: number;
  created_at: string;
}
