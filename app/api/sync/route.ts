import { NextResponse } from 'next/server';
import {
  getGitHubConfig,
  isGitHubSyncConfigured,
  syncAllDataToGitHub,
  exportDataBundle
} from '@/lib/github-sync';
import {
  saveSiteContent,
  saveBlogPosts,
  saveMediaLibrary
} from '@/lib/storage';
import { verifyAdminSession, verifyEditorSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  // Export full data snapshot
  if (action === 'export') {
    const isAuth = verifyAdminSession() || verifyEditorSession();
    if (!isAuth && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bundle = exportDataBundle();
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `donghoa-backup-${dateStr}.json`;

    return new NextResponse(JSON.stringify(bundle, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });
  }

  // Check sync status
  const config = getGitHubConfig();
  const configured = isGitHubSyncConfigured();

  return NextResponse.json({
    configured,
    repo: config.repo,
    branch: config.branch,
    hasToken: Boolean(config.token),
    mode: process.env.NODE_ENV || 'development'
  });
}

export async function POST(request: Request) {
  const isAuth = verifyAdminSession() || verifyEditorSession();
  if (!isAuth && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Phiên đăng nhập đã hết hạn.' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const action = body.action || 'sync';

    // 1. Action: Restore / Import from backup
    if (action === 'import' && body.data) {
      const { siteContent, blogPosts, media } = body.data;
      if (siteContent) saveSiteContent(siteContent);
      if (Array.isArray(blogPosts)) saveBlogPosts(blogPosts);
      if (Array.isArray(media)) saveMediaLibrary(media);

      // If GitHub sync is on, commit imported state too
      if (isGitHubSyncConfigured()) {
        await syncAllDataToGitHub('cms(restore): restored data bundle from backup');
      }

      return NextResponse.json({
        success: true,
        message: 'Đã khôi phục dữ liệu từ bản sao lưu thành công!'
      });
    }

    // 2. Action: Manual Sync to GitHub
    if (!isGitHubSyncConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Chưa cấu hình GITHUB_TOKEN trên Vercel/Environment. Vui lòng thêm biến môi trường GITHUB_TOKEN để tự động đẩy commit lên GitHub.'
        },
        { status: 400 }
      );
    }

    const syncResult = await syncAllDataToGitHub(body.message);
    return NextResponse.json({
      success: syncResult.success,
      results: syncResult.results,
      error: syncResult.error,
      message: syncResult.success
        ? 'Đã đồng bộ toàn bộ dữ liệu thành công lên GitHub Source Code!'
        : 'Có lỗi trong quá trình đồng bộ một số file lên GitHub.'
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Lỗi xử lý yêu cầu đồng bộ'
      },
      { status: 500 }
    );
  }
}
