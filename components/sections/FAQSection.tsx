'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { FAQData } from '@/lib/types';

interface FAQSectionProps {
  data?: FAQData;
}

const DEFAULT_FAQS = [
  {
    q: 'Đông Hòa Property thẩm định pháp lý dự án như thế nào trước khi phân phối?',
    a: 'Mọi dự án trong danh mục phân phối đều được chúng tôi rà soát kỹ lưỡng các điều kiện pháp lý cần thiết: Quyết định phê duyệt quy hoạch 1/500, Giấy phép xây dựng, Giấy chứng nhận quyền sử dụng đất và Chứng thư bảo lãnh nghĩa vụ tài chính của ngân hàng trước khi tư vấn cho khách hàng.',
  },
  {
    q: 'Quy trình tư vấn và hỗ trợ giao dịch tại Đông Hòa Property gồm những bước nào?',
    a: 'Quy trình gồm 4 giai đoạn chuẩn mực: (1) Lắng nghe nhu cầu & tư vấn phân khúc phù hợp, (2) Khảo sát thực tế dự án & phân tích quy hoạch, (3) Hoạch định phương án tài chính & thủ tục pháp lý, (4) Đồng hành ký kết hợp đồng và nghiệm thu nhận nhà.',
  },
  {
    q: 'Khách hàng có phải trả thêm bất kỳ khoản phí tư vấn nào cho Đông Hòa Property không?',
    a: 'Hoàn toàn không. Toàn bộ dịch vụ tư vấn chọn căn, hỗ trợ thủ tục hồ sơ vay ngân hàng và kiểm tra pháp lý tại Đông Hòa Property đều được cung cấp miễn phí cho khách hàng theo chính sách từ các chủ đầu tư đối tác.',
  },
];

export function FAQSection({ data }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = data?.faqs && data.faqs.length > 0 ? data.faqs : DEFAULT_FAQS;
  const tag = data?.tag || 'HỎI ĐÁP & TƯ VẤN';
  const heading = data?.heading || 'Câu Hỏi Thường Gặp';
  const description =
    data?.description ||
    'Giải đáp các thắc mắc trọng tâm về quy trình làm việc và thẩm định bất động sản.';

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-warm-50 border-b border-warm-200 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-3 mb-12 sm:mb-14"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold font-sans inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{tag}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal leading-tight">
              {heading}
            </h2>
            <p className="text-sm text-charcoal-600 font-normal leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Core Editorial FAQs with Framer Motion Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-gold/50 shadow-warm-md ring-1 ring-gold/20'
                      : 'border-warm-200 shadow-warm-sm hover:border-warm-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-warm-50/40 transition-colors"
                  >
                    <span className="font-serif font-medium text-charcoal text-base sm:text-[17px] leading-snug">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen ? 'rotate-180 bg-charcoal text-white' : 'bg-warm-100 text-charcoal-700'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: {
                            height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.25, delay: 0.1 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.15 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-[15px] text-charcoal-600 leading-relaxed border-t border-warm-100 font-normal">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

