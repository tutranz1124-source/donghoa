'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, Sparkles, Percent, DollarSign, Clock, HelpCircle } from 'lucide-react';
import { MortgageData } from '@/lib/types';

interface MortgageCalculatorSectionProps {
  data?: MortgageData;
  onOpenInquiry?: (defaultMsg?: string) => void;
}

const PRICE_PRESETS = [
  { label: '2 Tỷ', value: 2000 },
  { label: '3.5 Tỷ', value: 3500 },
  { label: '5 Tỷ', value: 5000 },
  { label: '10 Tỷ', value: 10000 },
  { label: '20 Tỷ', value: 20000 },
];

export default function MortgageCalculatorSection({ data, onOpenInquiry }: MortgageCalculatorSectionProps) {
  // State for interactive calculation
  const [propertyPrice, setPropertyPrice] = useState<number>(data?.defaultPrice || 5000); // triệu VNĐ (5 Tỷ)
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(data?.defaultDownPaymentPercent || 30); // 30%
  const [loanTermYears, setLoanTermYears] = useState<number>(data?.defaultTermYears || 20); // 20 năm
  const [interestRate, setInterestRate] = useState<number>(data?.defaultInterestRate || 8.5); // 8.5% / năm

  React.useEffect(() => {
    if (data?.defaultPrice) setPropertyPrice(data.defaultPrice);
    if (data?.defaultDownPaymentPercent) setDownPaymentPercent(data.defaultDownPaymentPercent);
    if (data?.defaultTermYears) setLoanTermYears(data.defaultTermYears);
    if (data?.defaultInterestRate) setInterestRate(data.defaultInterestRate);
  }, [data]);

  const tag = data?.tag || 'CÔNG CỤ TÀI CHÍNH';
  const heading = data?.heading || 'Ước Tính Kế Hoạch Vay Mua Bất Động Sản';
  const description =
    data?.description ||
    'Công cụ hỗ trợ khách hàng dự toán dòng tiền trả hàng tháng và vốn tự có ban đầu.';

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
    <section id="mortgage-calculator" className="py-20 sm:py-28 bg-gradient-to-b from-white via-warm-50/80 to-warm-100/50 border-b border-warm-200 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-3 mb-12 sm:mb-16"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold font-sans inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{tag}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal leading-tight">
              {heading}
            </h2>
            <p className="text-sm text-charcoal-600 max-w-lg mx-auto font-normal leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Calculator Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-warm-50 rounded-3xl border border-warm-300 p-6 sm:p-10 lg:p-12 shadow-warm-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Controls Column */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Property Price with Presets */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-medium">
                    <span className="text-charcoal-700">Giá trị bất động sản:</span>
                    <span className="font-semibold text-charcoal text-base text-gold font-serif">
                      {formatBillion(propertyPrice)}
                    </span>
                  </div>

                  {/* Quick Preset Chips */}
                  <div className="flex flex-wrap gap-1.5 pb-1">
                    {PRICE_PRESETS.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => setPropertyPrice(preset.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          propertyPrice === preset.value
                            ? 'bg-charcoal text-white shadow-sm'
                            : 'bg-white border border-warm-300 text-charcoal-700 hover:border-gold hover:text-charcoal'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
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
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-medium">
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

                {/* Visual Allocation Distribution Bar */}
                <div className="space-y-2 bg-white p-4 rounded-2xl border border-warm-200">
                  <div className="flex justify-between text-xs text-charcoal-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-gold inline-block" />
                      <span>Vốn tự có ({downPaymentPercent}%)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-charcoal inline-block" />
                      <span>Vốn vay ({100 - downPaymentPercent}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-warm-200 overflow-hidden flex">
                    <div
                      style={{ width: `${downPaymentPercent}%` }}
                      className="bg-gold transition-all duration-300"
                    />
                    <div
                      style={{ width: `${100 - downPaymentPercent}%` }}
                      className="bg-charcoal transition-all duration-300"
                    />
                  </div>
                </div>

                {/* 3. Loan Term & Interest Rate Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <option value={6.5}>6.5% (Gói ưu đãi 12T đầu)</option>
                      <option value={7.5}>7.5% (Cố định 2 năm)</option>
                      <option value={8.5}>8.5% (Tiêu chuẩn hiện hành)</option>
                      <option value={9.5}>9.5% (Lãi suất thả nổi)</option>
                      <option value={10.5}>10.5% (Thả nổi biên độ cao)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Output Result Column */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-warm-200 shadow-warm-md space-y-6">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-gold uppercase tracking-wider block">
                    ƯỚC TÍNH TRẢ HÀNG THÁNG
                  </span>
                  <div className="text-3xl sm:text-4xl font-serif font-semibold text-charcoal leading-none">
                    {calculation.monthlyPayment.toFixed(1)}{' '}
                    <span className="text-sm font-sans font-normal text-charcoal-muted">Triệu / tháng</span>
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
                  <div className="flex justify-between text-charcoal-600">
                    <span>Lãi suất tính toán:</span>
                    <span className="font-semibold text-charcoal">{interestRate}% / năm</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onOpenInquiry) {
                      onOpenInquiry(`Tư vấn phương án vay mua BĐS (${formatBillion(propertyPrice)}, vay ${formatBillion(calculation.loanAmount)})`);
                    } else {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-charcoal hover:bg-gold text-white hover:text-charcoal text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md group cursor-pointer"
                >
                  <span>Nhận Bảng Tính Vay Chi Tiết</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

