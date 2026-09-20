'use client';

import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
  hotline?: string;
}

export default function InquiryModal({
  isOpen,
  onClose,
  defaultProject,
  hotline = '0906.499.279'
}: InquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Vui lòng nhập họ tên và số điện thoại.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          projectName: defaultProject || '',
          need: message.trim() || (defaultProject ? `Quan tâm dự án: ${defaultProject}` : 'Tư vấn thông tin bất động sản & không gian')
        })
      });

      const resJson = await response.json();
      if (!response.ok || resJson.error) {
        throw new Error(resJson.error || 'Gửi yêu cầu không thành công');
      }

      setSubmitted(true);
      setTimeout(() => {
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      }, 500);
    } catch (err: any) {
      console.error('Inquiry submission error:', err);
      setErrorMessage(err.message || 'Đã có lỗi xảy ra. Quý khách vui lòng thử lại hoặc gọi trực tiếp hotline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cleanPhone = hotline.replace(/\D/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#04092b] text-white border border-[#c5a26c]/60 max-w-lg w-full p-6 sm:p-8 relative shadow-2xl rounded-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#c5a26c] mx-auto animate-bounce" />
            <h3 className="text-[22px] sm:text-[24px] font-bold font-display text-white">
              Đăng Ký Thành Công!
            </h3>
            <p className="text-[13.5px] text-white/85 max-w-sm mx-auto leading-relaxed font-light">
              Chuyên viên tư vấn cao cấp của <strong>Đông Hòa Property</strong> sẽ liên hệ trực tiếp với quý khách qua số <strong>{phone}</strong> trong vòng 15 phút.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#c5a26c] text-[#04092b] font-bold text-[12px] uppercase tracking-wider rounded transition-colors hover:bg-white"
            >
              Hoàn Tất
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-1.5 text-center">
              <span className="text-[10.5px] font-bold text-[#c5a26c] uppercase tracking-widest font-accent">
                KẾT NỐI TRỰC TIẾP
              </span>
              <h3 className="text-[20px] sm:text-[22px] font-semibold font-display text-white">
                {defaultProject ? `Tư Vấn Dự Án: ${defaultProject}` : 'Tư Vấn Đầu Tư & Bất Động Sản'}
              </h3>
              <p className="text-[12.5px] text-white/70 font-light">
                Nhận thông tin độc quyền, mặt bằng chi tiết và chính sách ưu đãi trực tiếp.
              </p>
            </div>

            {/* Direct Contact Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href={`tel:${cleanPhone}`}
                className="bg-[#c5a26c] hover:bg-[#b38f57] text-[#04092b] py-2.5 px-3 text-center font-bold text-[12px] flex items-center justify-center gap-1.5 transition-colors rounded"
              >
                <Phone className="w-3.5 h-3.5" /> Hotline: {hotline}
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-3 text-center font-bold text-[12px] flex items-center justify-center gap-1.5 transition-colors rounded"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Chat Zalo Ngay
              </a>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-white/20"></div>
              <span className="flex-shrink mx-3 text-white/40 text-[10.5px] uppercase tracking-wider">
                hoặc để lại lời nhắn
              </span>
              <div className="flex-grow border-t border-white/20"></div>
            </div>

            {errorMessage && (
              <div className="p-2.5 bg-red-950/80 border border-red-500/50 rounded text-red-200 text-[11.5px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Họ và tên của quý khách *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded px-3.5 py-2.5 text-[13px] text-white placeholder-white/50 focus:border-[#c5a26c] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Số điện thoại liên hệ *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded px-3.5 py-2.5 text-[13px] text-white placeholder-white/50 focus:border-[#c5a26c] focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email (không bắt buộc)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded px-3.5 py-2.5 text-[13px] text-white placeholder-white/50 focus:border-[#c5a26c] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder={
                    defaultProject
                      ? `Nhu cầu quan tâm tại ${defaultProject}...`
                      : 'Dự án hoặc nhu cầu quý khách đang quan tâm...'
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded px-3.5 py-2 text-[13px] text-white placeholder-white/50 focus:border-[#c5a26c] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#c5a26c] hover:bg-white text-[#04092b] py-3 text-[12.5px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 rounded shadow-md disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Đang gửi thông tin...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi Yêu Cầu Tư Vấn</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
