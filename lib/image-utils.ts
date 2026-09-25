/**
 * Optimizes image URLs for minimal bandwidth consumption and responsive loading.
 * Automatically injects dimension and format parameters for external CDNs (like Unsplash).
 */
export function getOptimizedImageUrl(
  url?: string | null,
  options: {
    width?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'auto';
    fallback?: string;
  } = {}
): string {
  const fallback = options.fallback || '/uploads/hero_slide_1.png';
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return fallback;
  }

  const cleanUrl = url.trim();

  // 1. Optimize Unsplash URLs
  if (cleanUrl.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(cleanUrl);
      const width = options.width || 800;
      const quality = options.quality || 75;
      const format = options.format || 'auto';

      urlObj.searchParams.set('w', width.toString());
      urlObj.searchParams.set('q', quality.toString());
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('fit', 'crop');
      if (format !== 'auto') {
        urlObj.searchParams.set('fm', format);
      }

      return urlObj.toString();
    } catch {
      return cleanUrl;
    }
  }

  // 2. Local uploads or standard URLs
  return cleanUrl;
}
