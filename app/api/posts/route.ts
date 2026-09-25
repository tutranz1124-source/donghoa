import { NextResponse } from 'next/server';
import { getBlogPosts, saveBlogPosts, getBlogPostBySlug } from '@/lib/storage';
import { verifyEditorSession } from '@/lib/auth';
import { commitFileToGitHub, isGitHubSyncConfigured } from '@/lib/github-sync';

export const dynamic = 'force-dynamic';

async function autoCommitBlogPosts(action: string, postTitle?: string) {
  if (!isGitHubSyncConfigured()) return;
  try {
    const posts = getBlogPosts();
    await commitFileToGitHub({
      filePath: 'data/blog-posts.json',
      content: JSON.stringify(posts, null, 2),
      commitMessage: `cms(blog): ${action} ${postTitle ? `"${postTitle}"` : ''} [${new Date().toISOString().substring(0, 16)}]`
    });
  } catch (err) {
    console.warn('[GitHub Sync] Could not auto-commit blog posts:', err);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const status = searchParams.get('status');

  if (slug) {
    const post = getBlogPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  }

  let posts = getBlogPosts();
  if (status) {
    posts = posts.filter(p => p.status === status);
  }
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const isAuth = verifyEditorSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const newPost = await request.json();
    const posts = getBlogPosts();
    posts.unshift(newPost);
    saveBlogPosts(posts);
    await autoCommitBlogPosts('create post', newPost.title);
    return NextResponse.json(newPost);
  } catch {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isAuth = verifyEditorSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const updatedPost = await request.json();
    const posts = getBlogPosts();
    const idx = posts.findIndex(p => p.id === updatedPost.id);
    if (idx !== -1) {
      posts[idx] = updatedPost;
      saveBlogPosts(posts);
      await autoCommitBlogPosts('update post', updatedPost.title);
      return NextResponse.json(updatedPost);
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isAuth = verifyEditorSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  const posts = getBlogPosts();
  const target = posts.find(p => p.id === id);
  const filtered = posts.filter(p => p.id !== id);
  saveBlogPosts(filtered);
  await autoCommitBlogPosts('delete post', target?.title || id);
  return NextResponse.json({ success: true });
}
