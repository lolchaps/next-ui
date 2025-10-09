// services/dal/user.dal.ts
import { apiFetch } from '../api';
import type { CreateUserDTO, UserResponseDTO } from '../dto/user.dto';

export const userDAL = {
  async create(data: CreateUserDTO): Promise<UserResponseDTO> {
    return apiFetch('users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getAll(): Promise<UserResponseDTO[]> {
    return apiFetch('users', { method: 'GET' });
  },
};
