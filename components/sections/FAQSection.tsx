'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
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

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-warm-50 border-b border-warm-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-3 mb-12 sm:mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold font-sans block">
              HỎI ĐÁP & TƯ VẤN
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal leading-[1.2]">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-sm text-charcoal-600 font-normal leading-relaxed">
              Giải đáp các thắc mắc trọng tâm về quy trình làm việc và thẩm định bất động sản.
            </p>
          </div>

          {/* 3 Core Editorial FAQs */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-warm-200 overflow-hidden shadow-warm-sm transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-warm-50/50 transition-colors"
                  >
                    <span className="font-serif font-medium text-charcoal text-base sm:text-[17px] leading-snug">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full bg-warm-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-gold text-white' : 'text-charcoal-700'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-[15px] text-charcoal-600 leading-relaxed border-t border-warm-100 animate-in fade-in duration-200 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
