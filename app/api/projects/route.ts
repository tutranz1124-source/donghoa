import { NextResponse } from 'next/server';
import { getProjects, saveProjects, saveProjectItem, deleteProjectItem } from '@/lib/storage';
import { verifyAdminSession, verifyEditorSession } from '@/lib/auth';
import { ProjectItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featuredOnly = searchParams.get('featured') === 'true';
  const search = searchParams.get('search')?.toLowerCase();

  let list = getProjects();

  if (featuredOnly) {
    list = list.filter((p) => p.featured);
  }

  if (search) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        (p.developer && p.developer.toLowerCase().includes(search)) ||
        (p.location && p.location.toLowerCase().includes(search)) ||
        (p.propertyTypes && p.propertyTypes.toLowerCase().includes(search))
    );
  }

  return NextResponse.json({
    success: true,
    total: list.length,
    projects: list
  });
}

export async function POST(request: Request) {
  const isAuth = verifyAdminSession() || verifyEditorSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, developer, location, area, propertyTypes, image, featured } = body;

    if (!name || !image) {
      return NextResponse.json({ error: 'Vui lòng nhập Tên dự án và chọn Hình ảnh đại diện.' }, { status: 400 });
    }

    const newProject: ProjectItem = {
      id: body.id || `proj-${Date.now()}`,
      name: name.trim(),
      developer: developer?.trim() || '',
      location: location?.trim() || '',
      area: area?.trim() || '',
      propertyTypes: propertyTypes?.trim() || '',
      image: image.trim(),
      featured: typeof featured === 'boolean' ? featured : false
    };

    saveProjectItem(newProject);

    return NextResponse.json({
      success: true,
      message: 'Tạo dự án mới thành công!',
      project: newProject
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isAuth = verifyAdminSession() || verifyEditorSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name, developer, location, area, propertyTypes, image, featured } = body;

    if (!id || !name || !image) {
      return NextResponse.json({ error: 'Thiếu ID, Tên dự án hoặc Hình ảnh.' }, { status: 400 });
    }

    const updated: ProjectItem = {
      id,
      name: name.trim(),
      developer: developer?.trim() || '',
      location: location?.trim() || '',
      area: area?.trim() || '',
      propertyTypes: propertyTypes?.trim() || '',
      image: image.trim(),
      featured: typeof featured === 'boolean' ? featured : false
    };

    saveProjectItem(updated);

    return NextResponse.json({
      success: true,
      message: 'Cập nhật dự án thành công!',
      project: updated
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to update project' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const isAuth = verifyAdminSession() || verifyEditorSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { items, badge, title } = body;

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Dữ liệu danh sách dự án không hợp lệ.' }, { status: 400 });
    }

    saveProjects(items, { badge, title });

    return NextResponse.json({
      success: true,
      message: 'Đã lưu danh sách & thứ tự dự án thành công!',
      items
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to reorder projects' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isAuth = verifyAdminSession() || verifyEditorSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Thiếu mã dự án (id).' }, { status: 400 });
  }

  const deleted = deleteProjectItem(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Không tìm thấy dự án để xóa.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Đã xóa dự án thành công.' });
}

