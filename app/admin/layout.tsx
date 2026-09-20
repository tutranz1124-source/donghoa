'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  LayoutDashboard,
  Layers,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Eye,
  BookOpen,
  Users,
  ShieldCheck,
  Edit3,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AuthSessionUser } from '@/lib/types';
import { ToastProvider } from '@/components/admin/ToastContext';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<AuthSessionUser | null>(null);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isLoginPage) {
      fetch('/api/auth')
        .then((res) => {
          if (!res.ok) {
            router.push('/admin/login');
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (data && data.user) {
            setUser(data.user);

            // Role route guard
            if (data.user.role === 'editor') {
              if (pathname === '/admin/pages' || pathname === '/admin/users' || pathname === '/admin') {
                router.push('/admin/blog');
              }
            }
          }
          setCheckingAuth(false);
        })
        .catch(() => router.push('/admin/login'));
    } else {
      setCheckingAuth(false);
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <ToastProvider>{children}</ToastProvider>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#04092b] flex flex-col items-center justify-center text-white gap-2.5">
        <div className="w-8 h-8 border-2 border-[#c5a26c] border-t-transparent rounded-full animate-spin" />
        <p className="text-[11.5px] font-bold text-[#c5a26c] uppercase tracking-wider font-accent">
          Đang tải không gian quản trị...
        </p>
      </div>
    );
  }

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const isAdmin = user?.role === 'admin';

  // Dynamic Navigation Items based on role
  const navItems = isAdmin
    ? [
        { label: 'Tổng quan', href: '/admin', icon: LayoutDashboard },
        { label: 'Trang chủ & Canvas', href: '/admin/pages', icon: Layers },
        { label: 'Bất động sản & Dự án', href: '/admin/projects', icon: Sparkles },
        { label: 'Khách hàng & CRM', href: '/admin/inquiries', icon: Users },
        { label: 'Bài viết Blog', href: '/admin/blog', icon: FileText },
        { label: 'Thư viện Media', href: '/admin/media', icon: ImageIcon },
        { label: 'Tài khoản & Quyền', href: '/admin/users', icon: ShieldCheck }
      ]
    : [
        { label: 'Bất động sản & Dự án', href: '/admin/projects', icon: Sparkles },
        { label: 'Khách hàng & CRM', href: '/admin/inquiries', icon: Users },
        { label: 'Bài viết Blog', href: '/admin/blog', icon: FileText },
        { label: 'Thư viện Media', href: '/admin/media', icon: ImageIcon }
      ];

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#f4f1ea] flex flex-col md:flex-row font-sans selection:bg-[#c5a26c] selection:text-[#04092b] text-[13px] text-[#2d302e]">
        {/* Sticky Sidebar Desktop (Always fixed to viewport while user scrolls) */}
        <aside
          className={`hidden md:flex bg-[#04092b] text-white flex-col justify-between shrink-0 border-r border-[#c5a26c]/20 z-40 transition-all duration-300 sticky top-0 h-screen overflow-hidden ${
            isCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none">
            {/* Logo & Header */}
            <div
              className={`p-3.5 border-b border-white/10 flex items-center ${
                isCollapsed ? 'justify-center flex-col gap-1.5' : 'justify-between'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative h-8 w-10 shrink-0">
                  <Image
                    src="/uploads/logo-dong-hoa-property.png"
                    alt="Đông Hòa Property"
                    fill
                    className="object-contain"
                  />
                </div>
                {!isCollapsed && (
                  <div className="min-w-0">
                    <h2 className="font-bold text-[13px] text-white font-display truncate">Đông Hòa Property</h2>
                    <p className="text-[9px] text-[#c5a26c] uppercase tracking-wider font-accent">Studio CMS</p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-[#c5a26c] hover:text-[#04092b] text-white transition-all shrink-0"
                title={isCollapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
              >
                {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* User Profile Capsule in Sidebar */}
            {user && !isCollapsed && (
              <div className="mx-3 my-2.5 p-2 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/10 flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[11.5px] shadow-xs shrink-0 ${
                    isAdmin ? 'bg-[#c5a26c] text-[#04092b]' : 'bg-blue-600 text-white'
                  }`}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[12px] text-white truncate leading-tight">{user.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {isAdmin ? (
                      <span className="text-[9px] font-semibold text-[#c5a26c] bg-[#c5a26c]/20 px-1.5 py-0.2 rounded inline-flex items-center gap-0.5">
                        <ShieldCheck className="w-2.5 h-2.5" /> Admin
                      </span>
                    ) : (
                      <span className="text-[9px] font-semibold text-blue-300 bg-blue-500/20 px-1.5 py-0.2 rounded inline-flex items-center gap-0.5">
                        <Edit3 className="w-2.5 h-2.5" /> Editor
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="p-3 space-y-1.5 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.label}
                    className={`flex items-center gap-3 px-3 py-2.5 text-[12.5px] font-medium transition-all rounded-xl relative group ${
                      active
                        ? 'bg-[#c5a26c] text-[#04092b] font-bold shadow-sm'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {!isCollapsed && <span className="truncate flex-1">{item.label}</span>}
                    {/* Collapsed Tooltip */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2.5 py-1 bg-[#04092b] text-white text-[11px] font-bold rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-[#c5a26c]/40 shadow-lg">
                        {item.label}
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="p-3 border-t border-white/10 space-y-1.5">
            <Link
              href="/blog"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-white text-[11px] font-medium transition-colors rounded-lg ${
                isCollapsed ? 'justify-center' : 'justify-between'
              }`}
              title="Xem trang blog công khai"
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-[#c5a26c]" />
                {!isCollapsed && 'Xem Blog Live'}
              </span>
              {!isCollapsed && <ExternalLink className="w-2.5 h-2.5 opacity-60" />}
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-white text-[11px] font-medium transition-colors rounded-lg ${
                isCollapsed ? 'justify-center' : 'justify-between'
              }`}
              title="Xem trang chủ công khai"
            >
              <span className="flex items-center gap-1.5">
                <Eye className="w-3 h-3 text-[#c5a26c]" />
                {!isCollapsed && 'Xem Trang Chủ'}
              </span>
              {!isCollapsed && <ExternalLink className="w-2.5 h-2.5 opacity-60" />}
            </a>

            <button
              onClick={handleLogout}
              className={`flex items-center gap-1.5 w-full px-2.5 py-1.5 text-red-300 hover:text-red-100 hover:bg-red-950/50 text-[11px] font-semibold transition-colors rounded-lg ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title="Đăng xuất khỏi hệ thống"
            >
              <LogOut className="w-3 h-3" />
              {!isCollapsed && 'Đăng xuất'}
            </button>
          </div>
        </aside>

        {/* Mobile Top Navigation Bar */}
        <div className="md:hidden bg-[#04092b] text-white py-2 px-3 flex items-center justify-between sticky top-0 z-50 border-b border-[#c5a26c]/30 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-8">
              <Image
                src="/uploads/logo-dong-hoa-property.png"
                alt="Đông Hòa Property"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-bold text-[12px] block leading-tight">Đông Hòa Property</span>
              {user && (
                <span className="text-[9px] text-[#c5a26c] block leading-tight">
                  {isAdmin ? 'Admin' : 'Editor'} ({user.name})
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-white/10 text-white hover:text-[#c5a26c] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Slide-Over Drawer with Backdrop */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Drawer Content */}
            <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#04092b] text-white p-4 space-y-3 shadow-2xl flex flex-col justify-between border-l border-[#c5a26c]/30 animate-in slide-in-from-right duration-200 z-10">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a26c]" />
                    <span className="font-bold text-[13px]">Menu Quản Trị</span>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 rounded text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 text-[12.5px] font-medium rounded-lg transition-all ${
                          active
                            ? 'bg-[#c5a26c] text-[#04092b] font-bold shadow-xs'
                            : 'text-white/80 hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-1.5 pt-2.5 border-t border-white/10">
                <a
                  href="/"
                  target="_blank"
                  className="w-full flex items-center justify-center gap-1.5 py-2 bg-white/10 hover:bg-white/20 text-[#c5a26c] text-[11.5px] font-bold rounded-lg transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> Xem Trang Chủ Live
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-1.5 py-2 bg-red-950/60 hover:bg-red-900 text-red-200 text-[11.5px] font-bold rounded-lg transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" /> Đăng xuất
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          <AdminHeader user={user} />
          <main className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6 overflow-y-auto w-full max-w-[1600px] mx-auto">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
