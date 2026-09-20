'use client';

import React from 'react';
import FlowReveal, { FlowStaggerGroup, FlowItem } from '@/components/animations/FlowReveal';
import { Award, Trophy, Users, ShieldCheck } from 'lucide-react';

interface MilestoneItem {
  number: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

const milestones: MilestoneItem[] = [
  {
    number: 'TOP 10',
    label: 'Sàn Giao Dịch Xuất Sắc',
    description: 'Được vinh danh trong Top 10 đơn vị phân phối bất động sản cao cấp uy tín hàng đầu.',
    icon: Trophy,
  },
  {
    number: '5.000+',
    label: 'Khách Hàng Thượng Lưu',
    description: 'Đồng hành cùng hàng ngàn nhà đầu tư và gia chủ kiến tạo danh mục tài sản vững bền.',
    icon: Users,
  },
  {
    number: '15+',
    label: 'Dự Án Trọng Điểm',
    description: 'Đối tác chiến lược phân phối độc quyền và chọn lọc của Vingroup, Phát Đạt, KDI, Kita...',
    icon: Award,
  },
  {
    number: '100%',
    label: 'Pháp Lý Minh Bạch',
    description: 'Cam kết thẩm định pháp lý chặt chẽ, tối ưu biên độ an toàn và thanh khoản cho quý khách.',
    icon: ShieldCheck,
  },
];

export default function MilestonesSection() {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-white border-b border-[#e2ddd3] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
        <FlowReveal direction="up" distance={30} className="max-w-2xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-[1.5px] bg-[#c5a26c]" />
            <span className="text-[11px] sm:text-[12px] font-semibold text-[#a70c0c] uppercase tracking-widest font-accent">
              DẤU ẤN & NĂNG LỰC DOANH NGHIỆP
            </span>
            <div className="w-5 h-[1.5px] bg-[#c5a26c]" />
          </div>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold text-[#04092b] font-display uppercase leading-tight">
            Bảo Chứng Bằng Con Số & Uy Tín Trên Thị Trường
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#6e706a] font-light leading-relaxed">
            Đông Hòa Property định vị là đối tác tin cậy của các chủ đầu tư hàng đầu và là người cố vấn tài sản tận tâm của giới thượng lưu.
          </p>
        </FlowReveal>

        {/* 4 Stat Cards */}
        <FlowStaggerGroup staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FlowItem key={idx} distance={25}>
                <div className="p-6 sm:p-8 bg-[#faf8f5] border border-[#e2ddd3] rounded-xl text-center space-y-3 hover:border-[#c5a26c] hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#04092b] text-[#c5a26c] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[32px] sm:text-[38px] font-bold text-[#04092b] font-display">
                    {item.number}
                  </div>
                  <div className="text-[15px] font-bold text-[#2d302e] font-display">
                    {item.label}
                  </div>
                  <p className="text-[13px] text-[#6e706a] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FlowItem>
            );
          })}
        </FlowStaggerGroup>
      </div>
    </section>
  );
}
