import { NextRequest, NextResponse } from 'next/server';
import { userService } from '../../../src/features/users/service';

export async function GET() {
  const users = await userService.getAllUsers();
  return NextResponse.json({ success: true, data: users, count: users.length });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const user = await userService.createUser(body);
    return NextResponse.json({ success: true, message: 'User created successfully', data: user }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
