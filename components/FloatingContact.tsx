'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { PhoneCall, MessageCircle, ArrowUp, X, Sparkles } from 'lucide-react';

export default function FloatingContact() {
  const pathname = usePathname();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hotline, setHotline] = useState('0906.499.279');

  // Do not show on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings?.hotline) {
          setHotline(data.settings.hotline);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-[#04092b] text-[#04092b] hover:text-[#c5a26c] border border-[#e2ddd3] shadow-md flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
          title="Cuộn lên đầu trang"
        >
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}

      {/* Expanded Quick Contact Menu */}
      {isOpen && (
        <div className="bg-white/95 backdrop-blur-md border border-[#c5a26c] p-4 rounded-2xl shadow-2xl space-y-3 mb-1 animate-in fade-in slide-in-from-bottom-3 duration-200 w-64 text-[#04092b]">
          <div className="flex items-center justify-between border-b border-[#e2ddd3] pb-2">
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#04092b] flex items-center gap-1.5 font-accent">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a26c]" /> Tư Vấn Trực Tiếp
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-black text-[13px] font-bold"
            >
              ✕
            </button>
          </div>

          <p className="text-[11.5px] text-[#6e706a] leading-relaxed">
            Đội ngũ KTS Đông Hòa Design sẵn sàng tư vấn giải pháp nội thất & báo giá tận tâm.
          </p>

          <div className="space-y-2 pt-1">
            {/* Direct Call */}
            <a
              href={`tel:${hotline.replace(/\D/g, '') || '0906499279'}`}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] transition-all shadow-sm group"
            >
              <div className="w-7 h-7 rounded-lg bg-white/10 group-hover:bg-[#04092b]/10 flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4 text-[#c5a26c] group-hover:text-[#04092b]" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-wider font-semibold opacity-80">Hotline 24/7</span>
                <strong className="text-[13px] font-bold">{hotline}</strong>
              </div>
            </a>

            {/* Zalo Chat */}
            <a
              href={`https://zalo.me/${hotline.replace(/\D/g, '') || '0906499279'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#0068FF] hover:bg-[#0052cc] text-white transition-all shadow-sm group"
            >
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center font-bold text-[12px] shrink-0">
                Z
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-wider font-semibold opacity-90">Chat Zalo</span>
                <strong className="text-[13px] font-bold">KTS Đông Hòa</strong>
              </div>
            </a>

            {/* Scroll To Consultation Form */}
            <button
              onClick={() => {
                setIsOpen(false);
                scrollToContact();
              }}
              className="w-full text-center py-2 text-[11.5px] font-bold text-[#04092b] hover:text-[#c5a26c] hover:underline"
            >
              📝 Điền form đăng ký tư vấn →
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="relative group">
        {/* Pulsing Aura */}
        <div className="absolute -inset-1 bg-[#c5a26c] rounded-full blur-xs opacity-60 group-hover:opacity-100 animate-pulse" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-[#04092b] text-[#c5a26c] hover:bg-[#c5a26c] hover:text-[#04092b] shadow-2xl border-2 border-[#c5a26c] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
          title="Liên hệ tư vấn thiết kế"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative flex items-center justify-center translate-y-[10%]">
              <PhoneCall className="w-6 h-6 animate-bounce" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

