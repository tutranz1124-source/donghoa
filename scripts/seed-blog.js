const fs = require('fs');
const path = require('path');

const adminPath = path.join(process.cwd(), 'app/admin/blog/page.tsx');
const adminFile = fs.readFileSync(adminPath, 'utf8');

const marker = 'const BLOG_TEMPLATES: BlogTemplate[] = [';
const startIdx = adminFile.indexOf(marker);
if (startIdx === -1) {
  console.error('Could not find marker in admin file');
  process.exit(1);
}

let block = adminFile.substring(startIdx + marker.length - 1);
const endIdx = block.indexOf(';\n\nfunction parseMarkdownToBlocks');
if (endIdx !== -1) {
  block = block.substring(0, endIdx);
} else {
  block = block.substring(0, block.indexOf('\n];') + 3);
}

block = block.replace(/icon:\s*([A-Za-z0-9_]+),/g, 'icon: "$1",');
const templates = eval(block);

console.log('Successfully extracted ' + templates.length + ' templates');

const authors = [
  { author: 'KTS. Lê Đông Hòa', authorRole: 'Giám đốc Thiết kế' },
  { author: 'KTS. Trần Minh Khoa', authorRole: 'Chỉ huy trưởng công trình' },
  { author: 'KTS. Nguyễn Hải Yến', authorRole: 'Chuyên gia Không gian Thương mại' },
  { author: 'KTS. Lê Đông Hòa', authorRole: 'Giám đốc Thiết kế' },
  { author: 'KTS. Vũ Tuấn Anh', authorRole: 'Kiến trúc sư Trưởng' }
];

const dates = ['2026-03-01', '2026-02-24', '2026-02-18', '2026-02-10', '2026-01-28'];

function slugify(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const posts = templates.map((tpl, i) => {
  const auth = authors[i] || authors[0];
  const date = dates[i] || '2026-02-01';
  return {
    id: tpl.id.replace('tpl-', 'post-'),
    title: tpl.defaultTitle,
    slug: slugify(tpl.defaultTitle),
    excerpt: tpl.defaultExcerpt,
    content: tpl.content,
    featuredImage: tpl.defaultImage,
    thumbnailImage: tpl.defaultImage,
    author: auth.author,
    authorRole: auth.authorRole,
    category: tpl.category,
    tags: tpl.defaultTags,
    status: 'published',
    publishedAt: date,
    readingTime: tpl.readingTime,
    featured: i === 0,
    seoTitle: tpl.defaultTitle + ' | Đông Hòa Design',
    seoDescription: tpl.defaultExcerpt
  };
});

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

fs.writeFileSync(path.join(dataDir, 'blog-posts.json'), JSON.stringify(posts, null, 2), 'utf8');
console.log('Successfully wrote data/blog-posts.json with ' + posts.length + ' posts');

const tsCode = 'import { BlogPost } from "./types";\n\nexport const DEFAULT_BLOG_POSTS: BlogPost[] = ' + JSON.stringify(posts, null, 2) + ';\n';
fs.writeFileSync(path.join(process.cwd(), 'lib/default-blog-posts.ts'), tsCode, 'utf8');
console.log('Successfully wrote lib/default-blog-posts.ts');