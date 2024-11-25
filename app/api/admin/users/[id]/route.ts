import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/auth-config';

export async function DELETE(
  request: NextRequest,
  { params }: { params: any }
): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
  }

  try {
    await db.user.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
  }
}