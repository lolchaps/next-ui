// app/actions/user.actions.ts
'use server';

import { userService } from '@/services/service/user.service';
import type { CreateUserDTO } from '@/services/dto/user.dto';

export async function createUserAction(data: CreateUserDTO) {
  try {
    const user = await userService.createUser(data);
    return { success: true, user };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getUsersAction() {
  try {
    const users = await userService.listUsers();
    return { success: true, users };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
