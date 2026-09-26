'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, MessageCircle, Sparkles, Send } from 'lucide-react';

interface MobileStickyCTAProps {
  hotline?: string;
  zaloUrl?: string;
  onOpenInquiry?: (defaultMsg?: string) => void;
}

export default function MobileStickyCTA({
  hotline = '0906.499.279',
  zaloUrl = 'https://zalo.me/0906499279',
  onOpenInquiry,
}: MobileStickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls past top 200px
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cleanPhone = hotline.replace(/\D/g, '');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0B0F19]/95 backdrop-blur-lg border-t border-gold/30 px-3 py-2.5 shadow-2xl safe-area-pb"
        >
          <div className="max-w-md mx-auto flex items-center justify-between gap-2">
            {/* Quick Call */}
            <a
              href={`tel:${cleanPhone}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 active:scale-95 transition-all"
              aria-label={`Gọi hotline ${hotline}`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-gold shrink-0 animate-bounce" />
              <span className="truncate">Gọi Hotline</span>
            </a>

            {/* Quick Zalo */}
            <a
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0068FF]/90 hover:bg-[#0068FF] text-white text-xs font-semibold shadow-sm active:scale-95 transition-all"
              aria-label="Chat qua Zalo"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Chat Zalo</span>
            </a>

            {/* Inquire Button */}
            <button
              type="button"
              onClick={() => {
                if (onOpenInquiry) {
                  onOpenInquiry('Yêu cầu tư vấn & nhận báo giá trực tiếp');
                } else {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex-[1.2] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-charcoal-900 text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-charcoal-900" />
              <span className="truncate">Nhận Báo Giá</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
