'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Send, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import FlowReveal, { FlowStaggerGroup, FlowItem } from '@/components/animations/FlowReveal';
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
    need: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const image = data?.image || '/uploads/clean_contact_photo.png';
  const tag = data?.tag || 'LIÊN HỆ NGAY VỚI CHÚNG TÔI';
  const heading = data?.heading || 'KẾT NỐI CÙNG\nĐÔNG HÒA PROPERTY';
  const quote =
    data?.quote ||
    'Để lại thông tin, đội ngũ Chuyên viên Đông Hòa Property sẽ liên hệ tư vấn trực tiếp và gửi thông tin chi tiết trong vòng 15 phút.';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage('Vui lòng điền họ và tên cùng số điện thoại liên hệ.');
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
        err.message || 'Đã có lỗi xảy ra khi gửi yêu cầu. Quý khách vui lòng thử lại hoặc gọi trực tiếp hotline.'
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
      need: ''
    });
    setSubmitted(false);
    setErrorMessage('');
  };

  return (
    <section id="contact" className="w-full py-16 sm:py-20 lg:py-24 bg-[#f4f1ea] border-b border-[#e2ddd3] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-16 items-center">
          
          {/* LEFT SIDE: Rounded Rectangle Image */}
          <div className="w-full lg:col-span-5 flex justify-center lg:justify-start">
            <FlowReveal direction="up" distance={45} duration={0.9} className="w-full max-w-[515px]">
              <div className="relative w-full aspect-[515/560] max-h-[560px] rounded-2xl overflow-hidden bg-[#e2ddd3]/30 border border-[#e2ddd3] shadow-xl group">
                <Image
                  src={image}
                  alt="Đông Hòa Property - Liên hệ tư vấn & báo giá"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 515px"
                  className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none" />
              </div>
            </FlowReveal>
          </div>

          {/* RIGHT SIDE: Section Header & Contact Form */}
          <div className="w-full lg:col-span-7 flex flex-col justify-center">
            {/* Header Area */}
            <FlowReveal direction="up" distance={30} delay={0.1} className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-5 h-[1.5px] bg-[#c5a26c]" />
                <span className="text-[12px] sm:text-[13px] font-semibold text-[#6e706a] uppercase tracking-widest font-accent">
                  {tag}
                </span>
              </div>

              <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] xl:text-[42px] font-semibold text-[#2d302e] font-display uppercase leading-[1.18] tracking-tight mb-3 whitespace-pre-line">
                {heading}
              </h2>

              <p className="text-[14px] sm:text-[15.5px] text-[#5f6361] italic leading-relaxed max-w-[600px]">
                &ldquo;{quote}&rdquo;
              </p>
            </FlowReveal>

            {/* FORM CONTAINER */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[500px] mx-auto lg:mx-0"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  /* SUBMITTED SUCCESS CARD */
                  <motion.div
                    key="submitted-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full p-6 sm:p-8 bg-white border border-[#e2ddd3] rounded-xl shadow-sm space-y-4 text-center"
                  >
                    <CheckCircle2 className="w-12 h-12 text-[#c5a26c] mx-auto" />
                    <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#2d302e] font-display uppercase">
                      Gửi yêu cầu thành công!
                    </h3>
                    <p className="text-[13.5px] text-[#5f6361] font-light leading-relaxed">
                      Thông tin đã được ghi nhận. Đội ngũ chuyên viên <strong>Đông Hòa Property</strong> sẽ liên hệ trực tiếp với quý khách trong vòng 15 phút.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-2 text-[12px] uppercase tracking-wider font-semibold text-[#2d302e] hover:text-[#c5a26c] underline transition-colors"
                    >
                      Gửi yêu cầu khác
                    </button>
                  </motion.div>
                ) : (
                  /* ACTIVE FORM CARD */
                  <div className="w-full bg-transparent">
                    {/* Error Banner */}
                    {errorMessage && (
                      <div className="mb-3.5 p-3 bg-red-50 border border-red-200 rounded-lg text-[12.5px] text-red-700 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="w-full">
                      <FlowStaggerGroup staggerDelay={0.06} className="space-y-3.5 sm:space-y-4">
                        {/* Field 1: Họ và tên */}
                        <FlowItem distance={20} className="space-y-1">
                          <label className="block text-[12px] font-medium tracking-wide text-[#2d302e] font-sans">
                            Họ và tên: <span className="text-[#a70c0c]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Nhập họ và tên của bạn"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full h-[42px] px-3.5 bg-white border border-[#e2ddd3] rounded-lg text-[13px] text-[#2d302e] placeholder:text-[#5f6361]/60 focus:outline-none focus:border-[#c5a26c] focus:ring-1 focus:ring-[#c5a26c] transition-all"
                          />
                        </FlowItem>

                        {/* Field 2 & 3: Số điện thoại & Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <FlowItem distance={20} className="space-y-1">
                            <label className="block text-[12px] font-medium tracking-wide text-[#2d302e] font-sans">
                              Số điện thoại: <span className="text-[#a70c0c]">*</span>
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="090x xxx xxx"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full h-[42px] px-3.5 bg-white border border-[#e2ddd3] rounded-lg text-[13px] text-[#2d302e] placeholder:text-[#5f6361]/60 focus:outline-none focus:border-[#c5a26c] focus:ring-1 focus:ring-[#c5a26c] transition-all"
                            />
                          </FlowItem>

                          <FlowItem distance={20} className="space-y-1">
                            <label className="block text-[12px] font-medium tracking-wide text-[#2d302e] font-sans">
                              Email:
                            </label>
                            <input
                              type="email"
                              placeholder="email@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full h-[42px] px-3.5 bg-white border border-[#e2ddd3] rounded-lg text-[13px] text-[#2d302e] placeholder:text-[#5f6361]/60 focus:outline-none focus:border-[#c5a26c] focus:ring-1 focus:ring-[#c5a26c] transition-all"
                            />
                          </FlowItem>
                        </div>

                        {/* Field 4 & 5: Loại hình nhà & Diện tích */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <FlowItem distance={20} className="space-y-1">
                            <label className="block text-[12px] font-medium tracking-wide text-[#2d302e] font-sans">
                              Loại hình quan tâm:
                            </label>
                            <input
                              type="text"
                              placeholder="Căn hộ / Biệt thự / Shophouse"
                              value={formData.propertyType}
                              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                              className="w-full h-[42px] px-3.5 bg-white border border-[#e2ddd3] rounded-lg text-[13px] text-[#2d302e] placeholder:text-[#5f6361]/60 focus:outline-none focus:border-[#c5a26c] focus:ring-1 focus:ring-[#c5a26c] transition-all"
                            />
                          </FlowItem>

                          <FlowItem distance={20} className="space-y-1">
                            <label className="block text-[12px] font-medium tracking-wide text-[#2d302e] font-sans">
                              Diện tích dự kiến:
                            </label>
                            <input
                              type="text"
                              placeholder="VD: 85m², 150m², 300m²..."
                              value={formData.area}
                              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                              className="w-full h-[42px] px-3.5 bg-white border border-[#e2ddd3] rounded-lg text-[13px] text-[#2d302e] placeholder:text-[#5f6361]/60 focus:outline-none focus:border-[#c5a26c] focus:ring-1 focus:ring-[#c5a26c] transition-all"
                            />
                          </FlowItem>
                        </div>

                        {/* Field 6: Nhu cầu */}
                        <FlowItem distance={20} className="space-y-1">
                          <label className="block text-[12px] font-medium tracking-wide text-[#2d302e] font-sans">
                            Nhu cầu cụ thể:
                          </label>
                          <input
                            type="text"
                            placeholder="Tư vấn đầu tư / Bảng giá / Thiết kế nội thất trọn gói"
                            value={formData.need}
                            onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                            className="w-full h-[42px] px-3.5 bg-white border border-[#e2ddd3] rounded-lg text-[13px] text-[#2d302e] placeholder:text-[#5f6361]/60 focus:outline-none focus:border-[#c5a26c] focus:ring-1 focus:ring-[#c5a26c] transition-all"
                          />
                        </FlowItem>

                        {/* Submit Button */}
                        <FlowItem distance={20} className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto px-8 h-[44px] bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] text-[12.5px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group shadow-sm disabled:opacity-70"
                          >
                            {isSubmitting ? (
                              <span>Đang gửi thông tin...</span>
                            ) : (
                              <>
                                <span>GỬI YÊU CẦU TƯ VẤN</span>
                                <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                              </>
                            )}
                          </button>
                        </FlowItem>
                      </FlowStaggerGroup>
                    </form>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
