'use client';

import React from 'react';
import { ShieldCheck, Award, Building2, Handshake } from 'lucide-react';

import { MilestonesData } from '@/lib/types';

interface MilestonesSectionProps {
  data?: MilestonesData;
}

const DEFAULT_PARTNERS = [
  'Masterise Homes',
  'Gamuda Land',
  'Vingroup',
  'Khang Điền',
  'An Gia Group',
  'KDI Holdings',
];

const DEFAULT_CREDENTIALS = [
  {
    icon: Handshake,
    title: 'Hợp Tác Phân Phối Chiến Lược',
    desc: 'Đồng hành phân phối chính thức các dự án quy mô chuẩn mực từ các tập đoàn phát triển bất động sản uy tín.',
  },
  {
    icon: ShieldCheck,
    title: 'Thẩm Định Độc Lập & Chặt Chẽ',
    desc: 'Đội ngũ chuyên viên pháp lý và tài chính rà soát minh bạch hồ sơ trước khi giới thiệu đến nhà đầu tư.',
  },
  {
    icon: Award,
    title: 'Đồng Hành Trọn Chu Kỳ Giao Dịch',
    desc: 'Hỗ trợ khách hàng từ giải pháp tài chính, thủ tục ký kết đến nghiệm thu bàn giao và chuyển nhượng/cho thuê.',
  },
];

export default function MilestonesSection({ data }: MilestonesSectionProps) {
  const partners = data?.partners && data.partners.length > 0 ? data.partners : DEFAULT_PARTNERS;
  const tag = data?.tag || 'NĂNG LỰC & ĐỐI TÁC';
  const heading = data?.heading || 'Đối Tác Phát Triển & Năng Lực Tư Vấn';
  const description =
    data?.description ||
    'Hợp tác chọn lọc cùng các chủ đầu tư hàng đầu, mang đến nguồn sản phẩm chất lượng và giá trị thực.';

  const credentials = data?.credentials && data.credentials.length > 0
    ? data.credentials.map((c, idx) => ({
        icon: idx === 0 ? Handshake : idx === 1 ? ShieldCheck : Award,
        title: c.title,
        desc: c.desc,
      }))
    : DEFAULT_CREDENTIALS;

  return (
    <section className="py-20 sm:py-28 bg-warm-50 border-b border-warm-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14 sm:mb-16 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold font-sans block">
            NĂNG LỰC & ĐỐI TÁC
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal leading-[1.2]">
            Đối Tác Phát Triển & Năng Lực Tư Vấn
          </h2>
          <p className="text-sm text-charcoal-600 font-normal leading-relaxed">
            Hợp tác chọn lọc cùng các chủ đầu tư hàng đầu, mang đến nguồn sản phẩm chất lượng và giá trị thực.
          </p>
        </div>

        {/* Credentials Grid (No generic unverified counters) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {credentials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-warm-200 shadow-warm-sm space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-warm-100 border border-warm-200 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-lg font-serif font-medium text-charcoal leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-charcoal-600 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Developer Partners Strip */}
        <div className="pt-10 border-t border-warm-200">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-[0.15em] font-semibold text-charcoal-muted">
              Đồng hành phân phối các dự án tiêu biểu từ
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className="px-5 py-2.5 rounded-xl bg-white border border-warm-200 text-xs sm:text-sm font-semibold text-charcoal-700 tracking-wide shadow-warm-sm"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
