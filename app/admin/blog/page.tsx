'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  CheckCircle,
  Clock,
  X,
  Eye,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Bold,
  Italic,
  Quote,
  List,
  ListOrdered,
  Sparkles,
  ExternalLink,
  Save,
  Tag,
  Star,
  LayoutTemplate,
  Home,
  Hammer,
  Building2,
  Layers,
  Award,
  Check,
  Columns,
  Maximize2,
  Minimize2,
  Smartphone,
  Tablet,
  Monitor,
  Table,
  HelpCircle,
  PhoneCall,
  Lightbulb,
  FileText,
  UploadCloud,
  MousePointerClick,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Sliders,
  Type,
  Minus,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Settings,
  ListTree,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  Calculator
} from 'lucide-react';
import { BlogPost, MediaItem } from '@/lib/types';

interface VisualBlock {
  id: string;
  type: 'heading2' | 'heading3' | 'paragraph' | 'quote' | 'callout' | 'image' | 'table' | 'cta' | 'divider';
  content: string;
  subContent?: string;
  imageUrl?: string;
}

interface BlogTemplate {
  id: string;
  name: string;
  badge: string;
  icon: any;
  category: string;
  description: string;
  defaultTitle: string;
  defaultExcerpt: string;
  defaultImage: string;
  defaultTags: string[];
  readingTime: string;
  content: string;
}

const BLOG_TEMPLATES: BlogTemplate[] = [
  {
    id: 'tpl-market-analysis',
    name: 'Phân Tích & Dự Báo Thị Trường BĐS',
    badge: 'Thị trường',
    icon: Building2,
    category: 'Phân Tích Thị Trường',
    description: 'Mẫu phân tích chuyên sâu diễn biến cung cầu, mặt bằng giá bán và tiềm năng sinh lời của các khu vực trọng điểm.',
    defaultTitle: 'Xu Hướng Bất Động Sản Ven Sông & Không Gian Sống Xanh 2026',
    defaultExcerpt: 'Đánh giá tiềm năng gia tăng giá trị của các dự án ven sông tại TP. Hồ Chí Minh và khu đô thị vệ tinh trong chu kỳ mới.',
    defaultImage: '/uploads/the-gio-riverside.png',
    defaultTags: ['Thị trường 2026', 'Ven sông', 'Quy hoạch', 'Đông Hòa Property'],
    readingTime: '5 phút đọc',
    content: `## 1. Bức Tranh Toàn Cảnh Thị Trường Bất Động Sản

Chu kỳ mới của thị trường bất động sản ghi nhận sự chuyển dịch mạnh mẽ hướng tới các sản phẩm sở hữu **giá trị thực**, pháp lý hoàn thiện và không gian sống sinh thái ven sông.

> "Bất động sản ven sông luôn duy trì mức thặng dư giá trị từ 15% - 30% so với khu vực lân cận nhờ cảnh quan độc bản và vi khí hậu trong lành." — *Đông Hòa Research*

---

## 2. Các Động Lực Tăng Trưởng Trọng Tâm

- **Hạ tầng giao thông liên kết vùng:** Các tuyến vành đai và cầu kết nối rút ngắn thời gian di chuyển về trung tâm.
- **Tiêu chuẩn sống xanh & sức khỏe:** Người mua nhà ngày càng ưu tiên mật độ cây xanh, mặt nước và hệ tiện ích chăm sóc sức khỏe.
- **Sự chọn lọc của dòng tiền:** Nhà đầu tư tập trung vào các chủ đầu tư uy tín có tiềm lực tài chính vững mạnh.

---

## 3. Khuyến Nghị Chiến Lược Đầu Tư

1. **Khảo sát kỹ quy hoạch 1/500 và tiến độ thi công thực tế.**
2. **Cân đối tỷ lệ đòn bẩy tài chính an toàn dưới 50% giá trị tài sản.**
3. **Ưu tiên các dự án có đơn vị quản lý vận hành chuẩn quốc tế để tối ưu giá trị cho thuê.**`
  },
  {
    id: 'tpl-legal-guide',
    name: 'Cẩm Nang Pháp Lý & Thẩm Định Dự Án',
    badge: 'Pháp lý',
    icon: ShieldCheck,
    category: 'Cẩm Nang Pháp Lý',
    description: 'Hướng dẫn các bước rà soát pháp lý dự án, giấy phép xây dựng, điều kiện bán hàng và bảo lãnh ngân hàng.',
    defaultTitle: 'Những Lưu Ý Pháp Lý Then Chốt Khi Mua Căn Hộ Hình Thành Trong Tương Lai',
    defaultExcerpt: 'Rà soát giấy phép xây dựng, điều kiện bán hàng và cam kết bảo lãnh ngân hàng giúp người mua đảm bảo an toàn quyền lợi.',
    defaultImage: '/uploads/vinhomes-can-gio.png',
    defaultTags: ['Pháp lý', 'Căn hộ', 'Thủ tục', 'Đông Hòa Property'],
    readingTime: '6 phút đọc',
    content: `## 1. Tầm Quan Trọng Của Việc Thẩm Định Pháp Lý

Trong các giao dịch bất động sản hình thành trong tương lai, việc nắm rõ hồ sơ pháp lý giúp người mua phòng tránh tối đa các rủi ro chậm tiến độ hoặc vướng mắc thủ tục cấp sổ hồng.

> Cam kết của Đông Hòa Property: **100% dự án được phân phối đều trải qua quy trình thẩm định độc lập nghiêm ngặt trước khi giới thiệu đến khách hàng.**

---

## 2. Bộ Hồ Sơ Pháp Lý Chuẩn Cần Kiểm Tra

1. **Quyết định phê duyệt quy hoạch chi tiết 1/500.**
2. **Giấy phép xây dựng được cấp bởi cơ quan có thẩm quyền.**
3. **Văn bản thông báo đủ điều kiện bán nhà ở hình thành trong tương lai của Sở Xây Dựng.**
4. **Chứng thư bảo lãnh nghĩa vụ tài chính từ ngân hàng thương mại.**

---

## 3. Lời Khuyên Từ Chuyên Viên Pháp Lý

Khách hàng nên đọc kỹ các điều khoản về tiến độ thanh toán, thời hạn bàn giao dự kiến và mức phạt vi phạm hợp đồng trước khi đặt cọc.`
  },
  {
    id: 'tpl-financial-planning',
    name: 'Hoạch Định Tài Chính & Dòng Tiền Vay',
    badge: 'Tài chính',
    icon: Calculator,
    category: 'Chiến Lược Đầu Tư',
    description: 'Cách tính toán dòng tiền trả góp, cân đối vốn tự có và tận dụng các gói ân hạn nợ gốc từ ngân hàng.',
    defaultTitle: 'Kinh Nghiệm Hoạch Định Tài Chính Khi Đầu Tư Nhà Phố & Shophouse',
    defaultExcerpt: 'Cách tính toán tỷ suất sinh lời cho thuê thực tế và cân đối tỷ lệ đòn bẩy vay vốn an toàn.',
    defaultImage: '/uploads/lusso-saigon.png',
    defaultTags: ['Đầu tư', 'Tài chính', 'Shophouse', 'Đông Hòa Property'],
    readingTime: '4 phút đọc',
    content: `## 1. Nguyên Tắc Cân Đối Dòng Tiền An Toàn

Đầu tư bất động sản thương mại đòi hỏi nhà đầu tư phải tính toán kỹ lưỡng giữa dòng tiền trả nợ ngân hàng và nguồn thu từ khai thác cho thuê.

---

## 2. Công Thức Dự Toán Tỷ Suất Sinh Lời

- **Tỷ suất cho thuê ròng (Net Rental Yield):** (Tổng tiền thuê hàng năm - Chi phí vận hành) / Tổng giá trị đầu tư.
- **Tỷ lệ thanh toán an toàn:** Dòng tiền trả góp hàng tháng không nên vượt quá 40% tổng thu nhập khả dụng của gia đình.`
  },
  {
    id: 'tpl-penthouse-lifestyle',
    name: 'Không Gian Sống Đẳng Cấp & Penthouse',
    badge: 'Phong cách sống',
    icon: Award,
    category: 'Phong Cách Sống',
    description: 'Mẫu bài viết phân tích tiêu chuẩn sống thượng lưu, không gian penthouse và căn hộ hạng sang có tầm nhìn độc bản.',
    defaultTitle: 'Tiêu Chuẩn Không Gian Sống Thượng Lưu Tại Các Căn Hộ Penthouse & Sky Villa',
    defaultExcerpt: 'Khám phá các tiêu chuẩn kiến trúc, tiện ích đặc quyền và giá trị sưu tầm của dòng bất động sản Sky Villa tại trung tâm đô thị.',
    defaultImage: '/uploads/the-gio-riverside.png',
    defaultTags: ['Penthouse', 'Sky Villa', 'Bất động sản hạng sang', 'Đông Hòa Property'],
    readingTime: '5 phút đọc',
    content: `## 1. Định Nghĩa Không Gian Sống Độc Bản

Penthouse và Sky Villa không đơn thuần là một bất động sản giá trị cao mà là biểu tượng khẳng định vị thế và phong cách sống của chủ nhân.

---

## 2. 3 Yếu Tố Tạo Nên Giá Trị Sưu Tầm

1. **Tầm nhìn không giới hạn (Panoramic River View):** Ôm trọn cảnh quan thành phố và sông nước thoáng đãng.
2. **Tiện ích và dịch vụ đặc quyền riêng tư:** Sảnh thang máy riêng, bãi đỗ xe định danh và hồ bơi vô cực trên cao.
3. **Diện tích lớn linh hoạt may đo không gian:** Cho phép gia chủ tự do thiết kế phòng tranh, hầm rượu hoặc thư viện riêng.`
  }
];

function parseMarkdownToBlocks(markdown: string): VisualBlock[] {
  if (!markdown) {
    return [
      { id: `block-${Date.now()}-1`, type: 'heading2', content: '1. Triết lý thiết kế không gian' },
      { id: `block-${Date.now()}-2`, type: 'paragraph', content: 'Nhập nội dung chi tiết cho bài viết của bạn tại đây...' }
    ];
  }

  const rawParagraphs = markdown.split(/\n\n+/);
  const blocks: VisualBlock[] = [];

  rawParagraphs.forEach((p, idx) => {
    const trimmed = p.trim();
    if (!trimmed) return;

    const id = `block-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`;

    if (trimmed.startsWith('### ')) {
      blocks.push({ id, type: 'heading3', content: trimmed.replace('### ', '') });
    } else if (trimmed.startsWith('## ')) {
      blocks.push({ id, type: 'heading2', content: trimmed.replace('## ', '') });
    } else if (trimmed.startsWith('> 💡') || trimmed.startsWith('> ⚠️') || trimmed.startsWith('> 📌')) {
      blocks.push({ id, type: 'callout', content: trimmed.replace(/^>\s*/gm, '') });
    } else if (trimmed.startsWith('> 📞')) {
      blocks.push({ id, type: 'cta', content: trimmed.replace(/^>\s*/gm, '') });
    } else if (trimmed.startsWith('> ')) {
      blocks.push({ id, type: 'quote', content: trimmed.replace(/^>\s*/gm, '') });
    } else if (trimmed.startsWith('---')) {
      blocks.push({ id, type: 'divider', content: '' });
    } else if (trimmed.startsWith('|') && trimmed.includes('---')) {
      blocks.push({ id, type: 'table', content: trimmed });
    } else if (trimmed.startsWith('![') && trimmed.includes('](')) {
      const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) {
        blocks.push({ id, type: 'image', content: match[1] || '', imageUrl: match[2] || '' });
      } else {
        blocks.push({ id, type: 'paragraph', content: trimmed });
      }
    } else {
      blocks.push({ id, type: 'paragraph', content: trimmed });
    }
  });

  return blocks.length > 0 ? blocks : [
    { id: `block-${Date.now()}-1`, type: 'heading2', content: '1. Triết lý thiết kế không gian' },
    { id: `block-${Date.now()}-2`, type: 'paragraph', content: 'Nhập nội dung chi tiết cho bài viết của bạn tại đây...' }
  ];
}

function serializeBlocksToMarkdown(blocks: VisualBlock[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case 'heading2':
          return `## ${b.content}`;
        case 'heading3':
          return `### ${b.content}`;
        case 'quote':
          return `> ${b.content}`;
        case 'callout':
          return b.content.startsWith('💡') ? `> ${b.content}` : `> 💡 **Điểm cần lưu ý:**\n> ${b.content}`;
        case 'cta':
          return `> ${b.content}`;
        case 'image':
          return `![${b.content || 'Hình ảnh dự án'}](${b.imageUrl || '/uploads/figma_styles_grid.png'})`;
        case 'divider':
          return `---`;
        case 'table':
          return b.content;
        case 'paragraph':
        default:
          return b.content;
      }
    })
    .join('\n\n');
}

export default function AdminBlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [templatePickerOpen, setTemplatePickerOpen] = useState(false);

  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    const res = await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const handleSavePost = async (post: BlogPost) => {
    const isEdit = posts.some((p) => p.id === post.id);
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch('/api/posts', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    });
    if (res.ok) {
      const saved = await res.json();
      if (isEdit) {
        setPosts(posts.map((p) => (p.id === saved.id ? saved : p)));
      } else {
        setPosts([saved, ...posts]);
      }
      setModalOpen(false);
      setEditingPost(null);
    }
  };

  const startWithTemplate = (tpl: BlogTemplate) => {
    const slug = tpl.defaultTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setEditingPost({
      id: `post-${Date.now()}`,
      title: tpl.defaultTitle,
      slug,
      excerpt: tpl.defaultExcerpt,
      content: tpl.content,
      featuredImage: tpl.defaultImage,
      thumbnailImage: tpl.defaultImage,
      author: 'KTS. Lê Đông Hòa',
      authorRole: 'Giám đốc Thiết kế',
      category: tpl.category,
      tags: tpl.defaultTags,
      status: 'published',
      publishedAt: new Date().toISOString().split('T')[0],
      readingTime: tpl.readingTime,
      featured: false,
      seoTitle: tpl.defaultTitle,
      seoDescription: tpl.defaultExcerpt
    });
    setTemplatePickerOpen(false);
    setModalOpen(true);
  };

  const filtered = posts.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-4 sm:space-y-5 max-w-[1440px] mx-auto pb-8 text-[12.5px]">
      {/* Top Banner & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#e2ddd3] bg-white p-4 sm:p-5 shadow-2xs rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10.5px] font-bold text-[#c5a26c] bg-[#04092b] px-2.5 py-0.5 rounded font-accent uppercase tracking-wider">
              QUẢN LÝ BLOG
            </span>
          </div>
          <h1 className="text-[18px] sm:text-[20px] font-bold text-[#04092b] font-display">
            Bài Viết Đông Hòa Design
          </h1>
          <p className="text-[12px] text-[#6e706a] mt-0.5">
            Soạn thảo bài viết theo phong cách Studio 3 cột trực quan, hỗ trợ xem trước trên mọi thiết bị.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/blog"
            target="_blank"
            className="border border-[#e2ddd3] text-[#04092b] bg-[#faf8f5] hover:bg-white hover:border-[#04092b] px-3.5 py-2 text-[12px] font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#c5a26c]" /> Xem Blog Live
          </Link>

          <button
            onClick={() => setTemplatePickerOpen(true)}
            className="bg-[#faf8f5] hover:bg-white border border-[#e2ddd3] hover:border-[#c5a26c] text-[#04092b] px-3.5 py-2 text-[12px] font-medium transition-all flex items-center justify-center gap-1.5 rounded-xl group"
          >
            <LayoutTemplate className="w-3.5 h-3.5 text-[#c5a26c] transition-transform group-hover:rotate-12" />
            <span>Mẫu Bài Viết</span>
          </button>

          <button
            onClick={() => {
              setEditingPost({
                id: `post-${Date.now()}`,
                title: '',
                slug: '',
                excerpt: '',
                content: '',
                featuredImage: '/uploads/the-gio-riverside.png',
                thumbnailImage: '/uploads/the-gio-riverside.png',
                author: 'Đông Hòa Research',
                authorRole: 'Ban Phân Tích Thị Trường',
                category: 'Phân Tích Thị Trường',
                tags: ['Bất động sản', 'Thị trường 2026', 'Đông Hòa Property'],
                status: 'published',
                publishedAt: new Date().toISOString().split('T')[0],
                readingTime: '5 phút đọc',
                featured: false,
                seoTitle: '',
                seoDescription: ''
              });
              setModalOpen(true);
            }}
            className="bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] px-4 py-2 text-[12.5px] font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm rounded-xl"
          >
            <Plus className="w-4 h-4" /> Viết bài mới
          </button>
        </div>
      </div>

      {/* TEMPLATE PICKER MODAL */}
      {templatePickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#c5a26c] overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
            <div className="p-4 sm:p-6 border-b border-[#e2ddd3] bg-[#f4f1ea] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#04092b] text-[#c5a26c] flex items-center justify-center shrink-0">
                  <LayoutTemplate className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h2 className="text-[16px] sm:text-[18px] font-bold text-[#04092b]">Chọn Mẫu Bài Viết</h2>
                  <p className="text-[11px] sm:text-[12px] text-[#6e706a] line-clamp-1 sm:line-clamp-none">
                    Bố cục bài viết chuyên nghiệp được chuẩn hóa cấu trúc nội dung
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTemplatePickerOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#e2ddd3] hover:bg-[#04092b] hover:text-white flex items-center justify-center text-[13px] font-bold shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 flex-1">
              {BLOG_TEMPLATES.map((tpl) => {
                const Icon = tpl.icon;
                return (
                  <div
                    key={tpl.id}
                    className="border border-[#e2ddd3] hover:border-[#c5a26c] rounded-2xl p-5 bg-white hover:bg-[#faf8f5] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    onClick={() => startWithTemplate(tpl)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-[#04092b]/5 group-hover:bg-[#04092b] text-[#04092b] group-hover:text-[#c5a26c] flex items-center justify-center transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#f4f1ea] text-[#04092b] border border-[#e2ddd3]">
                          {tpl.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-bold text-[15px] text-[#04092b] group-hover:text-[#b08d55] transition-colors">
                          {tpl.name}
                        </h3>
                        <p className="text-[12px] text-[#6e706a] mt-1 leading-relaxed">
                          {tpl.description}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#f4f1ea]/70 border border-[#e2ddd3]/60 text-[11.5px] text-[#04092b] space-y-1">
                        <p className="font-semibold line-clamp-1">💡 {tpl.defaultTitle}</p>
                        <p className="text-[#6e706a] text-[11px]">⏳ Thời lượng: {tpl.readingTime}</p>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-[#e2ddd3]/60 flex items-center justify-between">
                      <span className="text-[11.5px] font-medium text-[#c5a26c]">
                        Chuyên mục: {tpl.category}
                      </span>
                      <button
                        type="button"
                        className="px-4 py-1.5 bg-[#04092b] group-hover:bg-[#c5a26c] text-white group-hover:text-[#04092b] text-[12px] font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <span>Sử dụng mẫu này</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search */}
      <div className="bg-white p-4 border border-[#e2ddd3] shadow-sm rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm bài viết theo tiêu đề, danh mục, tác giả..."
            className="w-full text-[13px] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-[12px] text-[#6e706a] font-bold">Chuyên mục:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border border-[#e2ddd3] rounded-xl text-[12.5px] bg-white focus:outline-none focus:border-[#c5a26c] font-medium"
          >
            <option value="all">Tất cả chuyên mục</option>
            <option value="Phong cách thiết kế">Phong cách thiết kế</option>
            <option value="Kinh nghiệm thi công">Kinh nghiệm thi công</option>
            <option value="Không gian làm việc">Không gian làm việc</option>
            <option value="Vật liệu & Sản xuất">Vật liệu & Sản xuất</option>
          </select>
        </div>
      </div>

      {/* Posts Table (Desktop) & Card List (Mobile) */}
      <div className="bg-white border border-[#e2ddd3] shadow-sm rounded-2xl overflow-hidden">
        {/* Mobile Card List (< md) */}
        <div className="md:hidden divide-y divide-[#e2ddd3]">
          {filtered.map((post) => (
            <div key={post.id} className="p-4 space-y-3">
              <div className="flex gap-3">
                <div className="relative h-20 w-24 shrink-0 bg-[#04092b] overflow-hidden rounded-xl border border-[#e2ddd3]">
                  <Image
                    src={post.featuredImage || '/uploads/figma_styles_grid.png'}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f4f1ea] text-[#c5a26c] border border-[#e2ddd3]">
                      {post.category}
                    </span>
                    <span
                      className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.status === 'published' ? 'Live' : 'Nháp'}
                    </span>
                    {post.featured && (
                      <span className="inline-flex items-center gap-0.5 bg-[#04092b] text-[#c5a26c] text-[9.5px] font-bold px-1.5 py-0.5 rounded">
                        <Star className="w-2.5 h-2.5 fill-current" /> Tiêu điểm
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-[13.5px] text-[#04092b] line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-[#6e706a] mt-1 font-mono">
                    <span>{post.publishedAt}</span>
                    <span className="truncate max-w-[120px]">✍️ {post.author}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#f4f1ea]">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="px-2.5 py-1.5 text-[11.5px] font-semibold text-[#04092b] bg-[#f4f1ea] hover:bg-[#e2ddd3] rounded-lg transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Xem
                </Link>
                <button
                  onClick={() => {
                    setEditingPost(post);
                    setModalOpen(true);
                  }}
                  className="px-3 py-1.5 text-[11.5px] font-bold text-white bg-[#04092b] hover:bg-[#c5a26c] hover:text-[#04092b] rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <Edit className="w-3.5 h-3.5" /> Sửa bài
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  title="Xóa bài viết"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table (>= md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead className="bg-[#04092b] text-white text-[11.5px] uppercase font-bold tracking-wider">
              <tr>
                <th className="p-4">Hình ảnh</th>
                <th className="p-4">Tiêu đề bài viết</th>
                <th className="p-4">Chuyên mục</th>
                <th className="p-4">Tác giả</th>
                <th className="p-4">Tiêu điểm</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4">Ngày đăng</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2ddd3]">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-[#faf8f5] transition-colors">
                  <td className="p-4 w-24">
                    <div className="relative h-14 w-20 bg-[#04092b] overflow-hidden rounded-lg border border-[#e2ddd3]">
                      <Image
                        src={post.featuredImage || '/uploads/figma_styles_grid.png'}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-[#04092b] max-w-sm">
                    <span className="line-clamp-2 font-bold text-[14px]">{post.title}</span>
                    <span className="text-[11px] text-gray-400 block font-mono mt-0.5">slug: /{post.slug}</span>
                  </td>
                  <td className="p-4 text-[#c5a26c] font-bold whitespace-nowrap">{post.category}</td>
                  <td className="p-4 text-[#6e706a] whitespace-nowrap">
                    <div className="font-semibold text-[#04092b]">{post.author}</div>
                    {post.authorRole && <div className="text-[11px] text-gray-400">{post.authorRole}</div>}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {post.featured ? (
                      <span className="inline-flex items-center gap-1 bg-[#04092b] text-[#c5a26c] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        <Star className="w-3 h-3 fill-current" /> Tiêu điểm
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[12px]">-</span>
                    )}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                    </span>
                  </td>
                  <td className="p-4 text-[#6e706a] whitespace-nowrap font-mono text-[12px]">{post.publishedAt}</td>
                  <td className="p-4 text-right space-x-2 whitespace-nowrap">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="inline-block p-1.5 text-gray-500 hover:text-[#04092b] hover:bg-gray-100 rounded-lg transition-colors"
                      title="Xem trước bài viết live"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setModalOpen(true);
                      }}
                      className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Mở Studio Soạn Thảo (2-Sidebar)"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa bài viết"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL-SCREEN 2-SIDEBAR BLOG STUDIO */}
      {modalOpen && editingPost && (
        <BlogStudioModal
          post={editingPost}
          onClose={() => {
            setModalOpen(false);
            setEditingPost(null);
          }}
          onSave={handleSavePost}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// FULL-SCREEN 2-SIDEBAR BLOG STUDIO MODAL
// -------------------------------------------------------------
function BlogStudioModal({
  post,
  onClose,
  onSave
}: {
  post: BlogPost;
  onClose: () => void;
  onSave: (post: BlogPost) => void;
}) {
  const [formData, setFormData] = useState<BlogPost>(() => {
    // Check if a saved local draft exists for this post
    if (typeof window !== 'undefined') {
      try {
        const localDraft = localStorage.getItem(`donghoa_draft_${post.id || 'new'}`);
        if (localDraft) {
          const parsed = JSON.parse(localDraft);
          if (parsed && parsed.title) {
            return parsed;
          }
        }
      } catch {}
    }
    return { ...post };
  });

  const [blocks, setBlocks] = useState<VisualBlock[]>(() => parseMarkdownToBlocks(formData.content || ''));
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<'editor' | 'live-preview' | 'markdown'>('editor');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) setLeftSidebarOpen(true);
      if (window.innerWidth >= 1280) setRightSidebarOpen(true);
    }
  }, []);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [mediaSearch, setMediaSearch] = useState('');
  const [mediaCategoryFilter, setMediaCategoryFilter] = useState('all');
  const [activeMediaTargetBlockId, setActiveMediaTargetBlockId] = useState<string | null>(null);
  const [newTagInput, setNewTagInput] = useState('');
  const [saveToast, setSaveToast] = useState(false);
  const [lastAutoSaveTime, setLastAutoSaveTime] = useState<string | null>(null);

  // Compute live word count & estimated reading time
  const totalWords = (
    (formData.title || '') +
    ' ' +
    (formData.excerpt || '') +
    ' ' +
    blocks.map((b) => b.content || '').join(' ')
  )
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const calculatedReadingTime = `${Math.max(1, Math.ceil(totalWords / 200))} phút đọc`;

  useEffect(() => {
    fetch('/api/media')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setMediaList(data);
      })
      .catch(() => {});
  }, []);

  // Auto-save draft to localStorage every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(`donghoa_draft_${post.id || 'new'}`, JSON.stringify(formData));
        const now = new Date();
        setLastAutoSaveTime(
          `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
        );
      } catch {}
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData, post.id]);

  // Keyboard shortcut: Ctrl+S / Cmd+S to Save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        triggerSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [formData]);

  const triggerSave = () => {
    const payload = {
      ...formData,
      readingTime: formData.readingTime || calculatedReadingTime
    };
    onSave(payload);
    try {
      localStorage.removeItem(`donghoa_draft_${post.id || 'new'}`);
    } catch {}
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleBlocksChange = (newBlocks: VisualBlock[]) => {
    setBlocks(newBlocks);
    const md = serializeBlocksToMarkdown(newBlocks);
    setFormData((prev) => ({ ...prev, content: md }));
  };

  const handleMarkdownChange = (md: string) => {
    setFormData((prev) => ({ ...prev, content: md }));
    setBlocks(parseMarkdownToBlocks(md));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug === '' || prev.slug === generateSlug(prev.title) ? generateSlug(val) : prev.slug
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTagInput.trim()) {
      e.preventDefault();
      const cleanTag = newTagInput.trim().replace(/^#/, '');
      if (!formData.tags?.includes(cleanTag)) {
        setFormData({ ...formData, tags: [...(formData.tags || []), cleanTag] });
      }
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter((t) => t !== tagToRemove)
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetBlockId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('altText', file.name);

    setUploading(true);
    try {
      const res = await fetch('/api/media', { method: 'POST', body: data });
      const uploaded = await res.json();
      if (res.ok && uploaded.url) {
        if (targetBlockId) {
          const updated = blocks.map((b) => (b.id === targetBlockId ? { ...b, imageUrl: uploaded.url } : b));
          handleBlocksChange(updated);
        } else {
          setFormData((prev) => ({ ...prev, featuredImage: uploaded.url, thumbnailImage: uploaded.url }));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const addBlock = (type: VisualBlock['type'], insertIndex?: number) => {
    const newBlock: VisualBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      content:
        type === 'heading2'
          ? 'Tiêu đề phân đoạn mới'
          : type === 'heading3'
          ? 'Tiêu đề phụ mới'
          : type === 'quote'
          ? '"Trích dẫn nổi bật từ kiến trúc sư..." — KTS. Lê Đông Hòa'
          : type === 'callout'
          ? '💡 Điểm lưu ý quan trọng khi thi công hoặc lựa chọn vật liệu...'
          : type === 'cta'
          ? '📞 **Liên hệ tư vấn thiết kế & thi công:** Hotline: **0906.499.279**'
          : type === 'image'
          ? 'Ảnh phối cảnh không gian nội thất'
          : type === 'table'
          ? '| Hạng mục | Chất liệu | Bảo hành |\n| :--- | :--- | :--- |\n| Tủ bếp Master | Gỗ HDF chống ẩm | 2 năm |\n| Mặt đá bàn đảo | Đá Vicostone | 5 năm |'
          : '',
      imageUrl: type === 'image' ? '/uploads/figma_styles_grid.png' : undefined
    };

    if (insertIndex !== undefined && insertIndex >= 0) {
      const updated = [...blocks];
      updated.splice(insertIndex + 1, 0, newBlock);
      handleBlocksChange(updated);
    } else {
      handleBlocksChange([...blocks, newBlock]);
    }
  };

  const removeBlock = (id: string) => {
    handleBlocksChange(blocks.filter((b) => b.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    const updated = [...blocks];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    handleBlocksChange(updated);
  };

  const updateBlockContent = (id: string, content: string) => {
    const updated = blocks.map((b) => (b.id === id ? { ...b, content } : b));
    handleBlocksChange(updated);
  };

  const applyTemplate = (tpl: BlogTemplate) => {
    if (formData.content && !confirm('Áp dụng mẫu sẽ thay thế tiêu đề, nội dung và hình ảnh hiện tại. Bạn có muốn tiếp tục?')) {
      return;
    }
    const slug = generateSlug(tpl.defaultTitle);
    const parsed = parseMarkdownToBlocks(tpl.content);
    setBlocks(parsed);
    setFormData((prev) => ({
      ...prev,
      title: tpl.defaultTitle,
      slug,
      excerpt: tpl.defaultExcerpt,
      content: tpl.content,
      featuredImage: tpl.defaultImage,
      thumbnailImage: tpl.defaultImage,
      category: tpl.category,
      tags: tpl.defaultTags,
      readingTime: tpl.readingTime
    }));
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-[#f0ede6] text-[#04092b] overflow-hidden select-text">
      {/* Save Success Toast */}
      {saveToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#04092b] text-[#c5a26c] border border-[#c5a26c] px-5 py-2.5 rounded-2xl shadow-2xl text-[13px] font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span>Đã lưu & xuất bản bài viết thành công!</span>
        </div>
      )}

      {/* 1. TOP STUDIO NAVIGATION BAR */}
      <header className="h-14 px-2.5 sm:px-4 bg-white border-b border-[#e2ddd3] flex items-center justify-between gap-2 shrink-0 shadow-sm z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="px-2.5 sm:px-3 py-1.5 bg-[#f4f1ea] hover:bg-[#04092b] hover:text-white rounded-xl text-[12px] font-bold transition-colors flex items-center gap-1 border border-[#e2ddd3]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quay lại</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 text-[13px] border-l border-[#e2ddd3] pl-3">
            <span className="text-[#6e706a] font-medium">Studio:</span>
            <span className="font-bold text-[#04092b] truncate max-w-xs">
              {formData.title || 'Bài viết mới'}
            </span>
          </div>
        </div>

        {/* Center Mode & Device Controls */}
        <div className="flex items-center gap-1.5">
          {/* Mode Switcher */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-[#f4f1ea] p-0.5 sm:p-1 rounded-xl border border-[#e2ddd3]">
            <button
              onClick={() => setMode('editor')}
              className={`px-2 sm:px-3 py-1 text-[11px] sm:text-[11.5px] font-bold rounded-lg transition-colors flex items-center gap-1 ${
                mode === 'editor' ? 'bg-[#04092b] text-[#c5a26c] shadow-xs' : 'text-[#6e706a] hover:text-black'
              }`}
            >
              <Edit className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Soạn Thảo</span>
              <span className="sm:hidden">Soạn</span>
            </button>
            <button
              onClick={() => setMode('live-preview')}
              className={`px-2 sm:px-3 py-1 text-[11px] sm:text-[11.5px] font-bold rounded-lg transition-colors flex items-center gap-1 ${
                mode === 'live-preview' ? 'bg-[#04092b] text-[#c5a26c] shadow-xs' : 'text-[#6e706a] hover:text-black'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xem Live</span>
              <span className="sm:hidden">Live</span>
            </button>
            <button
              onClick={() => setMode('markdown')}
              className={`px-2 sm:px-3 py-1 text-[11px] sm:text-[11.5px] font-bold rounded-lg transition-colors flex items-center gap-1 ${
                mode === 'markdown' ? 'bg-[#04092b] text-white shadow-xs' : 'text-[#6e706a] hover:text-black'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Markdown</span>
              <span className="sm:hidden">MD</span>
            </button>
          </div>

          {/* Viewport Width Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-[#f4f1ea] p-1 rounded-xl border border-[#e2ddd3]">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`p-1.5 rounded-lg ${previewDevice === 'desktop' ? 'bg-[#04092b] text-white' : 'text-gray-400 hover:text-black'}`}
              title="Khung nhìn Desktop"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPreviewDevice('tablet')}
              className={`p-1.5 rounded-lg ${previewDevice === 'tablet' ? 'bg-[#04092b] text-white' : 'text-gray-400 hover:text-black'}`}
              title="Khung nhìn Tablet (iPad)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`p-1.5 rounded-lg ${previewDevice === 'mobile' ? 'bg-[#04092b] text-white' : 'text-gray-400 hover:text-black'}`}
              title="Khung nhìn Mobile (Điện thoại)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Action & Sidebar Toggles */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {lastAutoSaveTime && (
            <span className="hidden 2xl:inline-block text-[10.5px] text-[#6e706a] font-mono bg-[#f4f1ea] px-2 py-1 rounded-lg border border-[#e2ddd3]">
              💾 {lastAutoSaveTime}
            </span>
          )}

          <button
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            className={`p-1.5 sm:p-2 rounded-xl border border-[#e2ddd3] transition-colors ${
              leftSidebarOpen ? 'bg-[#04092b] text-[#c5a26c]' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
            title={leftSidebarOpen ? 'Ẩn thanh khối' : 'Hiện thanh khối'}
          >
            {leftSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            className={`p-1.5 sm:p-2 rounded-xl border border-[#e2ddd3] transition-colors ${
              rightSidebarOpen ? 'bg-[#04092b] text-[#c5a26c]' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
            title={rightSidebarOpen ? 'Ẩn cài đặt' : 'Hiện cài đặt'}
          >
            {rightSidebarOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
          </button>

          <button
            onClick={triggerSave}
            className="bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] px-3 sm:px-5 py-1.5 sm:py-2 text-[11.5px] sm:text-[12.5px] font-bold uppercase tracking-wider transition-all duration-300 rounded-xl shadow-md flex items-center gap-1.5 shrink-0"
            title="Lưu & Xuất bản (Ctrl + S)"
          >
            <Save className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span className="hidden sm:inline">Lưu & Xuất Bản</span>
            <span className="sm:hidden">Lưu</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN 3-PANEL BODY */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        {/* Mobile Backdrop for Left Sidebar */}
        {leftSidebarOpen && (
          <div
            onClick={() => setLeftSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          />
        )}

        {/* LEFT SIDEBAR: Blocks Inserter & Outline */}
        {leftSidebarOpen && (
          <aside className="fixed md:static inset-y-0 left-0 z-50 md:z-auto w-72 sm:w-80 max-w-[85vw] bg-white border-r border-[#e2ddd3] flex flex-col shrink-0 overflow-y-auto p-4 space-y-6 shadow-2xl md:shadow-xs animate-in slide-in-from-left duration-200">
            {/* Mobile Close Button */}
            <div className="flex md:hidden items-center justify-between pb-2 border-b border-[#e2ddd3]">
              <span className="text-[12px] font-bold text-[#04092b] uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#c5a26c]" /> Khối & Cấu Trúc
              </span>
              <button
                type="button"
                onClick={() => setLeftSidebarOpen(false)}
                className="w-7 h-7 rounded-lg bg-[#f4f1ea] hover:bg-gray-200 text-[#04092b] flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>
            {/* Quick Inserter Section */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#6e706a] uppercase tracking-wider flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-[#c5a26c]" /> + Thêm Khối Nội Dung
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => addBlock('heading2')}
                  className="p-2.5 bg-[#f8f5ee] hover:bg-[#04092b] hover:text-white border border-[#e2ddd3] rounded-xl text-[11.5px] font-bold text-left transition-colors flex items-center gap-1.5"
                >
                  <Heading1 className="w-3.5 h-3.5 text-[#c5a26c] shrink-0" /> Đề mục H2
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('heading3')}
                  className="p-2.5 bg-[#f8f5ee] hover:bg-[#04092b] hover:text-white border border-[#e2ddd3] rounded-xl text-[11.5px] font-bold text-left transition-colors flex items-center gap-1.5"
                >
                  <Heading2 className="w-3.5 h-3.5 text-[#c5a26c] shrink-0" /> Đề mục H3
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('paragraph')}
                  className="p-2.5 bg-[#f8f5ee] hover:bg-[#04092b] hover:text-white border border-[#e2ddd3] rounded-xl text-[11.5px] font-bold text-left transition-colors flex items-center gap-1.5"
                >
                  <Type className="w-3.5 h-3.5 text-[#c5a26c] shrink-0" /> Đoạn văn
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('quote')}
                  className="p-2.5 bg-[#f8f5ee] hover:bg-[#04092b] hover:text-white border border-[#e2ddd3] rounded-xl text-[11.5px] font-bold text-left transition-colors flex items-center gap-1.5"
                >
                  <Quote className="w-3.5 h-3.5 text-[#c5a26c] shrink-0" /> Trích dẫn KTS
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('callout')}
                  className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-[11.5px] font-bold text-left transition-colors flex items-center gap-1.5"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Hộp lưu ý
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('image')}
                  className="p-2.5 bg-[#f8f5ee] hover:bg-[#04092b] hover:text-white border border-[#e2ddd3] rounded-xl text-[11.5px] font-bold text-left transition-colors flex items-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#c5a26c] shrink-0" /> Hình ảnh
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('table')}
                  className="p-2.5 bg-[#f8f5ee] hover:bg-[#04092b] hover:text-white border border-[#e2ddd3] rounded-xl text-[11.5px] font-bold text-left transition-colors flex items-center gap-1.5"
                >
                  <Table className="w-3.5 h-3.5 text-[#c5a26c] shrink-0" /> Bảng thông số
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('cta')}
                  className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-[11.5px] font-bold text-left transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Hotline CTA
                </button>
              </div>
            </div>

            {/* Document Outline */}
            <div className="space-y-2 flex-1">
              <span className="text-[11px] font-bold text-[#6e706a] uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1"><ListTree className="w-3.5 h-3.5 text-[#c5a26c]" /> Cấu Trúc Khối</span>
                <span className="font-mono">({blocks.length})</span>
              </span>

              <div className="space-y-1.5">
                {blocks.map((b, idx) => (
                  <div
                    key={b.id}
                    className="p-2 rounded-lg bg-[#faf8f5] hover:bg-[#f4f1ea] border border-[#e2ddd3] text-[11.5px] flex items-center justify-between group cursor-pointer"
                    onClick={() => {
                      const el = document.getElementById(`editor-block-${b.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-gray-400 font-mono text-[10px]">{idx + 1}.</span>
                      <span className="font-medium truncate text-[#04092b]">
                        {b.type === 'heading2' && '📌 ' + (b.content || 'Đề mục H2')}
                        {b.type === 'heading3' && '📎 ' + (b.content || 'Đề mục H3')}
                        {b.type === 'paragraph' && '📄 ' + (b.content.slice(0, 20) || 'Đoạn văn...')}
                        {b.type === 'quote' && '💬 ' + (b.content.slice(0, 18) || 'Trích dẫn...')}
                        {b.type === 'callout' && '💡 ' + (b.content.slice(0, 18) || 'Lưu ý...')}
                        {b.type === 'image' && '🖼️ ' + (b.content || 'Hình ảnh')}
                        {b.type === 'table' && '📊 Bảng thông số'}
                        {b.type === 'cta' && '📞 Hotline Banner'}
                        {b.type === 'divider' && '➖ Đường phân đoạn'}
                      </span>
                    </div>

                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); moveBlock(idx, 'up'); }}
                        disabled={idx === 0}
                        className="p-0.5 text-gray-400 hover:text-black disabled:opacity-20"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); moveBlock(idx, 'down'); }}
                        disabled={idx === blocks.length - 1}
                        className="p-0.5 text-gray-400 hover:text-black disabled:opacity-20"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Templates Drawer Shortcut */}
            <div className="pt-3 border-t border-[#e2ddd3] space-y-2">
              <span className="text-[11px] font-bold text-[#6e706a] uppercase tracking-wider block">
                Mẫu Bài Viết
              </span>
              <div className="space-y-1">
                {BLOG_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => applyTemplate(tpl)}
                    className="w-full text-left p-2 rounded-lg bg-[#f8f5ee] hover:bg-[#c5a26c] hover:text-[#04092b] text-[11px] font-bold border border-[#e2ddd3] transition-colors truncate block"
                  >
                    ✨ {tpl.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* CENTER WRITING & PREVIEW CANVAS */}
        <main className="flex-1 w-full h-full overflow-y-auto p-4 sm:p-8 flex flex-col items-center scroll-smooth min-h-0">
          {mode === 'markdown' ? (
            <div className="w-full max-w-4xl bg-white p-6 rounded-2xl border border-[#e2ddd3] shadow-md space-y-3 my-6 pb-40">
              <span className="text-[12px] font-bold text-[#04092b] uppercase">Mã Nguồn Markdown Chi Tiết</span>
              <textarea
                rows={24}
                value={formData.content}
                onChange={(e) => handleMarkdownChange(e.target.value)}
                className="w-full p-4 border border-[#e2ddd3] rounded-xl font-mono text-[13px] leading-relaxed focus:outline-none focus:border-[#c5a26c]"
              />
            </div>
          ) : mode === 'live-preview' ? (
            /* ---------------- LIVE PREVIEW: AUTHENTIC READER VIEW ---------------- */
            <div
              className={`bg-[#f4f1ea] border border-[#e2ddd3] shadow-2xl transition-all duration-300 flex flex-col my-6 pb-40 ${
                previewDevice === 'mobile'
                  ? 'w-[390px] rounded-[36px] border-4 border-[#04092b]'
                  : previewDevice === 'tablet'
                  ? 'w-[768px] rounded-2xl'
                  : 'w-full max-w-4xl rounded-2xl'
              }`}
            >
              {/* Smartphone Status Bar */}
              {previewDevice === 'mobile' && (
                <div className="w-full flex items-center justify-between px-6 pt-3 pb-2 text-[11px] text-gray-500 bg-white border-b rounded-t-[32px]">
                  <span>9:41</span>
                  <div className="w-16 h-3.5 bg-black rounded-full mx-auto" />
                  <span>5G 100%</span>
                </div>
              )}

              {/* Reader View Header Banner */}
              <div className="bg-[#04092b] text-[#c5a26c] px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider flex items-center justify-between">
                <span>👁️ Bản xem trước thực tế của người đọc</span>
                <span className="text-white text-[10px] font-normal">donghoaproperty.vn/blog/{formData.slug || 'bai-viet'}</span>
              </div>

              <div className="p-6 sm:p-12 space-y-8">
                {/* Category & Title */}
                <div className="space-y-4">
                  <div className="inline-block bg-[#04092b] text-white text-[11px] font-semibold uppercase tracking-widest px-3.5 py-1 shadow-sm font-accent">
                    {formData.category}
                  </div>

                  <h1 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold text-[#04092b] font-display leading-[1.25]">
                    {formData.title || 'Tiêu đề bài viết chưa đặt tên'}
                  </h1>

                  {/* Author Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-4 text-[13px] text-[#6e706a] pt-3 pb-4 border-y border-[#e2ddd3]">
                    <div className="flex flex-wrap items-center gap-6">
                      <span className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#04092b] text-[#c5a26c] flex items-center justify-center font-bold text-[11px]">
                          {formData.author ? formData.author.charAt(0) : 'Đ'}
                        </div>
                        <strong className="text-[#04092b] font-semibold">{formData.author}</strong>
                        {formData.authorRole && <span className="text-gray-500">({formData.authorRole})</span>}
                      </span>
                      <span>📅 {formData.publishedAt}</span>
                      <span>⏳ {formData.readingTime || '5 phút đọc'}</span>
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="relative w-full h-[260px] sm:h-[420px] overflow-hidden bg-[#04092b] border border-[#e2ddd3] shadow-md rounded-xl">
                  <Image
                    src={formData.featuredImage || '/uploads/figma_styles_grid.png'}
                    alt={formData.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Excerpt */}
                {formData.excerpt && (
                  <div className="bg-white p-6 sm:p-8 border-l-4 border-[#c5a26c] shadow-sm text-[16px] sm:text-[17px] text-[#1a1b18] italic leading-relaxed font-serif rounded-r-xl">
                    &ldquo;{formData.excerpt}&rdquo;
                  </div>
                )}

                {/* Rendered Articles Body */}
                <div className="bg-white p-6 sm:p-10 border border-[#e2ddd3] shadow-sm space-y-6 text-[15.5px] sm:text-[16.5px] text-[#1a1b18] leading-[1.85] font-light rounded-xl">
                  {blocks.map((b) => {
                    switch (b.type) {
                      case 'heading2':
                        return (
                          <h2 key={b.id} className="text-[22px] sm:text-[26px] font-bold text-[#04092b] font-display pt-6 pb-2 border-b border-[#e2ddd3]">
                            {b.content}
                          </h2>
                        );
                      case 'heading3':
                        return (
                          <h3 key={b.id} className="text-[18px] sm:text-[20px] font-semibold text-[#04092b] font-display pt-4">
                            {b.content}
                          </h3>
                        );
                      case 'quote':
                        return (
                          <blockquote key={b.id} className="border-l-4 border-[#c5a26c] bg-[#f4f1ea]/60 p-4 my-4 italic text-[#04092b] font-medium text-[15.5px] rounded-r-xl">
                            {b.content}
                          </blockquote>
                        );
                      case 'callout':
                        return (
                          <div key={b.id} className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl my-4 text-[14px]">
                            {b.content}
                          </div>
                        );
                      case 'cta':
                        return (
                          <div key={b.id} className="p-5 bg-blue-50 border border-blue-200 text-blue-950 rounded-xl my-4 flex items-center justify-between gap-4">
                            <div>
                              <p className="font-bold text-[14.5px] text-[#04092b]">{b.content}</p>
                              <p className="text-[12px] text-gray-500">Đông Hòa Design - Xưởng sản xuất trực tiếp</p>
                            </div>
                            <span className="bg-[#04092b] text-[#c5a26c] px-4 py-2 rounded-lg text-[12px] font-bold uppercase shrink-0">
                              0906.499.279
                            </span>
                          </div>
                        );
                      case 'image':
                        return (
                          <figure key={b.id} className="my-6 space-y-2">
                            <div className="relative h-64 sm:h-96 w-full bg-[#04092b] rounded-xl overflow-hidden shadow-xs">
                              <Image src={b.imageUrl || '/uploads/figma_styles_grid.png'} alt={b.content} fill className="object-cover" />
                            </div>
                            {b.content && (
                              <figcaption className="text-center text-[12px] text-gray-500 italic">
                                {b.content}
                              </figcaption>
                            )}
                          </figure>
                        );
                      case 'table':
                        return (
                          <div key={b.id} className="my-4 overflow-x-auto p-4 bg-gray-50 border border-[#e2ddd3] rounded-xl font-mono text-[13px]">
                            <pre className="whitespace-pre-wrap">{b.content}</pre>
                          </div>
                        );
                      case 'divider':
                        return <hr key={b.id} className="border-[#e2ddd3] my-6" />;
                      case 'paragraph':
                      default:
                        return <p key={b.id} className="leading-relaxed">{b.content}</p>;
                    }
                  })}
                </div>

                {/* Tags & Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#e2ddd3] rounded-xl shadow-xs">
                  {formData.tags && formData.tags.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag className="w-4 h-4 text-[#c5a26c]" />
                      <span className="text-[13px] font-semibold text-[#04092b] mr-1">Chủ đề:</span>
                      {formData.tags.map((t, idx) => (
                        <span key={idx} className="bg-[#f4f1ea] border border-[#e2ddd3] px-3 py-1 text-[12px] text-[#6e706a] rounded-lg">
                          #{t}
                        </span>
                      ))}
                    </div>
                  ) : <div />}

                  <div className="inline-flex items-center gap-2 bg-[#04092b] text-white px-6 py-2.5 text-[12.5px] font-semibold uppercase tracking-wider rounded-xl shadow">
                    <PhoneCall className="w-3.5 h-3.5 text-[#c5a26c]" />
                    <span>Tư Vấn Thiết Kế Đông Hòa</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ---------------- EDITOR MODE: INTERACTIVE VISUAL BLOCK BUILDER ---------------- */
            <div
              className={`bg-white shadow-xl border border-[#e2ddd3] transition-all duration-300 flex flex-col my-6 pb-40 ${
                previewDevice === 'mobile'
                  ? 'w-[390px] rounded-[36px] border-4 border-[#04092b] p-5 shadow-2xl'
                  : previewDevice === 'tablet'
                  ? 'w-[768px] rounded-2xl p-7'
                  : 'w-full max-w-3xl rounded-2xl p-8 sm:p-10'
              }`}
            >
              {/* Smartphone Status Bar Simulator */}
              {previewDevice === 'mobile' && (
                <div className="w-full flex items-center justify-between text-[11px] text-gray-400 border-b pb-2 mb-4">
                  <span>9:41</span>
                  <div className="w-16 h-3.5 bg-black rounded-full mx-auto" />
                  <span>5G 100%</span>
                </div>
              )}

              {/* ARTICLE HERO & HEADER */}
              <div className="space-y-5">
                {/* Category Badge & Reading Time */}
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-[#04092b] text-[#c5a26c] text-[11px] font-bold uppercase px-3.5 py-1 rounded">
                    {formData.category}
                  </span>
                  <span className="text-[12px] text-[#6e706a] font-mono">
                    ⏳ {formData.readingTime || '5 phút đọc'}
                  </span>
                </div>

                {/* Direct Inline Title Editor */}
                <div className="group relative">
                  <textarea
                    rows={2}
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Nhập tiêu đề bài viết tại đây..."
                    className="w-full text-[26px] sm:text-[30px] font-bold text-[#04092b] font-display leading-[1.25] bg-transparent border-2 border-transparent hover:border-dashed hover:border-[#c5a26c]/50 focus:border-[#c5a26c] focus:bg-[#f8f5ee]/40 rounded-xl p-1.5 focus:outline-none transition-all resize-none"
                  />
                  <span className="opacity-0 group-hover:opacity-100 absolute -top-2.5 right-2 bg-[#04092b] text-[#c5a26c] text-[9px] font-bold px-1.5 py-0.2 rounded pointer-events-none transition-opacity">
                    ✏️ Tiêu đề bài viết
                  </span>
                </div>

                {/* Author Info Banner */}
                <div className="text-[12.5px] text-[#6e706a] border-y border-[#e2ddd3] py-3 flex items-center justify-between font-medium">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#04092b] text-[#c5a26c] flex items-center justify-center font-bold text-[12px] shrink-0">
                      {formData.author ? formData.author.charAt(0) : 'Đ'}
                    </div>
                    <div>
                      <strong className="text-[#04092b] block leading-none">{formData.author}</strong>
                      <span className="text-[10.5px] text-gray-400">{formData.authorRole || 'Giám đốc Thiết kế'}</span>
                    </div>
                  </div>
                  <span>{formData.publishedAt}</span>
                </div>

                {/* Featured Image */}
                <div className="group relative h-60 sm:h-80 w-full bg-[#04092b] rounded-2xl overflow-hidden shadow-xs border border-[#e2ddd3]">
                  {formData.featuredImage ? (
                    <Image src={formData.featuredImage} alt="" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-[13px]">
                      Chưa chọn ảnh đại diện
                    </div>
                  )}

                  {/* Replace Image Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5 backdrop-blur-xs">
                    <button
                      type="button"
                      onClick={() => setMediaPickerOpen(true)}
                      className="bg-white text-[#04092b] hover:bg-[#c5a26c] px-4 py-2 rounded-xl text-[12px] font-bold uppercase shadow-lg transition-colors flex items-center gap-1.5"
                    >
                      <ImageIcon className="w-4 h-4" /> Chọn ảnh thư viện
                    </button>
                    <label className="cursor-pointer bg-[#04092b] text-white hover:bg-[#c5a26c] hover:text-[#04092b] px-4 py-2 rounded-xl text-[12px] font-bold uppercase shadow-lg transition-colors flex items-center gap-1.5">
                      <UploadCloud className="w-4 h-4" /> Tải ảnh mới
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e)} />
                    </label>
                  </div>
                </div>

                {/* Excerpt / Lead Paragraph */}
                <div className="group relative">
                  <textarea
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Nhập đoạn tóm tắt mở đầu (Excerpt)..."
                    className="w-full border-l-4 border-[#c5a26c] pl-4 italic text-[#1a1b18] text-[14.5px] sm:text-[15.5px] bg-[#faf8f5] py-3.5 rounded-r-xl border-2 border-transparent hover:border-dashed hover:border-[#c5a26c]/50 focus:border-[#c5a26c] focus:outline-none transition-all leading-relaxed"
                  />
                  <span className="opacity-0 group-hover:opacity-100 absolute -top-2.5 right-2 bg-[#04092b] text-[#c5a26c] text-[9px] font-bold px-1.5 py-0.2 rounded pointer-events-none transition-opacity">
                    ✏️ Đoạn mở đầu
                  </span>
                </div>

                {/* RENDER CONTENT BLOCKS */}
                <div className="space-y-4 pt-2">
                  {blocks.map((block, idx) => (
                    <div
                      key={block.id}
                      id={`editor-block-${block.id}`}
                      className="group relative transition-all rounded-xl p-2 -mx-2 hover:bg-[#f8f5ee]/70 border border-transparent hover:border-[#c5a26c]/40"
                    >
                      {/* Floating Block Actions */}
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-3 right-2 bg-[#04092b] text-white px-2 py-0.5 rounded-lg text-[10px] flex items-center gap-1.5 z-10 shadow-md transition-opacity">
                        <button
                          type="button"
                          onClick={() => moveBlock(idx, 'up')}
                          disabled={idx === 0}
                          className="hover:text-[#c5a26c] disabled:opacity-30"
                          title="Di chuyển lên"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBlock(idx, 'down')}
                          disabled={idx === blocks.length - 1}
                          className="hover:text-[#c5a26c] disabled:opacity-30"
                          title="Di chuyển xuống"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => addBlock('paragraph', idx)}
                          className="hover:text-[#c5a26c]"
                          title="Chèn khối bên dưới"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBlock(block.id)}
                          className="hover:text-red-400"
                          title="Xóa khối"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Heading 2 Block */}
                      {block.type === 'heading2' && (
                        <input
                          type="text"
                          value={block.content}
                          onChange={(e) => updateBlockContent(block.id, e.target.value)}
                          placeholder="Tiêu đề phân đoạn H2..."
                          className="w-full text-[20px] sm:text-[22px] font-bold text-[#04092b] font-display border-b border-[#e2ddd3] pb-1 bg-transparent focus:outline-none focus:border-[#c5a26c]"
                        />
                      )}

                      {/* Heading 3 Block */}
                      {block.type === 'heading3' && (
                        <input
                          type="text"
                          value={block.content}
                          onChange={(e) => updateBlockContent(block.id, e.target.value)}
                          placeholder="Tiêu đề phụ H3..."
                          className="w-full text-[16.5px] sm:text-[18px] font-bold text-[#04092b] bg-transparent focus:outline-none focus:border-[#c5a26c]"
                        />
                      )}

                      {/* Paragraph Block */}
                      {block.type === 'paragraph' && (
                        <textarea
                          rows={3}
                          value={block.content}
                          onChange={(e) => updateBlockContent(block.id, e.target.value)}
                          placeholder="Nhập nội dung đoạn văn..."
                          className="w-full text-[14.5px] sm:text-[15.5px] text-[#1a1b18] leading-relaxed bg-transparent focus:outline-none resize-none focus:bg-white/80 p-1 rounded-lg"
                        />
                      )}

                      {/* Quote Block */}
                      {block.type === 'quote' && (
                        <div className="border-l-4 border-[#c5a26c] pl-4 italic text-gray-700 bg-[#faf8f5] p-3 rounded-r-xl">
                          <textarea
                            rows={2}
                            value={block.content}
                            onChange={(e) => updateBlockContent(block.id, e.target.value)}
                            placeholder="Nhập trích dẫn KTS..."
                            className="w-full italic bg-transparent focus:outline-none resize-none"
                          />
                        </div>
                      )}

                      {/* Callout Box */}
                      {block.type === 'callout' && (
                        <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-[13.5px]">
                          <textarea
                            rows={2}
                            value={block.content}
                            onChange={(e) => updateBlockContent(block.id, e.target.value)}
                            placeholder="Nhập ghi chú lưu ý..."
                            className="w-full bg-transparent focus:outline-none resize-none font-medium"
                          />
                        </div>
                      )}

                      {/* Hotline CTA Card */}
                      {block.type === 'cta' && (
                        <div className="p-4 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-[13.5px] shadow-xs">
                          <textarea
                            rows={2}
                            value={block.content}
                            onChange={(e) => updateBlockContent(block.id, e.target.value)}
                            placeholder="Nhập thông tin liên hệ CTA..."
                            className="w-full bg-transparent focus:outline-none resize-none font-medium"
                          />
                        </div>
                      )}

                      {/* Image Block */}
                      {block.type === 'image' && (
                        <div className="space-y-2 my-2">
                          <div className="relative h-52 sm:h-72 w-full bg-[#04092b] rounded-xl overflow-hidden group/img">
                            <Image src={block.imageUrl || '/uploads/figma_styles_grid.png'} alt="" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMediaTargetBlockId(block.id);
                                  setMediaPickerOpen(true);
                                }}
                                className="bg-white text-[#04092b] px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase"
                              >
                                Đổi ảnh thư viện
                              </button>
                              <label className="cursor-pointer bg-[#04092b] text-white px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase">
                                Tải ảnh mới
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, block.id)} />
                              </label>
                            </div>
                          </div>
                          <input
                            type="text"
                            value={block.content}
                            onChange={(e) => updateBlockContent(block.id, e.target.value)}
                            placeholder="Chú thích ảnh..."
                            className="w-full text-center text-[12px] text-gray-500 italic bg-transparent focus:outline-none"
                          />
                        </div>
                      )}

                      {/* Table Block */}
                      {block.type === 'table' && (
                        <div className="p-3 bg-gray-50 border border-[#e2ddd3] rounded-xl overflow-x-auto font-mono text-[12px]">
                          <textarea
                            rows={4}
                            value={block.content}
                            onChange={(e) => updateBlockContent(block.id, e.target.value)}
                            className="w-full font-mono text-[12px] bg-transparent focus:outline-none"
                          />
                        </div>
                      )}

                      {/* Divider */}
                      {block.type === 'divider' && <hr className="border-[#e2ddd3] my-3" />}
                    </div>
                  ))}

                  {/* Add Block Canvas Helper */}
                  <div className="pt-4 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => addBlock('paragraph')}
                      className="px-5 py-2.5 border-2 border-dashed border-[#c5a26c] text-[#04092b] hover:bg-[#c5a26c] rounded-2xl text-[12.5px] font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                    >
                      <Plus className="w-4 h-4" /> Thêm Đoạn Văn Mới
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Mobile Backdrop for Right Sidebar */}
        {rightSidebarOpen && (
          <div
            onClick={() => setRightSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          />
        )}

        {/* RIGHT SIDEBAR: Post Settings & Publishing Inspector */}
        {rightSidebarOpen && (
          <aside className="fixed md:static inset-y-0 right-0 z-50 md:z-auto w-80 max-w-[85vw] bg-white border-l border-[#e2ddd3] flex flex-col shrink-0 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5 shadow-2xl md:shadow-xs animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2ddd3]">
              <span className="text-[12px] font-bold text-[#04092b] uppercase tracking-wider flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-[#c5a26c]" /> Cài Đặt Bài Viết
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded uppercase ${
                  formData.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {formData.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                </span>
                <button
                  type="button"
                  onClick={() => setRightSidebarOpen(false)}
                  className="w-7 h-7 rounded-lg bg-[#f4f1ea] hover:bg-gray-200 text-[#04092b] flex items-center justify-center font-bold text-xs md:hidden"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Status & Reading Time */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#6e706a] mb-1">
                  Trạng Thái Bài Viết
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full p-2 border border-[#e2ddd3] rounded-xl text-[12.5px] bg-white font-bold text-[#04092b]"
                >
                  <option value="published">Xuất bản (Live trên website)</option>
                  <option value="draft">Bản nháp (Draft ẩn)</option>
                </select>
              </div>

              {/* Featured Switch */}
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-[#e2ddd3] bg-[#faf8f5] cursor-pointer hover:border-[#c5a26c] transition-colors">
                <div className="flex items-center gap-2">
                  <Star className={`w-4 h-4 ${formData.featured ? 'text-[#c5a26c] fill-current' : 'text-gray-400'}`} />
                  <span className="text-[12px] font-bold text-[#04092b]">Bài Viết Tiêu Điểm (Featured)</span>
                </div>
                <input
                  type="checkbox"
                  checked={!!formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#04092b] rounded cursor-pointer"
                />
              </label>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#6e706a] mb-1">
                  Chuyên Mục
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 border border-[#e2ddd3] rounded-xl text-[12.5px] bg-white font-medium text-[#04092b]"
                >
                  <option value="Phong cách thiết kế">Phong cách thiết kế</option>
                  <option value="Kinh nghiệm thi công">Kinh nghiệm thi công</option>
                  <option value="Không gian làm việc">Không gian làm việc</option>
                  <option value="Vật liệu & Sản xuất">Vật liệu & Sản xuất</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10.5px] font-bold uppercase text-[#6e706a] mb-1">
                    Thời Gian Đọc
                  </label>
                  <input
                    type="text"
                    value={formData.readingTime}
                    onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                    placeholder="5 phút đọc"
                    className="w-full p-2 border border-[#e2ddd3] rounded-xl text-[12px]"
                  />
                </div>
                <div>
                  <label className="block text-[10.5px] font-bold uppercase text-[#6e706a] mb-1">
                    Ngày Đăng
                  </label>
                  <input
                    type="date"
                    value={formData.publishedAt}
                    onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                    className="w-full p-1.5 border border-[#e2ddd3] rounded-xl text-[11.5px]"
                  />
                </div>
              </div>
            </div>

            {/* Author Settings */}
            <div className="space-y-3 pt-3 border-t border-[#e2ddd3]">
              <span className="block text-[11px] font-bold uppercase text-[#6e706a]">
                Thông Tin Tác Giả
              </span>
              <div>
                <label className="block text-[10.5px] font-bold text-[#6e706a] mb-0.5">Tên tác giả</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full p-2 border border-[#e2ddd3] rounded-xl text-[12.5px]"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-bold text-[#6e706a] mb-0.5">Chức danh KTS</label>
                <input
                  type="text"
                  value={formData.authorRole || ''}
                  onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                  placeholder="Giám đốc Thiết kế"
                  className="w-full p-2 border border-[#e2ddd3] rounded-xl text-[12.5px]"
                />
              </div>
            </div>

            {/* Tags Pill Editor */}
            <div className="space-y-2 pt-3 border-t border-[#e2ddd3]">
              <span className="text-[11px] font-bold uppercase text-[#6e706a] block">
                Thẻ Chủ Đề (Tags)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(formData.tags || []).map((t, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-[#f4f1ea] border border-[#e2ddd3] px-2 py-0.5 rounded-lg text-[11px] text-[#04092b] font-medium"
                  >
                    #{t}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="text-gray-400 hover:text-red-500 font-bold ml-0.5"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Nhập thẻ mới rồi nhấn Enter..."
                className="w-full p-2 border border-[#e2ddd3] rounded-xl text-[12px] focus:outline-none focus:border-[#c5a26c]"
              />
            </div>

            {/* Featured Image Thumbnail Preview */}
            <div className="space-y-2 pt-3 border-t border-[#e2ddd3]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-[#6e706a]">Ảnh Đại Diện</span>
                <button
                  type="button"
                  onClick={() => setMediaPickerOpen(true)}
                  className="text-[11px] text-[#c5a26c] font-bold hover:underline"
                >
                  Đổi ảnh
                </button>
              </div>
              <div className="relative h-28 w-full bg-[#04092b] rounded-xl overflow-hidden border border-[#e2ddd3]">
                {formData.featuredImage && (
                  <Image src={formData.featuredImage} alt="" fill className="object-cover" />
                )}
              </div>
            </div>

            {/* URL Slug & SEO */}
            <div className="space-y-2 pt-3 border-t border-[#e2ddd3]">
              <span className="text-[11px] font-bold uppercase text-[#6e706a] block">
                Đường Dẫn & SEO (Slug)
              </span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full p-2 border border-[#e2ddd3] rounded-xl text-[12px] font-mono"
              />
              <p className="text-[10.5px] text-[#6e706a] font-mono truncate">
                Live URL: /blog/{formData.slug || 'slug'}
              </p>
            </div>

            {/* Primary Save Button at Sidebar Bottom */}
            <div className="pt-4 border-t border-[#e2ddd3]">
              <button
                type="button"
                onClick={triggerSave}
                className="w-full py-3 bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] font-bold uppercase text-[12.5px] tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Lưu & Cập Nhật Bài Viết</span>
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* MEDIA GALLERY PICKER MODAL WITH SEARCH & CATEGORY FILTER */}
      {mediaPickerOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#c5a26c] overflow-hidden my-8 flex flex-col max-h-[88vh]">
            <div className="p-5 border-b border-[#e2ddd3] bg-[#f4f1ea] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#c5a26c]" />
                <h3 className="font-bold text-[16px] text-[#04092b]">Thư Viện Hình Ảnh Kiến Trúc</h3>
              </div>

              <div className="flex items-center gap-2.5">
                <label className="cursor-pointer bg-[#04092b] text-white hover:bg-[#c5a26c] hover:text-[#04092b] px-3.5 py-1.5 rounded-xl text-[11.5px] font-bold uppercase transition-colors flex items-center gap-1.5 shadow-sm">
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Tải ảnh mới</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, activeMediaTargetBlockId || undefined)}
                  />
                </label>

                <button
                  onClick={() => setMediaPickerOpen(false)}
                  className="w-8 h-8 rounded-full bg-white border border-[#e2ddd3] hover:bg-[#04092b] hover:text-white flex items-center justify-center text-[13px] font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Media Search & Filter Tabs */}
            <div className="p-4 bg-[#faf8f5] border-b border-[#e2ddd3] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'Tất cả ảnh' },
                  { id: 'styles', label: '4 Phong cách' },
                  { id: 'office', label: 'Văn phòng' },
                  { id: 'living', label: 'Phòng mẫu' },
                  { id: 'uploads', label: 'Đã tải lên' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setMediaCategoryFilter(tab.id)}
                    className={`px-3 py-1 text-[11.5px] font-bold rounded-lg transition-colors ${
                      mediaCategoryFilter === tab.id
                        ? 'bg-[#04092b] text-[#c5a26c] shadow-xs'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-[#e2ddd3]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={mediaSearch}
                onChange={(e) => setMediaSearch(e.target.value)}
                placeholder="🔍 Tìm kiếm ảnh theo tên..."
                className="p-1.5 px-3 border border-[#e2ddd3] rounded-xl text-[12px] bg-white w-full sm:w-60 focus:outline-none focus:border-[#c5a26c]"
              />
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 flex-1">
              {[
                { url: '/uploads/figma_styles_grid.png', title: '4 Phong cách thiết kế', cat: 'styles' },
                { url: '/uploads/figma_modern_minimalist.png', title: 'Modern & Minimalist', cat: 'styles' },
                { url: '/uploads/figma_cozy_warm.png', title: 'Cozy & Warm (Japandi)', cat: 'styles' },
                { url: '/uploads/figma_luxury_classic.png', title: 'Luxury & Classic', cat: 'styles' },
                { url: '/uploads/figma_heritage_retro.png', title: 'Heritage & Retro', cat: 'styles' },
                { url: '/uploads/office_hero_main.png', title: 'Nội thất văn phòng Hero', cat: 'office' },
                { url: '/uploads/office_card_1.png', title: 'Không gian làm việc mở', cat: 'office' },
                { url: '/uploads/office_card_2.png', title: 'Phòng họp cao cấp', cat: 'office' },
                { url: '/uploads/office_card_3.png', title: 'Module bàn làm việc', cat: 'office' },
                { url: '/uploads/figma_philosophy.png', title: 'Tầm nhìn & Xưởng sản xuất', cat: 'living' },
                { url: '/uploads/hero_slide_1.png', title: 'Hero Slide 1 - Phòng khách', cat: 'living' },
                { url: '/uploads/hero_slide_2.png', title: 'Hero Slide 2 - Phòng ngủ', cat: 'living' },
                { url: '/uploads/hero_slide_3.png', title: 'Hero Slide 3 - Văn phòng', cat: 'office' },
                ...mediaList.map((m) => ({
                  url: m.url,
                  title: m.fileName || m.altText || 'Media image',
                  cat: 'uploads'
                }))
              ]
                .filter((item) => {
                  if (mediaCategoryFilter !== 'all' && item.cat !== mediaCategoryFilter) return false;
                  if (mediaSearch.trim()) {
                    return item.title.toLowerCase().includes(mediaSearch.toLowerCase());
                  }
                  return true;
                })
                .map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (activeMediaTargetBlockId) {
                        const updated = blocks.map((b) =>
                          b.id === activeMediaTargetBlockId ? { ...b, imageUrl: item.url } : b
                        );
                        handleBlocksChange(updated);
                        setActiveMediaTargetBlockId(null);
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          featuredImage: item.url,
                          thumbnailImage: item.url
                        }));
                      }
                      setMediaPickerOpen(false);
                    }}
                    className="cursor-pointer border-2 border-[#e2ddd3] hover:border-[#c5a26c] rounded-xl p-1.5 bg-white hover:bg-[#faf8f5] transition-all group shadow-2xs hover:shadow-md"
                  >
                    <div className="relative h-28 w-full bg-[#04092b] rounded-lg overflow-hidden">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="mt-1.5 text-[11px] font-bold text-center truncate text-[#04092b]">
                      {item.title}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
