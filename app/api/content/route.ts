import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSiteContent, saveSiteContent } from '@/lib/storage';
import { verifyAdminSession, verifyEditorSession, getSessionUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const content = getSiteContent();
  return NextResponse.json(content, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0'
    }
  });
}

export async function POST(request: Request) {
  return PUT(request);
}

export async function PUT(request: Request) {
  const user = getSessionUser();
  const isAuth = verifyAdminSession() || verifyEditorSession();

  if (!isAuth && process.env.NODE_ENV === 'production' && !user) {
    return NextResponse.json(
      { error: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại Quản trị viên để lưu.' },
      { status: 403 }
    );
  }

  try {
    const data = await request.json();
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Dữ liệu không hợp lệ.' }, { status: 400 });
    }
    const saved = saveSiteContent(data);

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/blog', 'layout');
      revalidatePath('/admin/pages');
    } catch (e) {
      // ignore
    }

    return NextResponse.json({
      success: true,
      message: 'Đã lưu toàn bộ cấu hình trang chủ thành công!',
      content: data,
      savedToDisk: saved
    });
  } catch (err: any) {
    return NextResponse.json({ error: `Lỗi khi lưu dữ liệu: ${err?.message || 'Không xác định'}` }, { status: 500 });
  }
}
