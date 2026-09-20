'use client';

import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionText,
  onAction,
  className = ''
}: EmptyStateProps) {
  return (
    <div
      className={`p-8 sm:p-12 text-center bg-white border border-[#e2ddd3] rounded-3xl flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#faf8f5] border border-[#e2ddd3] flex items-center justify-center text-[#c5a26c] shadow-xs">
        <Icon className="w-7 h-7" />
      </div>
      <div className="max-w-md space-y-1">
        <h3 className="font-bold text-[16px] text-[#04092b]">{title}</h3>
        {description && <p className="text-[13px] text-[#6e706a] leading-relaxed">{description}</p>}
      </div>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-2 px-5 py-2.5 bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] font-bold text-[13px] rounded-xl transition-all shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

