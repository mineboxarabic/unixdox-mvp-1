import { NextRequest } from 'next/server';
import { userService } from '../service';
import { UserCreateSchema, UserUpdateSchema } from '../model/schema.zod';

type HttpResult = { status: number; body: any };

export const usersController = {
  async list(): Promise<HttpResult> {
    const users = await userService.getAllUsers();
    return { status: 200, body: { success: true, data: users, count: users.length } };
  },
  async create(req: NextRequest): Promise<HttpResult> {
    const json = await req.json();
    const parsed = UserCreateSchema.safeParse(json);
    if (!parsed.success) return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    try {
      const user = await userService.createUser(parsed.data as any);
      return { status: 201, body: { success: true, message: 'User created successfully', data: user } };
    } catch (e: any) {
      return { status: 500, body: { success: false, message: e?.message || 'Unexpected error' } };
    }
  },
  async get(params: { id: string }): Promise<HttpResult> {
    const user = await userService.getUserById(params.id);
    if (!user) return { status: 404, body: { success: false, message: 'User not found' } };
    return { status: 200, body: { success: true, data: user } };
  },
  async update(req: NextRequest, params: { id: string }): Promise<HttpResult> {
    const json = await req.json();
    const parsed = UserUpdateSchema.safeParse(json);
    if (!parsed.success) return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    try {
      const updated = await userService.updateUser(params.id, parsed.data as any);
      return { status: 200, body: { success: true, message: 'User updated successfully', data: updated } };
    } catch (e: any) {
      return { status: 500, body: { success: false, message: e?.message || 'Unexpected error' } };
    }
  },
  async remove(params: { id: string }): Promise<HttpResult> {
    await userService.deleteUser(params.id);
    return { status: 200, body: { success: true, message: 'User deleted successfully' } };
  },
  async profile(params: { id: string }): Promise<HttpResult> {
    const user = await userService.getUserWithDocuments(params.id);
    if (!user) return { status: 404, body: { success: false, message: 'User not found' } };
    return { status: 200, body: { success: true, data: user } };
  },
};
