'use client';

import React from 'react';
import Image from 'next/image';
import FlowReveal from '@/components/animations/FlowReveal';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

interface PrivateAccessSectionProps {
  onOpenInquiry?: (defaultMsg?: string) => void;
}

export default function PrivateAccessSection({ onOpenInquiry }: PrivateAccessSectionProps) {
  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-[#04092b]">
      {/* Background Architectural Image with Luxury Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/uploads/clean_project_vingroup.png"
          alt="Đặc quyền giỏ hàng nội bộ Đông Hòa Property"
          fill
          className="object-cover object-center brightness-40 filter"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04092b]/95 via-[#04092b]/85 to-[#04092b]/70" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6 lg:space-y-8">
          <FlowReveal direction="up" distance={25} className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a26c]/15 border border-[#c5a26c]/30 text-[#c5a26c] text-[11.5px] sm:text-[12px] font-semibold uppercase tracking-widest font-accent">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ĐẶC QUYỀN NHÀ ĐẦU TƯ VIP</span>
            </div>

            <h2 className="text-[30px] sm:text-[42px] lg:text-[48px] font-semibold text-white font-display uppercase leading-tight tracking-tight">
              Nhận Bảng Giá Nội Bộ & Quỹ Căn Ngoại Giao
            </h2>

            <p className="text-[14.5px] sm:text-[16px] text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
              Đăng ký ngay hôm nay để nhận thông tin mật giỏ hàng mở bán đợt 1, chính sách chiết khấu độc quyền và lịch thanh toán giãn dòng tiền tốt nhất trực tiếp từ chủ đầu tư.
            </p>
          </FlowReveal>

          <FlowReveal direction="up" distance={20} delay={0.15} className="pt-2">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                className="w-full sm:w-auto px-8 py-4 bg-[#c5a26c] hover:bg-white text-[#04092b] font-bold text-[13px] uppercase tracking-wider transition-all duration-300 shadow-xl rounded-sm flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>ĐĂNG KÝ NHẬN BẢNG GIÁ</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href="#projects"
                className="w-full sm:w-auto px-8 py-4 border border-white/40 hover:border-white text-white hover:bg-white/10 font-semibold text-[13px] uppercase tracking-wider transition-all duration-300 rounded-sm flex items-center justify-center"
              >
                <span>KHÁM PHÁ DỰ ÁN</span>
              </a>
            </div>
          </FlowReveal>
        </div>
      </div>
    </section>
  );
}

