'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Compass, Users } from 'lucide-react';
import { PhilosophyData } from '@/lib/types';

interface PhilosophySectionProps {
  data?: PhilosophyData;
}

export default function PhilosophySection({ data }: PhilosophySectionProps) {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Thẩm Định Pháp Lý Minh Bạch',
      desc: 'Mọi dự án phân phối đều trải qua quy trình rà soát pháp lý, tiến độ xây dựng và uy tín chủ đầu tư trước khi giới thiệu đến khách hàng.',
    },
    {
      icon: Compass,
      title: 'Tuyển Chọn Vị Trí Chiến Lược',
      desc: 'Tập trung vào các bất động sản sở hữu hạ tầng kết nối vượt trội, cảnh quan thiên nhiên hoặc tiềm năng gia tăng giá trị bền vững theo thời gian.',
    },
    {
      icon: Users,
      title: 'Đồng Hành Tư Vấn Toàn Diện',
      desc: 'Đội ngũ chuyên viên tư vấn đồng hành từ bước hoạch định tài chính, chọn căn đến bàn giao và khai thác vận hành.',
    },
  ];

  return (
    <section id="philosophy" className="py-20 sm:py-28 lg:py-32 bg-white border-b border-warm-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Brand Introduction */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold font-sans block">
                {data?.tag || 'VỀ ĐÔNG HÒA PROPERTY'}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-charcoal leading-[1.2]">
                {data?.heading || 'Chuẩn Mực Tư Vấn Bất Động Sản Bền Vững'}
              </h2>
            </div>

            <p className="text-base sm:text-[16.5px] text-charcoal-600 leading-relaxed font-normal">
              {data?.description ||
                'Đông Hòa Property định vị là đơn vị tư vấn và phân phối bất động sản chọn lọc. Chúng tôi không đại diện cho số lượng mà tập trung vào chiều sâu giá trị: từ không gian sống chuẩn mực của gia chủ đến giải pháp đầu tư an toàn, minh bạch cho khách hàng.'}
            </p>

            {/* Core Advisory Pillars */}
            <div className="space-y-6 pt-2">
              {pillars.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-warm-100 border border-warm-200 flex items-center justify-center shrink-0 mt-1">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-charcoal mb-1">{item.title}</h3>
                    <p className="text-[14px] text-charcoal-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Curated Architectural Photography Showcase */}
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="relative h-[440px] sm:h-[520px] rounded-2xl overflow-hidden shadow-warm-lg border border-warm-200">
                <Image
                  src="/uploads/clean_project_thegio.png"
                  alt="Đông Hòa Property Architecture"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Discreet Quote Overlay Box */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 bg-warm-50/95 backdrop-blur-md p-6 sm:p-7 rounded-xl border border-warm-300 shadow-warm-md max-w-xs sm:max-w-sm">
                <p className="text-xs sm:text-[13px] font-serif italic text-charcoal-700 leading-relaxed mb-2">
                  &ldquo;Chất lượng của một bất động sản không chỉ đo bằng quy mô, mà bằng giá trị sống và sự an tâm tạo dựng theo năm tháng.&rdquo;
                </p>
                <span className="text-[11px] font-semibold text-gold uppercase tracking-wider block font-sans">
                  — Ban Điều Hành Đông Hòa Property
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
