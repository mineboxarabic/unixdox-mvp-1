import { NextRequest, NextResponse } from 'next/server';
import { userService } from '../../../../src/features/users/service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await userService.getUserById(params.id);
  if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: user });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  try {
    const updated = await userService.updateUser(params.id, body);
    return NextResponse.json({ success: true, message: 'User updated successfully', data: updated });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await userService.deleteUser(params.id);
  return NextResponse.json({ success: true, message: 'User deleted successfully' });
}
