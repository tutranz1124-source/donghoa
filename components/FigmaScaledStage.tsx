'use client';

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';

interface FigmaScaledStageProps {
  figmaWidth?: number;
  figmaHeight: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function FigmaScaledStage({
  figmaWidth = 1440,
  figmaHeight,
  children,
  className = '',
  style = {},
}: FigmaScaledStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [isReady, setIsReady] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const clientWidth = el.clientWidth;
      if (clientWidth > 0) {
        setScale(clientWidth / figmaWidth);
        setIsReady(true);
      }
    };

    updateScale();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width;
          if (w > 0) {
            setScale(w / figmaWidth);
            setIsReady(true);
          }
        }
      });
      resizeObserver.observe(el);
    } else {
      window.addEventListener('resize', updateScale);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', updateScale);
      }
    };
  }, [figmaWidth]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{
        aspectRatio: `${figmaWidth} / ${figmaHeight}`,
        ...style,
      }}
    >
      <div
        style={{
          width: `${figmaWidth}px`,
          height: `${figmaHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: isReady ? 1 : 0.01,
          transition: 'opacity 0.15s ease-in',
        }}
      >
        {children}
      </div>
    </div>
  );
}
