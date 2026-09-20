'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, ShieldCheck } from 'lucide-react';

const testimonials = [
  {
    quote: "Đông Hòa giúp tôi tìm được dự án phù hợp với ngân sách và mục tiêu đầu tư sinh lời bền vững tại khu Đông TP.HCM.",
    author: "Nguyễn Văn Hùng",
    title: "Nhà đầu tư BĐS Thứ cấp",
    project: "The Gió Riverside",
    rating: 5,
    verified: true,
  },
  {
    quote: "Pháp lý minh bạch, tư vấn nhiệt tình. Tôi rất yên tâm khi giao dịch các sản phẩm cao cấp qua hệ thống độc quyền của Đông Hòa Property.",
    author: "Trần Thị Mai Phương",
    title: "Chủ doanh nghiệp & Khách hàng VIP",
    project: "Lusso Saigon",
    rating: 5,
    verified: true,
  },
  {
    quote: "Tiến độ dự án luôn được cập nhật liên tục. Đội ngũ chuyên viên tài chính hỗ trợ thủ tục giải ngân ngân hàng rất nhanh chóng và linh hoạt.",
    author: "Lê Hoàng Quân",
    title: "Chuyên gia Tài chính & Cư dân tương lai",
    project: "Green Skyline",
    rating: 5,
    verified: true,
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0A0D12] text-white relative overflow-hidden border-t border-white/5">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C5A880]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#C5A880] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
              NHÀ ĐẦU TƯ ĐỒNG HÀNH
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-white mb-4">
              Khách Hàng Nói Gì Về <span className="text-[#C5A880] font-normal">Đông Hòa Property</span>
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mb-6" />
            <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
              Những lời chứng thực thực tế từ khách hàng và đối tác đầu tư chiến lược trên toàn quốc.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-[#C5A880]/40 transition-all duration-300 flex flex-col justify-between group relative backdrop-blur-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1 text-[#C5A880]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A880]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-white/10 group-hover:text-[#C5A880]/20 transition-colors" />
                </div>

                <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed italic mb-8">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white text-sm tracking-wide group-hover:text-[#C5A880] transition-colors">
                      {t.author}
                    </h4>
                    <p className="text-xs text-white/40 mt-0.5 font-light">{t.title}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-[#C5A880]">
                      Dự án: {t.project}
                    </span>
                  </div>
                  {t.verified && (
                    <div className="flex items-center text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full" title="Giao dịch xác thực">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                      <span className="text-[10px] uppercase tracking-wider font-semibold">Đã giao dịch</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

