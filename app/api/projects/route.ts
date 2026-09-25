import { NextResponse } from 'next/server';
import { getProjects, saveProjects, saveProjectItem, deleteProjectItem, getSiteContent } from '@/lib/storage';
import { verifyAdminSession, verifyEditorSession } from '@/lib/auth';
import { ProjectItem } from '@/lib/types';
import { commitFileToGitHub, isGitHubSyncConfigured } from '@/lib/github-sync';

export const dynamic = 'force-dynamic';

async function autoCommitProjects(action: string, projectName?: string) {
  if (!isGitHubSyncConfigured()) return;
  try {
    const siteContent = getSiteContent();
    await commitFileToGitHub({
      filePath: 'data/site-content.json',
      content: JSON.stringify(siteContent, null, 2),
      commitMessage: `cms(projects): ${action} ${projectName ? `"${projectName}"` : ''} [${new Date().toISOString().substring(0, 16)}]`
    });
  } catch (err) {
    console.warn('[GitHub Sync] Failed to auto-commit projects:', err);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featuredOnly = searchParams.get('featured') === 'true';
  const category = searchParams.get('category')?.toLowerCase();
  const search = searchParams.get('search')?.toLowerCase();

  let list = getProjects();

  if (featuredOnly) {
    list = list.filter((p) => p.featured);
  }

  if (category && category !== 'all') {
    list = list.filter((p) => p.category?.toLowerCase() === category);
  }

  if (search) {
    list = list.filter(
      (p) =>
        (p.name && p.name.toLowerCase().includes(search)) ||
        (p.title && p.title.toLowerCase().includes(search)) ||
        (p.developer && p.developer.toLowerCase().includes(search)) ||
        (p.investor && p.investor.toLowerCase().includes(search)) ||
        (p.location && p.location.toLowerCase().includes(search)) ||
        (p.propertyTypes && p.propertyTypes.toLowerCase().includes(search)) ||
        (p.category && p.category.toLowerCase().includes(search))
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
    const name = body.name || body.title;
    const image = body.image || body.imageUrl;

    if (!name || !image) {
      return NextResponse.json({ error: 'Vui lòng nhập Tên dự án và chọn Hình ảnh đại diện.' }, { status: 400 });
    }

    const newProject: ProjectItem = {
      id: body.id || `proj-${Date.now()}`,
      name: name.trim(),
      title: body.title?.trim() || name.trim(),
      category: body.category?.trim() || 'can-ho',
      developer: body.developer?.trim() || body.investor?.trim() || '',
      investor: body.investor?.trim() || body.developer?.trim() || '',
      location: body.location?.trim() || '',
      area: body.area?.trim() || '',
      scale: body.scale?.trim() || '',
      priceRange: body.priceRange?.trim() || body.price?.trim() || 'Liên hệ tư vấn',
      price: body.price?.trim() || body.priceRange?.trim() || 'Liên hệ tư vấn',
      propertyTypes: body.propertyTypes?.trim() || '',
      description: body.description?.trim() || '',
      image: image.trim(),
      imageUrl: image.trim(),
      featured: typeof body.featured === 'boolean' ? body.featured : false,
      handover: body.handover?.trim() || '',
      ownership: body.ownership?.trim() || 'Sổ hồng lâu dài'
    };

    saveProjectItem(newProject);
    await autoCommitProjects('create project', newProject.name);

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
    const { id } = body;
    const name = body.name || body.title;
    const image = body.image || body.imageUrl;

    if (!id || !name || !image) {
      return NextResponse.json({ error: 'Thiếu ID, Tên dự án hoặc Hình ảnh.' }, { status: 400 });
    }

    const updated: ProjectItem = {
      id,
      name: name.trim(),
      title: body.title?.trim() || name.trim(),
      category: body.category?.trim() || 'can-ho',
      developer: body.developer?.trim() || body.investor?.trim() || '',
      investor: body.investor?.trim() || body.developer?.trim() || '',
      location: body.location?.trim() || '',
      area: body.area?.trim() || '',
      scale: body.scale?.trim() || '',
      priceRange: body.priceRange?.trim() || body.price?.trim() || 'Liên hệ tư vấn',
      price: body.price?.trim() || body.priceRange?.trim() || 'Liên hệ tư vấn',
      propertyTypes: body.propertyTypes?.trim() || '',
      description: body.description?.trim() || '',
      image: image.trim(),
      imageUrl: image.trim(),
      featured: typeof body.featured === 'boolean' ? body.featured : false,
      handover: body.handover?.trim() || '',
      ownership: body.ownership?.trim() || 'Sổ hồng lâu dài'
    };

    saveProjectItem(updated);
    await autoCommitProjects('update project', updated.name);

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
    await autoCommitProjects('reorder projects list');

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

  const projects = getProjects();
  const target = projects.find((p) => p.id === id);
  const deleted = deleteProjectItem(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Không tìm thấy dự án để xóa.' }, { status: 404 });
  }

  await autoCommitProjects('delete project', target?.name || id);

  return NextResponse.json({ success: true, message: 'Đã xóa dự án thành công.' });
}
