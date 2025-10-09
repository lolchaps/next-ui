// services/service/user.service.ts
import { userDAL } from '../dal/user.dal';
import type { CreateUserDTO, UserResponseDTO } from '../dto/user.dto';

export const userService = {
  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    // Example: format or sanitize before sending to DAL
    const payload = {
      ...data,
      email: data.email.toLowerCase(),
    };

    const user = await userDAL.create(payload);

    // Example: transform data before returning
    return {
      ...user,
      name: user.name.trim(),
    };
  },

  async listUsers(): Promise<UserResponseDTO[]> {
    const users = await userDAL.getAll();
    // Example: sort or filter results before sending back
    return users.sort((a, b) => b.id - a.id);
  },
};
