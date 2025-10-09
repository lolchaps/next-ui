// app/actions/user.actions.ts
'use server';

import { userDAL } from '@/services/dal/user.dal';
import type { CreateUserDTO } from '@/services/dto/user.dto';

export async function createUserAction(data: CreateUserDTO) {
  try {
    const user = await userDAL.create(data);
    return { success: true, user };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
