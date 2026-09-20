import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { authenticateUser, createSessionToken, getSessionUser } from '@/lib/auth';

export async function GET() {
  const user = getSessionUser();
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user });
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = authenticateUser(email, password);

    if (user) {
      const token = createSessionToken(user);
      const cookieStore = cookies();
      cookieStore.set('donghoa_admin_session', token, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return NextResponse.json({ success: true, user });
    }

    return NextResponse.json(
      { success: false, message: 'Sai thông tin tài khoản hoặc mật khẩu' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.delete('donghoa_admin_session');
  return NextResponse.json({ success: true });
}
