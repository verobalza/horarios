import apiClient from './api';

export const ShiftService = {
  async getAll() {
    const response = await apiClient.get('/shifts/');
    return response.data;
  },
};
