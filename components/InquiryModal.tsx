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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#060913] text-white border border-[#C5A880]/40 max-w-lg w-full p-8 relative shadow-2xl rounded-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#C5A880] mx-auto animate-bounce" />
            <h3 className="text-2xl font-serif font-light text-white">
              Đăng Ký Thành Công!
            </h3>
            <p className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed font-light">
              Chuyên viên tư vấn cao cấp của <strong>Đông Hòa Property</strong> sẽ liên hệ trực tiếp với quý khách qua số <strong>{phone}</strong> trong vòng 15 phút.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#C5A880] text-[#060913] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors hover:bg-white cursor-pointer"
            >
              Hoàn Tất
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <span className="text-[11px] font-semibold text-[#C5A880] uppercase tracking-[0.2em] font-sans block">
                KẾT NỐI TRỰC TIẾP
              </span>
              <h3 className="text-2xl font-serif font-light text-white">
                {defaultProject ? `Tư Vấn Dự Án: ${defaultProject}` : 'Tư Vấn Đầu Tư & Bất Động Sản'}
              </h3>
              <p className="text-xs text-white/60 font-light max-w-xs mx-auto">
                Nhận thông tin mật giỏ hàng mở bán đợt 1 và bảng giá gốc trực tiếp từ chủ đầu tư.
              </p>
            </div>

            {/* Direct Contact Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href={`tel:${cleanPhone}`}
                className="bg-[#C5A880] hover:bg-white text-[#060913] py-3 px-3 text-center font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors rounded-sm"
              >
                <Phone className="w-3.5 h-3.5" /> Hotline 24/7
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white py-3 px-3 text-center font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors rounded-sm border border-white/10"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" /> Chat Zalo Ngay
              </a>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-3 text-white/40 text-[10px] uppercase tracking-wider">
                hoặc để lại lời nhắn
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-lg text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Họ và tên của quý khách *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-white placeholder-white/40 focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Số điện thoại liên hệ *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-white placeholder-white/40 focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email (không bắt buộc)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs text-white placeholder-white/40 focus:border-[#C5A880] focus:outline-none"
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
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-white/40 focus:border-[#C5A880] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C5A880] hover:bg-white text-[#060913] py-3.5 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2 rounded-sm shadow-xl disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Đang gửi thông tin...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>GỬI YÊU CẦU TƯ VẤN NGAY</span>
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
