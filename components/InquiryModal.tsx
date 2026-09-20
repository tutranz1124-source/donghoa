'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, PhoneCall, ArrowRight } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
  hotline?: string;
}

export default function InquiryModal({
  isOpen,
  onClose,
  defaultProject,
  hotline = '0906.499.279',
}: InquiryModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          serviceType: defaultProject || 'Tư Vấn Chung',
          note: formData.notes || `Quan tâm dự án: ${defaultProject || 'Chưa chọn'}`,
          source: 'Modal Nhận Tư Vấn Trực Tuyến',
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Có lỗi xảy ra, vui lòng thử lại.');
      }
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Không thể gửi yêu cầu. Vui lòng liên hệ hotline.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white border border-warm-200 rounded-3xl shadow-warm-lg p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-warm-100 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-white transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-gold mx-auto" />
            <h3 className="text-2xl font-serif font-medium text-charcoal">Yêu Cầu Đã Được Tiếp Nhận</h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Chuyên viên tư vấn Đông Hòa Property sẽ liên hệ trực tiếp trong thời gian sớm nhất.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-charcoal text-white text-xs font-semibold uppercase tracking-wider hover:bg-gold transition-colors"
            >
              Đóng cửa sổ
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-semibold text-gold uppercase tracking-wider block mb-1">
                ĐÔNG HÒA PROPERTY
              </span>
              <h3 className="text-2xl font-serif font-medium text-charcoal">
                Đăng Ký Nhận Tư Vấn
              </h3>
              {defaultProject && (
                <p className="text-xs text-charcoal-muted mt-1 font-medium">
                  Dự án quan tâm: <span className="text-charcoal font-semibold">{defaultProject}</span>
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-4 py-3 rounded-xl bg-warm-50 border border-warm-300 focus:border-gold focus:bg-white text-sm text-charcoal outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0901 234 567"
                  className="w-full px-4 py-3 rounded-xl bg-warm-50 border border-warm-300 focus:border-gold focus:bg-white text-sm text-charcoal outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                  Email (Tùy chọn)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-warm-50 border border-warm-300 focus:border-gold focus:bg-white text-sm text-charcoal outline-none transition-all"
                />
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 rounded-xl bg-charcoal hover:bg-gold text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-warm-sm cursor-pointer disabled:opacity-50"
              >
                <span>{status === 'loading' ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <a
                  href={`tel:${hotline.replace(/\D/g, '')}`}
                  className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-gold transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-gold" />
                  <span>Hoặc liên hệ Hotline: {hotline}</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
