'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface PrivateAccessSectionProps {
  onOpenInquiry?: (defaultMsg?: string) => void;
}

export default function PrivateAccessSection({ onOpenInquiry }: PrivateAccessSectionProps) {
  return (
    <section id="private-access" className="relative w-full py-24 sm:py-28 lg:py-36 overflow-hidden bg-[#060913] text-white border-t border-white/5">
      {/* Background Architectural Image with Dark Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/uploads/clean_project_vingroup.png"
          alt="Đặc quyền giỏ hàng nội bộ Đông Hòa Property"
          fill
          className="object-cover object-center brightness-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060913]/95 via-[#060913]/80 to-[#060913]/95" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-semibold uppercase tracking-[0.2em] font-sans">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ĐẶC QUYỀN NHÀ ĐẦU TƯ VIP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight tracking-tight">
              Nhận Bảng Giá Nội Bộ & Quỹ Căn Ngoại Giao
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto" />

            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-2xl mx-auto pt-1">
              Đăng ký ngay hôm nay để nhận thông tin mật giỏ hàng mở bán đợt 1, chính sách chiết khấu độc quyền và lịch thanh toán giãn dòng tiền trực tiếp từ chủ đầu tư.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              type="button"
              onClick={() => {
                if (onOpenInquiry) {
                  onOpenInquiry('Đăng ký nhận bảng giá nội bộ & quỹ căn ngoại giao');
                } else {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 bg-[#C5A880] hover:bg-white text-[#060913] font-semibold text-xs tracking-[0.15em] uppercase transition-all duration-300 shadow-xl rounded-sm flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Đăng Ký Nhận Bảng Giá</span>
              <ArrowRight className="w-4 h-4 text-[#060913] transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#projects"
              className="px-8 py-4 border border-white/30 hover:border-[#C5A880] text-white hover:text-[#C5A880] font-semibold text-xs tracking-[0.15em] uppercase transition-all duration-300 rounded-sm flex items-center justify-center"
            >
              <span>Khám Phá Dự Án</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
