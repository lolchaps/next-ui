// services/dto/user.dto.ts
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: number;
  name: string;
  email: string;
  created_at: string;
}
