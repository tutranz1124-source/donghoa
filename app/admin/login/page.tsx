'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck, Edit3 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.user && data.user.role === 'editor') {
          router.push('/admin/blog');
        } else {
          router.push('/admin');
        }
      } else {
        setError(data.message || 'Tài khoản hoặc mật khẩu không chính xác.');
      }
    } catch {
      setError('Đã có lỗi xảy ra trong quá trình đăng nhập.');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickLogin = (role: 'admin' | 'editor') => {
    if (role === 'admin') {
      setEmail('admin@donghoaproperty.vn');
      setPassword('donghoa2026');
    } else {
      setEmail('editor@donghoaproperty.vn');
      setPassword('editor2026');
    }
  };

  return (
    <div className="min-h-screen bg-[#04092b] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#c5a26c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#0b1959]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white p-5 sm:p-8 shadow-2xl rounded-3xl border border-[#c5a26c]/40 relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="relative h-16 w-24 mx-auto p-2 rounded-2xl bg-[#04092b] border border-[#c5a26c]/30 shadow-md flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src="/uploads/logo-dong-hoa-property.png"
                alt="Đông Hòa Property"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold tracking-widest text-[#c5a26c] uppercase font-accent">
              HỆ THỐNG QUẢN TRỊ CMS
            </span>
            <h1 className="text-[24px] font-bold text-[#04092b] font-display">
              Đăng Nhập Quản Trị
            </h1>
            <p className="text-[12.5px] text-[#6e706a]">
              Đăng nhập với quyền Quản trị viên (Admin) hoặc Biên tập viên Blog
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold uppercase text-[#04092b] mb-1.5">
              Email / Tên đăng nhập
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#e2ddd3] focus:border-[#c5a26c] focus:outline-none text-[14px] rounded-xl"
                placeholder="admin@donghoaproperty.vn"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold uppercase text-[#04092b] mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#e2ddd3] focus:border-[#c5a26c] focus:outline-none text-[13px] rounded-xl"
                placeholder="Nhập mật khẩu..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] py-3.5 text-[13px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg rounded-xl"
          >
            {loading ? 'Đang xác thực...' : 'Đăng nhập CMS'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Fill Login Badges */}
        <div className="pt-2 border-t border-[#e2ddd3] space-y-2">
          <p className="text-[11px] font-bold text-[#6e706a] text-center uppercase tracking-wider">
            Tài khoản mẫu thử nghiệm:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillQuickLogin('admin')}
              className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Quản Trị Viên (Admin)
            </button>
            <button
              type="button"
              onClick={() => fillQuickLogin('editor')}
              className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-600" /> Biên Tập Blog (Editor)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
