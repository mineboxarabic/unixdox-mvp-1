import { NextResponse } from 'next/server';
import { userService } from '../../../../../src/features/users/service';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await userService.getUserWithDocuments(params.id);
  if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: user });
}
