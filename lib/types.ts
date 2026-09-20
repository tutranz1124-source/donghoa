export interface NavLinkItem {
  label: string;
  url: string;
}

export interface FooterLinkItem {
  label: string;
  url: string;
}

export interface FooterColumn {
  columnTitle: string;
  links: FooterLinkItem[];
}

export interface SiteSettings {
  siteName: string;
  brandName: string;
  siteTagline: string;
  siteDescription: string;
  logo: string;
  hotline: string;
  email: string;
  address: string;
  website: string;
  navLinks: NavLinkItem[];
  footerLinks?: FooterColumn[];
  copyright: string;
}

export interface HeroSlide {
  tag: string;
  monogram: string;
  line1: string;
  line2: string;
  description: string;
  backgroundImage?: string;
  buttonText: string;
  buttonTarget: string;
  secondaryText: string;
  secondaryTarget: string;
}

export interface HeroData {
  backgroundImage: string;
  slides: HeroSlide[];
}

export interface PhilosophyFeature {
  title: string;
  description: string;
}

export interface PhilosophyData {
  tag: string;
  heading: string;
  description: string;
  image: string;
  features: PhilosophyFeature[];
}

export interface ContactData {
  tag: string;
  heading: string;
  quote: string;
  image: string;
}

export interface StyleItemData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  cardImage: string;
  showcaseImage: string;
  anchor: string;
}

export interface StylesOverviewData {
  tag: string;
  heading: string;
  description: string;
  styles: StyleItemData[];
}

export interface ColorSwatchData {
  color: string;
  label: string;
}

export interface GalleryCardData {
  id: number;
  image: string;
  alt: string;
}

export interface OfficeData {
  tag: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  heroImage: string;
  colorSwatches: ColorSwatchData[];
  galleryCards: GalleryCardData[];
}

export interface AnimatedStageItem {
  id: string;
  name: string;
  image: string;
  defaultImage?: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    width: string;
    height?: string;
    aspectRatio?: string;
    zIndex?: number;
    scale?: number;
    rotate?: number;
    flipH?: boolean;
    objectFit?: 'contain' | 'cover';
    cropZoom?: number;
    cropOffsetX?: number;
    cropOffsetY?: number;
    crop?: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
  };
  animation: {
    direction: 'slide-left' | 'slide-right' | 'drop-top' | 'float-bottom' | 'fade-scale' | 'zoom-in';
    offsetX?: number;
    offsetY?: number;
    delay: number;
    duration: number;
  };
}

export type CanvaItem = AnimatedStageItem;

export interface StyleStageConfig {
  styleId: string;
  title: string;
  subtitle?: string;
  description: string;
  finalImage?: string;
  swatches?: string[];
  items: AnimatedStageItem[];
  mobileItems?: AnimatedStageItem[];
}

export interface SiteContentData {
  settings: SiteSettings;
  hero: HeroData;
  philosophy: PhilosophyData;
  contact: ContactData;
  stylesOverview: StylesOverviewData;
  office: OfficeData;
  stages?: Record<string, StyleStageConfig>;
  about?: AboutBlock;
  projects?: ProjectsBlock;
  consultation?: ConsultationBlock;
  blogFeed?: BlogFeedBlock;
  styles?: DesignStyleItem[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  thumbnailImage?: string;
  author: string;
  authorRole?: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt: string;
  readingTime: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface MediaItem {
  id: string;
  fileName: string;
  url: string;
  fileSize?: number;
  mimeType?: string;
  altText?: string;
  category?: string;
  uploadedAt: string;
}

export interface HeroBlock {
  id?: string;
  type?: 'hero';
  enabled?: boolean;
  order?: number;
  tagline?: string;
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  backgroundImage?: string;
}

export interface AboutBlock {
  id?: string;
  type?: 'about';
  enabled?: boolean;
  order?: number;
  badge?: string;
  headingAccent?: string;
  paragraph1?: string;
  image?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  developer?: string;
  area?: string;
  location?: string;
  propertyTypes?: string;
  image: string;
  featured?: boolean;
}

export interface ProjectsBlock {
  id?: string;
  type?: 'projects';
  enabled?: boolean;
  order?: number;
  badge?: string;
  title?: string;
  items: ProjectItem[];
}

export interface BlogFeedBlock {
  id?: string;
  type?: 'blog_feed';
  enabled?: boolean;
  order?: number;
  badge?: string;
  title?: string;
  subtitle?: string;
  maxPosts?: number;
  buttonLabel?: string;
  buttonUrl?: string;
}

export interface ConsultationBlock {
  id?: string;
  type?: 'consultation_cta';
  enabled?: boolean;
  order?: number;
  badge?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  buttonLabel?: string;
}

export interface DesignStyleItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  materials: string;
  image: string;
}

export type UserRole = 'admin' | 'editor';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthSessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type InquiryStatus = 'new' | 'contacted' | 'appointment' | 'closed';

export interface InquiryNote {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface CustomerInquiry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  propertyType?: string;
  area?: string;
  need?: string;
  projectName?: string;
  targetEmail?: string;
  status: InquiryStatus;
  notes?: InquiryNote[];
  createdAt: string;
  updatedAt?: string;
}

