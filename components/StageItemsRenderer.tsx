'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CanvaItem } from '@/lib/types';

interface StageItemsRendererProps {
  items: CanvaItem[];
  isMobile?: boolean;
}

export default function StageItemsRenderer({ items, isMobile = false }: StageItemsRendererProps) {
  if (!items || items.length === 0) return null;

  return (
    <>
      {items.map((item, idx) => {
        // Outer box transforms
        const transformParts: string[] = [];
        if (item.position.scale && item.position.scale !== 1) {
          transformParts.push(`scale(${item.position.scale})`);
        }
        if (item.position.rotate) {
          transformParts.push(`rotate(${item.position.rotate}deg)`);
        }
        if (item.position.flipH) {
          transformParts.push('scaleX(-1)');
        }
        const transformStr = transformParts.length > 0 ? transformParts.join(' ') : undefined;

        // Inner image crop & zoom transforms
        const imageTransformParts: string[] = [];
        if (item.position.cropZoom && item.position.cropZoom !== 1) {
          imageTransformParts.push(`scale(${item.position.cropZoom})`);
        }
        if (item.position.cropOffsetX || item.position.cropOffsetY) {
          imageTransformParts.push(
            `translate(${item.position.cropOffsetX || 0}%, ${item.position.cropOffsetY || 0}%)`
          );
        }
        const imageTransformStr = imageTransformParts.length > 0 ? imageTransformParts.join(' ') : undefined;

        // Crop clip path (inset)
        const crop = item.position.crop;
        const clipPathStr =
          crop && (crop.top || crop.bottom || crop.left || crop.right)
            ? `inset(${crop.top || 0}% ${crop.right || 0}% ${crop.bottom || 0}% ${crop.left || 0}%)`
            : undefined;

        const zIndex = item.position.zIndex ?? (idx + 1) * 2;

        if (isMobile) {
          return (
            <div
              key={item.id || idx}
              className="absolute pointer-events-auto"
              style={{
                left: item.position.left || '10%',
                top: item.position.top || '10%',
                width: item.position.width || '35%',
                height: item.position.height || undefined,
                aspectRatio: item.position.height ? undefined : item.position.aspectRatio || '21/9',
                zIndex,
              }}
            >
              <div
                className="relative w-full h-full overflow-hidden"
                style={{ transform: transformStr, clipPath: clipPathStr }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className={`drop-shadow-md ${
                    item.position.objectFit === 'cover' ? 'object-cover' : 'object-contain'
                  }`}
                  style={imageTransformStr ? { transform: imageTransformStr } : undefined}
                />
              </div>
            </div>
          );
        }

        const direction = item.animation?.direction;
        let initialX = 0;
        let initialY = 0;
        let initialScale = 1;
        if (direction === 'slide-left') initialX = item.animation?.offsetX ?? -60;
        else if (direction === 'slide-right') initialX = item.animation?.offsetX ?? 60;
        else if (direction === 'drop-top') initialY = item.animation?.offsetY ?? -60;
        else if (direction === 'float-bottom') initialY = item.animation?.offsetY ?? 60;
        else if (direction === 'fade-scale') initialScale = 0.88;
        else initialY = 15;

        return (
          <motion.div
            key={item.id || idx}
            initial={{ opacity: 0.8, x: initialX, y: initialY, scale: initialScale }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: item.animation?.duration || 0.85,
              delay: item.animation?.delay || 0.15,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="absolute pointer-events-auto"
            style={{
              left: item.position.left || '20%',
              top: item.position.top || '20%',
              width: item.position.width || '30%',
              height: item.position.height || undefined,
              aspectRatio: item.position.height ? undefined : item.position.aspectRatio || '21/9',
              zIndex,
            }}
          >
            <div
              className="relative w-full h-full overflow-hidden"
              style={{ transform: transformStr, clipPath: clipPathStr }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                priority={idx < 2}
                className={
                  item.position.objectFit === 'cover' ? 'object-cover' : 'object-contain'
                }
                style={imageTransformStr ? { transform: imageTransformStr } : undefined}
              />
            </div>
          </motion.div>
        );
      })}
    </>
  );
}
