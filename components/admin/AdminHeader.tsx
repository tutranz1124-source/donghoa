'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Eye,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Edit3,
  Sparkles,
  Layers,
  FileText,
  ImageIcon,
  Users,
  LayoutDashboard
} from 'lucide-react';
import { AuthSessionUser } from '@/lib/types';

interface AdminHeaderProps {
  user: AuthSessionUser | null;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const pathname = usePathname();

  const getPageMeta = () => {
    switch (pathname) {
      case '/admin':
        return { title: 'Tổng quan', shortTitle: 'Tổng quan', icon: LayoutDashboard, category: 'Dashboard' };
      case '/admin/pages':
        return { title: 'Trang chủ & Canvas', shortTitle: 'Trang chủ', icon: Layers, category: 'Page Builder' };
      case '/admin/blog':
        return { title: 'Bài viết Blog', shortTitle: 'Bài viết', icon: FileText, category: 'Blog CMS' };
      case '/admin/media':
        return { title: 'Thư viện Media', shortTitle: 'Media', icon: ImageIcon, category: 'Media Library' };
      case '/admin/users':
        return { title: 'Tài khoản & Phân quyền', shortTitle: 'Tài khoản', icon: Users, category: 'System' };
      default:
        return { title: 'Quản trị CMS', shortTitle: 'CMS', icon: Sparkles, category: 'Admin' };
    }
  };

  const meta = getPageMeta();
  const Icon = meta.icon;
  const isAdmin = user?.role === 'admin';

  return (
    <header className="hidden md:flex items-center justify-between px-4 sm:px-6 lg:px-7 py-2 bg-white border-b border-[#e2ddd3] sticky top-0 z-30 shadow-2xs">
      {/* Breadcrumb / Page Title */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-7 h-7 rounded-lg bg-[#faf8f5] border border-[#e2ddd3] flex items-center justify-center text-[#c5a26c] shrink-0">
          <Icon className="w-3.5 h-3.5" />
        </div>
        <div className="flex items-center gap-1.5 text-[12px] min-w-0">
          <span className="text-[#6e706a] font-medium hidden lg:inline">{meta.category}</span>
          <ChevronRight className="w-3 h-3 text-gray-400 hidden lg:inline" />
          <span className="font-bold text-[#04092b] truncate">
            <span className="hidden sm:inline">{meta.title}</span>
            <span className="sm:hidden">{meta.shortTitle}</span>
          </span>
        </div>
      </div>

      {/* Right Utility Bar */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Live Sync Status Pill */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
          <span className="hidden xl:inline">Live Sync Active</span>
          <span className="xl:hidden">Live</span>
        </div>

        {/* Quick Public View Links */}
        <div className="flex items-center gap-0.5 bg-[#faf8f5] p-0.5 rounded-lg border border-[#e2ddd3]">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-[#04092b] hover:bg-white hover:text-[#c5a26c] rounded-md transition-all"
            title="Xem giao diện trang chủ đang chạy"
          >
            <Eye className="w-3 h-3 text-[#c5a26c]" />
            <span className="hidden sm:inline">Trang Chủ</span>
          </a>
          <Link
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-[#04092b] hover:bg-white hover:text-[#c5a26c] rounded-md transition-all"
            title="Xem trang blog công khai"
          >
            <BookOpen className="w-3 h-3 text-[#c5a26c]" />
            <span className="hidden sm:inline">Blog</span>
          </Link>
        </div>

        {/* User Role Tag */}
        {user && (
          <div className="flex items-center gap-1.5 pl-2 border-l border-[#e2ddd3]">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] shadow-xs shrink-0 ${
                isAdmin ? 'bg-[#04092b] text-[#c5a26c] border border-[#c5a26c]/40' : 'bg-blue-600 text-white'
              }`}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="text-left hidden xl:block">
              <span className="block text-[11.5px] font-bold text-[#04092b] leading-tight truncate max-w-[100px]">
                {user.name}
              </span>
              <span className="block text-[8.5px] text-[#6e706a] uppercase font-semibold">
                {isAdmin ? 'Quản trị' : 'Biên tập'}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
