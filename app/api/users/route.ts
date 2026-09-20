import { NextResponse } from 'next/server';
import { getUsers, saveUsers, verifyAdminSession, getSessionUser } from '@/lib/auth';
import { UserAccount } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isAuth = verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Chỉ Quản Trị Viên (Admin) mới có quyền truy cập.' }, { status: 403 });
  }

  const users = getUsers();
  // Strip plain passwords from response for security
  const safeUsers = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt,
    lastLogin: u.lastLogin
  }));

  return NextResponse.json(safeUsers);
}

export async function POST(request: Request) {
  const isAuth = verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Chỉ Quản Trị Viên (Admin) mới có quyền tạo tài khoản.' }, { status: 403 });
  }

  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Vui lòng nhập đầy đủ Tên, Email và Mật khẩu.' }, { status: 400 });
    }

    const users = getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      return NextResponse.json({ error: 'Email hoặc tên đăng nhập này đã tồn tại.' }, { status: 400 });
    }

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      role: role === 'admin' ? 'admin' : 'editor',
      createdAt: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    saveUsers(users);

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt
      }
    });
  } catch (err) {
    console.error('Error creating user:', err);
    return NextResponse.json({ error: 'Lỗi máy chủ khi tạo tài khoản.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isAuth = verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Chỉ Quản Trị Viên (Admin) mới có quyền sửa tài khoản.' }, { status: 403 });
  }

  try {
    const { id, name, email, password, role } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Thiếu mã tài khoản (ID).' }, { status: 400 });
    }

    const users = getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Không tìm thấy tài khoản.' }, { status: 404 });
    }

    // GUARANTEE: Cannot downgrade the last remaining admin!
    const targetUser = users[index];
    if (targetUser.role === 'admin' && role === 'editor') {
      const adminCount = users.filter((u) => u.role === 'admin').length;
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: 'Hệ thống bắt buộc phải duy trì ít nhất 1 tài khoản Quản Trị Viên (Admin). Không thể hạ cấp quyền của Admin duy nhất.' },
          { status: 400 }
        );
      }
    }

    if (name) users[index].name = name.trim();
    if (email) users[index].email = email.trim().toLowerCase();
    if (password && password.trim()) users[index].password = password.trim();
    if (role) users[index].role = role === 'admin' ? 'admin' : 'editor';

    saveUsers(users);
    return NextResponse.json({ success: true, user: users[index] });
  } catch (err) {
    console.error('Error updating user:', err);
    return NextResponse.json({ error: 'Lỗi máy chủ khi cập nhật tài khoản.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const currentUser = getSessionUser();
  if (!currentUser || currentUser.role !== 'admin') {
    return NextResponse.json({ error: 'Chỉ Quản Trị Viên (Admin) mới có quyền xóa tài khoản.' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 });

  if (id === currentUser.id) {
    return NextResponse.json({ error: 'Không thể tự xóa tài khoản đang đăng nhập hiện tại.' }, { status: 400 });
  }

  const users = getUsers();
  const targetUser = users.find((u) => u.id === id);
  if (!targetUser) {
    return NextResponse.json({ error: 'Không tìm thấy tài khoản để xóa.' }, { status: 404 });
  }

  // GUARANTEE: Cannot delete the last remaining admin!
  if (targetUser.role === 'admin') {
    const adminCount = users.filter((u) => u.role === 'admin').length;
    if (adminCount <= 1) {
      return NextResponse.json(
        { error: 'Hệ thống bắt buộc phải duy trì ít nhất 1 tài khoản Quản Trị Viên (Admin). Không thể xóa tài khoản Admin duy nhất còn lại.' },
        { status: 400 }
      );
    }
  }

  const filtered = users.filter((u) => u.id !== id);
  saveUsers(filtered);
  return NextResponse.json({ success: true });
}
