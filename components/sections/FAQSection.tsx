'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: "Quy trình mua căn hộ trả góp qua ngân hàng như thế nào?",
    answer: "Khách hàng chỉ cần chuẩn bị vốn tự có từ 20% - 30% giá trị căn hộ. Phần còn lại (lên đến 70% - 80%) sẽ được ngân hàng đối tác liên kết của dự án giải ngân dựa trên thẩm định thu nhập và tài sản thế chấp hình thành trong tương lai. Thời gian vay linh hoạt từ 20 đến 35 năm kèm nhiều gói ân hạn nợ gốc và hỗ trợ lãi suất 0% trong 12 - 24 tháng.",
    category: "Tài chính & Vay vốn",
  },
  {
    question: "Các loại phí dịch vụ hàng tháng của căn hộ cao cấp bao gồm những gì?",
    answer: "Bao gồm: (1) Phí quản lý vận hành tòa nhà (vệ sinh, an ninh 24/7, vận hành thang máy, bảo trì tiện ích công cộng như hồ bơi, phòng Gym, cảnh quan) tính theo diện tích thông thủy; (2) Phí gửi xe ô tô / xe máy theo biểu phí niêm yết của ban quản lý; (3) Chi phí sử dụng điện, nước sinh hoạt và internet trả trực tiếp theo giá nhà nước quy định.",
    category: "Vận hành & Phí",
  },
  {
    question: "Sự khác biệt giữa diện tích Thông thủy và diện tích Tim tường là gì?",
    answer: "Diện tích Tim tường tính từ tâm của các tường bao quanh và tường ngăn giữa các căn hộ. Diện tích Thông thủy (diện tích lọt lòng / diện tích sử dụng thực tế) tính theo kích thước lọt lòng của căn hộ, không bao gồm cột chịu lực và hộp kỹ thuật. Giấy chứng nhận quyền sở hữu (Sổ hồng) hiện hành luôn ghi nhận và căn cứ theo diện tích thông thủy.",
    category: "Pháp lý & Tiêu chuẩn",
  },
  {
    question: "Thời hạn sở hữu bất động sản căn hộ chung cư là bao lâu?",
    answer: "Đối với công dân Việt Nam mua căn hộ trên đất có mục đích sử dụng lâu dài, thời hạn sở hữu là Lâu dài (vĩnh viễn có Sổ hồng riêng). Đối với các sản phẩm Officetel, Shophouse khối đế hoặc dự án trên quỹ đất thương mại dịch vụ 50 năm, thời hạn sở hữu sẽ tương ứng với thời hạn giao đất của dự án (thường là 50 năm có gia hạn theo quy định pháp luật).",
    category: "Pháp lý & Tiêu chuẩn",
  },
  {
    question: "Tôi có được phép thay đổi thiết kế nội thất bên trong căn hộ không?",
    answer: "Khách hàng hoàn toàn có quyền decor, thay đổi trang thiết bị nội thất và các vách ngăn nhẹ không chịu lực sau khi nhận bàn giao nhà. Tuy nhiên, mọi can thiệp liên quan đến kết cấu chịu lực, hệ thống điện nước âm sàn, hoặc thay đổi màu sắc/vật liệu mặt ngoài ban công phải tuân thủ nội quy tòa nhà và được Ban Quản Lý phê duyệt trước khi thi công.",
    category: "Thiết kế & Bàn giao",
  },
  {
    question: "Điều gì định nghĩa một dự án bất động sản là 'Hạng sang / Luxury' tại Đông Hòa?",
    answer: "Một dự án đạt chuẩn hạng sang khi hội tụ đủ 4 tiêu chí khắt khe: (1) Vị trí độc bản (trung tâm đô thị hoặc mặt tiền sông/biển); (2) Mật độ xây dựng thấp với diện tích cảnh quan & tiện ích lớn; (3) Tiêu chuẩn bàn giao chuẩn quốc tế từ các thương hiệu hàng đầu thế giới; (4) Đơn vị quản lý vận hành tiêu chuẩn khách sạn 5 sao quốc tế.",
    category: "Tiêu chuẩn dự án",
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-[#080B0F] text-white relative border-t border-white/5" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#C5A880] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
              GIẢI ĐÁP PHÁP LÝ & ĐẦU TƯ
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-white mb-4">
              Những Thắc Mắc Thường Gặp
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mb-6" />
            <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
              Tổng hợp những giải đáp minh bạch về thủ tục pháp lý, phương án tài chính và quy trình sở hữu bất động sản tại Đông Hòa Property.
            </p>
          </motion.div>
        </div>

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
                className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#C5A880]/50 bg-white/[0.03] shadow-lg shadow-black/40'
                    : 'border-white/10 bg-white/[0.01] hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-[#C5A880] shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="font-medium text-sm sm:text-base text-white/90 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C5A880] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#C5A880]' : 'text-white/40'
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-2 text-white/70 text-sm leading-relaxed border-t border-white/5 pl-14 font-light">
                        <p>{faq.answer}</p>
                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-xs text-white/40">
                          <span>Chủ đề: <strong className="text-white/60 font-normal">{faq.category}</strong></span>
                          <a
                            href="#contact"
                            className="text-[#C5A880] hover:underline flex items-center gap-1 font-medium"
                          >
                            <HelpCircle className="w-3.5 h-3.5" /> Cần tư vấn thêm chi tiết
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Consultation CTA Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-white/[0.03] via-white/[0.05] to-white/[0.03] border border-[#C5A880]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif text-white font-medium text-base">Bạn có câu hỏi riêng về giỏ hàng & suất ngoại giao?</h4>
            <p className="text-xs text-white/50 font-light mt-1">Chuyên viên tư vấn cấp cao sẽ phản hồi bảo mật trong vòng 15 phút.</p>
          </div>
          <a
            href="tel:0901234567"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C5A880] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#d6bc96] transition-all shrink-0 shadow-md"
          >
            <PhoneCall className="w-4 h-4" />
            Hotline 24/7
          </a>
        </div>
      </div>
    </section>
  );
};

