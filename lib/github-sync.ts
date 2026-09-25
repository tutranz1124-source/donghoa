import { getSiteContent, getBlogPosts, getMediaLibrary } from './storage';

export interface GitHubSyncConfig {
  token?: string;
  repo: string;
  branch: string;
}

export function getGitHubConfig(): GitHubSyncConfig {
  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT;
  const repo = process.env.GITHUB_REPO || 'tutranz1124-source/donghoa';
  const branch = process.env.GITHUB_BRANCH || 'main';
  return { token, repo, branch };
}

export function isGitHubSyncConfigured(): boolean {
  const { token } = getGitHubConfig();
  return Boolean(token && token.trim().length > 0);
}

/**
 * Commits a single file directly to GitHub repository via REST API
 */
export async function commitFileToGitHub({
  filePath,
  content,
  commitMessage,
  isBase64 = false
}: {
  filePath: string;
  content: string | Buffer;
  commitMessage: string;
  isBase64?: boolean;
}): Promise<{ success: boolean; error?: string; sha?: string }> {
  const { token, repo, branch } = getGitHubConfig();

  if (!token) {
    return {
      success: false,
      error: 'GITHUB_TOKEN is not configured in environment variables.'
    };
  }

  const [owner, repoName] = repo.split('/');
  if (!owner || !repoName) {
    return {
      success: false,
      error: `Invalid GITHUB_REPO format "${repo}". Expected "owner/repo".`
    };
  }

  const cleanPath = filePath.replace(/^[/\\]+/, '').replace(/\\/g, '/');
  const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/contents/${cleanPath}`;

  try {
    // 1. Check existing file to retrieve current SHA
    let existingSha: string | undefined;
    try {
      const getRes = await fetch(`${apiUrl}?ref=${branch}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'DongHoaProperty-CMS'
        },
        cache: 'no-store'
      });

      if (getRes.ok) {
        const fileInfo = await getRes.json();
        existingSha = fileInfo.sha;
      }
    } catch (fetchErr) {
      console.warn(`[GitHub Sync] Could not fetch existing SHA for ${cleanPath}:`, fetchErr);
    }

    // 2. Prepare Base64 payload
    let base64Content: string;
    if (isBase64 && typeof content === 'string') {
      base64Content = content;
    } else if (Buffer.isBuffer(content)) {
      base64Content = content.toString('base64');
    } else {
      base64Content = Buffer.from(content, 'utf8').toString('base64');
    }

    // 3. Send PUT request to create or update file
    const body: Record<string, any> = {
      message: commitMessage,
      content: base64Content,
      branch
    };

    if (existingSha) {
      body.sha = existingSha;
    }

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'DongHoaProperty-CMS'
      },
      body: JSON.stringify(body)
    });

    if (!putRes.ok) {
      const errJson = await putRes.json().catch(() => ({}));
      const msg = errJson.message || `HTTP ${putRes.status}: ${putRes.statusText}`;
      console.error(`[GitHub Sync] Commit failed for ${cleanPath}:`, msg);
      return { success: false, error: msg };
    }

    const resJson = await putRes.json();
    return {
      success: true,
      sha: resJson.content?.sha || resJson.commit?.sha
    };
  } catch (err: any) {
    console.error(`[GitHub Sync] Network error on ${cleanPath}:`, err);
    return { success: false, error: err?.message || 'Unknown network error' };
  }
}

/**
 * Syncs the entire current state (site content, blog posts, projects, media index) to GitHub
 */
export async function syncAllDataToGitHub(
  customMessage?: string
): Promise<{ success: boolean; results: Record<string, any>; error?: string }> {
  const { token, repo, branch } = getGitHubConfig();

  if (!token) {
    return {
      success: false,
      results: {},
      error: 'GITHUB_TOKEN is not configured. Please set GITHUB_TOKEN in your environment variables.'
    };
  }

  const results: Record<string, any> = {};
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const msgPrefix = customMessage || `cms(sync): auto-sync data to source code [${timestamp}]`;

  // 1. Sync Site Content
  try {
    const siteContent = getSiteContent();
    const res = await commitFileToGitHub({
      filePath: 'data/site-content.json',
      content: JSON.stringify(siteContent, null, 2),
      commitMessage: `${msgPrefix} - site content`
    });
    results['data/site-content.json'] = res;
  } catch (e: any) {
    results['data/site-content.json'] = { success: false, error: e.message };
  }

  // 2. Sync Blog Posts
  try {
    const blogPosts = getBlogPosts();
    const res = await commitFileToGitHub({
      filePath: 'data/blog-posts.json',
      content: JSON.stringify(blogPosts, null, 2),
      commitMessage: `${msgPrefix} - blog posts`
    });
    results['data/blog-posts.json'] = res;
  } catch (e: any) {
    results['data/blog-posts.json'] = { success: false, error: e.message };
  }

  // 3. Sync Media index
  try {
    const media = getMediaLibrary();
    const res = await commitFileToGitHub({
      filePath: 'data/media.json',
      content: JSON.stringify(media, null, 2),
      commitMessage: `${msgPrefix} - media index`
    });
    results['data/media.json'] = res;
  } catch (e: any) {
    results['data/media.json'] = { success: false, error: e.message };
  }

  const allSuccess = Object.values(results).every((r) => r.success);
  return {
    success: allSuccess,
    results
  };
}

/**
 * Creates a complete JSON bundle snapshot of all data for offline export & backup
 */
export function exportDataBundle() {
  const siteContent = getSiteContent();
  return {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    siteContent,
    blogPosts: getBlogPosts(),
    projects: siteContent?.projects,
    media: getMediaLibrary()
  };
}
