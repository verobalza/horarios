import apiClient from './api';
import { Employee } from '../types';

export const EmployeeService = {
  async create(employee: Omit<Employee, 'id' | 'created_at' | 'updated_at'>) {
    const response = await apiClient.post('/employees/', employee);
    return response.data;
  },

  async getAll() {
    const response = await apiClient.get('/employees/');
    return response.data;
  },

  async getById(id: number) {
    const response = await apiClient.get(`/employees/${id}`);
    return response.data;
  },

  async getByOccupation(occupation: string) {
    const response = await apiClient.get(`/employees/occupation/${occupation}`);
    return response.data;
  },

  async update(id: number, employee: Partial<Employee>) {
    const response = await apiClient.put(`/employees/${id}`, employee);
    return response.data;
  },

  async delete(id: number) {
    const response = await apiClient.delete(`/employees/${id}`);
    return response.data;
  },
};
