import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getMediaLibrary, saveMediaLibrary } from '@/lib/storage';
import { verifyAdminSession } from '@/lib/auth';
import { commitFileToGitHub, isGitHubSyncConfigured } from '@/lib/github-sync';

export const dynamic = 'force-dynamic';

export async function GET() {
  const media = getMediaLibrary();
  return NextResponse.json(media);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const altText = (formData.get('altText') as string) || '';
    const category = (formData.get('category') as string) || 'Asset';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${Date.now()}-${sanitizedName}`;
    const filePath = path.join(uploadsDir, fileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
      fs.writeFileSync(filePath, buffer);
    } catch (e) {
      console.warn('Could not write directly to local disk (likely serverless):', e);
    }

    const mediaItem = {
      id: `med-${Date.now()}`,
      fileName,
      url: `/uploads/${fileName}`,
      path: `public/uploads/${fileName}`,
      fileSize: buffer.length,
      mimeType: file.type || 'image/png',
      altText: altText || file.name.replace(/\.[^/.]+$/, ''),
      category: category || 'Asset',
      uploadedAt: new Date().toISOString().split('T')[0]
    };

    const mediaList = getMediaLibrary();
    mediaList.unshift(mediaItem);
    saveMediaLibrary(mediaList);

    // Auto commit uploaded image & media list to GitHub
    if (isGitHubSyncConfigured()) {
      try {
        await commitFileToGitHub({
          filePath: `public/uploads/${fileName}`,
          content: buffer,
          commitMessage: `cms(media): upload image "${fileName}"`,
          isBase64: true
        });
        await commitFileToGitHub({
          filePath: 'data/media.json',
          content: JSON.stringify(mediaList, null, 2),
          commitMessage: `cms(media): update media library index`
        });
      } catch (gitErr) {
        console.warn('[GitHub Sync] Could not auto-commit uploaded media:', gitErr);
      }
    }

    return NextResponse.json(mediaItem);
  } catch (err) {
    console.error('Media upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isAuth = verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  const mediaList = getMediaLibrary();
  const item = mediaList.find((m) => m.id === id);
  if (item && item.url) {
    const fullPath = path.join(process.cwd(), 'public', item.url.replace(/^\//, ''));
    if (fs.existsSync(fullPath)) {
      try {
        fs.unlinkSync(fullPath);
      } catch (e) {}
    }
  }

  const updated = mediaList.filter((m) => m.id !== id);
  saveMediaLibrary(updated);

  if (isGitHubSyncConfigured()) {
    try {
      await commitFileToGitHub({
        filePath: 'data/media.json',
        content: JSON.stringify(updated, null, 2),
        commitMessage: `cms(media): remove image "${item?.fileName || id}"`
      });
    } catch (gitErr) {
      console.warn('[GitHub Sync] Could not auto-commit media delete:', gitErr);
    }
  }

  return NextResponse.json({ success: true });
}
