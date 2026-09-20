'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, HelpCircle } from 'lucide-react';

interface MortgageCalculatorSectionProps {
  onOpenInquiry?: (defaultMsg?: string) => void;
}

export default function MortgageCalculatorSection({ onOpenInquiry }: MortgageCalculatorSectionProps) {
  // State for interactive calculation
  const [propertyPrice, setPropertyPrice] = useState<number>(5000); // triệu VNĐ (5 Tỷ)
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30%
  const [loanTermYears, setLoanTermYears] = useState<number>(20); // 20 năm
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% / năm

  // Reactive Calculation Logic: Standard Annuity Formula
  const calculation = useMemo(() => {
    const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = propertyPrice - downPaymentAmount;

    const totalMonths = loanTermYears * 12;
    const monthlyInterestRate = interestRate / 100 / 12;

    let monthlyPayment = 0;
    if (loanAmount > 0 && monthlyInterestRate > 0 && totalMonths > 0) {
      monthlyPayment =
        (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalMonths)) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
    }

    const totalRepayment = monthlyPayment * totalMonths;
    const totalInterest = totalRepayment - loanAmount;

    return {
      downPaymentAmount: Math.round(downPaymentAmount),
      loanAmount: Math.round(loanAmount),
      monthlyPayment: Math.round(monthlyPayment * 10) / 10,
      totalInterest: Math.round(totalInterest),
    };
  }, [propertyPrice, downPaymentPercent, loanTermYears, interestRate]);

  const formatBillion = (millionVal: number) => {
    if (millionVal >= 1000) {
      return `${(millionVal / 1000).toFixed(1).replace('.0', '')} Tỷ VNĐ`;
    }
    return `${millionVal} Triệu VNĐ`;
  };

  return (
    <section id="mortgage-calculator" className="py-20 sm:py-28 bg-white border-b border-warm-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold font-sans block">
              CÔNG CỤ TÀI CHÍNH
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal leading-[1.2]">
              Ước Tính Kế Hoạch Vay Mua Bất Động Sản
            </h2>
            <p className="text-sm text-charcoal-600 max-w-lg mx-auto font-normal leading-relaxed">
              Công cụ hỗ trợ khách hàng dự toán dòng tiền trả hàng tháng và vốn tự có ban đầu.
            </p>
          </div>

          {/* Calculator Card Container */}
          <div className="bg-warm-50 rounded-3xl border border-warm-200 p-6 sm:p-10 lg:p-12 shadow-warm-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Controls Column */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Property Price Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm font-medium">
                    <span className="text-charcoal-700">Giá trị bất động sản:</span>
                    <span className="font-semibold text-charcoal text-sm">{formatBillion(propertyPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="1500"
                    max="50000"
                    step="500"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="w-full h-2 bg-warm-200 rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                  <div className="flex justify-between text-[11px] text-charcoal-muted">
                    <span>1.5 Tỷ</span>
                    <span>50 Tỷ VNĐ</span>
                  </div>
                </div>

                {/* 2. Down Payment Percentage */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm font-medium">
                    <span className="text-charcoal-700">Tỷ lệ vốn tự có:</span>
                    <span className="font-semibold text-charcoal text-sm">
                      {downPaymentPercent}% ({formatBillion(calculation.downPaymentAmount)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-2 bg-warm-200 rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                  <div className="flex justify-between text-[11px] text-charcoal-muted">
                    <span>20%</span>
                    <span>80%</span>
                  </div>
                </div>

                {/* 3. Loan Term & Interest Rate Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-charcoal-700">Thời hạn vay:</span>
                      <span className="font-semibold text-charcoal">{loanTermYears} năm</span>
                    </div>
                    <select
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-warm-300 text-xs font-medium text-charcoal focus:border-gold outline-none cursor-pointer"
                    >
                      <option value={5}>5 Năm (60 tháng)</option>
                      <option value={10}>10 Năm (120 tháng)</option>
                      <option value={15}>15 Năm (180 tháng)</option>
                      <option value={20}>20 Năm (240 tháng)</option>
                      <option value={25}>25 Năm (300 tháng)</option>
                      <option value={30}>30 Năm (360 tháng)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-charcoal-700">Lãi suất dự kiến:</span>
                      <span className="font-semibold text-charcoal">{interestRate}% / năm</span>
                    </div>
                    <select
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-warm-300 text-xs font-medium text-charcoal focus:border-gold outline-none cursor-pointer"
                    >
                      <option value={7.0}>7.0% (Ưu đãi cố định)</option>
                      <option value={8.0}>8.0% (Mức trung bình)</option>
                      <option value={8.5}>8.5% (Tiêu chuẩn hiện hành)</option>
                      <option value={9.5}>9.5% (Thả nổi)</option>
                      <option value={10.5}>10.5% (Thả nổi dài hạn)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Output Result Column */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-warm-200 shadow-warm-sm space-y-6">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-gold uppercase tracking-wider block">
                    ƯỚC TÍNH TRẢ HÀNG THÁNG
                  </span>
                  <div className="text-2xl sm:text-3xl font-serif font-semibold text-charcoal">
                    {calculation.monthlyPayment.toFixed(1)} <span className="text-sm font-sans font-normal text-charcoal-muted">Triệu / tháng</span>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-warm-100 text-xs">
                  <div className="flex justify-between text-charcoal-600">
                    <span>Vốn tự có ban đầu:</span>
                    <span className="font-semibold text-charcoal">{formatBillion(calculation.downPaymentAmount)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Số tiền vay ngân hàng:</span>
                    <span className="font-semibold text-charcoal">{formatBillion(calculation.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Thời hạn vay:</span>
                    <span className="font-semibold text-charcoal">{loanTermYears * 12} tháng</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onOpenInquiry) {
                      onOpenInquiry('Tư vấn gói tài chính & hỗ trợ vay mua BĐS');
                    } else {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-3 rounded-xl bg-charcoal hover:bg-gold text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-warm-sm"
                >
                  <span>Nhận bảng tính chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
