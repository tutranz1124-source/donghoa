'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Award, ShieldCheck } from 'lucide-react';

interface MilestoneItem {
  number: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

const milestones: MilestoneItem[] = [
  {
    number: 'TOP 10',
    label: 'Sàn Giao Dịch Tiêu Biểu',
    description: 'Được vinh danh trong Top 10 đơn vị phân phối bất động sản cao cấp uy tín hàng đầu.',
    icon: Trophy,
  },
  {
    number: '5.000+',
    label: 'Khách Hàng Đồng Hành',
    description: 'Đồng hành cùng hàng ngàn nhà đầu tư và gia chủ kiến tạo danh mục tài sản truyền đời.',
    icon: Users,
  },
  {
    number: '15+',
    label: 'Dự Án Trọng Điểm',
    description: 'Đối tác chiến lược phân phối độc quyền và chọn lọc của Vingroup, Gamuda, KDI, Kita...',
    icon: Award,
  },
  {
    number: '100%',
    label: 'Pháp Lý Minh Bạch',
    description: 'Cam kết thẩm định pháp lý chặt chẽ, tối ưu biên độ an toàn và thanh khoản cao nhất.',
    icon: ShieldCheck,
  },
];

export default function MilestonesSection() {
  return (
    <section className="w-full py-24 sm:py-28 lg:py-36 bg-[#060913] text-white border-t border-white/5 overflow-hidden relative">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C5A880]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 lg:mb-20">
          <span className="text-xs font-semibold text-[#C5A880] uppercase tracking-[0.25em] font-sans block">
            BẢO CHỨNG UY TÍN
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight tracking-tight">
            Năng Lực & Dấu Ấn Doanh Nghiệp
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A880] mx-auto" />
          <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed pt-1 max-w-2xl mx-auto">
            Đông Hòa Property định vị là đối tác tin cậy của các chủ đầu tư hàng đầu và là người cố vấn tài sản tận tâm của giới thượng lưu.
          </p>
        </div>

        {/* 4 Clean Editorial Numbers with Generous Padding */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center space-y-4 p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#C5A880]/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#C5A880] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#C5A880] group-hover:text-black transition-all duration-300 shadow-md">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#C5A880] tracking-tight">
                  {item.number}
                </div>
                <div className="text-base font-serif font-medium text-white group-hover:text-[#C5A880] transition-colors">
                  {item.label}
                </div>
                <p className="text-xs text-white/55 font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
