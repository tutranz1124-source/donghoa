'use client';

import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PrivateAccessSectionProps {
  onOpenInquiry?: (defaultMsg?: string) => void;
}

export default function PrivateAccessSection({ onOpenInquiry }: PrivateAccessSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preference: 'can-ho',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) return;
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name || 'Khách hàng quan tâm',
          phone: formData.phone,
          note: `Đăng ký Private Property Access - Phân khúc quan tâm: ${formData.preference}`,
          source: 'Private Property Access Form',
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="private-access" className="py-20 sm:py-28 bg-warm-100 border-b border-warm-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-warm-200 p-8 sm:p-12 lg:p-16 shadow-warm-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Understated Editorial Pitch */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold font-sans block">
                PRIVATE PROPERTY ACCESS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-charcoal leading-[1.2]">
                Nhận Thông Tin Danh Mục Dự Án Mới
              </h2>
              <p className="text-sm sm:text-[15px] text-charcoal-600 leading-relaxed font-normal">
                Đăng ký để nhận danh mục dự án chọn lọc, cập nhật tiến độ xây dựng và phân tích quy hoạch chuyên sâu từ chuyên viên tư vấn.
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-charcoal-muted">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Bảo mật thông tin khách hàng tuyệt đối.</span>
              </div>
            </div>

            {/* Right Column: Discreet Minimal Form */}
            <div className="lg:col-span-6">
              {submitted ? (
                <div className="p-8 bg-warm-50 rounded-2xl border border-warm-200 text-center space-y-3 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-10 h-10 text-gold mx-auto" />
                  <h4 className="text-lg font-serif font-medium text-charcoal">Yêu Cầu Đã Được Tiếp Nhận</h4>
                  <p className="text-xs sm:text-sm text-charcoal-600">
                    Chuyên viên tư vấn Đông Hòa Property sẽ liên hệ hỗ trợ gửi thông tin chi tiết đến quý khách.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 uppercase tracking-wider mb-1.5">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 rounded-xl bg-warm-50 border border-warm-300 focus:border-gold focus:bg-white text-sm text-charcoal outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 uppercase tracking-wider mb-1.5">
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
                    <label className="block text-xs font-medium text-charcoal-700 uppercase tracking-wider mb-1.5">
                      Phân khúc quan tâm
                    </label>
                    <select
                      value={formData.preference}
                      onChange={(e) => setFormData({ ...formData, preference: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-warm-50 border border-warm-300 focus:border-gold focus:bg-white text-sm text-charcoal outline-none transition-all cursor-pointer"
                    >
                      <option value="can-ho">Căn hộ hạng sang & Penthouse</option>
                      <option value="biet-thu">Nhà phố & Biệt thự đô thị</option>
                      <option value="nghi-duong">Bất động sản nghỉ dưỡng</option>
                      <option value="thuong-mai">Shophouse & Thương mại</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 mt-2 rounded-xl bg-charcoal hover:bg-gold text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-warm-sm cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? 'Đang gửi...' : 'Nhận thông tin dự án'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
