'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Save,
  Building,
  Palette,
  Layout,
  MessageSquare,
  Briefcase,
  ImageIcon,
  Sparkles,
  Eye,
  Plus,
  Trash2,
  ExternalLink,
  RotateCcw,
  ArrowRight,
  Monitor,
  Smartphone,
  Tablet,
  Upload,
  Layers,
  Settings,
  X,
  HelpCircle,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Search,
  Check,
  Globe,
  Sliders,
  Type,
  GitBranch,
  RefreshCw,
  Download,
  UploadCloud
} from 'lucide-react';
import {
  SiteContentData,
  SiteSettings,
  HeroData,
  HeroSlide,
  PhilosophyData,
  CategoriesData,
  CategoryItem,
  ProjectsBlock,
  ProjectItem,
  PrivateAccessData,
  MortgageData,
  MilestonesData,
  BlogFeedBlock,
  FAQData,
  FAQItem,
  ContactData,
  MediaItem
} from '@/lib/types';
import { useToast } from '@/components/admin/ToastContext';

type SectionTab =
  | 'layout_theme'
  | 'hero'
  | 'philosophy'
  | 'categories'
  | 'projects'
  | 'private_access'
  | 'mortgage'
  | 'milestones'
  | 'blog_feed'
  | 'faq'
  | 'contact'
  | 'site_settings'
  | 'git_sync';

export default function AdminPageEditor() {
  const [data, setData] = useState<SiteContentData | null>(null);
  const [activeTab, setActiveTab] = useState<SectionTab>('hero');
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [syncingGit, setSyncingGit] = useState(false);
  const [gitStatus, setGitStatus] = useState<any>(null);

  // Media Picker State
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaTargetCallback, setMediaTargetCallback] = useState<((url: string) => void) | null>(null);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [mediaSearch, setMediaSearch] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const { showToast } = useToast();

  // Load Content, Media & Git Status
  const loadData = async () => {
    setLoading(true);
    try {
      const [contentRes, mediaRes, syncRes] = await Promise.all([
        fetch('/api/content'),
        fetch('/api/media'),
        fetch('/api/sync').catch(() => null)
      ]);
      const contentJson = await contentRes.json();
      const mediaJson = await mediaRes.json();
      const syncJson = syncRes ? await syncRes.json().catch(() => null) : null;

      if (contentJson && typeof contentJson === 'object') {
        setData(contentJson);
      }
      if (Array.isArray(mediaJson)) {
        setMediaList(mediaJson);
      }
      if (syncJson) {
        setGitStatus(syncJson);
      }
    } catch (err: any) {
      showToast('Lỗi khi tải dữ liệu', err.message || 'Không thể kết nối API', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Save Content
  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Lỗi máy chủ khi lưu');
      const resJson = await res.json().catch(() => ({}));

      // Update localStorage & BroadcastChannel
      try {
        localStorage.setItem('donghoa_site_content', JSON.stringify(data));
        if (typeof BroadcastChannel !== 'undefined') {
          const bc = new BroadcastChannel('donghoa_content_sync');
          bc.postMessage(data);
          bc.close();
        }
      } catch (e) {}

      if (resJson.gitSync?.synced) {
        showToast('Đã lưu & commit vào Source Code GitHub!', 'Dữ liệu đã được ghi vĩnh viễn vào repository.', 'success');
      } else {
        showToast('Đã lưu thành công!', 'Dữ liệu trang web đã được cập nhật đồng bộ.', 'success');
      }
    } catch (err: any) {
      showToast('Lỗi khi lưu dữ liệu', err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Manual Git Sync
  const handleManualGitSync = async () => {
    setSyncingGit(true);
    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'cms(manual-sync): admin triggered full repository sync' })
      });
      const json = await res.json();
      if (json.success) {
        showToast('Đồng bộ GitHub thành công!', 'Toàn bộ dữ liệu đã được commit vào branch main.', 'success');
        loadData();
      } else {
        showToast('Đồng bộ thất bại', json.error || 'Vui lòng kiểm tra GITHUB_TOKEN', 'error');
      }
    } catch (e: any) {
      showToast('Lỗi kết nối', e.message, 'error');
    } finally {
      setSyncingGit(false);
    }
  };

  // Export Full JSON Backup
  const handleExportBackup = () => {
    window.open('/api/sync?action=export', '_blank');
  };

  // Import JSON Backup
  const handleImportBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== 'object') {
        showToast('File không hợp lệ', 'File sao lưu phải đúng định dạng JSON', 'error');
        return;
      }

      setLoading(true);
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'import', data: parsed })
      });
      const json = await res.json();
      if (json.success) {
        showToast('Khôi phục thành công!', 'Dữ liệu đã được tải vào hệ thống.', 'success');
        loadData();
      } else {
        showToast('Khôi phục thất bại', json.error, 'error');
      }
    } catch (e: any) {
      showToast('Lỗi đọc file', e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Open Media Picker Helper
  const openMediaPicker = (onSelect: (url: string) => void) => {
    setMediaTargetCallback(() => onSelect);
    setMediaPickerOpen(true);
  };

  // Direct Image Upload in Media Picker
  const handleDirectUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Tải ảnh lên thất bại');
      const newMedia = await res.json();

      setMediaList((prev) => [newMedia, ...prev]);
      if (mediaTargetCallback) {
        mediaTargetCallback(newMedia.url);
        setMediaPickerOpen(false);
      }
      showToast('Đã tải ảnh lên!', 'Hình ảnh mới đã được thêm vào trang.', 'success');
    } catch (err: any) {
      showToast('Lỗi tải ảnh', err.message, 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2EB]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-gold border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-600 font-sans">
            Đang tải dữ liệu trang...
          </span>
        </div>
      </div>
    );
  }

  // Active section data references
  const settings = data.settings;
  const hero = data.hero;
  const philosophy = data.philosophy;
  const categories = data.categories || {
    tag: 'DANH MỤC PHÂN KHÚC',
    heading: 'Phân Khúc Bất Động Sản Chọn Lọc',
    description: 'Các danh mục bất động sản được thẩm định kỹ lưỡng về vị trí quy hoạch, tính thanh khoản và tiềm năng tăng trưởng bền vững.',
    items: []
  };
  const projects = data.projects || {
    badge: 'DANH MỤC DỰ ÁN',
    title: 'Dự Án Trọng Điểm Đang Phân Phối',
    items: []
  };
  const privateAccess = data.privateAccess || {
    tag: 'PRIVATE PROPERTY ACCESS',
    heading: 'Nhận Thông Tin Danh Mục Dự Án Mới',
    description: 'Đăng ký để nhận danh mục dự án chọn lọc, cập nhật tiến độ xây dựng và phân tích quy hoạch chuyên sâu từ chuyên viên tư vấn.',
    buttonText: 'Nhận thông tin dự án',
    badgeNote: 'Bảo mật thông tin khách hàng tuyệt đối.'
  };
  const mortgage = data.mortgage || {
    tag: 'CÔNG CỤ TÀI CHÍNH',
    heading: 'Ước Tính Kế Hoạch Vay Mua Bất Động Sản',
    description: 'Công cụ hỗ trợ khách hàng dự toán dòng tiền trả hàng tháng và vốn tự có ban đầu.',
    defaultPrice: 5000,
    defaultDownPaymentPercent: 30,
    defaultTermYears: 20,
    defaultInterestRate: 8.5
  };
  const milestones = data.milestones || {
    tag: 'NĂNG LỰC & ĐỐI TÁC',
    heading: 'Đối Tác Phát Triển & Năng Lực Tư Vấn',
    description: 'Hợp tác chọn lọc cùng các chủ đầu tư hàng đầu, mang đến nguồn sản phẩm chất lượng và giá trị thực.',
    credentials: [],
    partners: []
  };
  const blogFeed = data.blogFeed || {
    badge: 'GÓC NHÌN CHUYÊN GIA',
    title: 'Tin Tức & Phân Tích Thị Trường',
    buttonLabel: 'Xem tất cả bài viết',
    buttonUrl: '/blog'
  };
  const faq = data.faq || {
    tag: 'HỎI ĐÁP & TƯ VẤN',
    heading: 'Câu Hỏi Thường Gặp',
    description: 'Giải đáp các thắc mắc trọng tâm về quy trình làm việc và thẩm định bất động sản.',
    faqs: []
  };
  const contact = data.contact;

  const enabledSections = settings.theme?.enabledSections || {
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
  };

  const navTabs: { id: SectionTab; label: string; icon: any }[] = [
    { id: 'layout_theme', label: 'Bố Cục & Giao Diện', icon: Layout },
    { id: 'hero', label: 'Hero Banner', icon: Sparkles },
    { id: 'philosophy', label: 'Về Chúng Tôi', icon: Building },
    { id: 'categories', label: 'Phân Khúc BĐS', icon: Layers },
    { id: 'projects', label: 'Dự Án Trọng Điểm', icon: Briefcase },
    { id: 'private_access', label: 'Đặc Quyền VIP', icon: ShieldCheck },
    { id: 'mortgage', label: 'Tính Vay Mua Nhà', icon: Calculator },
    { id: 'milestones', label: 'Năng Lực & Đối Tác', icon: Sparkles },
    { id: 'blog_feed', label: 'Tin Tức & Blog', icon: MessageSquare },
    { id: 'faq', label: 'Hỏi Đáp Pháp Lý', icon: HelpCircle },
    { id: 'contact', label: 'Liên Hệ Tư Vấn', icon: PhoneCall },
    { id: 'site_settings', label: 'Cài Đặt & Menu', icon: Settings },
    { id: 'git_sync', label: 'Đồng Bộ Git & Backup', icon: GitBranch }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EB] text-[#1E2430]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#0B0F19] text-white border-b border-white/10 px-6 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/20">
            <Image src="/uploads/logo-mark.png" alt="Logo" fill className="object-contain p-1" />
          </div>
          <div>
            <h1 className="font-serif font-medium text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
              <span>Trình Quản Trị Nội Dung & Giao Diện</span>
              <span className="text-[10px] uppercase font-sans font-semibold px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30">
                Property Live
              </span>
            </h1>
            <p className="text-[11px] text-white/60 font-sans">
              Tùy chỉnh nội dung, hình ảnh, màu sắc, font chữ và bố cục landing page
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* View Public Website */}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 text-xs font-medium transition-colors border border-white/10"
          >
            <Eye className="w-3.5 h-3.5 text-gold" />
            <span>Xem trang ngoài</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
          </a>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gold hover:bg-[#B38F5A] text-charcoal font-semibold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace: 2-Column Grid */}
      <div className="flex-1 max-w-[1720px] w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Navigation Tabs & Forms (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Section Navigation Tabs */}
          <div className="bg-white rounded-2xl border border-[#E5E0D5] p-2.5 shadow-sm">
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#0B0F19] text-white shadow-sm border border-[#0B0F19]'
                        : 'text-charcoal-700 hover:text-charcoal hover:bg-[#FAF8F5] border border-transparent'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gold' : 'text-charcoal-muted'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Editors Container */}
          <div className="bg-white rounded-3xl border border-[#E5E0D5] p-6 sm:p-8 shadow-sm space-y-6">
            {/* ============================================================ */}
            {/* TAB 1: BỐ CỤC & GIAO DIỆN (LAYOUT & THEME) */}
            {/* ============================================================ */}
            {activeTab === 'layout_theme' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-medium text-charcoal flex items-center gap-2">
                    <Palette className="w-5 h-5 text-gold" />
                    <span>Tùy Biến Bố Cục & Giao Diện Màu Sắc</span>
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Bật/tắt các phân đoạn nội dung và tùy chỉnh bảng màu, kích thước font chữ toàn trang.
                  </p>
                </div>

                {/* 1. Theme Color Settings */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D5] space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gold font-sans flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5" />
                    <span>Màu Sắc & Điểm Nhấn Kiến Trúc</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                        Màu ánh kim chủ đạo (Gold Accent)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={settings.theme?.accentColor || '#C5A26C'}
                          onChange={(e) =>
                            setData({
                              ...data,
                              settings: {
                                ...settings,
                                theme: { ...settings.theme, accentColor: e.target.value }
                              }
                            })
                          }
                          className="w-10 h-10 rounded-xl cursor-pointer border border-[#E5E0D5] p-0.5 bg-white"
                        />
                        <input
                          type="text"
                          value={settings.theme?.accentColor || '#C5A26C'}
                          onChange={(e) =>
                            setData({
                              ...data,
                              settings: {
                                ...settings,
                                theme: { ...settings.theme, accentColor: e.target.value }
                              }
                            })
                          }
                          className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-[#E5E0D5] text-xs font-mono text-charcoal outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                        Tỷ lệ font chữ chính (Font Size Scale)
                      </label>
                      <select
                        value={settings.theme?.fontSizeScale || 'standard'}
                        onChange={(e) =>
                          setData({
                            ...data,
                            settings: {
                              ...settings,
                              theme: { ...settings.theme, fontSizeScale: e.target.value as any }
                            }
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5E0D5] text-xs font-medium text-charcoal outline-none focus:border-gold cursor-pointer"
                      >
                        <option value="compact">Gọn nhẹ (Compact - Thanh thoát)</option>
                        <option value="standard">Chuẩn mực (Standard - Cân đối)</option>
                        <option value="relaxed">Trang trọng (Relaxed - Nổi bật)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. Section Visibility Toggles */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D5] space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gold font-sans flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Bật / Tắt Các Phân Đoạn Trên Trang</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { key: 'hero', label: '1. Hero Banner Tuyển Chọn' },
                      { key: 'philosophy', label: '2. Về Chúng Tôi (Tầm nhìn)' },
                      { key: 'categories', label: '3. Phân Khúc Bất Động Sản' },
                      { key: 'projects', label: '4. Danh Mục Dự Án Trọng Điểm' },
                      { key: 'privateAccess', label: '5. Đặc Quyền Private Access' },
                      { key: 'mortgage', label: '6. Công Cụ Tính Vay Mua Nhà' },
                      { key: 'milestones', label: '7. Năng Lực & Đối Tác Phát Triển' },
                      { key: 'blogFeed', label: '8. Tin Tức & Góc Nhìn Thị Trường' },
                      { key: 'faq', label: '9. Hỏi Đáp Pháp Lý & Quy Trình' },
                      { key: 'contact', label: '10. Form Tư Vấn & Hotline' }
                    ].map((sec) => {
                      const isChecked = (enabledSections as any)[sec.key] !== false;
                      return (
                        <label
                          key={sec.key}
                          className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E5E0D5] hover:border-gold/50 cursor-pointer transition-colors"
                        >
                          <span className="text-xs font-medium text-charcoal">{sec.label}</span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) =>
                              setData({
                                ...data,
                                settings: {
                                  ...settings,
                                  theme: {
                                    ...settings.theme,
                                    enabledSections: {
                                      ...enabledSections,
                                      [sec.key]: e.target.checked
                                    }
                                  }
                                }
                              })
                            }
                            className="w-4 h-4 rounded text-gold focus:ring-gold accent-gold cursor-pointer"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 2: HERO BANNER */}
            {/* ============================================================ */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-serif font-medium text-charcoal flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-gold" />
                      <span>Chỉnh Sửa Hero Banner</span>
                    </h3>
                    <p className="text-xs text-charcoal-600 mt-1">
                      Quản lý các slide trình chiếu ấn tượng mở đầu trang web.
                    </p>
                  </div>

                  {/* Add Slide Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const newSlide: HeroSlide = {
                        tag: 'ĐÔNG HÒA PROPERTY • PHÂN PHỐI CHIẾN LƯỢC',
                        monogram: '',
                        line1: 'Tiêu Đề Slide Mới — Dự Án Đẳng Cấp',
                        line2: '',
                        description: 'Mô tả ngắn gọn về giá trị và đẳng cấp không gian sống.',
                        backgroundImage: '/uploads/the-gio-riverside.png',
                        buttonText: 'Khám phá dự án',
                        buttonTarget: '#projects',
                        secondaryText: 'Liên hệ tư vấn',
                        secondaryTarget: '#contact'
                      };
                      setData({
                        ...data,
                        hero: {
                          ...hero,
                          slides: [...hero.slides, newSlide]
                        }
                      });
                      setHeroSlideIndex(hero.slides.length);
                      showToast('Đã thêm slide mới', '', 'success');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-charcoal hover:bg-gold text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Slide</span>
                  </button>
                </div>

                {/* Slide Switcher */}
                <div className="flex items-center gap-2 border-b border-[#E5E0D5] pb-3 overflow-x-auto">
                  {hero.slides.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setHeroSlideIndex(idx)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        heroSlideIndex === idx
                          ? 'bg-gold text-charcoal shadow-sm'
                          : 'bg-[#FAF8F5] text-charcoal-600 hover:bg-white border border-[#E5E0D5]'
                      }`}
                    >
                      Slide 0{idx + 1}
                    </button>
                  ))}
                </div>

                {/* Current Slide Form */}
                {hero.slides[heroSlideIndex] && (
                  <div className="space-y-4">
                    {/* Background Image with Media Picker */}
                    <div>
                      <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                        Ảnh nền Slide (Background Image)
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-warm-200 border border-[#E5E0D5] shrink-0">
                          <Image
                            src={hero.slides[heroSlideIndex].backgroundImage || '/uploads/hero_slide_1.png'}
                            alt="Slide Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <input
                          type="text"
                          value={hero.slides[heroSlideIndex].backgroundImage || ''}
                          onChange={(e) => {
                            const updated = [...hero.slides];
                            updated[heroSlideIndex].backgroundImage = e.target.value;
                            setData({ ...data, hero: { ...hero, slides: updated } });
                          }}
                          className="flex-1 px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                          placeholder="/uploads/the-gio-riverside.png"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            openMediaPicker((url) => {
                              const updated = [...hero.slides];
                              updated[heroSlideIndex].backgroundImage = url;
                              setData({ ...data, hero: { ...hero, slides: updated } });
                            })
                          }
                          className="px-3 py-2 rounded-xl bg-charcoal hover:bg-gold text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Chọn ảnh</span>
                        </button>
                      </div>
                    </div>

                    {/* Badge Tag */}
                    <div>
                      <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                        Nhãn phụ / Badge Tag
                      </label>
                      <input
                        type="text"
                        value={hero.slides[heroSlideIndex].tag}
                        onChange={(e) => {
                          const updated = [...hero.slides];
                          updated[heroSlideIndex].tag = e.target.value;
                          setData({ ...data, hero: { ...hero, slides: updated } });
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                      />
                    </div>

                    {/* Headline */}
                    <div>
                      <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                        Tiêu đề chính (Headline)
                      </label>
                      <input
                        type="text"
                        value={hero.slides[heroSlideIndex].line1}
                        onChange={(e) => {
                          const updated = [...hero.slides];
                          updated[heroSlideIndex].line1 = e.target.value;
                          setData({ ...data, hero: { ...hero, slides: updated } });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-sm font-medium text-charcoal outline-none focus:border-gold"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                        Đoạn văn mô tả (Description)
                      </label>
                      <textarea
                        rows={3}
                        value={hero.slides[heroSlideIndex].description}
                        onChange={(e) => {
                          const updated = [...hero.slides];
                          updated[heroSlideIndex].description = e.target.value;
                          setData({ ...data, hero: { ...hero, slides: updated } });
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal leading-relaxed outline-none focus:border-gold"
                      />
                    </div>

                    {/* CTA Buttons Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D5]">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-gold mb-1">
                          Nút CTA Chính
                        </label>
                        <input
                          type="text"
                          value={hero.slides[heroSlideIndex].buttonText}
                          onChange={(e) => {
                            const updated = [...hero.slides];
                            updated[heroSlideIndex].buttonText = e.target.value;
                            setData({ ...data, hero: { ...hero, slides: updated } });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E0D5] text-xs mb-2"
                          placeholder="Chữ trên nút"
                        />
                        <input
                          type="text"
                          value={hero.slides[heroSlideIndex].buttonTarget}
                          onChange={(e) => {
                            const updated = [...hero.slides];
                            updated[heroSlideIndex].buttonTarget = e.target.value;
                            setData({ ...data, hero: { ...hero, slides: updated } });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E0D5] text-xs"
                          placeholder="Liên kết (#projects)"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-gold mb-1">
                          Nút CTA Phụ
                        </label>
                        <input
                          type="text"
                          value={hero.slides[heroSlideIndex].secondaryText}
                          onChange={(e) => {
                            const updated = [...hero.slides];
                            updated[heroSlideIndex].secondaryText = e.target.value;
                            setData({ ...data, hero: { ...hero, slides: updated } });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E0D5] text-xs mb-2"
                          placeholder="Chữ trên nút"
                        />
                        <input
                          type="text"
                          value={hero.slides[heroSlideIndex].secondaryTarget}
                          onChange={(e) => {
                            const updated = [...hero.slides];
                            updated[heroSlideIndex].secondaryTarget = e.target.value;
                            setData({ ...data, hero: { ...hero, slides: updated } });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E0D5] text-xs"
                          placeholder="Liên kết (#contact)"
                        />
                      </div>
                    </div>

                    {/* Delete Slide Button */}
                    {hero.slides.length > 1 && (
                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = hero.slides.filter((_, idx) => idx !== heroSlideIndex);
                            setData({ ...data, hero: { ...hero, slides: updated } });
                            setHeroSlideIndex(0);
                            showToast('Đã xóa slide', '', 'info');
                          }}
                          className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-medium"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Xóa Slide Này</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 3: VỀ CHÚNG TÔI (PHILOSOPHY) */}
            {/* ============================================================ */}
            {activeTab === 'philosophy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-medium text-charcoal flex items-center gap-2">
                    <Building className="w-5 h-5 text-gold" />
                    <span>Về Chúng Tôi & Triết Lý Tư Vấn</span>
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Trình bày câu chuyện thương hiệu, hình ảnh đại diện và 3 giá trị cốt lõi.
                  </p>
                </div>

                {/* Featured Image with Media Picker */}
                <div>
                  <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                    Hình ảnh giới thiệu thương hiệu
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-warm-200 border border-[#E5E0D5] shrink-0">
                      <Image
                        src={philosophy.image || '/uploads/figma_philosophy_photo.png'}
                        alt="Philosophy Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <input
                      type="text"
                      value={philosophy.image}
                      onChange={(e) =>
                        setData({
                          ...data,
                          philosophy: { ...philosophy, image: e.target.value }
                        })
                      }
                      className="flex-1 px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        openMediaPicker((url) => {
                          setData({
                            ...data,
                            philosophy: { ...philosophy, image: url }
                          });
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-charcoal hover:bg-gold text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Chọn ảnh</span>
                    </button>
                  </div>
                </div>

                {/* Tag & Heading */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Nhãn phụ (Badge Tag)
                    </label>
                    <input
                      type="text"
                      value={philosophy.tag}
                      onChange={(e) =>
                        setData({
                          ...data,
                          philosophy: { ...philosophy, tag: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Tiêu đề chính (Heading)
                    </label>
                    <input
                      type="text"
                      value={philosophy.heading}
                      onChange={(e) =>
                        setData({
                          ...data,
                          philosophy: { ...philosophy, heading: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                    Đoạn văn giới thiệu tổng quan
                  </label>
                  <textarea
                    rows={3}
                    value={philosophy.description}
                    onChange={(e) =>
                      setData({
                        ...data,
                        philosophy: { ...philosophy, description: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal leading-relaxed outline-none focus:border-gold"
                  />
                </div>

                {/* 3 Pillars */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gold font-sans">
                    3 Trụ Cột Giá Trị Cốt Lõi
                  </h4>
                  {philosophy.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D5] space-y-2"
                    >
                      <span className="text-[11px] font-mono font-bold text-gold">0{idx + 1}</span>
                      <input
                        type="text"
                        value={feat.title}
                        onChange={(e) => {
                          const updated = [...philosophy.features];
                          updated[idx].title = e.target.value;
                          setData({ ...data, philosophy: { ...philosophy, features: updated } });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E0D5] text-xs font-semibold text-charcoal"
                        placeholder="Tiêu đề trụ cột"
                      />
                      <textarea
                        rows={2}
                        value={feat.description}
                        onChange={(e) => {
                          const updated = [...philosophy.features];
                          updated[idx].description = e.target.value;
                          setData({ ...data, philosophy: { ...philosophy, features: updated } });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E0D5] text-xs text-charcoal-600"
                        placeholder="Mô tả chi tiết"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 4: PHÂN KHÚC BẤT ĐỘNG SẢN (CATEGORIES) */}
            {/* ============================================================ */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-medium text-charcoal flex items-center gap-2">
                    <Layers className="w-5 h-5 text-gold" />
                    <span>Phân Khúc Bất Động Sản</span>
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Cấu hình 4 nhóm phân khúc tiêu điểm (Căn hộ, Biệt thự, Nghỉ dưỡng, Shophouse).
                  </p>
                </div>

                {/* Section Header */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Nhãn phân mục
                    </label>
                    <input
                      type="text"
                      value={categories.tag || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          categories: { ...categories, tag: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Tiêu đề phân khúc
                    </label>
                    <input
                      type="text"
                      value={categories.heading || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          categories: { ...categories, heading: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Category Items */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gold font-sans">
                    Danh Sách 4 Phân Khúc Bất Động Sản
                  </h4>

                  {(categories.items || []).map((cat, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D5] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-gold">
                          Mục {cat.index} • {cat.categoryKey}
                        </span>
                        {cat.featured && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-charcoal text-white font-semibold">
                            Tiêu điểm chính
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-charcoal-muted mb-1">
                            Tiêu đề phân khúc
                          </label>
                          <input
                            type="text"
                            value={cat.title}
                            onChange={(e) => {
                              const updated = [...(categories.items || [])];
                              updated[idx].title = e.target.value;
                              setData({ ...data, categories: { ...categories, items: updated } });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E0D5] text-xs font-semibold text-charcoal"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-medium text-charcoal-muted mb-1">
                            Phụ đề tiếng Anh
                          </label>
                          <input
                            type="text"
                            value={cat.subtitle}
                            onChange={(e) => {
                              const updated = [...(categories.items || [])];
                              updated[idx].subtitle = e.target.value;
                              setData({ ...data, categories: { ...categories, items: updated } });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E0D5] text-xs font-semibold text-charcoal"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-charcoal-muted mb-1">
                          Đoạn mô tả ngắn
                        </label>
                        <textarea
                          rows={2}
                          value={cat.desc}
                          onChange={(e) => {
                            const updated = [...(categories.items || [])];
                            updated[idx].desc = e.target.value;
                            setData({ ...data, categories: { ...categories, items: updated } });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E0D5] text-xs text-charcoal"
                        />
                      </div>

                      {/* Category Image */}
                      <div>
                        <label className="block text-[11px] font-medium text-charcoal-muted mb-1">
                          Hình ảnh đại diện phân khúc
                        </label>
                        <div className="flex items-center gap-3">
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-warm-200 border border-[#E5E0D5] shrink-0">
                            <Image src={cat.image || '/uploads/the-gio-riverside.png'} alt="" fill className="object-cover" />
                          </div>
                          <input
                            type="text"
                            value={cat.image}
                            onChange={(e) => {
                              const updated = [...(categories.items || [])];
                              updated[idx].image = e.target.value;
                              setData({ ...data, categories: { ...categories, items: updated } });
                            }}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-[#E5E0D5] text-xs"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              openMediaPicker((url) => {
                                const updated = [...(categories.items || [])];
                                updated[idx].image = url;
                                setData({ ...data, categories: { ...categories, items: updated } });
                              })
                            }
                            className="px-3 py-1.5 rounded-lg bg-charcoal hover:bg-gold text-white text-xs font-semibold transition-colors"
                          >
                            Chọn ảnh
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 5: DỰ ÁN TRỌNG ĐIỂM (PROJECTS BLOCK) */}
            {/* ============================================================ */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-medium text-charcoal flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gold" />
                    <span>Dự Án Trọng Điểm Đang Phân Phối</span>
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Cấu hình tiêu đề phân mục và quản lý nhanh danh sách các dự án hiển thị trên landing page.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Nhãn danh mục (Badge Tag)
                    </label>
                    <input
                      type="text"
                      value={projects.badge || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          projects: { ...projects, badge: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Tiêu đề chính (Heading)
                    </label>
                    <input
                      type="text"
                      value={projects.title || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          projects: { ...projects, title: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Projects Quick View & Edit Link */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D5] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-charcoal block">
                      Tổng số {projects.items?.length || 0} dự án đang hiển thị
                    </span>
                    <span className="text-[11px] text-charcoal-muted">
                      Bạn có thể quản lý chi tiết từng dự án tại trang Quản lý Dự Án chuyên sâu.
                    </span>
                  </div>
                  <a
                    href="/admin/projects"
                    className="px-4 py-2 rounded-xl bg-charcoal hover:bg-gold text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Mở trang Quản lý Dự án</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 6: ĐẶC QUYỀN VIP (PRIVATE ACCESS) */}
            {/* ============================================================ */}
            {activeTab === 'private_access' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-medium text-charcoal flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-gold" />
                    <span>Đặc Quyền Private Property Access</span>
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Cấu hình thông điệp và form đăng ký nhận danh mục quỹ căn chọn lọc.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Nhãn phụ (Badge Tag)
                    </label>
                    <input
                      type="text"
                      value={privateAccess.tag || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          privateAccess: { ...privateAccess, tag: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Tiêu đề chính
                    </label>
                    <input
                      type="text"
                      value={privateAccess.heading || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          privateAccess: { ...privateAccess, heading: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                    Đoạn văn mô tả đặc quyền
                  </label>
                  <textarea
                    rows={3}
                    value={privateAccess.description || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        privateAccess: { ...privateAccess, description: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal leading-relaxed outline-none focus:border-gold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Chữ trên nút gửi form
                    </label>
                    <input
                      type="text"
                      value={privateAccess.buttonText || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          privateAccess: { ...privateAccess, buttonText: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Ghi chú cam kết bảo mật
                    </label>
                    <input
                      type="text"
                      value={privateAccess.badgeNote || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          privateAccess: { ...privateAccess, badgeNote: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 7: TÍNH VAY MUA NHÀ (MORTGAGE CALCULATOR) */}
            {/* ============================================================ */}
            {activeTab === 'mortgage' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-medium text-charcoal flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-gold" />
                    <span>Công Cụ Tính Toán Dòng Tiền Vay</span>
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Cấu hình tiêu đề và các thông số mặc định cho bảng tính lãi suất vay mua bất động sản.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Nhãn phân mục
                    </label>
                    <input
                      type="text"
                      value={mortgage.tag || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          mortgage: { ...mortgage, tag: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Tiêu đề công cụ
                    </label>
                    <input
                      type="text"
                      value={mortgage.heading || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          mortgage: { ...mortgage, heading: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Default Slider Values */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D5] space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gold font-sans">
                    Giá Trị Mặc Định Cho Bảng Tính
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-medium text-charcoal-muted mb-1">
                        Giá trị BĐS mặc định (Triệu VNĐ)
                      </label>
                      <input
                        type="number"
                        value={mortgage.defaultPrice || 5000}
                        onChange={(e) =>
                          setData({
                            ...data,
                            mortgage: { ...mortgage, defaultPrice: Number(e.target.value) }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E0D5] text-xs font-semibold text-charcoal"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-charcoal-muted mb-1">
                        Tỷ lệ vốn tự có mặc định (%)
                      </label>
                      <input
                        type="number"
                        value={mortgage.defaultDownPaymentPercent || 30}
                        onChange={(e) =>
                          setData({
                            ...data,
                            mortgage: { ...mortgage, defaultDownPaymentPercent: Number(e.target.value) }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E0D5] text-xs font-semibold text-charcoal"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-charcoal-muted mb-1">
                        Thời hạn vay mặc định (Năm)
                      </label>
                      <input
                        type="number"
                        value={mortgage.defaultTermYears || 20}
                        onChange={(e) =>
                          setData({
                            ...data,
                            mortgage: { ...mortgage, defaultTermYears: Number(e.target.value) }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E0D5] text-xs font-semibold text-charcoal"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-charcoal-muted mb-1">
                        Lãi suất dự kiến mặc định (% / năm)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={mortgage.defaultInterestRate || 8.5}
                        onChange={(e) =>
                          setData({
                            ...data,
                            mortgage: { ...mortgage, defaultInterestRate: Number(e.target.value) }
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E0D5] text-xs font-semibold text-charcoal"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 8: NĂNG LỰC & ĐỐI TÁC (MILESTONES) */}
            {/* ============================================================ */}
            {activeTab === 'milestones' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-medium text-charcoal flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold" />
                    <span>Năng Lực & Đối Tác Phát Triển</span>
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Cấu hình 3 thẻ năng lực tư vấn và danh sách các chủ đầu tư đối tác.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Nhãn phân mục
                    </label>
                    <input
                      type="text"
                      value={milestones.tag || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          milestones: { ...milestones, tag: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Tiêu đề chính
                    </label>
                    <input
                      type="text"
                      value={milestones.heading || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          milestones: { ...milestones, heading: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* 3 Credentials */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gold font-sans">
                    3 Tiêu Chuẩn Năng Lực
                  </h4>
                  {(milestones.credentials || []).map((cred, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D5] space-y-2"
                    >
                      <input
                        type="text"
                        value={cred.title}
                        onChange={(e) => {
                          const updated = [...(milestones.credentials || [])];
                          updated[idx].title = e.target.value;
                          setData({ ...data, milestones: { ...milestones, credentials: updated } });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E0D5] text-xs font-semibold text-charcoal"
                        placeholder="Tiêu đề năng lực"
                      />
                      <textarea
                        rows={2}
                        value={cred.desc}
                        onChange={(e) => {
                          const updated = [...(milestones.credentials || [])];
                          updated[idx].desc = e.target.value;
                          setData({ ...data, milestones: { ...milestones, credentials: updated } });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E5E0D5] text-xs text-charcoal-600"
                        placeholder="Mô tả"
                      />
                    </div>
                  ))}
                </div>

                {/* Partners List */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gold font-sans">
                    Danh Sách Chủ Đầu Tư Đối Tác (Cách nhau bằng dấu phẩy)
                  </h4>
                  <input
                    type="text"
                    value={(milestones.partners || []).join(', ')}
                    onChange={(e) => {
                      const updated = e.target.value.split(',').map((p) => p.trim()).filter(Boolean);
                      setData({ ...data, milestones: { ...milestones, partners: updated } });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    placeholder="Masterise Homes, Gamuda Land, Vingroup, Khang Điền..."
                  />
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 9: TIN TỨC & BLOG (BLOG FEED) */}
            {/* ============================================================ */}
            {activeTab === 'blog_feed' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-medium text-charcoal flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-gold" />
                    <span>Tin Tức & Góc Nhìn Chuyên Gia</span>
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Cấu hình tiêu đề danh mục bài viết và nút điều hướng xem tất cả bài phân tích.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Nhãn danh mục (Badge Tag)
                    </label>
                    <input
                      type="text"
                      value={blogFeed.badge || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          blogFeed: { ...blogFeed, badge: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Tiêu đề chính
                    </label>
                    <input
                      type="text"
                      value={blogFeed.title || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          blogFeed: { ...blogFeed, title: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Chữ trên nút liên kết
                    </label>
                    <input
                      type="text"
                      value={blogFeed.buttonLabel || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          blogFeed: { ...blogFeed, buttonLabel: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Đường dẫn URL
                    </label>
                    <input
                      type="text"
                      value={blogFeed.buttonUrl || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          blogFeed: { ...blogFeed, buttonUrl: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Manage Blog Posts Link */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D5] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-charcoal block">
                      Soạn thảo bài viết & Nghiên cứu thị trường
                    </span>
                    <span className="text-[11px] text-charcoal-muted">
                      Mở trình biên soạn bài viết chuyên sâu với công cụ soạn thảo trực quan.
                    </span>
                  </div>
                  <a
                    href="/admin/blog"
                    className="px-4 py-2 rounded-xl bg-charcoal hover:bg-gold text-white text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Mở Trình Viết Blog</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 10: HỎI ĐÁP PHÁP LÝ (FAQ) */}
            {/* ============================================================ */}
            {activeTab === 'faq' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-serif font-medium text-charcoal flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-gold" />
                      <span>Hỏi Đáp Pháp Lý & Quy Trình</span>
                    </h3>
                    <p className="text-xs text-charcoal-600 mt-1">
                      Giải đáp các thắc mắc trọng tâm của khách hàng về quy trình và thẩm định.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newFaq: FAQItem = {
                        q: 'Câu hỏi thắc mắc mới?',
                        a: 'Câu trả lời chi tiết và rõ ràng từ chuyên viên.'
                      };
                      setData({
                        ...data,
                        faq: {
                          ...faq,
                          faqs: [...(faq.faqs || []), newFaq]
                        }
                      });
                      showToast('Đã thêm câu hỏi mới', '', 'success');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-charcoal hover:bg-gold text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Câu Hỏi</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Nhãn phân mục
                    </label>
                    <input
                      type="text"
                      value={faq.tag || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          faq: { ...faq, tag: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Tiêu đề chính
                    </label>
                    <input
                      type="text"
                      value={faq.heading || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          faq: { ...faq, heading: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* FAQ Questions List */}
                <div className="space-y-4 pt-2">
                  {(faq.faqs || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D5] space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-gold">Câu hỏi 0{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (faq.faqs || []).filter((_, i) => i !== idx);
                            setData({ ...data, faq: { ...faq, faqs: updated } });
                            showToast('Đã xóa câu hỏi', '', 'info');
                          }}
                          className="text-xs text-red-500 hover:text-red-700 p-1"
                          aria-label="Xóa câu hỏi"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={item.q}
                        onChange={(e) => {
                          const updated = [...(faq.faqs || [])];
                          updated[idx].q = e.target.value;
                          setData({ ...data, faq: { ...faq, faqs: updated } });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E0D5] text-xs font-semibold text-charcoal"
                        placeholder="Nội dung câu hỏi"
                      />

                      <textarea
                        rows={3}
                        value={item.a}
                        onChange={(e) => {
                          const updated = [...(faq.faqs || [])];
                          updated[idx].a = e.target.value;
                          setData({ ...data, faq: { ...faq, faqs: updated } });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E0D5] text-xs text-charcoal-600 leading-relaxed"
                        placeholder="Nội dung câu trả lời"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 11: LIÊN HỆ TƯ VẤN (CONTACT) */}
            {/* ============================================================ */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-medium text-charcoal flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-gold" />
                    <span>Liên Hệ & Tiếp Nhận Yêu Cầu Tư Vấn</span>
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Cấu hình thông điệp kết nối, hình ảnh đại diện và cam kết phản hồi.
                  </p>
                </div>

                {/* Contact Image with Media Picker */}
                <div>
                  <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                    Hình ảnh khu tư vấn / Không gian tiếp khách
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-warm-200 border border-[#E5E0D5] shrink-0">
                      <Image
                        src={contact.image || '/uploads/the-gio-riverside.png'}
                        alt="Contact Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <input
                      type="text"
                      value={contact.image}
                      onChange={(e) =>
                        setData({
                          ...data,
                          contact: { ...contact, image: e.target.value }
                        })
                      }
                      className="flex-1 px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        openMediaPicker((url) => {
                          setData({
                            ...data,
                            contact: { ...contact, image: url }
                          });
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-charcoal hover:bg-gold text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Chọn ảnh</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Nhãn phụ (Badge Tag)
                    </label>
                    <input
                      type="text"
                      value={contact.tag}
                      onChange={(e) =>
                        setData({
                          ...data,
                          contact: { ...contact, tag: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Tiêu đề chính
                    </label>
                    <input
                      type="text"
                      value={contact.heading}
                      onChange={(e) =>
                        setData({
                          ...data,
                          contact: { ...contact, heading: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                    Lời cam kết / Trích dẫn phản hồi
                  </label>
                  <textarea
                    rows={3}
                    value={contact.quote}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contact: { ...contact, quote: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal leading-relaxed outline-none focus:border-gold"
                  />
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 12: CÀI ĐẶT WEBSITE & MENU (SETTINGS) */}
            {/* ============================================================ */}
            {activeTab === 'site_settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-medium text-charcoal flex items-center gap-2">
                    <Settings className="w-5 h-5 text-gold" />
                    <span>Cài Đặt Toàn Trang & Thanh Điều Hướng</span>
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Cập nhật logo, tên thương hiệu, số hotline, email, địa chỉ và menu điều hướng header/footer.
                  </p>
                </div>

                {/* Logo with Media Picker */}
                <div>
                  <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                    Logo thương hiệu (Hiển thị Header & Footer)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative w-28 h-12 rounded-xl overflow-hidden bg-[#0B0F19] border border-white/20 p-2 shrink-0 flex items-center justify-center">
                      <Image
                        src={settings.logo || '/uploads/logo-dong-hoa-property.png'}
                        alt="Logo Preview"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <input
                      type="text"
                      value={settings.logo}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...settings, logo: e.target.value }
                        })
                      }
                      className="flex-1 px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        openMediaPicker((url) => {
                          setData({
                            ...data,
                            settings: { ...settings, logo: url }
                          });
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-charcoal hover:bg-gold text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Chọn logo</span>
                    </button>
                  </div>
                </div>

                {/* Brand Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Tên thương hiệu (Brand Name)
                    </label>
                    <input
                      type="text"
                      value={settings.brandName}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...settings, brandName: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Khẩu hiệu (Tagline)
                    </label>
                    <input
                      type="text"
                      value={settings.siteTagline}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...settings, siteTagline: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Contact Coordinates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Hotline tư vấn 24/7
                    </label>
                    <input
                      type="text"
                      value={settings.hotline}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...settings, hotline: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs font-bold text-charcoal outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                      Email chính thức
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...settings, email: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-charcoal-700 mb-1.5">
                    Địa chỉ trụ sở văn phòng
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...settings, address: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                  />
                </div>

                {/* Header Nav Links Builder */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gold font-sans">
                      Menu Điều Hướng Header (Thanh Điều Hướng)
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...settings.navLinks, { label: 'Menu Mới', url: '#section' }];
                        setData({ ...data, settings: { ...settings, navLinks: updated } });
                      }}
                      className="text-xs text-charcoal hover:text-gold font-medium flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm link</span>
                    </button>
                  </div>

                  {settings.navLinks.map((link, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => {
                          const updated = [...settings.navLinks];
                          updated[idx].label = e.target.value;
                          setData({ ...data, settings: { ...settings, navLinks: updated } });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E5E0D5] text-xs font-medium"
                        placeholder="Tên menu"
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => {
                          const updated = [...settings.navLinks];
                          updated[idx].url = e.target.value;
                          setData({ ...data, settings: { ...settings, navLinks: updated } });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E5E0D5] text-xs font-mono"
                        placeholder="#anchor hoặc /url"
                      />
                      {settings.navLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = settings.navLinks.filter((_, i) => i !== idx);
                            setData({ ...data, settings: { ...settings, navLinks: updated } });
                          }}
                          className="p-1.5 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: GIT SYNC & BACKUP */}
            {activeTab === 'git_sync' && (
              <div className="bg-white rounded-3xl border border-[#E5E0D5] p-6 sm:p-8 space-y-8 shadow-sm">
                <div className="border-b border-[#E5E0D5] pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-medium text-lg text-charcoal flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-gold" />
                      <span>Đồng Bộ Source Code & Bản Sao Lưu</span>
                    </h3>
                    <p className="text-xs text-charcoal-600 mt-1">
                      Bảo toàn dữ liệu vĩnh viễn: Tự động commit các thay đổi vào GitHub repository để không bị mất khi deploy code mới.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${
                        gitStatus?.hasToken
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          gitStatus?.hasToken ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                        }`}
                      />
                      <span>{gitStatus?.hasToken ? 'GitHub API Sẵn Sàng' : 'Chưa cấu hình GITHUB_TOKEN'}</span>
                    </span>
                  </div>
                </div>

                {/* 1. GITHUB SYNC CARD */}
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D5] space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-charcoal flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-gold" />
                        <span>Đồng Bộ Trực Tiếp Vào GitHub Repository</span>
                      </h4>
                      <p className="text-xs text-charcoal-600 mt-0.5">
                        Repository đích: <code className="font-mono bg-white px-2 py-0.5 rounded border border-[#E5E0D5] text-charcoal font-semibold">{gitStatus?.repo || 'tutranz1124-source/donghoa'}</code> (Branch: <code className="font-mono bg-white px-2 py-0.5 rounded border border-[#E5E0D5] text-charcoal font-semibold">{gitStatus?.branch || 'main'}</code>)
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleManualGitSync}
                      disabled={syncingGit}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-charcoal hover:bg-charcoal/90 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-4 h-4 ${syncingGit ? 'animate-spin text-gold' : 'text-gold'}`} />
                      <span>{syncingGit ? 'Đang đồng bộ...' : 'Đồng Bộ Lên GitHub Ngay'}</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E5E0D5] text-xs text-charcoal-700 space-y-2">
                    <p className="font-semibold text-charcoal flex items-center gap-1.5 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Cơ chế tự động đã được kích hoạt:</span>
                    </p>
                    <p className="leading-relaxed">
                      Mỗi khi bạn bấm <strong>Lưu Thay Đổi</strong> ở bất kỳ mục nào (Nội dung, Hình ảnh, Bài viết Blog, Dự án), hệ thống sẽ tự động gửi commit trực tiếp vào file <code className="font-mono bg-[#FAF8F5] px-1 py-0.5 rounded">data/site-content.json</code> trên branch <code className="font-mono bg-[#FAF8F5] px-1 py-0.5 rounded">main</code> của GitHub.
                    </p>
                  </div>
                </div>

                {/* 2. BACKUP & RESTORE CARD */}
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D5] space-y-5">
                  <h4 className="text-sm font-semibold text-charcoal flex items-center gap-2">
                    <Download className="w-4 h-4 text-gold" />
                    <span>Sao Lưu & Khôi Phục Dữ Liệu Offline (JSON Snapshot)</span>
                  </h4>
                  <p className="text-xs text-charcoal-600">
                    Tải về toàn bộ cơ sở dữ liệu hiện tại (nội dung trang, danh sách bài viết blog, media catalog) về máy tính cá nhân để lưu trữ dự phòng.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleExportBackup}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-warm-100 text-charcoal font-semibold text-xs border border-[#E5E0D5] transition-colors shadow-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-gold" />
                      <span>Tải Bản Sao Lưu (Export JSON)</span>
                    </button>

                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-warm-100 text-charcoal font-semibold text-xs border border-[#E5E0D5] transition-colors shadow-xs cursor-pointer">
                      <UploadCloud className="w-3.5 h-3.5 text-gold" />
                      <span>Khôi Phục Từ File Sao Lưu (Import JSON)</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportBackup}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* 3. DEVELOPER WORKFLOW TIPS */}
                <div className="p-5 rounded-2xl bg-[#0B0F19] text-white border border-white/10 space-y-3 text-xs">
                  <h5 className="font-semibold text-gold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Quy Trình Chuẩn Khi Bạn Cập Nhật Patch Code Mới</span>
                  </h5>
                  <ol className="list-decimal list-inside space-y-1.5 text-white/80 leading-relaxed">
                    <li>
                      Ở máy tính của bạn, mở terminal và gõ <code className="font-mono text-gold bg-white/10 px-1.5 py-0.5 rounded">git pull origin main</code> để kéo toàn bộ nội dung mới nhất mà Admin đã sửa trên live về máy.
                    </li>
                    <li>
                      Tiến hành viết thêm code hoặc sửa tính năng mới theo ý muốn.
                    </li>
                    <li>
                      Gõ <code className="font-mono text-gold bg-white/10 px-1.5 py-0.5 rounded">git add . && git commit -m &quot;feat: your patch&quot; && git push origin main</code>.
                    </li>
                    <li>
                      Vercel sẽ tự động deploy bản code mới mà <strong>toàn bộ dữ liệu Admin đã sửa trước đó không bao giờ bị mất</strong>!
                    </li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Interactive Device Preview (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4 sticky top-20 self-start">
          {/* Viewport Control Bar */}
          <div className="bg-white p-3 rounded-2xl border border-[#E5E0D5] flex items-center justify-between shadow-sm">
            <span className="text-xs font-semibold text-charcoal flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-gold" />
              <span>Xem Trước Trực Quan</span>
            </span>

            <div className="flex items-center gap-1 p-1 bg-[#FAF8F5] rounded-xl border border-[#E5E0D5]">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded-lg transition-colors ${
                  previewDevice === 'desktop' ? 'bg-charcoal text-white shadow-xs' : 'text-charcoal-muted hover:text-charcoal'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('tablet')}
                className={`p-1.5 rounded-lg transition-colors ${
                  previewDevice === 'tablet' ? 'bg-charcoal text-white shadow-xs' : 'text-charcoal-muted hover:text-charcoal'
                }`}
                title="Tablet View"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded-lg transition-colors ${
                  previewDevice === 'mobile' ? 'bg-charcoal text-white shadow-xs' : 'text-charcoal-muted hover:text-charcoal'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Preview Device Frame */}
          <div
            className={`w-full bg-[#0B0F19] rounded-3xl p-3 border border-[#E5E0D5] shadow-lg transition-all duration-300 flex justify-center overflow-hidden ${
              previewDevice === 'mobile'
                ? 'max-w-[380px] mx-auto'
                : previewDevice === 'tablet'
                ? 'max-w-[580px] mx-auto'
                : 'w-full'
            }`}
          >
            <div className="w-full bg-[#FAF8F5] text-charcoal rounded-2xl overflow-y-auto max-h-[720px] flex flex-col shadow-inner">
              {/* Mini Preview Header */}
              <div className="p-4 bg-[#0B0F19] text-white border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="relative w-24 h-6">
                  <Image
                    src={settings.logo || '/uploads/logo-dong-hoa-property.png'}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-[10px] text-gold font-semibold uppercase">
                  Hotline: {settings.hotline}
                </div>
              </div>

              {/* Active Tab Preview Mockup */}
              <div className="p-5 space-y-6">
                {/* HERO PREVIEW */}
                {hero.slides[heroSlideIndex] && (
                  <div className="relative rounded-2xl overflow-hidden border border-[#E5E0D5] h-64 bg-charcoal flex flex-col justify-end p-5">
                    <Image
                      src={hero.slides[heroSlideIndex].backgroundImage || '/uploads/hero_slide_1.png'}
                      alt=""
                      fill
                      className="object-cover opacity-60"
                    />
                    <div className="relative z-10 space-y-2">
                      <span className="text-[9px] font-semibold text-gold uppercase tracking-wider block">
                        {hero.slides[heroSlideIndex].tag}
                      </span>
                      <h4 className="text-base font-serif font-medium text-white leading-snug">
                        {hero.slides[heroSlideIndex].line1}
                      </h4>
                      <p className="text-[11px] text-white/80 line-clamp-2">
                        {hero.slides[heroSlideIndex].description}
                      </p>
                      <div className="flex gap-2 pt-1">
                        <span className="px-3 py-1 bg-gold text-charcoal text-[10px] font-semibold rounded-full">
                          {hero.slides[heroSlideIndex].buttonText}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* PHILOSOPHY PREVIEW */}
                <div className="p-4 rounded-2xl bg-white border border-[#E5E0D5] space-y-3">
                  <span className="text-[9.5px] font-semibold text-gold uppercase tracking-wider block">
                    {philosophy.tag}
                  </span>
                  <h4 className="text-base font-serif font-medium text-charcoal">
                    {philosophy.heading}
                  </h4>
                  <p className="text-xs text-charcoal-600 line-clamp-2">
                    {philosophy.description}
                  </p>
                </div>

                {/* CATEGORIES PREVIEW */}
                <div className="space-y-2">
                  <span className="text-[9.5px] font-semibold text-gold uppercase tracking-wider block">
                    {categories.tag}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {(categories.items || []).slice(0, 4).map((c, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-white border border-[#E5E0D5] space-y-1">
                        <span className="text-[9px] font-mono text-gold font-bold">{c.index}</span>
                        <p className="text-[11px] font-serif font-semibold text-charcoal line-clamp-1">{c.title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ PREVIEW */}
                <div className="p-4 rounded-2xl bg-white border border-[#E5E0D5] space-y-2">
                  <span className="text-[9.5px] font-semibold text-gold uppercase tracking-wider block">
                    {faq.tag}
                  </span>
                  <p className="text-xs font-serif font-medium text-charcoal">
                    {(faq.faqs || [])[0]?.q || 'Câu hỏi pháp lý tiêu biểu'}
                  </p>
                </div>
              </div>

              {/* Mini Preview Footer */}
              <div className="p-4 bg-[#0A0E18] text-white text-center text-[10px] text-white/60 border-t border-white/10 mt-auto">
                {settings.copyright}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MEDIA PICKER MODAL */}
      {mediaPickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-[#E5E0D5] overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#E5E0D5] bg-[#FAF8F5] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-charcoal text-gold flex items-center justify-center">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-medium text-base text-charcoal">
                    Thư Viện Hình Ảnh (Media Library)
                  </h3>
                  <p className="text-xs text-charcoal-600">
                    Chọn ảnh có sẵn hoặc tải ảnh mới từ máy tính của bạn
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMediaPickerOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#E5E0D5] hover:bg-charcoal hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Controls: Search & Upload */}
            <div className="p-4 border-b border-[#E5E0D5] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={mediaSearch}
                  onChange={(e) => setMediaSearch(e.target.value)}
                  placeholder="Tìm kiếm ảnh theo tên..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] text-xs text-charcoal outline-none focus:border-gold"
                />
              </div>

              <label className="w-full sm:w-auto px-4 py-2 rounded-xl bg-charcoal hover:bg-gold text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingImage ? 'Đang tải lên...' : 'Tải ảnh mới lên'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleDirectUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            </div>

            {/* Media Gallery Grid */}
            <div className="p-5 overflow-y-auto grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
              {mediaList
                .filter((m) => m.fileName.toLowerCase().includes(mediaSearch.toLowerCase()))
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (mediaTargetCallback) {
                        mediaTargetCallback(item.url);
                      }
                      setMediaPickerOpen(false);
                      showToast('Đã chọn hình ảnh!', '', 'success');
                    }}
                    className="group relative rounded-2xl overflow-hidden border border-[#E5E0D5] hover:border-gold cursor-pointer bg-[#FAF8F5] flex flex-col transition-all shadow-xs hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] w-full bg-warm-200">
                      <Image src={item.url} alt={item.altText || ''} fill className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-2.5 bg-white border-t border-[#E5E0D5]">
                      <p className="text-[11px] font-medium text-charcoal truncate">{item.fileName}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
