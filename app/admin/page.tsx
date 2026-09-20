'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  Image as ImageIcon,
  ArrowRight,
  Eye,
  Plus,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Palette,
  Layers,
  PhoneCall,
  ShieldCheck,
  Zap,
  Clock,
  Compass,
  Briefcase,
  Building,
  Building2,
  Upload,
  ExternalLink,
  Users,
  MessageSquare
} from 'lucide-react';
import { BlogPost, MediaItem, SiteContentData, CustomerInquiry, ProjectItem } from '@/lib/types';

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [content, setContent] = useState<SiteContentData | null>(null);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/posts').then((r) => r.json()).catch(() => []),
      fetch('/api/media').then((r) => r.json()).catch(() => []),
      fetch('/api/content').then((r) => r.json()).catch(() => null),
      fetch('/api/contact').then((r) => r.json()).catch(() => ({ inquiries: [] })),
      fetch('/api/projects').then((r) => r.json()).catch(() => ({ projects: [] }))
    ])
      .then(([postsData, mediaData, contentData, inqData, projData]) => {
        if (Array.isArray(postsData)) setPosts(postsData);
        if (Array.isArray(mediaData)) setMedia(mediaData);
        if (contentData) setContent(contentData);
        if (Array.isArray(inqData?.inquiries)) setInquiries(inqData.inquiries);
        if (Array.isArray(projData?.projects)) setProjects(projData.projects);
      })
      .finally(() => setLoading(false));
  }, []);

  const publishedPosts = posts.filter((p) => p.status === 'published').length;
  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;
  const featuredProjectsCount = projects.filter((p) => p.featured).length;

  const sectionsStatus = [
    { name: '1. Banner & Tagline Hero', tab: 'hero', icon: Sparkles, desc: 'Slideshow bất động sản & thông điệp' },
    { name: '2. Danh Mục Dự Án Tiêu Biểu', tab: 'projects', icon: Building2, desc: '9 Dự án cao cấp & Bộ lọc' },
    { name: '3. Canva Studio (4 Phong Cách)', tab: 'canva', icon: Layers, desc: 'Modern, Cozy, Luxury, Heritage' },
    { name: '4. Tầm Nhìn & Sứ Mệnh', tab: 'philosophy', icon: Compass, desc: '3 Trụ cột cốt lõi thương hiệu' },
    { name: '5. Tư Vấn & Nhận Thông Tin', tab: 'contact', icon: PhoneCall, desc: 'Form tiếp nhận khách hàng & Hotline' },
    { name: '6. Không Gian Văn Phòng', tab: 'office', icon: Briefcase, desc: 'Showroom, văn phòng & Bảng màu' },
    { name: '7. Thương Hiệu & Footer', tab: 'settings', icon: Building, desc: 'Logo, Hotline, Địa chỉ & Pháp lý' },
  ];

  return (
    <div className="space-y-3.5 sm:space-y-4 max-w-[1440px] mx-auto pb-8 text-[12px]">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#04092b] via-[#0b1340] to-[#04092b] text-white p-3.5 sm:p-4.5 rounded-xl border border-[#c5a26c]/30 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-0.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#c5a26c]/20 border border-[#c5a26c]/40 text-[#c5a26c] text-[9.5px] font-bold uppercase tracking-wider font-accent">
              <Sparkles className="w-2.5 h-2.5" /> Trung Tâm Quản Trị Đông Hòa Property
            </div>
            <h1 className="text-[16px] sm:text-[18px] font-bold text-white font-display leading-tight">
              Bảng Điều Khiển Hệ Thống
            </h1>
            <p className="text-[11.5px] text-white/80 leading-relaxed font-light">
              Quản lý danh mục dự án bất động sản, tiếp nhận khách hàng CRM, bài viết thị trường và tùy biến giao diện website.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              href="/admin/inquiries"
              className="px-3 py-1.5 bg-[#c5a26c] hover:bg-[#b5915a] text-[#04092b] font-bold text-[11.5px] rounded-lg transition-all shadow-xs flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Xem Khách Hàng ({newInquiriesCount} Mới)</span>
            </Link>
            <Link
              href="/admin/projects"
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-[11.5px] rounded-lg transition-all border border-white/20 flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Quản Lý Dự Án</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* CRM Leads Metric */}
        <Link
          href="/admin/inquiries"
          className="bg-white p-3 sm:p-3.5 rounded-xl border border-[#e2ddd3] hover:border-[#c5a26c] shadow-2xs hover:shadow-xs transition-all group block"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#6e706a] uppercase">Khách Hàng (CRM)</span>
            <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <Users className="w-3 h-3" />
            </div>
          </div>
          <p className="text-[16px] sm:text-[18px] font-bold text-[#04092b] font-display mt-1">
            {inquiries.length} Yêu Cầu
          </p>
          <p className="text-[10.5px] text-[#c5a26c] font-bold flex items-center gap-0.5 mt-0.5 group-hover:underline">
            {newInquiriesCount > 0 ? `${newInquiriesCount} lead mới chưa xử lý →` : 'Xem danh sách lead →'}
          </p>
        </Link>

        {/* Real Estate Projects Metric */}
        <Link
          href="/admin/projects"
          className="bg-white p-3 sm:p-3.5 rounded-xl border border-[#e2ddd3] hover:border-[#c5a26c] shadow-2xs hover:shadow-xs transition-all group block"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#6e706a] uppercase">Dự Án BĐS</span>
            <div className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Building2 className="w-3 h-3" />
            </div>
          </div>
          <p className="text-[16px] sm:text-[18px] font-bold text-[#04092b] font-display mt-1">
            {projects.length} Dự Án
          </p>
          <p className="text-[10.5px] text-[#c5a26c] font-bold flex items-center gap-0.5 mt-0.5 group-hover:underline">
            {featuredProjectsCount} dự án nổi bật →
          </p>
        </Link>

        {/* Blog Posts Metric */}
        <Link
          href="/admin/blog"
          className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#e2ddd3] hover:border-[#c5a26c] shadow-2xs hover:shadow-xs transition-all group block"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-[#6e706a] uppercase">Bài viết xuất bản</span>
            <div className="w-7 h-7 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center text-green-600">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-[18px] sm:text-[20px] font-bold text-[#04092b] font-display mt-1">{publishedPosts} Bài Viết</p>
          <p className="text-[11px] text-[#c5a26c] font-bold flex items-center gap-0.5 mt-0.5 group-hover:underline">
            Quản lý nội dung →
          </p>
        </Link>

        {/* Media Assets Metric */}
        <Link
          href="/admin/media"
          className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#e2ddd3] hover:border-[#c5a26c] shadow-2xs hover:shadow-xs transition-all group block"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold text-[#6e706a] uppercase">Thư viện ảnh</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <ImageIcon className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-[18px] sm:text-[20px] font-bold text-[#04092b] font-display mt-1">{media.length} Tài Nguyên</p>
          <p className="text-[11px] text-[#c5a26c] font-bold flex items-center gap-0.5 mt-0.5 group-hover:underline">
            Quản lý thư viện →
          </p>
        </Link>
      </div>

      {/* 2-Column Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* Left Column: Homepage Section Jump Board */}
        <div className="lg:col-span-8 bg-white p-4 sm:p-6 rounded-2xl border border-[#e2ddd3] shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#e2ddd3] pb-3">
            <div>
              <h3 className="font-bold text-[14.5px] text-[#04092b] flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-[#c5a26c]" /> Bảng Điều Hướng Khối Nội Dung Trang Chủ
              </h3>
              <p className="text-[11.5px] text-[#6e706a] mt-0.5">
                Bấm vào từng khối để mở nhanh tab chỉnh sửa tương ứng trong Page Editor.
              </p>
            </div>
            <Link
              href="/admin/pages"
              className="text-[11.5px] font-bold text-[#c5a26c] hover:underline flex items-center gap-0.5 shrink-0"
            >
              Mở Soạn Thảo →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {sectionsStatus.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <Link
                  key={idx}
                  href={`/admin/pages?tab=${sec.tab}`}
                  className="p-3 rounded-xl border border-[#e2ddd3] hover:border-[#c5a26c] bg-[#faf8f5] hover:bg-white transition-all group flex items-start justify-between gap-2.5 shadow-2xs"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-white border border-[#e2ddd3] flex items-center justify-center text-[#04092b] group-hover:text-[#c5a26c] group-hover:border-[#c5a26c] shrink-0 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-[12px] text-[#04092b] group-hover:text-[#c5a26c] transition-colors truncate">
                        {sec.name}
                      </h4>
                      <p className="text-[10.5px] text-[#6e706a] truncate mt-0.5">{sec.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#c5a26c] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Column: System Status & Quick Guide */}
        <div className="lg:col-span-4 space-y-4">
          {/* Real-time System Status Card */}
          <div className="bg-white p-4 rounded-2xl border border-[#e2ddd3] shadow-2xs space-y-3">
            <h3 className="font-bold text-[13.5px] text-[#04092b] flex items-center gap-1.5 border-b border-[#e2ddd3] pb-2.5">
              <Zap className="w-3.5 h-3.5 text-[#c5a26c]" /> Trạng Thái Hệ Thống
            </h3>

            <div className="space-y-2 text-[11.5px]">
              <div className="flex items-center justify-between p-2 bg-[#faf8f5] rounded-lg border border-[#e2ddd3]">
                <span className="text-[#6e706a] font-medium">Đồng bộ đa tab (Broadcast)</span>
                <span className="font-bold text-green-700 bg-green-100 px-1.5 py-0.2 rounded text-[10px] flex items-center gap-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Hoạt động
                </span>
              </div>

              <div className="flex items-center justify-between p-2 bg-[#faf8f5] rounded-lg border border-[#e2ddd3]">
                <span className="text-[#6e706a] font-medium">Lưu trữ dữ liệu</span>
                <span className="font-bold text-[#04092b] font-mono text-[11px]">JSON & Memory Cache</span>
              </div>

              <div className="flex items-center justify-between p-2 bg-[#faf8f5] rounded-lg border border-[#e2ddd3]">
                <span className="text-[#6e706a] font-medium">Bảo mật API & Auth</span>
                <span className="font-bold text-green-700 bg-green-100 px-1.5 py-0.2 rounded text-[10px]">
                  Bảo vệ phiên 7 ngày
                </span>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts for Editor */}
          <div className="bg-white p-4 rounded-2xl border border-[#e2ddd3] shadow-2xs space-y-3">
            <h3 className="font-bold text-[13.5px] text-[#04092b] flex items-center gap-1.5 border-b border-[#e2ddd3] pb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a26c]" /> Phím Tắt & Thao Tác
            </h3>

            <div className="space-y-2 text-[11.5px] text-[#6e706a]">
              <div className="flex items-center justify-between">
                <span>Lưu thay đổi trong Editor</span>
                <kbd className="px-1.5 py-0.5 bg-[#faf8f5] border border-[#e2ddd3] rounded font-mono font-bold text-[10px] text-[#04092b]">
                  Ctrl + S
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Xem trực tiếp trang chủ</span>
                <a href="/" target="_blank" className="text-[#c5a26c] font-bold hover:underline">
                  Mở tab mới ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
