import apiClient from './api';
import { Schedule } from '../types';

export const ScheduleService = {
  async create(schedule: Omit<Schedule, 'id' | 'created_at' | 'updated_at'>) {
    const response = await apiClient.post('/schedules/', schedule);
    return response.data;
  },

  async getAll() {
    const response = await apiClient.get('/schedules/');
    return response.data;
  },

  async getById(id: number) {
    const response = await apiClient.get(`/schedules/${id}`);
    return response.data;
  },

  async getByMonthYear(month: number, year: number) {
    const response = await apiClient.get(`/schedules/month/${month}/year/${year}`);
    return response.data;
  },

  async delete(id: number) {
    const response = await apiClient.delete(`/schedules/${id}`);
    return response.data;
  },
};
