'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Award } from 'lucide-react';
import { PhilosophyData } from '@/lib/types';

interface PhilosophySectionProps {
  data?: PhilosophyData;
}

const defaultFeatures = [
  {
    icon: ShieldCheck,
    title: 'Phân phối độc quyền & 100% Pháp lý chuẩn mực',
    description: 'Tất cả các dự án trong giỏ hàng phân phối đều được thẩm định nghiêm ngặt về quy hoạch, giấy phép xây dựng và quyền sở hữu.',
  },
  {
    icon: TrendingUp,
    title: 'Tư vấn chiến lược đầu tư & Tối ưu dòng tiền',
    description: 'Hoạch định giải pháp tài chính đòn bẩy thông minh, đón đầu các quy hoạch hạ tầng trọng điểm để tối đa hóa biên độ sinh lời.',
  },
  {
    icon: Award,
    title: 'Đặc quyền suất ngoại giao & Bảng giá gốc',
    description: 'Quyền ưu tiên lựa chọn tầng, hướng và nhận các gói chiết khấu độc quyền trực tiếp từ tập đoàn phát triển dự án.',
  },
];

export default function PhilosophySection({ data }: PhilosophySectionProps) {
  const image = data?.image || '/uploads/clean_philosophy_photo.png';
  const tag = data?.tag || 'VỀ CHÚNG TÔI • ĐÔNG HÒA PROPERTY';
  const heading = data?.heading || 'Tầm Nhìn Chiến Lược & Giá Trị Cốt Lõi';
  const description =
    data?.description ||
    'Với bề dày kinh nghiệm và vị thế vững chắc trên thị trường bất động sản cao cấp, Đông Hòa Property tự hào là cầu nối tin cậy giữa các nhà phát triển bất động sản danh tiếng và cộng đồng nhà đầu tư tinh hoa.';

  return (
    <section
      id="philosophy"
      className="w-full py-24 sm:py-28 lg:py-36 bg-[#060913] text-white border-t border-white/5 relative overflow-hidden"
    >
      <div id="about" className="absolute -top-20 left-0" />
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#C5A880]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* LEFT SIDE: Large Architectural Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="relative w-full aspect-[4/5] max-w-[500px] rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl group">
              <Image
                src={image}
                alt="Tầm nhìn và sứ mệnh - Đông Hòa Property"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          {/* RIGHT SIDE: Open Editorial Hierarchy */}
          <div className="w-full lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="text-xs font-semibold text-[#C5A880] uppercase tracking-[0.25em] font-sans block">
                {tag}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight tracking-tight">
                {heading}
              </h2>
              <div className="w-12 h-0.5 bg-[#C5A880]" />
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed pt-1">
                {description}
              </p>
            </motion.div>

            {/* Feature List */}
            <div className="space-y-6 pt-2">
              {defaultFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                    className="flex items-start gap-5 p-4 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-[#C5A880]/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#C5A880] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#C5A880] group-hover:text-black transition-all duration-300 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 pt-0.5">
                      <h3 className="text-base font-serif font-medium text-white group-hover:text-[#C5A880] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
