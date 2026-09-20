'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, DollarSign, Calendar, Percent } from 'lucide-react';

interface MortgageCalculatorSectionProps {
  onOpenInquiry?: (defaultMsg?: string) => void;
}

export default function MortgageCalculatorSection({ onOpenInquiry }: MortgageCalculatorSectionProps) {
  const [propertyPrice, setPropertyPrice] = useState<number>(10000000000); // 10 Billion VND
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30%
  const [loanTermYears, setLoanTermYears] = useState<number>(20); // 20 years
  const [interestRate, setInterestRate] = useState<number>(7.5); // 7.5% / year

  // Calculations
  const downPaymentAmount = useMemo(() => {
    return (propertyPrice * downPaymentPercent) / 100;
  }, [propertyPrice, downPaymentPercent]);

  const loanAmount = useMemo(() => {
    return propertyPrice - downPaymentAmount;
  }, [propertyPrice, downPaymentAmount]);

  const monthlyRepayment = useMemo(() => {
    if (loanAmount <= 0) return 0;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfMonths = loanTermYears * 12;
    if (monthlyRate === 0) return loanAmount / numberOfMonths;
    const factor = Math.pow(1 + monthlyRate, numberOfMonths);
    return (loanAmount * (monthlyRate * factor)) / (factor - 1);
  }, [loanAmount, interestRate, loanTermYears]);

  const formatVND = (num: number) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1).replace('.0', '')} Tỷ VNĐ`;
    }
    return `${Math.round(num / 1000000)} Triệu VNĐ`;
  };

  return (
    <section id="mortgage-calculator" className="w-full py-24 sm:py-28 lg:py-36 bg-[#080C16] text-white border-t border-white/5 relative overflow-hidden">
      {/* Soft Gold Blur Background */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#C5A880]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Heading & Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-xs font-semibold text-[#C5A880] uppercase tracking-[0.25em] font-sans block">
              CÔNG CỤ TÀI CHÍNH
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight tracking-tight">
              Tính Toán Dòng Tiền & Lộ Trình Đầu Tư
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A880]" />
            <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed">
              Chủ động hoạch định vốn tự có, đòn bẩy tài chính và hạn mức trả góp hàng tháng với các gói ân hạn nợ gốc từ các ngân hàng đối tác liên kết của Đông Hòa Property.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() =>
                  onOpenInquiry?.(
                    `Tư vấn phương án tài chính cho bất động sản giá trị ${formatVND(propertyPrice)}`
                  )
                }
                className="px-6 py-3.5 bg-[#C5A880] hover:bg-white text-[#060913] font-semibold text-xs tracking-[0.15em] uppercase transition-all duration-300 shadow-xl rounded-sm flex items-center gap-2 group cursor-pointer"
              >
                <span>Nhận Tư Vấn Gói Vay 0%</span>
                <ArrowRight className="w-4 h-4 text-[#060913] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Interactive Calculator Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white/[0.02] border border-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl backdrop-blur-md space-y-8"
          >
            {/* Input 1: Property Value */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-white/80 font-medium">Giá trị bất động sản</span>
                <span className="text-lg font-serif text-[#C5A880] font-normal">
                  {formatVND(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min={2000000000}
                max={50000000000}
                step={500000000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full accent-[#C5A880] bg-white/10 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-white/40">
                <span>2 Tỷ</span>
                <span>25 Tỷ</span>
                <span>50 Tỷ</span>
              </div>
            </div>

            {/* Input 2: Down Payment */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-white/80 font-medium">Tỷ lệ vốn tự có (trả trước)</span>
                <span className="text-sm font-serif text-[#C5A880]">
                  {downPaymentPercent}% ({formatVND(downPaymentAmount)})
                </span>
              </div>
              <input
                type="range"
                min={15}
                max={70}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-[#C5A880] bg-white/10 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Input 3 & 4: Loan Term & Interest */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-white/70">Thời hạn vay</label>
                <select
                  value={loanTermYears}
                  onChange={(e) => setLoanTermYears(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg bg-[#0E1322] border border-white/10 text-white text-xs outline-none focus:border-[#C5A880]"
                >
                  <option value={5}>5 Năm</option>
                  <option value={10}>10 Năm</option>
                  <option value={15}>15 Năm</option>
                  <option value={20}>20 Năm</option>
                  <option value={25}>25 Năm</option>
                  <option value={30}>30 Năm</option>
                  <option value={35}>35 Năm</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/70">Lãi suất dự kiến (% / năm)</label>
                <input
                  type="number"
                  step="0.1"
                  min="4"
                  max="15"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            {/* Calculation Result Summary */}
            <div className="p-6 rounded-xl bg-white/[0.03] border border-[#C5A880]/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/50">Ước tính trả hàng tháng (Gốc + Lãi)</p>
                  <p className="text-2xl sm:text-3xl font-serif text-[#C5A880] mt-1">
                    {formatVND(monthlyRepayment)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/50">Hạn mức ngân hàng giải ngân</p>
                  <p className="text-sm font-semibold text-white mt-1">
                    {formatVND(loanAmount)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
