'use client';

import React, { useState, useMemo } from 'react';
import FlowReveal from '@/components/animations/FlowReveal';
import { Calculator, Percent, DollarSign, Calendar, ArrowRight } from 'lucide-react';

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
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#faf8f5] border-b border-[#e2ddd3] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Information */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <FlowReveal direction="up" distance={30} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-[1.5px] bg-[#c5a26c]" />
                <span className="text-[11.5px] sm:text-[12px] font-bold text-[#6e706a] uppercase tracking-widest font-accent">
                  CÔNG CỤ TÀI CHÍNH THÔNG MINH
                </span>
              </div>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-semibold text-[#04092b] font-display uppercase leading-tight tracking-tight">
                Tính Toán Dòng Tiền & Lộ Trình Đầu Tư
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#5f6361] font-light leading-relaxed">
                Chủ động hoạch định vốn tự có, đòn bẩy tài chính và hạn mức trả góp hàng tháng với lãi suất ưu đãi từ các ngân hàng đối tác chiến lược của Đông Hòa Property.
              </p>
            </FlowReveal>

            {/* Quick Consultation CTA */}
            <FlowReveal direction="up" distance={20} delay={0.15} className="pt-2">
              <button
                type="button"
                onClick={() =>
                  onOpenInquiry?.(
                    `Tư vấn phương án tài chính cho bất động sản giá trị ${formatVND(propertyPrice)}`
                  )
                }
                className="w-full sm:w-auto px-6 py-3.5 bg-[#04092b] hover:bg-[#c5a26c] hover:text-[#04092b] text-white font-bold text-[12.5px] uppercase tracking-wider rounded-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Nhận Lộ Trình Vay Ưu Đãi 0%</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </FlowReveal>
          </div>

          {/* Right Column: Interactive Calculator Card */}
          <div className="lg:col-span-7">
            <FlowReveal direction="up" distance={35} delay={0.1}>
              <div className="bg-white border border-[#e2ddd3] p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
                
                {/* Input 1: Property Value Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="font-bold text-[#04092b]">Giá Trị Bất Động Sản</span>
                    <span className="font-bold text-[#c5a26c] font-display text-[16px]">
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
                    className="w-full h-2 bg-[#e2ddd3] rounded-lg appearance-none cursor-pointer accent-[#04092b]"
                  />
                  <div className="flex justify-between text-[10.5px] text-[#6e706a]">
                    <span>2 Tỷ</span>
                    <span>25 Tỷ</span>
                    <span>50 Tỷ</span>
                  </div>
                </div>

                {/* Input 2 & 3: Down Payment & Loan Term */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11.5px] font-bold text-[#04092b] uppercase">
                      Vốn Tự Có (%): {downPaymentPercent}%
                    </label>
                    <select
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#faf8f5] border border-[#e2ddd3] rounded-lg text-[13px] font-medium text-[#04092b] focus:outline-none focus:border-[#c5a26c]"
                    >
                      <option value={20}>20% ({formatVND((propertyPrice * 20) / 100)})</option>
                      <option value={30}>30% ({formatVND((propertyPrice * 30) / 100)})</option>
                      <option value={50}>50% ({formatVND((propertyPrice * 50) / 100)})</option>
                      <option value={70}>70% ({formatVND((propertyPrice * 70) / 100)})</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11.5px] font-bold text-[#04092b] uppercase">
                      Thời Hạn Vay: {loanTermYears} Năm
                    </label>
                    <select
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#faf8f5] border border-[#e2ddd3] rounded-lg text-[13px] font-medium text-[#04092b] focus:outline-none focus:border-[#c5a26c]"
                    >
                      <option value={10}>10 Năm (120 Tháng)</option>
                      <option value={15}>15 Năm (180 Tháng)</option>
                      <option value={20}>20 Năm (240 Tháng)</option>
                      <option value={25}>25 Năm (300 Tháng)</option>
                      <option value={30}>30 Năm (360 Tháng)</option>
                    </select>
                  </div>
                </div>

                {/* Calculation Summary Results Box */}
                <div className="bg-[#04092b] text-white p-5 sm:p-6 rounded-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <span className="text-[12px] uppercase text-white/70 tracking-wider">
                      Ước tính thanh toán hàng tháng:
                    </span>
                    <span className="text-[22px] sm:text-[26px] font-bold text-[#c5a26c] font-display">
                      ~{formatVND(monthlyRepayment)}/tháng
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[12px] text-white/80">
                    <div>
                      <span className="block text-white/50 text-[10.5px]">Số tiền cần chuẩn bị:</span>
                      <span className="font-bold text-white text-[13px]">{formatVND(downPaymentAmount)}</span>
                    </div>
                    <div>
                      <span className="block text-white/50 text-[10.5px]">Số tiền vay ngân hàng:</span>
                      <span className="font-bold text-white text-[13px]">{formatVND(loanAmount)}</span>
                    </div>
                  </div>
                </div>

              </div>
            </FlowReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

