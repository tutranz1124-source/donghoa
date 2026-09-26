'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, PhoneCall, ArrowRight, Sparkles } from 'lucide-react';

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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
          projectName: defaultProject || 'Tư Vấn Bất Động Sản',
          need: formData.notes || `Quan tâm: ${defaultProject || 'Tư vấn tổng quan'}`,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B0F19]/70 backdrop-blur-md z-0"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
          className="relative w-full max-w-lg bg-white border border-warm-200 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-auto overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-charcoal hover:scale-105 transition-all cursor-pointer group"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
          </button>

          {status === 'success' ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto animate-bounce" />
              <h3 className="text-2xl font-serif font-medium text-charcoal">Yêu Cầu Đã Được Tiếp Nhận</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed max-w-sm mx-auto">
                Chuyên viên tư vấn Đông Hòa Property sẽ liên hệ trực tiếp qua số điện thoại <strong>{formData.phone}</strong> trong vòng 15 phút.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-charcoal hover:bg-gold text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                Hoàn tất & Đóng
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-semibold text-gold uppercase tracking-wider inline-flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>ĐÔNG HÒA PROPERTY</span>
                </span>
                <h3 id="inquiry-modal-title" className="text-2xl font-serif font-medium text-charcoal">
                  Đăng Ký Nhận Bảng Giá & Tư Vấn
                </h3>
                {defaultProject && (
                  <div className="mt-2.5 px-3.5 py-2 bg-warm-50 rounded-xl border border-warm-200 text-xs text-charcoal-700">
                    Dự án quan tâm: <span className="font-semibold text-charcoal">{defaultProject}</span>
                  </div>
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
                    placeholder="Nhập họ và tên của quý khách..."
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
                    placeholder="090x xxx xxx"
                    className="w-full px-4 py-3 rounded-xl bg-warm-50 border border-warm-300 focus:border-gold focus:bg-white text-sm text-charcoal outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                    Email nhận tài liệu (Tùy chọn)
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
                  className="w-full py-3.5 px-6 rounded-xl bg-charcoal hover:bg-gold text-white hover:text-charcoal text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50 group"
                >
                  <span>{status === 'loading' ? 'Đang gửi thông tin...' : 'GỬI YÊU CẦU TƯ VẤN'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="pt-2 text-center">
                  <a
                    href={`tel:${hotline.replace(/\D/g, '')}`}
                    className="inline-flex items-center gap-1.5 text-xs text-charcoal-600 hover:text-gold transition-colors font-medium"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-gold" />
                    <span>Hotline hỗ trợ trực tiếp: <strong>{hotline}</strong></span>
                  </a>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

