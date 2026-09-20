'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Send, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import { ContactData } from '@/lib/types';

interface QuoteContactSectionProps {
  data?: ContactData;
}

export default function QuoteContactSection({ data }: QuoteContactSectionProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyType: '',
    area: '',
    need: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const image = data?.image || '/uploads/clean_contact_photo.png';
  const tag = data?.tag || 'KẾT NỐI TRỰC TIẾP';
  const heading = data?.heading || 'Đăng Ký Tư Vấn & Nhận Thông Tin Dự Án';
  const quote =
    data?.quote ||
    'Để lại thông tin, đội ngũ Chuyên viên Tư vấn Cấp cao của Đông Hòa Property sẽ phản hồi bảo mật và cung cấp tài liệu chi tiết trong vòng 15 phút.';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage('Vui lòng điền họ tên và số điện thoại liên hệ.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const resJson = await response.json();

      if (!response.ok || resJson.error) {
        throw new Error(resJson.error || 'Gửi yêu cầu không thành công');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setErrorMessage(
        err.message || 'Đã có lỗi xảy ra. Quý khách vui lòng thử lại hoặc gọi trực tiếp hotline.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      propertyType: '',
      area: '',
      need: '',
    });
    setSubmitted(false);
    setErrorMessage('');
  };

  return (
    <section id="contact" className="w-full py-24 sm:py-28 lg:py-36 bg-[#060913] text-white border-t border-white/5 relative overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* LEFT SIDE: Architectural Visual + Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:col-span-5 space-y-8"
          >
            <div className="relative w-full aspect-[4/5] max-w-[500px] rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl group mx-auto lg:mx-0">
              <Image
                src={image}
                alt="Đông Hòa Property - Liên hệ tư vấn"
                fill
                className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent opacity-80" />
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <a
                href="tel:0906499279"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#C5A880]/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-black transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-white/50">Hotline 24/7</p>
                  <p className="text-sm font-semibold text-white group-hover:text-[#C5A880] transition-colors">0906.499.279</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-white/50">Trụ sở chính</p>
                  <p className="text-xs text-white/80 font-light">113-115 Ung Văn Khiêm, Phường Thạnh Mỹ Tây, TP.HCM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Elegant Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-2xl p-8 sm:p-12 backdrop-blur-md shadow-2xl"
          >
            <div className="space-y-4 mb-8">
              <span className="text-xs font-semibold text-[#C5A880] uppercase tracking-[0.25em] font-sans block">
                {tag}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-white leading-tight tracking-tight">
                {heading}
              </h2>
              <div className="w-12 h-0.5 bg-[#C5A880]" />
              <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                {quote}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-8 text-center space-y-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-serif text-white">Gửi Yêu Cầu Thành Công!</h3>
                  <p className="text-xs text-white/70 max-w-md mx-auto font-light leading-relaxed">
                    Cảm ơn quý khách. Chuyên viên tư vấn của Đông Hòa Property sẽ liên hệ lại qua số điện thoại <strong>{formData.phone}</strong> trong vòng 15 phút.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-4 px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Gửi yêu cầu khác
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/80">Họ và tên *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#C5A880] focus:bg-white/10 text-white placeholder-white/30 text-sm transition-all outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/80">Số điện thoại *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0901 234 567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#C5A880] focus:bg-white/10 text-white placeholder-white/30 text-sm transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/80">Email liên hệ</label>
                      <input
                        type="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#C5A880] focus:bg-white/10 text-white placeholder-white/30 text-sm transition-all outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/80">Phân khúc quan tâm</label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#0E1322] border border-white/10 focus:border-[#C5A880] text-white text-sm transition-all outline-none"
                      >
                        <option value="">-- Chọn phân khúc --</option>
                        <option value="Căn hộ hạng sang">Căn hộ hạng sang</option>
                        <option value="Nhà phố thương mại">Nhà phố thương mại / Shophouse</option>
                        <option value="Biệt thự nghỉ dưỡng">Biệt thự nghỉ dưỡng biển</option>
                        <option value="Dinh thự độc bản">Dinh thự ven sông độc bản</option>
                        <option value="Suất ngoại giao">Suất ngoại giao nội bộ</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/80">Nhu cầu tư vấn cụ thể</label>
                    <textarea
                      rows={3}
                      placeholder="Quý khách vui lòng để lại yêu cầu cụ thể (ngân sách dự kiến, vị trí mong muốn, kế hoạch đầu tư...)"
                      value={formData.need}
                      onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#C5A880] focus:bg-white/10 text-white placeholder-white/30 text-sm transition-all outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-lg bg-[#C5A880] hover:bg-white text-[#060913] font-semibold text-xs tracking-[0.15em] uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>GỬI YÊU CẦU TƯ VẤN NGAY</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
