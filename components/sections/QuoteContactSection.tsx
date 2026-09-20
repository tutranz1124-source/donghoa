'use client';

import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { ContactData } from '@/lib/types';

interface QuoteContactSectionProps {
  data?: ContactData;
}

export default function QuoteContactSection({ data }: QuoteContactSectionProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    budget: '3-5-ty',
    propertyType: 'can-ho',
    notes: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
          budget: formData.budget,
          serviceType: formData.propertyType,
          note: formData.notes,
          source: 'Trang chủ - Form Tư Vấn Bất Động Sản',
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Có lỗi xảy ra, vui lòng thử lại.');
      }

      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Không thể gửi biểu mẫu. Vui lòng liên hệ trực tiếp qua hotline.');
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white border-b border-warm-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact Details & Advisory Proposition */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold font-sans block">
                KẾT NỐI TƯ VẤN
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal leading-[1.2]">
                Liên Hệ Chuyên Viên Tư Vấn
              </h2>
              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal pt-1">
                Quý khách vui lòng để lại thông tin hoặc liên hệ trực tiếp văn phòng Đông Hòa Property để nhận hỗ trợ chọn căn và tư vấn phương án tài chính tối ưu.
              </p>
            </div>

            {/* Direct Contact Info */}
            <div className="space-y-4 pt-2">
              <a
                href={`tel:${(data?.phone || '0906.499.279').replace(/\D/g, '')}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-warm-50 border border-warm-200 hover:border-gold/50 transition-colors group"
              >
                <div className="w-11 h-11 rounded-full bg-white border border-warm-200 flex items-center justify-center text-gold group-hover:scale-110 transition-transform shadow-warm-sm">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-charcoal-muted block">Hotline tư vấn</span>
                  <span className="text-base font-semibold text-charcoal font-mono">{data?.phone || '0906.499.279'}</span>
                </div>
              </a>

              <a
                href={`mailto:${data?.email || 'donghoaproperty@gmail.com'}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-warm-50 border border-warm-200 hover:border-gold/50 transition-colors group"
              >
                <div className="w-11 h-11 rounded-full bg-white border border-warm-200 flex items-center justify-center text-gold group-hover:scale-110 transition-transform shadow-warm-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-charcoal-muted block">Email liên hệ</span>
                  <span className="text-sm font-medium text-charcoal">{data?.email || 'donghoaproperty@gmail.com'}</span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-warm-50 border border-warm-200">
                <div className="w-11 h-11 rounded-full bg-white border border-warm-200 flex items-center justify-center text-gold shrink-0 shadow-warm-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-charcoal-muted block">Địa chỉ văn phòng</span>
                  <span className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-normal">
                    {data?.address || 'TP. Hồ Chí Minh & các văn phòng đại diện dự án'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Container */}
          <div className="lg:col-span-7 bg-warm-50 p-8 sm:p-10 rounded-3xl border border-warm-200 shadow-warm-sm">
            {status === 'success' ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-white border border-warm-200 flex items-center justify-center mx-auto text-gold shadow-warm-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-medium text-charcoal">Yêu Cầu Đã Được Tiếp Nhận</h3>
                <p className="text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
                  Cảm ơn quý khách đã gửi thông tin. Chuyên viên tư vấn Đông Hòa Property sẽ chủ động liên hệ hỗ trợ trong thời gian sớm nhất.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setFormData({
                      fullName: '',
                      phone: '',
                      email: '',
                      budget: '3-5-ty',
                      propertyType: 'can-ho',
                      notes: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded-full bg-charcoal text-white text-xs font-semibold uppercase tracking-wider hover:bg-gold transition-colors"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-warm-300 focus:border-gold text-sm text-charcoal outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0901 234 567"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-warm-300 focus:border-gold text-sm text-charcoal outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                      Phân khúc quan tâm
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-warm-300 focus:border-gold text-sm text-charcoal outline-none transition-all cursor-pointer"
                    >
                      <option value="can-ho">Căn hộ & Penthouse</option>
                      <option value="biet-thu">Biệt thự & Nhà phố</option>
                      <option value="nghi-duong">Bất động sản nghỉ dưỡng</option>
                      <option value="thuong-mai">Shophouse & Thương mại</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                      Ngân sách dự kiến
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-warm-300 focus:border-gold text-sm text-charcoal outline-none transition-all cursor-pointer"
                    >
                      <option value="duoi-3-ty">Dưới 3 Tỷ VNĐ</option>
                      <option value="3-5-ty">Từ 3 – 5 Tỷ VNĐ</option>
                      <option value="5-10-ty">Từ 5 – 10 Tỷ VNĐ</option>
                      <option value="tren-10-ty">Trên 10 Tỷ VNĐ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                    Nhu cầu chi tiết (Tùy chọn)
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Quý khách có thể ghi rõ dự án quan tâm hoặc yêu cầu đặc thù về số phòng ngủ, hướng nhà..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-warm-300 focus:border-gold text-sm text-charcoal outline-none transition-all resize-none"
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
                  className="w-full py-4 rounded-xl bg-charcoal hover:bg-gold text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-warm-sm cursor-pointer disabled:opacity-50"
                >
                  <span>{status === 'loading' ? 'Đang gửi yêu cầu...' : 'Gửi yêu cầu tư vấn'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11.5px] text-charcoal-muted text-center pt-1">
                  Đông Hòa Property cam kết bảo mật tuyệt đối thông tin khách hàng.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
