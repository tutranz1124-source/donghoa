'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Building2, Handshake, CheckCircle2, Sparkles } from 'lucide-react';
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
    desc: 'Đồng hành phân phối chính thức các dự án quy mô chuẩn mực từ các tập đoàn phát triển bất động sản uy tín hàng đầu.',
    metric: '100% Chính Thức',
  },
  {
    icon: ShieldCheck,
    title: 'Thẩm Định Độc Lập & Chặt Chẽ',
    desc: 'Đội ngũ chuyên viên pháp lý và tài chính rà soát minh bạch hồ sơ trước khi giới thiệu đến nhà đầu tư.',
    metric: 'Pháp Lý Chuẩn Mực',
  },
  {
    icon: Award,
    title: 'Đồng Hành Trọn Chu Kỳ Giao Dịch',
    desc: 'Hỗ trợ khách hàng từ giải pháp tài chính, thủ tục ký kết đến nghiệm thu bàn giao và chuyển nhượng/cho thuê.',
    metric: 'Tận Tâm Trọn Đời',
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
        metric: idx === 0 ? '100% Chính Thức' : idx === 1 ? 'Pháp Lý Minh Bạch' : 'Đồng Hành Trọn Gói',
      }))
    : DEFAULT_CREDENTIALS;

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-warm-50 via-warm-100/50 to-warm-50 border-b border-warm-200 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3 mb-14 sm:mb-16 max-w-2xl mx-auto"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold font-sans flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>{tag}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal leading-[1.2]">
            {heading}
          </h2>
          <p className="text-sm text-charcoal-600 font-normal leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Credentials Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {credentials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-8 rounded-3xl border border-warm-200 shadow-warm-sm hover:shadow-warm-md hover:border-gold/50 transition-all duration-300 space-y-4 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-warm-100 border border-warm-200 flex items-center justify-center group-hover:bg-[#04092b] group-hover:text-gold transition-colors">
                    <item.icon className="w-6 h-6 text-gold transition-colors" />
                  </div>
                  <span className="text-[11px] font-semibold text-gold px-3 py-1 rounded-full bg-warm-100 border border-warm-200">
                    {item.metric}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-medium text-charcoal leading-snug group-hover:text-gold transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-charcoal-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-warm-200 flex items-center gap-2 text-xs font-semibold text-charcoal">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>Tiêu chuẩn tư vấn chuyên nghiệp</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Developer Partners Strip with Interactive Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-10 border-t border-warm-200"
        >
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-[0.15em] font-semibold text-charcoal-muted">
              Đồng hành phân phối các dự án tiêu biểu từ
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {partners.map((partner, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, borderColor: '#C5A26C' }}
                className="px-5 py-2.5 rounded-2xl bg-white border border-warm-200 text-xs sm:text-sm font-semibold text-charcoal-700 tracking-wide shadow-warm-sm transition-all cursor-default"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
