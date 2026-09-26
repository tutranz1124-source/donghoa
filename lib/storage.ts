import fs from 'fs';
import path from 'path';
import os from 'os';
import {
  BlogPost,
  MediaItem,
  SiteSettings,
  SiteContentData,
  CustomerInquiry,
  InquiryStatus,
  InquiryNote,
  ProjectsBlock,
  BlogFeedBlock,
  ProjectItem,
  CategoriesData,
  PrivateAccessData,
  MortgageData,
  MilestonesData,
  FAQData
} from './types';
import { DEFAULT_BLOG_POSTS } from './default-blog-posts';

const dataDir = path.join(process.cwd(), 'data');
const blogPostsFile = path.join(dataDir, 'blog-posts.json');
const siteContentFile = path.join(dataDir, 'site-content.json');
const mediaFile = path.join(dataDir, 'media.json');
const inquiriesFile = path.join(dataDir, 'customer-requests.json');

// Serverless writable fallback paths (e.g. /tmp on Vercel)
const tmpDir = os.tmpdir();
const tmpSiteContentFile = path.join(tmpDir, 'donghoa-site-content.json');
const tmpBlogPostsFile = path.join(tmpDir, 'donghoa-blog-posts.json');
const tmpMediaFile = path.join(tmpDir, 'donghoa-media.json');
const tmpInquiriesFile = path.join(tmpDir, 'donghoa-customer-requests.json');

declare global {
  var __siteContentCache: SiteContentData | undefined;
  var __blogPostsCache: BlogPost[] | undefined;
  var __mediaCache: MediaItem[] | undefined;
  var __inquiriesCache: CustomerInquiry[] | undefined;
}

const DEFAULT_PROJECTS: ProjectsBlock = {
  id: 'block-projects',
  type: 'projects',
  enabled: true,
  order: 4,
  badge: 'DANH MỤC DỰ ÁN TIÊU BIỂU',
  title: 'DỰ ÁN BẤT ĐỘNG SẢN & KHÔNG GIAN NỔI BẬT',
  items: [
    {
      id: 'proj-1',
      name: 'Vinhomes Cần Giờ',
      developer: 'Vingroup',
      location: 'Cần Giờ, TP. Hồ Chí Minh',
      area: 'Đại đô thị sinh thái 2.870 ha',
      propertyTypes: 'Biệt thự biển & Shophouse',
      image: '/uploads/vinhomes-can-gio.png',
      featured: true
    },
    {
      id: 'proj-2',
      name: 'The Gió Riverside',
      developer: 'An Gia Group',
      location: 'TP. Dĩ An, liền kề TP. Thủ Đức',
      area: 'Quy mô 3.000 căn hộ cao cấp',
      propertyTypes: 'Căn hộ view sông & Penhouse',
      image: '/uploads/the-gio-riverside.png',
      featured: true
    },
    {
      id: 'proj-3',
      name: 'Lusso Saigon',
      developer: 'Masterise Homes',
      location: 'Quận 1, TP. Hồ Chí Minh',
      area: 'Phân khúc Ultra-Luxury',
      propertyTypes: 'Căn hộ hàng hiệu & Duplex',
      image: '/uploads/lusso-saigon.png',
      featured: true
    },
    {
      id: 'proj-4',
      name: 'Alora Nha Trang',
      developer: 'KDI Holdings',
      location: 'Bãi Tiên, TP. Nha Trang',
      area: 'Tổ hợp nghỉ dưỡng 5 sao',
      propertyTypes: 'Căn hộ biển & Sky Villa',
      image: '/uploads/alora-nhatrang.png',
      featured: true
    },
    {
      id: 'proj-5',
      name: 'Kiều by KITA',
      developer: 'KITA Group',
      location: 'Quận 5, TP. Hồ Chí Minh',
      area: 'Căn hộ cao cấp trung tâm',
      propertyTypes: 'Căn hộ thương mại & Penthouse',
      image: '/uploads/kieu-by-kita.png',
      featured: false
    },
    {
      id: 'proj-6',
      name: 'Q-Terra Quy Nhơn',
      developer: 'Hưng Thịnh Corp',
      location: 'TP. Quy Nhơn, Bình Định',
      area: 'Khu đô thị biển kiểu mẫu',
      propertyTypes: 'Shophouse & Biệt thự đồi',
      image: '/uploads/q-terra-quynhon.png',
      featured: false
    },
    {
      id: 'proj-7',
      name: 'Anara Bình Tiên',
      developer: 'Trung Nam Group',
      location: 'Bình Tiên, Ninh Thuận',
      area: 'Sân Golf 18 lỗ & Biệt thự',
      propertyTypes: 'Biệt thự Golf & Beach Villa',
      image: '/uploads/anara-binh-tien.png',
      featured: false
    },
    {
      id: 'proj-8',
      name: 'La Tiên Villa',
      developer: 'Nam Long',
      location: 'Thủ Đức, TP. Hồ Chí Minh',
      area: 'Khu biệt thự Compound khép kín',
      propertyTypes: 'Biệt thự đơn lập cao cấp',
      image: '/uploads/la-tien-villa.png',
      featured: false
    },
    {
      id: 'proj-9',
      name: 'Happy One Central',
      developer: 'Vạn Xuân Group',
      location: 'TP. Thủ Dầu Một, Bình Dương',
      area: 'Căn hộ công nghệ 4.0',
      propertyTypes: 'Căn hộ cao cấp & Shophouse',
      image: '/uploads/happy-one-central.png',
      featured: false
    }
  ]
};

const DEFAULT_BLOG_FEED: BlogFeedBlock = {
  id: 'block-blog-feed',
  type: 'blog_feed',
  enabled: true,
  order: 9,
  badge: 'TIN TỨC & GÓC NHÌN CHUYÊN GIA',
  title: 'XU HƯỚNG BẤT ĐỘNG SẢN & KIẾN TRÚC',
  subtitle: 'Cập nhật diễn biến thị trường, phân tích đầu tư và xu hướng thiết kế không gian sống thượng lưu.',
  maxPosts: 3,
  buttonLabel: 'Xem tất cả bài viết',
  buttonUrl: '/blog'
};

const DEFAULT_CATEGORIES: CategoriesData = {
  tag: 'DANH MỤC PHÂN KHÚC',
  heading: 'Phân Khúc Bất Động Sản Chọn Lọc',
  description: 'Các danh mục bất động sản được thẩm định kỹ lưỡng về vị trí quy hoạch, tính thanh khoản và tiềm năng tăng trưởng bền vững.',
  items: [
    {
      index: '01',
      categoryKey: 'can-ho',
      title: 'Căn Hộ Hạng Sang & Penthouse',
      subtitle: 'APARTMENTS & PENTHOUSES',
      desc: 'Không gian sống trên cao tại các vị trí trung tâm, tầm nhìn toàn cảnh ôm trọn thành phố cùng hệ tiện ích đặc quyền chuẩn mực quốc tế.',
      image: '/uploads/the-gio-riverside.png',
      featured: true,
    },
    {
      index: '02',
      categoryKey: 'biet-thu',
      title: 'Biệt Thự & Nhà Phố Đô Thị',
      subtitle: 'VILLAS & TOWNHOMES',
      desc: 'Khu compound khép kín, an ninh đa lớp, cảnh quan sinh thái và cộng đồng cư dân tinh hoa.',
      image: '/uploads/vinhomes-can-gio.png',
      featured: false,
    },
    {
      index: '03',
      categoryKey: 'nghi-duong',
      title: 'Bất Động Sản Nghỉ Dưỡng',
      subtitle: 'COASTAL RETREATS',
      desc: 'Biệt thự ven biển và quần thể nghỉ dưỡng tiêu chuẩn 5 sao, kết hợp tối ưu vận hành.',
      image: '/uploads/la-tien-villa.png',
      featured: false,
    },
    {
      index: '04',
      categoryKey: 'thuong-mai',
      title: 'Shophouse & Thương Mại',
      subtitle: 'COMMERCIAL',
      desc: 'Vị trí mặt tiền các trục đại lộ huyết mạch, đón đầu lưu lượng kinh doanh sầm uất.',
      image: '/uploads/happy-one-central.png',
      featured: false,
    },
  ]
};

const DEFAULT_PRIVATE_ACCESS: PrivateAccessData = {
  tag: 'PRIVATE PROPERTY ACCESS',
  heading: 'Nhận Thông Tin Danh Mục Dự Án Mới',
  description: 'Đăng ký để nhận danh mục dự án chọn lọc, cập nhật tiến độ xây dựng và phân tích quy hoạch chuyên sâu từ chuyên viên tư vấn.',
  buttonText: 'Nhận thông tin dự án',
  badgeNote: 'Bảo mật thông tin khách hàng tuyệt đối.'
};

const DEFAULT_MORTGAGE: MortgageData = {
  tag: 'CÔNG CỤ TÀI CHÍNH',
  heading: 'Ước Tính Kế Hoạch Vay Mua Bất Động Sản',
  description: 'Công cụ hỗ trợ khách hàng dự toán dòng tiền trả hàng tháng và vốn tự có ban đầu.',
  defaultPrice: 5000,
  defaultDownPaymentPercent: 30,
  defaultTermYears: 20,
  defaultInterestRate: 8.5
};

const DEFAULT_MILESTONES: MilestonesData = {
  tag: 'NĂNG LỰC & ĐỐI TÁC',
  heading: 'Đối Tác Phát Triển & Năng Lực Tư Vấn',
  description: 'Hợp tác chọn lọc cùng các chủ đầu tư hàng đầu, mang đến nguồn sản phẩm chất lượng và giá trị thực.',
  credentials: [
    {
      title: 'Hợp Tác Phân Phối Chiến Lược',
      desc: 'Đồng hành phân phối chính thức các dự án quy mô chuẩn mực từ các tập đoàn phát triển bất động sản uy tín.'
    },
    {
      title: 'Thẩm Định Độc Lập & Chặt Chẽ',
      desc: 'Đội ngũ chuyên viên pháp lý và tài chính rà soát minh bạch hồ sơ trước khi giới thiệu đến nhà đầu tư.'
    },
    {
      title: 'Đồng Hành Trọn Chu Kỳ Giao Dịch',
      desc: 'Hỗ trợ khách hàng từ giải pháp tài chính, thủ tục ký kết đến nghiệm thu bàn giao và chuyển nhượng/cho thuê.'
    }
  ],
  partners: [
    'Masterise Homes',
    'Gamuda Land',
    'Vingroup',
    'Khang Điền',
    'An Gia Group',
    'KDI Holdings'
  ]
};

const DEFAULT_FAQ: FAQData = {
  tag: 'HỎI ĐÁP & TƯ VẤN',
  heading: 'Câu Hỏi Thường Gặp',
  description: 'Giải đáp các thắc mắc trọng tâm về quy trình làm việc và thẩm định bất động sản.',
  faqs: [
    {
      q: 'Đông Hòa Property thẩm định pháp lý dự án như thế nào trước khi phân phối?',
      a: 'Mọi dự án trong danh mục phân phối đều được chúng tôi rà soát kỹ lưỡng các điều kiện pháp lý cần thiết: Quyết định phê duyệt quy hoạch 1/500, Giấy phép xây dựng, Giấy chứng nhận quyền sử dụng đất và Chứng thư bảo lãnh nghĩa vụ tài chính của ngân hàng trước khi tư vấn cho khách hàng.'
    },
    {
      q: 'Quy trình tư vấn và hỗ trợ giao dịch tại Đông Hòa Property gồm những bước nào?',
      a: 'Quy trình gồm 4 giai đoạn chuẩn mực: (1) Lắng nghe nhu cầu & tư vấn phân khúc phù hợp, (2) Khảo sát thực tế dự án & phân tích quy hoạch, (3) Hoạch định phương án tài chính & thủ tục pháp lý, (4) Đồng hành ký kết hợp đồng và nghiệm thu nhận nhà.'
    },
    {
      q: 'Khách hàng có phải trả thêm bất kỳ khoản phí tư vấn nào cho Đông Hòa Property không?',
      a: 'Hoàn toàn không. Toàn bộ dịch vụ tư vấn chọn căn, hỗ trợ thủ tục hồ sơ vay ngân hàng và kiểm tra pháp lý tại Đông Hòa Property đều được cung cấp miễn phí cho khách hàng theo chính sách từ các chủ đầu tư đối tác.'
    }
  ]
};

const DEFAULT_SITE_CONTENT: SiteContentData = {
  settings: {
    siteName: 'Đông Hòa Property',
    brandName: 'ĐÔNG HÒA PROPERTY',
    siteTagline: 'Bất Động Sản Cao Cấp & Kiến Tạo Không Gian Sống',
    siteDescription: 'Đông Hòa Property cung cấp danh mục bất động sản chọn lọc cùng giải pháp thiết kế - thi công không gian sống chuẩn mực và đẳng cấp.',
    logo: '/uploads/logo-dong-hoa-property.png',
    hotline: '0906.499.279',
    email: 'donghoaproperty@gmail.com',
    address: '113-115 Ung Văn Khiêm, Phường Thạnh Mỹ Tây, TP Hồ Chí Minh, Việt Nam',
    website: 'donghoaproperty.vn',
    zaloUrl: 'https://zalo.me/0906499279',
    facebookUrl: 'https://facebook.com',
    youtubeUrl: 'https://youtube.com',
    linkedinUrl: 'https://linkedin.com',
    businessLicense: 'GPKD số 0315891234 cấp bởi Sở KH&ĐT TP. Hồ Chí Minh',
    navLinks: [
      { label: 'Dự án', url: '#projects' },
      { label: 'Phân khúc BĐS', url: '#categories' },
      { label: 'Tính vay mua nhà', url: '#mortgage-calculator' },
      { label: 'Về chúng tôi', url: '#philosophy' },
      { label: 'Tin tức', url: '/blog' },
      { label: 'Liên hệ', url: '#contact' }
    ],
    copyright: '© 2026 Đông Hòa Property. All rights reserved.',
    theme: {
      accentColor: '#C5A26C',
      headingColor: '#04092B',
      bodyColor: '#5F6361',
      headerMode: 'dark',
      fontSizeScale: 'standard',
      enabledSections: {
        hero: true,
        philosophy: true,
        categories: true,
        projects: true,
        privateAccess: true,
        mortgage: true,
        milestones: true,
        blogFeed: true,
        faq: true,
        contact: true
      }
    }
  },
  hero: {
    backgroundImage: '/uploads/hero_slide_1.png',
    slides: [
      {
        tag: 'ĐÔNG HÒA PROPERTY • PHÂN PHỐI CHIẾN LƯỢC',
        monogram: '',
        line1: 'Kiến Tạo Chuẩn Sống — Tuyển Chọn Bất Động Sản Độc Bản',
        line2: '',
        description: 'Đồng hành tư vấn chuyên sâu các dự án sở hữu vị trí chiến lược, quy hoạch chuẩn mực và thẩm định pháp lý minh bạch.',
        backgroundImage: '/uploads/hero_slide_1.png',
        buttonText: 'Khám phá dự án',
        buttonTarget: '#projects',
        secondaryText: 'Liên hệ tư vấn',
        secondaryTarget: '#contact'
      },
      {
        tag: 'QUỸ CĂN CHỌN LỌC • TP. HỒ CHÍ MINH & KHU VỰC TRỌNG ĐIỂM',
        monogram: '',
        line1: 'Danh Mục Căn Hộ & Biệt Thự Cao Cấp',
        line2: '',
        description: 'Hợp tác phân phối chính thức từ các chủ đầu tư uy tín hàng đầu: Masterise Homes, Gamuda Land, Vingroup, Khang Điền.',
        backgroundImage: '/uploads/hero_slide_2.png',
        buttonText: 'Xem các phân khúc',
        buttonTarget: '#categories',
        secondaryText: 'Khám phá giỏ hàng',
        secondaryTarget: '#projects'
      },
      {
        tag: 'TƯ VẤN GIẢI PHÁP ĐẦU TƯ BỀN VỮNG',
        monogram: '',
        line1: 'Tận Tâm Đồng Hành — Bảo Mật Tuyệt Đối',
        line2: '',
        description: 'Cung cấp góc nhìn thị trường chuẩn xác, phân tích tiềm năng thực tế và hỗ trợ xuyên suốt quá trình giao dịch.',
        backgroundImage: '/uploads/hero_slide_3.png',
        buttonText: 'Đăng ký tư vấn',
        buttonTarget: '#contact',
        secondaryText: 'Tin tức thị trường',
        secondaryTarget: '/blog'
      }
    ]
  },
  philosophy: {
    tag: 'VỀ CHÚNG TÔI',
    heading: 'TẦM NHÌN VÀ SỨ MỆNH',
    description: 'Với những dự án đã bàn giao và hợp tác cùng các chủ đầu tư danh tiếng, Đông Hòa Property tự hào mang đến trải nghiệm sống tinh tế, tiện nghi và gia tăng giá trị bền vững cho từng quý khách hàng.',
    image: '/uploads/figma_philosophy_photo.png',
    features: [
      {
        title: 'Bất động sản chọn lọc',
        description: 'Vị trí đắc địa, tiềm năng tăng trưởng vượt trội và pháp lý minh bạch 100%.'
      },
      {
        title: 'Tư vấn đầu tư & Thiết kế độc bản',
        description: 'Giải pháp toàn diện từ chọn bất động sản đến thiết kế không gian theo gu thẩm mỹ cá nhân.'
      },
      {
        title: 'Dịch vụ tận tâm trọn gói',
        description: 'Đồng hành xuyên suốt từ thủ tục pháp lý, nhận bàn giao đến hoàn thiện nội thất trọn gói.'
      }
    ]
  },
  categories: DEFAULT_CATEGORIES,
  projects: DEFAULT_PROJECTS,
  privateAccess: DEFAULT_PRIVATE_ACCESS,
  mortgage: DEFAULT_MORTGAGE,
  milestones: DEFAULT_MILESTONES,
  blogFeed: DEFAULT_BLOG_FEED,
  faq: DEFAULT_FAQ,
  contact: {
    tag: 'LIÊN HỆ NGAY VỚI CHÚNG TÔI',
    heading: 'KẾT NỐI CÙNG\nĐÔNG HÒA PROPERTY',
    quote: 'Để lại thông tin, đội ngũ Chuyên viên Đông Hòa Property sẽ liên hệ tư vấn trực tiếp và gửi thông tin chi tiết trong vòng 15 phút.',
    image: '/uploads/the-gio-riverside.png'
  },
  stylesOverview: {
    tag: 'CÁC SẢN PHẨM ĐẶC BIỆT',
    heading: 'PHONG CÁCH THIẾT KẾ',
    description: 'Dù theo đuổi nét tối giản hiện đại hay vẻ đẹp sang trọng cổ điển, không gian sống luôn cần phản ánh đúng thần thái của người sở hữu. Đó chính là chìa khóa tạo nên sự khác biệt và giá trị bền vững cho mỗi công trình.',
    styles: [
      {
        id: 'modern',
        name: 'Modern & Minimalist',
        subtitle: 'LESS IS MORE',
        description: 'Phương châm "Less is more". Đẩy cao sự tinh giản trong nội thất, chỉ giữ lại những gì thực sự cần thiết. Màu sắc dịu nhẹ (trắng, kem, xám), không gian mở và ngập tràn ánh sáng tự nhiên.',
        cardImage: '/uploads/figma_modern_minimalist.png',
        showcaseImage: '/uploads/figma_modern_minimalist.png',
        anchor: '#modern-section'
      },
      {
        id: 'cozy',
        name: 'Cozy & Warm',
        subtitle: 'JAPANDI & NORDIC',
        description: 'Sự kết hợp hoàn hảo giữa nét tinh tế, gọn gàng của Nhật Bản và sự ấm áp, mộc mạc của Bắc Âu. Dùng nhiều chất liệu gỗ sáng màu, mây, tre, vải thô và gam màu earthy (màu đất, kem, xanh lá nhạt).',
        cardImage: '/uploads/the-gio-riverside.png',
        showcaseImage: '/uploads/the-gio-riverside.png',
        anchor: '#cozy-section'
      },
      {
        id: 'luxury',
        name: 'Luxury & Classic',
        subtitle: 'ĐẲNG CẤP THƯỢNG LƯU',
        description: 'Đẩy tính xa hoa và sang trọng lên mức tối đa. Sử dụng các vật liệu siêu cao cấp (gỗ tự nhiên quý, đá xuyên sáng, kim loại mạ vàng, đồ thửa riêng - bespoke) với mức độ hoàn thiện tỉ mỉ.',
        cardImage: '/uploads/figma_luxury_classic.png',
        showcaseImage: '/uploads/figma_luxury_classic.png',
        anchor: '#luxury-section'
      },
      {
        id: 'heritage',
        name: 'Heritage & Retro',
        subtitle: 'HOÀI NIỆM & CÔNG NGHIỆP',
        description: 'Gợi nhớ về thập niên 50 – 80. Kết hợp giữa những món đồ cũ kỹ/kỷ niệm với những gam màu vui tươi, phá cách (vàng mustard, xanh teal, cam đất). Mô phỏng lại các nhà xưởng cũ. Điểm nhấn là tường gạch trần, sàn bê tông mài, trần để lộ ống kỹ thuật, kết hợp khung sắt đen và gỗ thô tối màu.',
        cardImage: '/uploads/figma_heritage_vignette.png',
        showcaseImage: '/uploads/figma_heritage_vignette.png',
        anchor: '#heritage-section'
      }
    ]
  },
  office: {
    tag: 'CÁC SẢN PHẨM ĐẶC BIỆT',
    headingLine1: 'NỘI THẤT',
    headingLine2: 'VĂN PHÒNG',
    description: 'Thiết kế nội thất văn phòng không chỉ là việc tạo ra một nơi làm việc thẩm mỹ và tối ưu công năng, mà còn là giải pháp kiến tạo không gian truyền cảm hứng, nâng cao hiệu suất và thể hiện trọn vẹn nét văn hóa doanh nghiệp.',
    heroImage: '/uploads/office_hero_main.png',
    colorSwatches: [
      { color: '#04092b', label: 'Deep Navy' },
      { color: '#c5a26c', label: 'Warm Gold' },
      { color: '#8c7b6c', label: 'Earthy Stone' },
      { color: '#3d4a41', label: 'Forest Sage' }
    ],
    galleryCards: [
      { id: 1, image: '/uploads/office_card_1.png', alt: 'Không gian làm việc văn phòng hiện đại' },
      { id: 2, image: '/uploads/office_card_2.png', alt: 'Khu vực làm việc cá nhân & tiếp khách' },
      { id: 3, image: '/uploads/office_card_3.png', alt: 'Module bàn làm việc linh hoạt' }
    ]
  }
};

function mergeWithDefault(content: any): SiteContentData {
  if (!content || typeof content !== 'object') return DEFAULT_SITE_CONTENT;
  return {
    ...DEFAULT_SITE_CONTENT,
    ...content,
    settings: { ...DEFAULT_SITE_CONTENT.settings, ...(content.settings || {}) },
    hero: {
      ...DEFAULT_SITE_CONTENT.hero,
      ...(content.hero || {}),
      slides: Array.isArray(content.hero?.slides) && content.hero.slides.length > 0 ? content.hero.slides : DEFAULT_SITE_CONTENT.hero.slides
    },
    philosophy: {
      ...DEFAULT_SITE_CONTENT.philosophy,
      ...(content.philosophy || {}),
      features: Array.isArray(content.philosophy?.features) && content.philosophy.features.length > 0 ? content.philosophy.features : DEFAULT_SITE_CONTENT.philosophy.features
    },
    projects: {
      ...DEFAULT_SITE_CONTENT.projects,
      ...(content.projects || {}),
      items: Array.isArray(content.projects?.items) && content.projects.items.length > 0 ? content.projects.items : (DEFAULT_SITE_CONTENT.projects?.items || [])
    },
    blogFeed: {
      ...DEFAULT_SITE_CONTENT.blogFeed,
      ...(content.blogFeed || {})
    },
    contact: { ...DEFAULT_SITE_CONTENT.contact, ...(content.contact || {}) },
    stylesOverview: {
      ...DEFAULT_SITE_CONTENT.stylesOverview,
      ...(content.stylesOverview || {}),
      styles: Array.isArray(content.stylesOverview?.styles) && content.stylesOverview.styles.length > 0 ? content.stylesOverview.styles : (DEFAULT_SITE_CONTENT.stylesOverview?.styles || [])
    },
    office: {
      ...DEFAULT_SITE_CONTENT.office,
      ...(content.office || {}),
      colorSwatches: Array.isArray(content.office?.colorSwatches) && content.office.colorSwatches.length > 0 ? content.office.colorSwatches : (DEFAULT_SITE_CONTENT.office?.colorSwatches || []),
      galleryCards: Array.isArray(content.office?.galleryCards) && content.office.galleryCards.length > 0 ? content.office.galleryCards : (DEFAULT_SITE_CONTENT.office?.galleryCards || [])
    },
    stages: content.stages || DEFAULT_SITE_CONTENT.stages
  };
}

export function getSiteContent(): SiteContentData {
  // 1. In-memory cache hit
  if (globalThis.__siteContentCache) {
    return globalThis.__siteContentCache;
  }

  // 2. Writable tmp directory check (updated in serverless)
  try {
    if (fs.existsSync(tmpSiteContentFile)) {
      const raw = fs.readFileSync(tmpSiteContentFile, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        const merged = mergeWithDefault(parsed);
        globalThis.__siteContentCache = merged;
        return merged;
      }
    }
  } catch (e) {
    // ignore
  }

  // 3. Project bundled data file
  try {
    if (fs.existsSync(siteContentFile)) {
      const raw = fs.readFileSync(siteContentFile, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        const merged = mergeWithDefault(parsed);
        globalThis.__siteContentCache = merged;
        return merged;
      }
    }
  } catch (err) {
    console.error('Error reading site content from disk:', err);
  }

  return DEFAULT_SITE_CONTENT;
}

export function updateSiteContent(newContent: SiteContentData): boolean {
  const merged = mergeWithDefault(newContent);
  let saved = false;
  // Always update global memory cache immediately
  globalThis.__siteContentCache = merged;
  saved = true;

  // Try writing to serverless writable /tmp
  try {
    fs.writeFileSync(tmpSiteContentFile, JSON.stringify(merged, null, 2), 'utf8');
    saved = true;
  } catch (e) {
    console.warn('Could not write to tmp site content file:', e);
  }

  // Try writing to project data directory (works on local development)
  try {
    const dir = path.dirname(siteContentFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(siteContentFile, JSON.stringify(merged, null, 2), 'utf8');
    saved = true;
  } catch (err) {
    // This is expected on Vercel serverless read-only filesystem
    console.info('Project disk is read-only (Serverless environment). Memory & tmp cache active.');
  }

  return saved;
}

export function saveSiteContent(newContent: any): boolean {
  return updateSiteContent(newContent);
}


export function getBlogPosts(): BlogPost[] {
  if (globalThis.__blogPostsCache && globalThis.__blogPostsCache.length > 0) {
    return globalThis.__blogPostsCache;
  }

  try {
    if (fs.existsSync(tmpBlogPostsFile)) {
      const raw = fs.readFileSync(tmpBlogPostsFile, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        globalThis.__blogPostsCache = parsed;
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }

  try {
    if (fs.existsSync(blogPostsFile)) {
      const raw = fs.readFileSync(blogPostsFile, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        globalThis.__blogPostsCache = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading blog posts:', err);
  }

  globalThis.__blogPostsCache = DEFAULT_BLOG_POSTS;
  return DEFAULT_BLOG_POSTS;
}

export function saveBlogPosts(posts: BlogPost[]): boolean {
  globalThis.__blogPostsCache = posts;
  let saved = false;

  try {
    fs.writeFileSync(tmpBlogPostsFile, JSON.stringify(posts, null, 2), 'utf8');
    saved = true;
  } catch (e) {
    // ignore
  }

  try {
    const dir = path.dirname(blogPostsFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(blogPostsFile, JSON.stringify(posts, null, 2), 'utf8');
    saved = true;
  } catch (err) {
    console.info('Blog posts written to memory & tmp cache.');
  }

  return saved;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find((p) => p.slug === slug);
}

export function saveBlogPost(post: BlogPost): BlogPost {
  const posts = getBlogPosts();
  const existingIndex = posts.findIndex((p) => p.id === post.id);

  if (existingIndex >= 0) {
    posts[existingIndex] = post;
  } else {
    posts.unshift(post);
  }

  saveBlogPosts(posts);
  return post;
}

export function deleteBlogPost(id: string): boolean {
  const posts = getBlogPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length !== posts.length) {
    saveBlogPosts(filtered);
    return true;
  }
  return false;
}

export function getMediaLibrary(): MediaItem[] {
  if (globalThis.__mediaCache) {
    return globalThis.__mediaCache;
  }

  try {
    if (fs.existsSync(tmpMediaFile)) {
      const raw = fs.readFileSync(tmpMediaFile, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        globalThis.__mediaCache = parsed;
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }

  try {
    if (fs.existsSync(mediaFile)) {
      const raw = fs.readFileSync(mediaFile, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        globalThis.__mediaCache = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading media library:', err);
  }

  return [];
}

export function saveMediaLibrary(media: MediaItem[]): boolean {
  globalThis.__mediaCache = media;
  let saved = false;

  try {
    fs.writeFileSync(tmpMediaFile, JSON.stringify(media, null, 2), 'utf8');
    saved = true;
  } catch (e) {
    // ignore
  }

  try {
    const dir = path.dirname(mediaFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(mediaFile, JSON.stringify(media, null, 2), 'utf8');
    saved = true;
  } catch (err) {
    console.info('Media library written to memory & tmp cache.');
  }

  return saved;
}

export function getMediaItems(): MediaItem[] {
  return getMediaLibrary();
}

export function saveMediaItem(item: MediaItem): MediaItem {
  const media = getMediaLibrary();
  media.unshift(item);
  saveMediaLibrary(media);
  return item;
}

// ----------------------------------------------------
// CUSTOMER INQUIRIES / CRM PERSISTENCE
// ----------------------------------------------------

export function getInquiries(): CustomerInquiry[] {
  if (globalThis.__inquiriesCache && Array.isArray(globalThis.__inquiriesCache)) {
    return globalThis.__inquiriesCache;
  }

  try {
    if (fs.existsSync(tmpInquiriesFile)) {
      const raw = fs.readFileSync(tmpInquiriesFile, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        globalThis.__inquiriesCache = parsed;
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }

  try {
    if (fs.existsSync(inquiriesFile)) {
      const raw = fs.readFileSync(inquiriesFile, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        globalThis.__inquiriesCache = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading inquiries from disk:', err);
  }

  const initialList: CustomerInquiry[] = [
    {
      id: 'inq-seed-1',
      fullName: 'Trần Hoàng Long',
      phone: '0918 345 678',
      email: 'hoanglong.tran@gmail.com',
      propertyType: 'Biệt thự biển',
      area: '350 m²',
      need: 'Tư vấn đầu tư & Thiết kế hoàn thiện',
      projectName: 'Vinhomes Cần Giờ',
      status: 'appointment',
      notes: [
        {
          id: 'note-1',
          content: 'Khách quan tâm căn góc view trực diện biển, hẹn gặp chiều thứ 7.',
          author: 'Admin',
          createdAt: new Date().toISOString()
        }
      ],
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: 'inq-seed-2',
      fullName: 'Nguyễn Thị Mai Hương',
      phone: '0903 889 912',
      email: 'maihuong.nguyen@yahoo.com',
      propertyType: 'Căn hộ cao cấp',
      area: '110 m²',
      need: 'Nhận bảng giá & chính sách chiết khấu',
      projectName: 'The Gió Riverside',
      status: 'contacted',
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
    },
    {
      id: 'inq-seed-3',
      fullName: 'Phạm Đức Anh',
      phone: '0982 771 234',
      propertyType: 'Penthouse / Duplex',
      area: '240 m²',
      need: 'Thiết kế nội thất trọn gói phong cách Luxury',
      projectName: 'Lusso Saigon',
      status: 'new',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
    }
  ];

  globalThis.__inquiriesCache = initialList;
  saveInquiries(initialList);
  return initialList;
}

export function saveInquiries(inquiries: CustomerInquiry[]): boolean {
  globalThis.__inquiriesCache = inquiries;
  let saved = false;

  try {
    fs.writeFileSync(tmpInquiriesFile, JSON.stringify(inquiries, null, 2), 'utf8');
    saved = true;
  } catch (e) {
    // ignore
  }

  try {
    const dir = path.dirname(inquiriesFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(inquiriesFile, JSON.stringify(inquiries, null, 2), 'utf8');
    saved = true;
  } catch (err) {
    console.info('Inquiries written to memory & tmp cache.');
  }

  return saved;
}

export function saveInquiry(inquiry: Partial<CustomerInquiry> & { fullName: string; phone: string }): CustomerInquiry {
  const inquiries = getInquiries();
  const newRecord: CustomerInquiry = {
    id: inquiry.id || `inq-${Date.now()}`,
    fullName: inquiry.fullName.trim(),
    phone: inquiry.phone.trim(),
    email: inquiry.email?.trim() || '',
    propertyType: inquiry.propertyType?.trim() || '',
    area: inquiry.area?.trim() || '',
    need: inquiry.need?.trim() || '',
    projectName: inquiry.projectName?.trim() || '',
    targetEmail: inquiry.targetEmail || 'donghoaproperty@gmail.com',
    status: inquiry.status || 'new',
    notes: inquiry.notes || [],
    createdAt: inquiry.createdAt || new Date().toISOString()
  };

  const existingIdx = inquiries.findIndex((i) => i.id === newRecord.id);
  if (existingIdx >= 0) {
    inquiries[existingIdx] = { ...inquiries[existingIdx], ...newRecord, updatedAt: new Date().toISOString() };
  } else {
    inquiries.unshift(newRecord);
  }

  saveInquiries(inquiries);
  return newRecord;
}

export function updateInquiryStatus(id: string, status: InquiryStatus): CustomerInquiry | null {
  const inquiries = getInquiries();
  const target = inquiries.find((i) => i.id === id);
  if (!target) return null;

  target.status = status;
  target.updatedAt = new Date().toISOString();
  saveInquiries(inquiries);
  return target;
}

export function addInquiryNote(id: string, noteContent: string, author: string = 'Admin'): CustomerInquiry | null {
  const inquiries = getInquiries();
  const target = inquiries.find((i) => i.id === id);
  if (!target) return null;

  if (!target.notes) target.notes = [];
  target.notes.unshift({
    id: `note-${Date.now()}`,
    content: noteContent.trim(),
    author,
    createdAt: new Date().toISOString()
  });
  target.updatedAt = new Date().toISOString();
  saveInquiries(inquiries);
  return target;
}

export function deleteInquiry(id: string): boolean {
  const inquiries = getInquiries();
  const filtered = inquiries.filter((i) => i.id !== id);
  if (filtered.length !== inquiries.length) {
    saveInquiries(filtered);
    return true;
  }
  return false;
}

// ----------------------------------------------------
// PROJECT MANAGEMENT HELPERS
// ----------------------------------------------------

export function getProjects(): ProjectItem[] {
  const content = getSiteContent();
  return content.projects?.items || DEFAULT_PROJECTS.items;
}

export function saveProjects(items: ProjectItem[], blockSettings?: Partial<ProjectsBlock>): boolean {
  const content = getSiteContent();
  content.projects = {
    ...DEFAULT_PROJECTS,
    ...(content.projects || {}),
    ...(blockSettings || {}),
    items
  };
  return saveSiteContent(content);
}

export function saveProjectItem(project: ProjectItem): ProjectItem {
  const content = getSiteContent();
  const items = [...(content.projects?.items || DEFAULT_PROJECTS.items)];
  const existingIdx = items.findIndex((p) => p.id === project.id);

  if (existingIdx >= 0) {
    items[existingIdx] = project;
  } else {
    items.unshift(project);
  }

  saveProjects(items);
  return project;
}

export function deleteProjectItem(id: string): boolean {
  const content = getSiteContent();
  const items = content.projects?.items || DEFAULT_PROJECTS.items;
  const filtered = items.filter((p) => p.id !== id);
  if (filtered.length !== items.length) {
    saveProjects(filtered);
    return true;
  }
  return false;
}


