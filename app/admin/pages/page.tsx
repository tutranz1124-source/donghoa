'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Save,
  Check,
  Building,
  Palette,
  Layout,
  Compass,
  MessageSquare,
  Briefcase,
  ImageIcon,
  Sparkles,
  Eye,
  Plus,
  Trash2,
  ExternalLink,
  Play,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  Maximize2,
  Minimize2,
  Hand,
  ZoomIn,
  ZoomOut,
  MousePointer,
  RotateCw,
  Crop,
  FlipHorizontal,
  RefreshCw,
  Scissors,
  Wand2,
  Maximize,
  Monitor,
  Smartphone,
  Download,
  Upload,
  AlertCircle,
  CheckCircle2,
  Layers,
  Settings,
  X
} from 'lucide-react';
import { SiteContentData, MediaItem, StyleStageConfig, AnimatedStageItem } from '@/lib/types';

const stageCanvasConfigs: Record<'modern' | 'cozy' | 'luxury' | 'heritage', { aspectClass: string; bg: string }> = {
  modern: { aspectClass: 'aspect-[561/509]', bg: '#FFFFFF' },
  cozy: { aspectClass: 'aspect-[1440/1000]', bg: '#FAF6F0' },
  luxury: { aspectClass: 'aspect-[1440/1010]', bg: '#FFFFFF' },
  heritage: { aspectClass: 'aspect-[1440/850]', bg: '#FAF6F0' },
};

const mobileStageCanvasConfigs: Record<'modern' | 'cozy' | 'luxury' | 'heritage', { aspectClass: string; bg: string }> = {
  modern: { aspectClass: 'aspect-[4/3.4]', bg: '#f8f7f4' },
  cozy: { aspectClass: 'aspect-[4/3]', bg: '#f3ede3' },
  luxury: { aspectClass: 'aspect-[4/3]', bg: '#faf8f5' },
  heritage: { aspectClass: 'aspect-[1440/850]', bg: '#FAF6F0' },
};

const defaultMobileItems: Record<'modern' | 'cozy' | 'luxury' | 'heritage', AnimatedStageItem[]> = {
  modern: [
    {
      id: 'modern_pendant',
      name: 'Đèn thả trần hiện đại (Pendant)',
      image: '/uploads/figma_modern_pendant.png',
      position: { top: '0%', left: '77%', width: '15%', height: '26%', zIndex: 10 },
      animation: { direction: 'drop-top', offsetY: -30, delay: 0.1, duration: 0.8 }
    },
    {
      id: 'modern_bed',
      name: 'Giường ngủ Master Hiện đại (Bed)',
      image: '/uploads/figma_modern_bed.png',
      position: { top: '16%', left: '38%', width: '60%', height: '46%', zIndex: 10 },
      animation: { direction: 'slide-right', offsetX: 40, delay: 0.15, duration: 0.85 }
    },
    {
      id: 'modern_arc_lamp',
      name: 'Đèn cây vòm hiện đại (Arc Lamp)',
      image: '/uploads/figma_modern_arc_lamp.png',
      position: { top: '16%', left: '16%', width: '22%', height: '40%', zIndex: 12 },
      animation: { direction: 'slide-left', offsetX: -30, delay: 0.2, duration: 0.85 }
    },
    {
      id: 'modern_sofa',
      name: 'Sofa Bouclé Trắng Dài (Sofa)',
      image: '/uploads/figma_modern_sofa.png',
      position: { top: '58%', left: '2%', width: '68%', height: '36%', zIndex: 10 },
      animation: { direction: 'float-bottom', offsetY: 40, delay: 0.25, duration: 0.9 }
    },
    {
      id: 'modern_armchair',
      name: 'Ghế đơn Gỗ Tự nhiên (Armchair)',
      image: '/uploads/figma_modern_armchair.png',
      position: { top: '65%', left: '76%', width: '18%', height: '28%', zIndex: 12 },
      animation: { direction: 'slide-right', offsetX: 30, delay: 0.3, duration: 0.85 }
    }
  ],
  luxury: [
    {
      id: 'luxury_bed',
      name: 'Giường ngủ Bọc nệm Sang trọng',
      image: '/uploads/figma_luxury_bed.png',
      position: { top: '18%', left: '3%', width: '54%', height: '78%', zIndex: 10 },
      animation: { direction: 'slide-left', offsetX: -40, delay: 0.1, duration: 0.85 }
    },
    {
      id: 'luxury_palm_lamp',
      name: 'Đèn cây Lá cọ Mạ vàng',
      image: '/uploads/figma_luxury_palm_lamp.png',
      position: { top: '16%', left: '44%', width: '18%', height: '72%', zIndex: 12 },
      animation: { direction: 'drop-top', offsetY: -30, delay: 0.15, duration: 0.85 }
    },
    {
      id: 'luxury_swatch_1',
      name: 'Mẫu vật liệu Gỗ lượn sóng',
      image: '/uploads/figma_luxury_swatch_1.png',
      position: { top: '6%', left: '72%', width: '24%', height: '26%', zIndex: 10 },
      animation: { direction: 'slide-right', offsetX: 30, delay: 0.2, duration: 0.85 }
    },
    {
      id: 'luxury_swatch_2',
      name: 'Mẫu vật liệu Gỗ xương cá',
      image: '/uploads/figma_luxury_swatch_2.png',
      position: { top: '35%', left: '72%', width: '24%', height: '24%', zIndex: 10 },
      animation: { direction: 'slide-right', offsetX: 30, delay: 0.25, duration: 0.85 }
    },
    {
      id: 'luxury_vases',
      name: 'Bộ bình gốm & thủy tinh',
      image: '/uploads/figma_luxury_vases.png',
      position: { top: '61%', left: '76%', width: '18%', height: '35%', zIndex: 20 },
      animation: { direction: 'float-bottom', offsetY: 30, delay: 0.3, duration: 0.85 }
    }
  ],
  cozy: [
    {
      id: 'cozy_slat_panel',
      name: 'Vách nan gỗ tự nhiên (Slat Panel)',
      image: '/uploads/clean_cozy_slat_panel.png',
      position: { top: '0%', left: '18%', width: '20%', height: '70%', zIndex: 1 },
      animation: { direction: 'drop-top', offsetY: -30, delay: 0.1, duration: 0.85 }
    },
    {
      id: 'cozy_sofa_lamp',
      name: 'Ghế thư giãn Bouclé & Đèn sàn',
      image: '/uploads/clean_cozy_sofa_lamp.png',
      position: { top: '13%', left: '5%', width: '64%', height: '82%', zIndex: 10 },
      animation: { direction: 'slide-left', offsetX: -40, delay: 0.15, duration: 0.85 }
    },
    {
      id: 'cozy_tables',
      name: 'Bàn trà đôi gỗ trụ tròn (Tables)',
      image: '/uploads/clean_cozy_tables.png',
      position: { top: '47%', left: '61%', width: '35%', height: '48%', zIndex: 20 },
      animation: { direction: 'slide-right', offsetX: 40, delay: 0.2, duration: 0.85 }
    }
  ],
  heritage: [
    {
      id: 'heritage_chandelier',
      name: 'Đèn chùm Cổ điển Đồng',
      image: '/uploads/figma_heritage_chandelier.png',
      position: { top: '3.6%', left: '17.2%', width: '14.1%', height: '27.6%', zIndex: 15 },
      animation: { direction: 'drop-top', offsetY: -40, delay: 0.1, duration: 0.85 }
    },
    {
      id: 'heritage_vignette',
      name: 'Góc tranh ảnh & Đèn bàn Retro',
      image: '/uploads/figma_heritage_vignette.png',
      position: { top: '36.1%', left: '3.9%', width: '37.8%', height: '57.4%', zIndex: 10 },
      animation: { direction: 'slide-left', offsetX: -50, delay: 0.15, duration: 0.85 }
    },
    {
      id: 'heritage_table',
      name: 'Bàn tròn Gỗ chạm khắc Cổ',
      image: '/uploads/figma_heritage_table.png',
      position: { top: '57.6%', left: '51.5%', width: '16.5%', height: '28.6%', zIndex: 12 },
      animation: { direction: 'fade-scale', offsetY: 40, delay: 0.2, duration: 0.85 }
    },
    {
      id: 'heritage_armchair',
      name: 'Ghế bành Bọc nỉ Retro',
      image: '/uploads/figma_heritage_armchair.png',
      position: { top: '49.9%', left: '75.1%', width: '18.1%', height: '35.9%', zIndex: 14 },
      animation: { direction: 'slide-right', offsetX: 50, delay: 0.25, duration: 0.85 }
    }
  ]
};

export default function AdminPageEditor() {
  const [data, setData] = useState<SiteContentData | null>(null);
  const [activeTab, setActiveTab] = useState<'stages' | 'hero' | 'philosophy' | 'contact' | 'styles' | 'office' | 'settings'>('stages');
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0);
  const [selectedStageKey, setSelectedStageKey] = useState<'modern' | 'cozy' | 'luxury' | 'heritage'>('modern');
  const [stageViewMode, setStageViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [replayKey, setReplayKey] = useState(0);
  const [canvasMode, setCanvasMode] = useState<'edit' | 'preview'>('edit');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [isInspectorCollapsed, setIsInspectorCollapsed] = useState(false);

  // Ergonomic CMS & Scaling State
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [fullscreenPreviewSection, setFullscreenPreviewSection] = useState<'hero' | 'philosophy' | 'contact' | 'styles' | 'office' | null>(null);
  const [canvasZoom, setCanvasZoom] = useState<number>(1);
  const [previewZoom, setPreviewZoom] = useState<number>(1);
  const [previewLayout, setPreviewLayout] = useState<'split' | 'full'>('split');
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const importFileRef = useRef<HTMLInputElement>(null);

  // Dedicated Canva Crop Lightbox State
  const [cropModalItemIndex, setCropModalItemIndex] = useState<number | null>(null);
  const [cropDraft, setCropDraft] = useState<{
    top: number;
    bottom: number;
    left: number;
    right: number;
    zoom: number;
    offsetX: number;
    offsetY: number;
    aspectRatio: string;
  }>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    aspectRatio: '21/9'
  });

  const canvasRef = useRef<HTMLDivElement>(null);

  // Media picker modal state
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [mediaFilter, setMediaFilter] = useState<string>('all');
  const [currentMediaTarget, setCurrentMediaTarget] = useState<{
    callback: (url: string) => void;
    title: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((json) => {
        if (json) setData(json);
      });

    fetch('/api/media')
      .then((r) => r.json())
      .then((json) => {
        if (Array.isArray(json)) setMediaList(json);
      });

    // Check query params for tab selection (e.g., ?tab=office)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam) {
        const validTabs = ['stages', 'hero', 'philosophy', 'contact', 'styles', 'office', 'settings'];
        if (validTabs.includes(tabParam)) {
          setActiveTab(tabParam as any);
        } else if (tabParam === 'canva') {
          setActiveTab('stages');
        }
      }
    }
  }, []);

  // Global Ctrl + S keyboard shortcut to save changes instantly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data]);

  useEffect(() => {
    if (toastMessage && toastMessage.type === 'success') {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleSave = async (customPayload?: SiteContentData) => {
    const payload = customPayload || data;
    if (!payload) return;

    // 1. Instant local persistence for zero-latency website reflection
    try {
      localStorage.setItem('donghoa_site_content', JSON.stringify(payload));
    } catch (e) {}

    // 2. Broadcast to any open website tabs in real time
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('donghoa_content_sync');
        bc.postMessage(payload);
        setTimeout(() => bc.close(), 500);
      }
    } catch (e) {}

    setSavedStatus('saving');
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok && result.success) {
        setSavedStatus('saved');
        setToastMessage({
          type: 'success',
          text: result.message || 'Đã lưu toàn bộ cấu hình trang chủ thành công!'
        });
        setTimeout(() => setSavedStatus('idle'), 2500);
      } else {
        setSavedStatus('idle');
        setToastMessage({
          type: 'error',
          text: result.error || 'Lưu thất bại: Vui lòng kiểm tra quyền đăng nhập hoặc kết nối máy chủ.'
        });
      }
    } catch (err: any) {
      console.error(err);
      setSavedStatus('idle');
      setToastMessage({
        type: 'error',
        text: `Lỗi kết nối máy chủ khi lưu: ${err?.message || 'Không thể gửi dữ liệu'}`
      });
    }
  };

  const handleExportJson = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donghoa-customization-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToastMessage({ type: 'info', text: 'Đã tải xuống file sao lưu cấu hình JSON thành công!' });
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed === 'object') {
          setData(parsed);
          handleSave(parsed);
          setToastMessage({ type: 'success', text: 'Đã nhập cấu hình từ file và cập nhật hệ thống thành công!' });
        } else {
          setToastMessage({ type: 'error', text: 'File JSON không đúng cấu trúc trang chủ.' });
        }
      } catch (err) {
        setToastMessage({ type: 'error', text: 'Không thể đọc dữ liệu từ file JSON này.' });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const openMediaPicker = (title: string, callback: (url: string) => void) => {
    setCurrentMediaTarget({ title, callback });
    setIsMediaModalOpen(true);
  };

  const selectMediaItem = (url: string) => {
    if (currentMediaTarget) {
      currentMediaTarget.callback(url);
    }
    setIsMediaModalOpen(false);
    setCurrentMediaTarget(null);
  };

  if (!data) {
    return (
      <div className="p-16 text-center text-[#6e706a]">
        <div className="w-10 h-10 border-3 border-[#c5a26c] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-medium text-[15px] text-[#04092b]">Đang khởi tạo Canva Studio...</p>
      </div>
    );
  }

  const { settings, hero, philosophy, contact, stylesOverview, office, stages } = data;
  const currentStage: StyleStageConfig | undefined = stages?.[selectedStageKey];

  const updateCurrentStage = (updater: (prev: StyleStageConfig) => StyleStageConfig) => {
    if (!data) return;
    const currentStages = data.stages || {};
    const fallbackStage: StyleStageConfig = currentStage || {
      styleId: selectedStageKey,
      title: selectedStageKey.toUpperCase(),
      description: '',
      items: []
    };
    const updated = updater(fallbackStage);
    setData({
      ...data,
      stages: {
        ...currentStages,
        [selectedStageKey]: updated
      }
    });
  };

  const currentStageItems: AnimatedStageItem[] = stageViewMode === 'mobile'
    ? (currentStage?.mobileItems || defaultMobileItems[selectedStageKey] || [])
    : (currentStage?.items || []);

  const updateCurrentStageItems = (updater: (items: AnimatedStageItem[]) => AnimatedStageItem[]) => {
    updateCurrentStage((prev) => {
      if (stageViewMode === 'mobile') {
        const base = prev.mobileItems || defaultMobileItems[selectedStageKey] || [];
        return { ...prev, mobileItems: updater(base) };
      } else {
        const base = prev.items || [];
        return { ...prev, items: updater(base) };
      }
    });
  };

  const selectedItemIndex = currentStageItems.findIndex((it) => it.id === selectedItemId);
  const selectedItem = selectedItemIndex !== -1 ? currentStageItems[selectedItemIndex] : null;

  // Window-attached 60FPS Dragging, Resizing & Edge Height/Width Trimming
  const startInteraction = (
    e: React.PointerEvent,
    itemIdx: number,
    action: 'drag' | 'corner' | 'edge-top' | 'edge-bottom' | 'edge-left' | 'edge-right'
  ) => {
    if (canvasMode !== 'edit' || !canvasRef.current) return;
    e.stopPropagation();
    e.preventDefault();

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const it = currentStageItems[itemIdx];
    if (!it) return;

    // Measure exact screen bounding rect of the item relative to the canvas (100% physically accurate)
    const target = e.currentTarget as HTMLElement;
    const itemEl = (target.closest('[data-item-container]') as HTMLElement) || target;
    const itemRect = itemEl.getBoundingClientRect();

    const initL = ((itemRect.left - canvasRect.left) / canvasRect.width) * 100;
    const initT = ((itemRect.top - canvasRect.top) / canvasRect.height) * 100;
    const initW = (itemRect.width / canvasRect.width) * 100;
    const initH = (itemRect.height / canvasRect.height) * 100;

    const startX = e.clientX;
    const startY = e.clientY;
    const canvasWidth = canvasRect.width;
    const canvasHeight = canvasRect.height;

    setSelectedItemId(it.id);

    const onPointerMove = (moveEvt: PointerEvent) => {
      const deltaX = moveEvt.clientX - startX;
      const deltaY = moveEvt.clientY - startY;
      const deltaLeftPct = (deltaX / canvasWidth) * 100;
      const deltaTopPct = (deltaY / canvasHeight) * 100;

      if (action === 'drag') {
        const newLeft = Math.max(0, Math.min(92, parseFloat((initL + deltaLeftPct).toFixed(1))));
        const newTop = Math.max(0, Math.min(92, parseFloat((initT + deltaTopPct).toFixed(1))));

        updateCurrentStageItems((items) => {
          const next = [...items];
          next[itemIdx] = {
            ...next[itemIdx],
            position: {
              ...next[itemIdx].position,
              left: `${newLeft}%`,
              top: `${newTop}%`,
              right: undefined,
              bottom: undefined
            }
          };
          return next;
        });
      } else if (action === 'corner') {
        const newWidth = Math.max(8, Math.min(95, parseFloat((initW + deltaLeftPct).toFixed(1))));
        const scaleRatio = initW > 0 ? newWidth / initW : 1;
        const newHeight = initH > 0 ? Math.max(5, Math.min(95, parseFloat((initH * scaleRatio).toFixed(1)))) : undefined;
        updateCurrentStageItems((items) => {
          const next = [...items];
          next[itemIdx] = {
            ...next[itemIdx],
            position: {
              ...next[itemIdx].position,
              width: `${newWidth}%`,
              ...(newHeight !== undefined ? { height: `${newHeight}%` } : {})
            }
          };
          return next;
        });
      } else if (action === 'edge-bottom') {
        // Direct height adjustment from bottom edge
        const newHeight = Math.max(5, Math.min(95, parseFloat((initH + deltaTopPct).toFixed(1))));
        updateCurrentStageItems((items) => {
          const next = [...items];
          next[itemIdx] = {
            ...next[itemIdx],
            position: {
              ...next[itemIdx].position,
              height: `${newHeight}%`,
              aspectRatio: undefined
            }
          };
          return next;
        });
      } else if (action === 'edge-top') {
        // Direct height adjustment from top edge
        const newTop = Math.max(0, Math.min(90, parseFloat((initT + deltaTopPct).toFixed(1))));
        const newHeight = Math.max(5, Math.min(95, parseFloat((initH - deltaTopPct).toFixed(1))));
        updateCurrentStageItems((items) => {
          const next = [...items];
          next[itemIdx] = {
            ...next[itemIdx],
            position: {
              ...next[itemIdx].position,
              top: `${newTop}%`,
              height: `${newHeight}%`,
              aspectRatio: undefined,
              bottom: undefined
            }
          };
          return next;
        });
      } else if (action === 'edge-right') {
        // Direct width adjustment from right edge
        const newWidth = Math.max(8, Math.min(95, parseFloat((initW + deltaLeftPct).toFixed(1))));
        updateCurrentStageItems((items) => {
          const next = [...items];
          next[itemIdx] = {
            ...next[itemIdx],
            position: {
              ...next[itemIdx].position,
              width: `${newWidth}%`
            }
          };
          return next;
        });
      } else if (action === 'edge-left') {
        // Direct width adjustment from left edge
        const newLeft = Math.max(0, Math.min(90, parseFloat((initL + deltaLeftPct).toFixed(1))));
        const newWidth = Math.max(8, Math.min(95, parseFloat((initW - deltaLeftPct).toFixed(1))));
        updateCurrentStageItems((items) => {
          const next = [...items];
          next[itemIdx] = {
            ...next[itemIdx],
            position: {
              ...next[itemIdx].position,
              left: `${newLeft}%`,
              width: `${newWidth}%`,
              right: undefined
            }
          };
          return next;
        });
      }
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Open Crop Studio for an item
  const openCropStudio = (itemIdx: number) => {
    const it = currentStageItems[itemIdx];
    if (!it) return;

    setCropModalItemIndex(itemIdx);
    setCropDraft({
      top: it.position.crop?.top || 0,
      bottom: it.position.crop?.bottom || 0,
      left: it.position.crop?.left || 0,
      right: it.position.crop?.right || 0,
      zoom: it.position.cropZoom || 1,
      offsetX: it.position.cropOffsetX || 0,
      offsetY: it.position.cropOffsetY || 0,
      aspectRatio: it.position.aspectRatio || '21/9'
    });
  };

  // Save Crop Studio changes
  const applyCropStudio = () => {
    if (cropModalItemIndex === null) return;

    updateCurrentStageItems((items) => {
      const next = [...items];
      const it = next[cropModalItemIndex];
      it.position = {
        ...it.position,
        cropZoom: cropDraft.zoom,
        cropOffsetX: cropDraft.offsetX,
        cropOffsetY: cropDraft.offsetY,
        aspectRatio: cropDraft.aspectRatio,
        height: undefined,
        crop:
          cropDraft.top || cropDraft.bottom || cropDraft.left || cropDraft.right
            ? {
                top: cropDraft.top,
                bottom: cropDraft.bottom,
                left: cropDraft.left,
                right: cropDraft.right
              }
            : undefined
      };
      return next;
    });

    setCropModalItemIndex(null);
    setReplayKey((prev) => prev + 1);
  };

  // Reset an item on the spot
  const handleResetItem = (itemIdx: number) => {
    updateCurrentStageItems((items) => {
      const next = [...items];
      const it = next[itemIdx];
      it.position = {
        top: '25%',
        left: '25%',
        width: '45%',
        height: undefined,
        aspectRatio: '21/9',
        scale: 1,
        rotate: 0,
        flipH: false,
        cropZoom: 1,
        cropOffsetX: 0,
        cropOffsetY: 0,
        objectFit: 'contain',
        crop: undefined
      };
      if (it.defaultImage) {
        it.image = it.defaultImage;
      }
      return next;
    });
    setReplayKey((prev) => prev + 1);
  };

  // Layer Reordering Functions (Z-Index and Stack Ordering)
  const bringToFront = (idx: number) => {
    updateCurrentStageItems((rawItems) => {
      const items = [...rawItems];
      const item = items[idx];
      items.splice(idx, 1);
      items.push(item);
      items.forEach((it, i) => {
        it.position = { ...it.position, zIndex: (i + 1) * 2 };
      });
      return items;
    });
  };

  const sendToBack = (idx: number) => {
    updateCurrentStageItems((rawItems) => {
      const items = [...rawItems];
      const item = items[idx];
      items.splice(idx, 1);
      items.unshift(item);
      items.forEach((it, i) => {
        it.position = { ...it.position, zIndex: (i + 1) * 2 };
      });
      return items;
    });
  };

  const bringForward = (idx: number) => {
    updateCurrentStageItems((rawItems) => {
      if (idx >= rawItems.length - 1) return rawItems;
      const items = [...rawItems];
      const temp = items[idx];
      items[idx] = items[idx + 1];
      items[idx + 1] = temp;
      items.forEach((it, i) => {
        it.position = { ...it.position, zIndex: (i + 1) * 2 };
      });
      return items;
    });
  };

  const sendBackward = (idx: number) => {
    updateCurrentStageItems((rawItems) => {
      if (idx <= 0) return rawItems;
      const items = [...rawItems];
      const temp = items[idx];
      items[idx] = items[idx - 1];
      items[idx - 1] = temp;
      items.forEach((it, i) => {
        it.position = { ...it.position, zIndex: (i + 1) * 2 };
      });
      return items;
    });
  };

  // Smart Canvas Click: If overlapping items exist, cycle through them!
  const handleCanvasDrillDownClick = (e: React.MouseEvent) => {
    if (canvasMode !== 'edit' || !canvasRef.current) return;
    const clickX = e.clientX;
    const clickY = e.clientY;

    const itemElements = Array.from(canvasRef.current.querySelectorAll('[data-item-container="true"]'));
    const overlappingItemIds: string[] = [];

    itemElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (clickX >= rect.left && clickX <= rect.right && clickY >= rect.top && clickY <= rect.bottom) {
        const id = el.getAttribute('data-item-id');
        if (id) overlappingItemIds.push(id);
      }
    });

    if (overlappingItemIds.length > 0) {
      if (overlappingItemIds.length === 1) {
        setSelectedItemId(overlappingItemIds[0]);
      } else {
        const currentIdx = selectedItemId ? overlappingItemIds.indexOf(selectedItemId) : -1;
        const nextIdx = (currentIdx + 1) % overlappingItemIds.length;
        setSelectedItemId(overlappingItemIds[nextIdx]);
      }
    } else {
      if (e.target === canvasRef.current) {
        setSelectedItemId(null);
      }
    }
  };

  const tabs = [
    { id: 'stages', name: '🎨 Canva Studio (Kéo Thả)', icon: Sparkles, desc: 'Bấm chọn, kéo thả, cắt mép & xoay lật trực quan' },
    { id: 'hero', name: '2. Hero Slideshow', icon: Layout, desc: '3 Slide monogram & ảnh nền' },
    { id: 'philosophy', name: '3. Tầm Nhìn & Sứ Mệnh', icon: Compass, desc: 'Ảnh phòng khách & 3 trụ cột' },
    { id: 'contact', name: '4. Kết Nối & Báo Giá', icon: MessageSquare, desc: 'Ảnh sảnh đón & Form tư vấn' },
    { id: 'styles', name: '5. Phong Cách Thiết Kế', icon: Palette, desc: '4 Thẻ tóm tắt' },
    { id: 'office', name: '6. Nội Thất Văn Phòng', icon: Briefcase, desc: 'Ảnh giám đốc, màu sắc & 3 thẻ' },
    { id: 'settings', name: '7. Thương Hiệu & Logo', icon: Building, desc: 'Hotline, địa chỉ & bản quyền' },
  ];

  // Visual Direction Options
  const directionPresets = [
    { id: 'slide-left', label: 'Bay từ Trái', icon: ArrowRight, offsetX: -70, offsetY: 0 },
    { id: 'slide-right', label: 'Bay từ Phải', icon: ArrowLeft, offsetX: 70, offsetY: 0 },
    { id: 'drop-top', label: 'Rơi từ Trên', icon: ArrowDown, offsetX: 0, offsetY: -80 },
    { id: 'float-bottom', label: 'Nổi từ Dưới', icon: ArrowUp, offsetX: 0, offsetY: 80 },
    { id: 'fade-scale', label: 'Tỏa Sáng', icon: Sparkles, offsetX: 0, offsetY: 40 },
  ];

  return (
    <div className="p-3 sm:p-5 max-w-[1760px] mx-auto space-y-4 transition-all font-sans text-[12.5px]">
      {/* Hidden File Input for JSON restore */}
      <input
        type="file"
        ref={importFileRef}
        onChange={handleImportJson}
        accept=".json,application/json"
        className="hidden"
      />

      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-xl border border-[#e2ddd3] shadow-2xs">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[9.5px] font-bold text-[#c5a26c] uppercase tracking-wider bg-[#04092b] px-2 py-0.5 rounded font-accent">
              CMS TÙY BIẾN
            </span>
          </div>
          <h1 className="text-[16px] sm:text-[17.5px] font-bold text-[#04092b] font-display tracking-tight">
            Quản Lý &amp; Thiết Kế Không Gian Sống
          </h1>
          <p className="text-[11.5px] text-[#6e706a]">
            Tùy biến nội dung, kéo thả đồ nội thất trực quan, xem trước trên cả Desktop và Mobile.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* View Website */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 text-[11.5px] font-medium text-[#04092b] bg-[#faf8f5] border border-[#e2ddd3] hover:border-[#04092b] hover:bg-white transition-all rounded-lg flex items-center justify-center gap-1"
          >
            <Eye className="w-3 h-3 text-[#c5a26c]" />
            <span>Xem Web</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>

          {/* Export JSON Backup */}
          <button
            type="button"
            onClick={handleExportJson}
            className="px-2.5 py-1.5 text-[11.5px] font-medium text-[#04092b] bg-[#faf8f5] border border-[#e2ddd3] hover:border-[#c5a26c] hover:bg-white transition-all rounded-lg flex items-center justify-center gap-1"
            title="Tải file cấu hình JSON về máy tính để sao lưu dự phòng"
          >
            <Download className="w-3 h-3 text-[#c5a26c]" />
            <span>Sao Lưu</span>
          </button>

          {/* Import JSON Restore */}
          <button
            type="button"
            onClick={() => importFileRef.current?.click()}
            className="px-2.5 py-1.5 text-[11.5px] font-medium text-[#04092b] bg-[#faf8f5] border border-[#e2ddd3] hover:border-[#c5a26c] hover:bg-white transition-all rounded-lg flex items-center justify-center gap-1"
            title="Khôi phục cấu hình từ file JSON đã lưu"
          >
            <Upload className="w-3 h-3 text-[#c5a26c]" />
            <span>Nhập File</span>
          </button>

          {/* Save Button */}
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={savedStatus === 'saving'}
            className="bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] px-3.5 py-1.5 text-[11.5px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs rounded-lg"
          >
            {savedStatus === 'saving' ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Đang lưu...</span>
              </>
            ) : savedStatus === 'saved' ? (
              <>
                <Check className="w-3 h-3 text-green-400 stroke-[3]" />
                <span>Đã lưu!</span>
              </>
            ) : (
              <>
                <Save className="w-3 h-3 text-[#c5a26c]" />
                <span>Lưu (Ctrl+S)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Toast Alert Banner */}
      {toastMessage && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between gap-2 shadow-xs transition-all duration-300 animate-in fade-in slide-in-from-top-1 ${
            toastMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : toastMessage.type === 'error'
              ? 'bg-rose-50 text-rose-900 border-rose-300'
              : 'bg-amber-50 text-amber-900 border-amber-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : toastMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <p className="text-[12.5px] font-medium">{toastMessage.text}</p>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-black/10 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Tabs Navigation Bar: Sleek, spacious segmented pill bar */}
      <div className="bg-white p-1.5 rounded-2xl border border-[#e2ddd3] shadow-2xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2.5 rounded-xl text-[12.5px] font-medium whitespace-nowrap transition-all shrink-0 flex items-center gap-2 ${
                isActive
                  ? 'bg-[#04092b] text-[#c5a26c] font-bold shadow-xs'
                  : 'text-[#6e706a] hover:text-[#04092b] hover:bg-[#faf8f5]'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#c5a26c]' : 'text-[#8e908a]'}`} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CANVA VISUAL CANVAS STUDIO (8-HANDLE TIGHT CROPPING & RESIZE)      */}
      {/* ========================================================================= */}
      {activeTab === 'stages' && (
        <div className="space-y-4">
          {/* Canva Studio Top Command Bar */}
          <div className="bg-white p-3 rounded-2xl border border-[#e2ddd3] shadow-sm flex flex-wrap items-center justify-between gap-3">
            {/* Style Selector Pills & View Mode Toggle */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
              {/* Style Selector Pills */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
                <span className="text-[11px] sm:text-[11.5px] font-bold text-[#04092b] uppercase tracking-wider mr-0.5 shrink-0">
                  Phòng:
                </span>
                {[
                  { key: 'modern' as const, label: '🛋️ Modern' },
                  { key: 'cozy' as const, label: '🌾 Cozy' },
                  { key: 'luxury' as const, label: '👑 Luxury' },
                  { key: 'heritage' as const, label: '🏛️ Heritage' },
                ].map((st) => {
                  const count = stageViewMode === 'mobile'
                    ? (stages?.[st.key]?.mobileItems?.length ?? defaultMobileItems[st.key]?.length ?? 0)
                    : (stages?.[st.key]?.items?.length ?? 0);
                  return (
                    <button
                      key={st.key}
                      onClick={() => {
                        setSelectedStageKey(st.key);
                        setSelectedItemId(null);
                        setReplayKey((prev) => prev + 1);
                      }}
                      className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[12px] sm:text-[12.5px] font-bold transition-all shrink-0 flex items-center gap-1 sm:gap-1.5 ${
                        selectedStageKey === st.key
                          ? 'bg-[#04092b] text-[#c5a26c] shadow-sm ring-1 ring-[#c5a26c]'
                          : 'bg-[#f4f1ea] text-[#04092b] hover:bg-[#e2ddd3]'
                      }`}
                    >
                      <span>{st.label}</span>
                      <span className="text-[9.5px] sm:text-[10px] bg-white/20 px-1 sm:px-1.5 py-0.5 rounded-full font-mono">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Desktop vs Mobile Toggle for Canva Studio */}
              <div className="flex items-center gap-1 bg-[#f4f1ea] p-1 rounded-xl border border-[#e2ddd3] shadow-xs">
                <button
                  type="button"
                  onClick={() => {
                    setStageViewMode('desktop');
                    setSelectedItemId(null);
                    setReplayKey((prev) => prev + 1);
                  }}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11.5px] sm:text-[12px] font-bold flex items-center gap-1.5 transition-all ${
                    stageViewMode === 'desktop'
                      ? 'bg-[#04092b] text-[#c5a26c] shadow-sm ring-1 ring-[#c5a26c]'
                      : 'text-[#6e706a] hover:text-[#04092b]'
                  }`}
                  title="Chỉnh sửa giao diện Desktop (Màn hình lớn)"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStageViewMode('mobile');
                    setSelectedItemId(null);
                    setReplayKey((prev) => prev + 1);
                  }}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11.5px] sm:text-[12px] font-bold flex items-center gap-1.5 transition-all ${
                    stageViewMode === 'mobile'
                      ? 'bg-[#04092b] text-[#c5a26c] shadow-sm ring-1 ring-[#c5a26c]'
                      : 'text-[#6e706a] hover:text-[#04092b]'
                  }`}
                  title="Chỉnh sửa giao diện Mobile (Điện thoại di động)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Canvas Action Tools */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-[#f4f1ea] px-2 sm:px-2.5 py-1 rounded-xl border border-[#e2ddd3]">
                <button
                  type="button"
                  onClick={() => setCanvasZoom((prev) => Math.max(0.7, parseFloat((prev - 0.15).toFixed(2))))}
                  className="p-1 hover:bg-white rounded text-[#04092b] transition-colors"
                  title="Thu nhỏ canvas"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] sm:text-[12px] font-bold font-mono text-[#04092b] min-w-[38px] sm:min-w-[42px] text-center">
                  {Math.round(canvasZoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setCanvasZoom((prev) => Math.min(1.5, parseFloat((prev + 0.15).toFixed(2))))}
                  className="p-1 hover:bg-white rounded text-[#04092b] transition-colors"
                  title="Phóng to canvas"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {canvasZoom !== 1 && (
                  <button
                    type="button"
                    onClick={() => setCanvasZoom(1)}
                    className="text-[10.5px] sm:text-[11px] font-bold text-[#c5a26c] hover:underline ml-0.5 sm:ml-1"
                  >
                    100%
                  </button>
                )}
              </div>

              {/* Expand / Minimize Inspector */}
              <button
                type="button"
                onClick={() => {
                  setIsInspectorCollapsed(!isInspectorCollapsed);
                  if (isInspectorCollapsed && typeof window !== 'undefined' && window.innerWidth < 1024) {
                    setTimeout(() => {
                      document.getElementById('item-inspector')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="px-2.5 sm:px-3 py-1.5 bg-[#f4f1ea] hover:bg-[#e2ddd3] text-[#04092b] rounded-xl text-[11.5px] sm:text-[12px] font-bold border border-[#e2ddd3] flex items-center gap-1.5 transition-colors"
                title={isInspectorCollapsed ? 'Mở bảng thuộc tính' : 'Mở rộng Canvas toàn màn hình'}
              >
                {isInspectorCollapsed ? <Maximize2 className="w-3.5 h-3.5 text-[#c5a26c]" /> : <Minimize2 className="w-3.5 h-3.5" />}
                <span>{isInspectorCollapsed ? 'Thuộc Tính' : 'Mở Rộng'}</span>
              </button>

              <button
                type="button"
                onClick={() => setCanvasMode(canvasMode === 'edit' ? 'preview' : 'edit')}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[11.5px] sm:text-[12px] font-bold transition-all flex items-center gap-1.5 border ${
                  canvasMode === 'preview'
                    ? 'bg-[#c5a26c] text-[#04092b] border-[#c5a26c] shadow-sm'
                    : 'bg-white text-[#04092b] border-[#e2ddd3] hover:bg-[#f4f1ea]'
                }`}
              >
                {canvasMode === 'preview' ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" /> <span>Kéo Thả</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-green-600 fill-current" /> <span>Hoạt Họa</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  const newId = `item_${Date.now()}`;
                  const newItem: AnimatedStageItem = {
                    id: newId,
                    name: 'Đồ nội thất mới',
                    image: '/uploads/clean_style_modern.png',
                    defaultImage: '/uploads/clean_style_modern.png',
                    position: {
                      top: '30%',
                      left: '30%',
                      width: stageViewMode === 'mobile' ? '50%' : '35%',
                      aspectRatio: '21/9',
                      scale: 1,
                      rotate: 0,
                      flipH: false,
                      objectFit: 'contain',
                      cropZoom: 1
                    },
                    animation: { direction: 'slide-right', offsetX: 70, delay: 0.35, duration: 0.85 }
                  };
                  updateCurrentStageItems((prev) => [...prev, newItem]);
                  setSelectedItemId(newId);
                  setReplayKey((prev) => prev + 1);
                }}
                className="px-2.5 sm:px-3.5 py-1.5 bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] text-[11.5px] sm:text-[12px] font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> <span>+ Thêm Đồ</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  openMediaPicker(`Chọn ảnh hoàn thiện cho ${currentStage?.title}`, (url) => {
                    updateCurrentStage((prev) => ({ ...prev, finalImage: url }));
                  })
                }
                className="px-2.5 sm:px-3.5 py-1.5 bg-[#f4f1ea] hover:bg-[#c5a26c] hover:text-[#04092b] text-[#04092b] text-[11.5px] sm:text-[12px] font-bold rounded-xl border border-[#e2ddd3] flex items-center gap-1.5 transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#c5a26c]" /> <span>Ảnh Hoàn Thiện</span>
              </button>
            </div>

            {/* Quick Floating Pill on Mobile when Item is Selected */}
            {selectedItem && (
              <div className="lg:hidden w-full bg-[#04092b] text-white p-2.5 rounded-xl flex items-center justify-between gap-2 shadow-md">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#c5a26c] animate-pulse shrink-0" />
                  <span className="text-[11.5px] font-bold text-[#c5a26c] truncate">
                    Đang chọn: {selectedItem.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsInspectorCollapsed(false);
                    setTimeout(() => {
                      document.getElementById('item-inspector')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="text-[11px] font-bold bg-[#c5a26c] text-[#04092b] px-3 py-1 rounded-lg shrink-0 flex items-center gap-1"
                >
                  <Settings className="w-3 h-3" /> Thuộc tính ↓
                </button>
              </div>
            )}
          </div>

          {/* Main Canvas Workstation Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Center / Hero Workstation: Interactive Canvas */}
            <div className={`${isInspectorCollapsed ? 'lg:col-span-12' : 'lg:col-span-8'} space-y-3 transition-all duration-300`}>
              
              {/* Canva Workspace Card */}
              <div className="bg-white p-4 sm:p-6 rounded-3xl border-2 border-[#e2ddd3] shadow-xl space-y-3">
                
                {/* Canvas Status Banner */}
                <div className="flex items-center justify-between text-[11.5px] px-2 py-1 text-[#6e706a]">
                  <span className="flex items-center gap-1.5 font-medium">
                    {canvasMode === 'edit' ? (
                      <>
                        <Hand className="w-3.5 h-3.5 text-[#c5a26c]" />
                        <strong>Canva Studio:</strong> Nắm 4 thanh mép (Trên, Dưới, Trái, Phải) để cắt khít khung sofa, bấm <strong>✨ Ôm Sát</strong> để tự động ôm khít
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-green-600" />
                        <strong>Chế độ Xem Hoạt Họa:</strong> Đang mô phỏng chuyển động như trên website
                      </>
                    )}
                  </span>
                  <span className="text-[10.5px] font-mono text-[#04092b] bg-[#f4f1ea] px-2 py-0.5 rounded-full">
                    {currentStageItems.length} món đồ {stageViewMode === 'mobile' ? '(Mobile)' : '(Desktop)'}
                  </span>
                </div>

                {/* Scrollable Container with Dynamic Zoom */}
                <div className="w-full overflow-x-auto overflow-y-hidden pb-1 scrollbar-thin">
                  <div
                    style={{
                      transform: canvasZoom !== 1 ? `scale(${canvasZoom})` : undefined,
                      transformOrigin: 'top center',
                      transition: 'transform 0.15s ease-out',
                      width: canvasZoom > 1 ? `${canvasZoom * 100}%` : '100%'
                    }}
                  >
                    {/* Centered Mobile Wrapper if in mobile mode */}
                    <div className={stageViewMode === 'mobile' ? 'max-w-[420px] mx-auto py-2' : 'w-full'}>
                      {stageViewMode === 'mobile' && (
                        <div className="bg-[#04092b] text-white text-[11px] font-bold px-4 py-1.5 rounded-t-2xl flex items-center justify-between border-x-2 border-t-2 border-[#04092b] shadow-sm">
                          <span className="flex items-center gap-1.5">
                            <Smartphone className="w-3.5 h-3.5 text-[#c5a26c]" /> Mobile Frame (390px)
                          </span>
                          <span className="text-[10px] text-[#c5a26c] font-mono">Tỉ lệ thực tế điện thoại</span>
                        </div>
                      )}
                      {/* THE CANVA STAGE CANVAS */}
                      <div
                        ref={canvasRef}
                        onClick={handleCanvasDrillDownClick}
                        key={replayKey}
                        className={`relative w-full ${
                          stageViewMode === 'mobile'
                            ? (mobileStageCanvasConfigs[selectedStageKey]?.aspectClass || 'aspect-[4/3]')
                            : (stageCanvasConfigs[selectedStageKey]?.aspectClass || 'aspect-[1440/1000]')
                        } ${
                          stageViewMode === 'mobile'
                            ? 'rounded-b-2xl border-x-2 border-b-2 border-[#04092b]'
                            : 'rounded-2xl border-2 border-dashed border-[#e2ddd3]'
                        } overflow-hidden p-4 select-none shadow-inner cursor-default transition-all duration-300`}
                        style={{
                          backgroundColor:
                            stageViewMode === 'mobile'
                              ? (mobileStageCanvasConfigs[selectedStageKey]?.bg || '#FAF6F0')
                              : (stageCanvasConfigs[selectedStageKey]?.bg || '#FAF6F0'),
                          backgroundImage:
                            canvasMode === 'edit'
                              ? 'radial-gradient(circle, #ded6c8 1.2px, transparent 1.2px)'
                              : 'none',
                          backgroundSize: '24px 24px',
                          touchAction: 'none'
                        }}
                      >
                  {/* Background Room Title Watermark */}
                  <div className="absolute top-4 left-5 max-w-[50%] z-0 pointer-events-none opacity-25">
                    <h4 className="text-[24px] sm:text-[32px] font-bold text-[#04092b] font-display uppercase leading-tight whitespace-pre-line">
                      {currentStage?.title} {stageViewMode === 'mobile' ? '(Mobile)' : ''}
                    </h4>
                  </div>

                  {/* Render Items */}
                  {currentStageItems.map((item, itemIdx) => {
                    const isSelected = selectedItemId === item.id;

                    const transformParts: string[] = [];
                    if (item.position.scale && item.position.scale !== 1) transformParts.push(`scale(${item.position.scale})`);
                    if (item.position.rotate) transformParts.push(`rotate(${item.position.rotate}deg)`);
                    if (item.position.flipH) transformParts.push('scaleX(-1)');
                    const transformStr = transformParts.length > 0 ? transformParts.join(' ') : undefined;

                    const imageTransformParts: string[] = [];
                    if (item.position.cropZoom && item.position.cropZoom !== 1) imageTransformParts.push(`scale(${item.position.cropZoom})`);
                    if (item.position.cropOffsetX || item.position.cropOffsetY) {
                      imageTransformParts.push(`translate(${item.position.cropOffsetX || 0}%, ${item.position.cropOffsetY || 0}%)`);
                    }
                    const imageTransformStr = imageTransformParts.length > 0 ? imageTransformParts.join(' ') : undefined;

                    const crop = item.position.crop;
                    const clipPathStr = crop && (crop.top || crop.bottom || crop.left || crop.right)
                      ? `inset(${crop.top || 0}% ${crop.right || 0}% ${crop.bottom || 0}% ${crop.left || 0}%)`
                      : undefined;

                    // EDIT MODE RENDERING (CANVA STYLE WITH 8 HANDLES)
                    if (canvasMode === 'edit') {
                      return (
                        <div
                          key={item.id || itemIdx}
                          data-item-container="true"
                          data-item-id={item.id}
                          onPointerDown={(e) => startInteraction(e, itemIdx, 'drag')}
                          className={`absolute cursor-grab active:cursor-grabbing group transition-shadow ${
                            isSelected
                              ? 'ring-2 ring-[#04092b] ring-offset-2 ring-offset-white shadow-2xl bg-white/10 rounded-xl z-30'
                              : 'hover:ring-1 hover:ring-[#c5a26c] rounded-lg'
                          }`}
                          style={{
                            top: item.position.top || '20%',
                            left: item.position.left || '20%',
                            width: item.position.width || '30%',
                            height: item.position.height || undefined,
                            aspectRatio: item.position.height ? undefined : (item.position.aspectRatio || '21/9'),
                            zIndex: isSelected ? 50 : (item.position.zIndex ?? (itemIdx + 1) * 2),
                            touchAction: 'none'
                          }}
                        >
                          {/* Inner Image Container with Transforms, Panning & Clip */}
                          <div
                            className="relative w-full h-full overflow-hidden rounded-lg"
                            style={{ transform: transformStr, clipPath: clipPathStr }}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className={`pointer-events-none drop-shadow-md transition-all ${
                                item.position.objectFit === 'cover' ? 'object-cover' : 'object-contain'
                              }`}
                              style={imageTransformStr ? { transform: imageTransformStr } : undefined}
                            />
                          </div>

                          {/* Floating Canva On-The-Spot Toolbar directly attached to element */}
                          {isSelected && (
                            <div
                              onPointerDown={(e) => e.stopPropagation()}
                              className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#04092b] text-white p-1 rounded-xl shadow-2xl z-50 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150 border border-[#c5a26c]/40"
                            >
                              {/* Item Name */}
                              <span className="text-[10px] font-bold text-[#c5a26c] px-1.5 truncate max-w-[110px]">
                                {item.name}
                              </span>
                              <div className="h-3 w-px bg-white/20" />

                              {/* 1-CLICK AUTO TIGHT FIT BUTTON (Perfect for Sofa / Wide furniture) */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateCurrentStageItems((prev) => {
                                    const next = [...prev];
                                    next[itemIdx] = {
                                      ...next[itemIdx],
                                      position: {
                                        ...next[itemIdx].position,
                                        aspectRatio: '21/9',
                                        height: undefined
                                      }
                                    };
                                    return next;
                                  });
                                }}
                                className="px-2 py-0.5 bg-[#c5a26c] hover:brightness-110 text-[#04092b] rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors"
                                title="Tự động ôm sát khung sofa (21:9)"
                              >
                                <Wand2 className="w-3 h-3" />
                                <span>✨ Ôm Sát Sofa</span>
                              </button>

                              {/* OPEN CROP STUDIO BUTTON */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openCropStudio(itemIdx);
                                }}
                                className="px-2 py-0.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors"
                                title="Mở Crop Studio để cắt xén & căn chỉnh"
                              >
                                <Scissors className="w-3 h-3 text-[#c5a26c]" />
                                <span>Cắt Ảnh</span>
                              </button>

                              <div className="h-3 w-px bg-white/20" />

                              {/* Quick Scale - / + */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateCurrentStageItems((prev) => {
                                    const next = [...prev];
                                    const cur = parseFloat(next[itemIdx].position.width || '30');
                                    next[itemIdx] = {
                                      ...next[itemIdx],
                                      position: {
                                        ...next[itemIdx].position,
                                        width: `${Math.max(10, cur - 5)}%`
                                      }
                                    };
                                    return next;
                                  });
                                }}
                                className="p-1 hover:bg-white/10 rounded text-white"
                                title="Thu nhỏ (-5%)"
                              >
                                <ZoomOut className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateCurrentStageItems((prev) => {
                                    const next = [...prev];
                                    const cur = parseFloat(next[itemIdx].position.width || '30');
                                    next[itemIdx] = {
                                      ...next[itemIdx],
                                      position: {
                                        ...next[itemIdx].position,
                                        width: `${Math.min(95, cur + 5)}%`
                                      }
                                    };
                                    return next;
                                  });
                                }}
                                className="p-1 hover:bg-white/10 rounded text-white"
                                title="Phóng to (+5%)"
                              >
                                <ZoomIn className="w-3.5 h-3.5" />
                              </button>

                              {/* Flip Horizontal */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateCurrentStageItems((prev) => {
                                    const next = [...prev];
                                    next[itemIdx] = {
                                      ...next[itemIdx],
                                      position: {
                                        ...next[itemIdx].position,
                                        flipH: !next[itemIdx].position.flipH
                                      }
                                    };
                                    return next;
                                  });
                                }}
                                className={`p-1 rounded transition-colors ${
                                  item.position.flipH ? 'bg-[#c5a26c] text-[#04092b]' : 'hover:bg-white/10 text-white'
                                }`}
                                title="Lật ngang trái/phải"
                              >
                                <FlipHorizontal className="w-3.5 h-3.5" />
                              </button>

                              {/* Rotate 90 deg */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateCurrentStageItems((prev) => {
                                    const next = [...prev];
                                    const curRot = next[itemIdx].position.rotate || 0;
                                    next[itemIdx] = {
                                      ...next[itemIdx],
                                      position: {
                                        ...next[itemIdx].position,
                                        rotate: (curRot + 90) % 360
                                      }
                                    };
                                    return next;
                                  });
                                }}
                                className="p-1 hover:bg-white/10 rounded text-white"
                                title="Xoay góc 90°"
                              >
                                <RotateCw className="w-3.5 h-3.5" />
                              </button>

                              <div className="h-3 w-px bg-white/20" />

                              {/* Layer Ordering Controls on Element */}
                              <div className="flex items-center gap-0.5 bg-white/10 px-1 py-0.5 rounded-lg">
                                <span className="text-[9.5px] text-[#c5a26c] font-bold px-1">Lớp:</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    bringForward(itemIdx);
                                  }}
                                  className="px-1.5 py-0.5 hover:bg-white/20 rounded text-[10px] font-bold text-white flex items-center"
                                  title="Lên 1 lớp (Bring forward)"
                                >
                                  ▲ Lên
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    sendBackward(itemIdx);
                                  }}
                                  className="px-1.5 py-0.5 hover:bg-white/20 rounded text-[10px] font-bold text-white flex items-center"
                                  title="Xuống 1 lớp (Send backward)"
                                >
                                  ▼ Xuống
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    bringToFront(itemIdx);
                                  }}
                                  className="px-1.5 py-0.5 bg-[#c5a26c]/30 hover:bg-[#c5a26c] hover:text-[#04092b] rounded text-[10px] font-bold text-[#c5a26c] flex items-center"
                                  title="Lên trên cùng (Bring to front)"
                                >
                                  🔝 Đỉnh
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    sendToBack(itemIdx);
                                  }}
                                  className="px-1.5 py-0.5 bg-white/10 hover:bg-[#c5a26c] hover:text-[#04092b] rounded text-[10px] font-bold text-gray-300 flex items-center"
                                  title="Xuống dưới cùng (Send to back)"
                                >
                                  🔚 Đáy
                                </button>
                              </div>

                              <div className="h-3 w-px bg-white/20" />

                              {/* Reset on the spot */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleResetItem(itemIdx);
                                }}
                                className="p-1 hover:bg-white/10 rounded text-yellow-300"
                                title="↺ Reset mặc định khung, crop & vị trí"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                              </button>

                              {/* Change Picture */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openMediaPicker(`Đổi ảnh cho ${item.name}`, (url) => {
                                    updateCurrentStageItems((prev) => {
                                      const next = [...prev];
                                      next[itemIdx] = {
                                        ...next[itemIdx],
                                        image: url
                                      };
                                      return next;
                                    });
                                  });
                                }}
                                className="px-2 py-0.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors"
                              >
                                <ImageIcon className="w-3 h-3 text-[#c5a26c]" /> Đổi Ảnh
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateCurrentStageItems((prev) => prev.filter((_, i) => i !== itemIdx));
                                  setSelectedItemId(null);
                                }}
                                className="p-1 hover:bg-red-500 rounded-lg text-red-300 hover:text-white transition-colors"
                                title="Xóa món đồ này"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}

                          {/* 8 INTERACTIVE HANDLES: 4 CORNERS + 4 EDGE BARS */}
                          {isSelected && (
                            <>
                              {/* 4 Corner Dots */}
                              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#04092b] border-2 border-white rounded-full shadow" />
                              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#04092b] border-2 border-white rounded-full shadow" />
                              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#04092b] border-2 border-white rounded-full shadow" />
                              <div
                                onPointerDown={(e) => startInteraction(e, itemIdx, 'corner')}
                                className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#c5a26c] border-2 border-white rounded-full shadow cursor-se-resize hover:scale-125 transition-transform"
                                title="Kéo góc này để phóng to / thu nhỏ"
                              />

                              {/* 4 EDGE CROP BARS (Nắm kéo trực tiếp trên Canvas) */}
                              {/* Top Edge Bar */}
                              <div
                                onPointerDown={(e) => startInteraction(e, itemIdx, 'edge-top')}
                                className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-[#04092b] hover:bg-[#c5a26c] rounded-full border border-white shadow cursor-n-resize transition-colors flex items-center justify-center"
                                title="Kéo xuống để cắt bớt khoảng trống phía trên"
                              >
                                <div className="w-3 h-0.5 bg-white rounded" />
                              </div>

                              {/* Bottom Edge Bar */}
                              <div
                                onPointerDown={(e) => startInteraction(e, itemIdx, 'edge-bottom')}
                                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-[#04092b] hover:bg-[#c5a26c] rounded-full border border-white shadow cursor-s-resize transition-colors flex items-center justify-center"
                                title="Kéo lên để cắt bớt khoảng trống phía dưới"
                              >
                                <div className="w-3 h-0.5 bg-white rounded" />
                              </div>

                              {/* Left Edge Bar */}
                              <div
                                onPointerDown={(e) => startInteraction(e, itemIdx, 'edge-left')}
                                className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-2.5 h-8 bg-[#04092b] hover:bg-[#c5a26c] rounded-full border border-white shadow cursor-w-resize transition-colors flex items-center justify-center"
                                title="Kéo sang phải để cắt bớt khoảng trống bên trái"
                              >
                                <div className="h-3 w-0.5 bg-white rounded" />
                              </div>

                              {/* Right Edge Bar */}
                              <div
                                onPointerDown={(e) => startInteraction(e, itemIdx, 'edge-right')}
                                className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-2.5 h-8 bg-[#04092b] hover:bg-[#c5a26c] rounded-full border border-white shadow cursor-e-resize transition-colors flex items-center justify-center"
                                title="Kéo sang trái để cắt bớt khoảng trống bên phải"
                              >
                                <div className="h-3 w-0.5 bg-white rounded" />
                              </div>
                            </>
                          )}
                        </div>
                      );
                    }

                    // PREVIEW ANIMATION MODE RENDERING
                    const direction = item.animation.direction;
                    let initialX = 0;
                    let initialY = 0;
                    let initialScale = 1;

                    if (direction === 'slide-left') initialX = item.animation.offsetX ?? -60;
                    if (direction === 'slide-right') initialX = item.animation.offsetX ?? 60;
                    if (direction === 'drop-top') initialY = item.animation.offsetY ?? -60;
                    if (direction === 'float-bottom') initialY = item.animation.offsetY ?? 60;
                    if (direction === 'fade-scale') initialScale = 0.8;

                    return (
                      <motion.div
                        key={`${replayKey}_${item.id || itemIdx}`}
                        initial={{ opacity: 0, x: initialX, y: initialY, scale: initialScale }}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        transition={{
                          duration: item.animation.duration || 0.85,
                          delay: item.animation.delay || 0.1 * itemIdx,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute pointer-events-none drop-shadow-xl overflow-hidden"
                        style={{
                          top: item.position.top || '20%',
                          left: item.position.left || '20%',
                          width: item.position.width || '30%',
                          height: item.position.height || undefined,
                          aspectRatio: item.position.height ? undefined : (item.position.aspectRatio || '21/9'),
                          zIndex: item.position.zIndex || 10,
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
                            className={item.position.objectFit === 'cover' ? 'object-cover' : 'object-contain'}
                            style={imageTransformStr ? { transform: imageTransformStr } : undefined}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Canva Filmstrip Dock */}
                <div className="pt-2 border-t border-[#e2ddd3] space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#04092b] uppercase tracking-wider">
                    <span>Thư Viện Đồ Trong Phòng (Bấm Để Chọn):</span>
                    <span className="text-[#6e706a] font-normal font-sans">Nắm 4 thanh mép đen để cắt gọn khung ôm sát</span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {currentStageItems.map((it, idx) => {
                      const isSelected = selectedItemId === it.id;
                      return (
                        <button
                          key={it.id || idx}
                          type="button"
                          onClick={() => setSelectedItemId(it.id)}
                          className={`flex items-center gap-2 p-2 rounded-xl border shrink-0 transition-all text-left ${
                            isSelected
                              ? 'bg-[#04092b] text-white border-[#04092b] shadow-md ring-2 ring-[#c5a26c]/40'
                              : 'bg-[#faf8f5] text-[#04092b] border-[#e2ddd3] hover:border-[#c5a26c]'
                          }`}
                        >
                          <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-white border border-[#e2ddd3] shrink-0 p-0.5">
                            <Image src={it.image} alt={it.name} fill className="object-contain" />
                          </div>
                          <div className="max-w-[100px]">
                            <p className="text-[11px] font-bold truncate">{it.name}</p>
                            <p className={`text-[9.5px] truncate ${isSelected ? 'text-[#c5a26c]' : 'text-[#6e706a]'}`}>
                              #{idx + 1}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Canva Element Properties Inspector (Collapsible) */}
            {!isInspectorCollapsed && (
              <div id="item-inspector" className="lg:col-span-4 space-y-4 animate-in fade-in duration-200 scroll-mt-6">
                {selectedItem ? (
                  /* Selected Item Properties Panel */
                  <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-[#04092b] shadow-xl space-y-5">
                    <div className="flex items-center justify-between border-b border-[#e2ddd3] pb-3">
                      <span className="text-[11px] font-bold text-[#c5a26c] uppercase tracking-widest bg-[#04092b] px-2.5 py-0.5 rounded">
                        THUỘC TÍNH MÓN ĐỒ
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          className="lg:hidden text-[10.5px] font-bold text-[#04092b] bg-[#f4f1ea] px-2.5 py-1 rounded-lg border border-[#e2ddd3]"
                        >
                          ↑ Lên Canvas
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedItemId(null)}
                          className="text-[11px] text-[#6e706a] hover:text-[#04092b] font-bold"
                        >
                          ✕ Đóng
                        </button>
                      </div>
                    </div>

                    {/* Thumbnail & Name */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#c5a26c]/50 bg-[#faf8f5] p-1 shrink-0">
                        <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-contain" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <input
                          type="text"
                          value={selectedItem.name}
                          onChange={(e) => {
                            updateCurrentStageItems((prev) => {
                              const next = [...prev];
                              next[selectedItemIndex] = { ...next[selectedItemIndex], name: e.target.value };
                              return next;
                            });
                          }}
                          className="font-bold text-[14px] text-[#04092b] border-b border-[#e2ddd3] focus:border-[#04092b] focus:outline-none w-full pb-0.5"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openCropStudio(selectedItemIndex)}
                            className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 hover:bg-amber-100 flex items-center gap-1"
                          >
                            <Scissors className="w-3 h-3" /> Cắt Ảnh (Crop)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleResetItem(selectedItemIndex)}
                            className="text-[11px] font-bold text-yellow-600 hover:underline flex items-center gap-1"
                          >
                            <RefreshCw className="w-3 h-3" /> Reset
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Size & Aspect Ratio Controls */}
                    <div className="space-y-3 bg-[#f4f1ea] p-3.5 rounded-2xl border border-[#e2ddd3]">
                      <div className="flex items-center justify-between">
                        <span className="text-[11.5px] font-bold text-[#04092b] uppercase tracking-wider">
                          Kích Thước Khung: {selectedItem.position.width || '30%'}
                        </span>
                        <span className="text-[10.5px] font-mono text-[#6e706a]">
                          {selectedItem.position.height ? `Cao ${selectedItem.position.height}` : `Tỉ lệ ${selectedItem.position.aspectRatio || '21/9'}`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="95"
                        step="1"
                        value={parseInt(selectedItem.position.width || '30')}
                        onChange={(e) => {
                          updateCurrentStageItems((prev) => {
                            const next = [...prev];
                            next[selectedItemIndex] = {
                              ...next[selectedItemIndex],
                              position: {
                                ...next[selectedItemIndex].position,
                                width: `${e.target.value}%`
                              }
                            };
                            return next;
                          });
                        }}
                        className="w-full accent-[#04092b] cursor-pointer"
                      />

                      {/* Quick Aspect Ratios */}
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-bold text-[#6e706a] block">Tỉ lệ khung hình nhanh:</span>
                        <div className="grid grid-cols-4 gap-1 text-[10.5px] font-bold">
                          {[
                            { label: '21:9 (Sofa)', ratio: '21/9' },
                            { label: '16:9', ratio: '16/9' },
                            { label: '4:3', ratio: '4/3' },
                            { label: '1:1', ratio: '1/1' },
                          ].map((r) => (
                            <button
                              key={r.ratio}
                              type="button"
                              onClick={() => {
                                updateCurrentStageItems((prev) => {
                                  const next = [...prev];
                                  next[selectedItemIndex] = {
                                    ...next[selectedItemIndex],
                                    position: {
                                      ...next[selectedItemIndex].position,
                                      aspectRatio: r.ratio,
                                      height: undefined
                                    }
                                  };
                                  return next;
                                });
                              }}
                              className={`py-1 rounded border text-center transition-all ${
                                selectedItem.position.aspectRatio === r.ratio && !selectedItem.position.height
                                  ? 'bg-[#04092b] text-[#c5a26c] border-[#04092b]'
                                  : 'bg-white text-[#04092b] border-[#e2ddd3] hover:bg-[#e2ddd3]'
                              }`}
                            >
                              {r.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Direction Selector */}
                    <div className="space-y-2">
                      <label className="block text-[11.5px] font-bold text-[#04092b] uppercase tracking-wider">
                        Hướng Bay Xuất Hiện:
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {directionPresets.map((dir) => {
                          const isDirSelected = selectedItem.animation.direction === dir.id;
                          const DirIcon = dir.icon;
                          return (
                            <button
                              key={dir.id}
                              type="button"
                              onClick={() => {
                                updateCurrentStageItems((prev) => {
                                  const next = [...prev];
                                  next[selectedItemIndex] = {
                                    ...next[selectedItemIndex],
                                    animation: {
                                      ...next[selectedItemIndex].animation,
                                      direction: dir.id as any,
                                      offsetX: dir.offsetX,
                                      offsetY: dir.offsetY
                                    }
                                  };
                                  return next;
                                });
                                setReplayKey((prev) => prev + 1);
                              }}
                              className={`p-2 rounded-xl border text-center transition-all flex items-center justify-center gap-1.5 ${
                                isDirSelected
                                  ? 'bg-[#04092b] text-[#c5a26c] border-[#04092b] shadow-sm font-bold'
                                  : 'bg-[#faf8f5] text-[#04092b] border-[#e2ddd3] hover:border-[#c5a26c]'
                              }`}
                            >
                              <DirIcon className="w-3.5 h-3.5" />
                              <span className="text-[11px]">{dir.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Thứ Tự Lớp (Layer Stacking & Z-Index) */}
                    <div className="space-y-2 bg-[#faf8f5] p-3.5 rounded-2xl border border-[#e2ddd3]">
                      <div className="flex items-center justify-between">
                        <label className="text-[11.5px] font-bold text-[#04092b] uppercase tracking-wider flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#c5a26c]" /> Thứ Tự Lớp (Z-Index)
                        </label>
                        <span className="text-[11px] font-mono font-bold bg-[#04092b] text-[#c5a26c] px-2 py-0.5 rounded-full">
                          Lớp #{selectedItemIndex + 1} / {currentStageItems.length}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6e706a] leading-tight">
                        Chỉnh thứ tự xếp chồng khi các món đồ nằm đè lên nhau
                      </p>
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() => bringToFront(selectedItemIndex)}
                          className="p-2 rounded-xl border border-[#e2ddd3] bg-white hover:bg-[#c5a26c] hover:text-[#04092b] text-[#04092b] text-[11.5px] font-bold transition-all flex items-center justify-center gap-1 shadow-xs"
                          title="Đưa món này lên trên cùng của tất cả các món đồ khác"
                        >
                          <span>🔝 Lên Trên Cùng</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => sendToBack(selectedItemIndex)}
                          className="p-2 rounded-xl border border-[#e2ddd3] bg-white hover:bg-[#c5a26c] hover:text-[#04092b] text-[#04092b] text-[11.5px] font-bold transition-all flex items-center justify-center gap-1 shadow-xs"
                          title="Đưa món này xuống đáy cùng phía sau tất cả các món đồ khác"
                        >
                          <span>🔚 Xuống Đáy Cùng</span>
                        </button>
                        <button
                          type="button"
                          disabled={selectedItemIndex >= currentStageItems.length - 1}
                          onClick={() => bringForward(selectedItemIndex)}
                          className="p-2 rounded-xl border border-[#e2ddd3] bg-white hover:bg-[#f4f1ea] disabled:opacity-40 disabled:pointer-events-none text-[#04092b] text-[11.5px] font-bold transition-all flex items-center justify-center gap-1 shadow-xs"
                          title="Nâng lên 1 lớp phía trên"
                        >
                          <span>▲ Nâng Lên 1 Lớp</span>
                        </button>
                        <button
                          type="button"
                          disabled={selectedItemIndex <= 0}
                          onClick={() => sendBackward(selectedItemIndex)}
                          className="p-2 rounded-xl border border-[#e2ddd3] bg-white hover:bg-[#f4f1ea] disabled:opacity-40 disabled:pointer-events-none text-[#04092b] text-[11.5px] font-bold transition-all flex items-center justify-center gap-1 shadow-xs"
                          title="Hạ xuống 1 lớp phía dưới"
                        >
                          <span>▼ Hạ Xuống 1 Lớp</span>
                        </button>
                      </div>
                    </div>

                    {/* Timing Delay */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11.5px] font-bold text-[#04092b] uppercase tracking-wider">
                          Thời Gian Xuất Hiện (Delay): {selectedItem.animation.delay || 0.2}s
                        </label>
                      </div>
                      <input
                        type="range"
                        min="0.05"
                        max="1.5"
                        step="0.05"
                        value={selectedItem.animation.delay || 0.2}
                        onChange={(e) => {
                          updateCurrentStageItems((prev) => {
                            const next = [...prev];
                            next[selectedItemIndex] = {
                              ...next[selectedItemIndex],
                              animation: {
                                ...next[selectedItemIndex].animation,
                                delay: parseFloat(e.target.value)
                              }
                            };
                            return next;
                          });
                          setReplayKey((prev) => prev + 1);
                        }}
                        className="w-full accent-[#04092b] cursor-pointer"
                      />
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-[#e2ddd3] flex items-center justify-between">
                      <span className="text-[10.5px] text-[#6e706a] font-mono">
                        📍 {selectedItem.position.top || '0%'}, {selectedItem.position.left || '0%'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          updateCurrentStageItems((prev) => prev.filter((_, i) => i !== selectedItemIndex));
                          setSelectedItemId(null);
                        }}
                        className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Xóa Món Này
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Scene Info Card when no item is selected */
                  <div className="bg-white p-5 rounded-3xl border border-[#e2ddd3] shadow-sm space-y-4">
                    <span className="text-[11px] font-bold text-[#c5a26c] uppercase tracking-widest bg-[#04092b] px-2.5 py-0.5 rounded">
                      THÔNG TIN KHỐI THIẾT KẾ
                    </span>

                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="block text-[12px] font-bold text-[#04092b] mb-1">Tiêu Đề</label>
                        <input
                          type="text"
                          value={currentStage?.title || ''}
                          onChange={(e) => updateCurrentStage((prev) => ({ ...prev, title: e.target.value }))}
                          className="w-full p-2 border border-[#e2ddd3] rounded-lg text-[13px] font-bold focus:border-[#c5a26c] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[12px] font-bold text-[#04092b] mb-1">Mô Tả</label>
                        <textarea
                          rows={2}
                          value={currentStage?.description || ''}
                          onChange={(e) => updateCurrentStage((prev) => ({ ...prev, description: e.target.value }))}
                          className="w-full p-2 border border-[#e2ddd3] rounded-lg text-[12px] focus:border-[#c5a26c] focus:outline-none leading-relaxed"
                        />
                      </div>

                      {currentStage?.finalImage && (
                        <div className="space-y-1.5 pt-2 border-t border-[#e2ddd3]">
                          <label className="block text-[11px] font-bold text-[#04092b] uppercase">
                            Ảnh Hoàn Thiện (Final Composition):
                          </label>
                          <div className="relative w-full h-28 rounded-xl overflow-hidden border border-[#e2ddd3] bg-[#faf8f5]">
                            <Image src={currentStage.finalImage} alt="Final" fill className="object-contain" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Persistent Layers Panel: View & Select All Items Across Layers */}
                <div className="bg-white p-5 rounded-3xl border border-[#e2ddd3] shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-[#e2ddd3] pb-2.5">
                    <span className="text-[11.5px] font-bold text-[#04092b] uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#c5a26c]" /> Quản Lý Lớp &amp; Danh Sách Món Đồ
                    </span>
                    <span className="text-[11px] font-mono text-[#6e706a] bg-[#f4f1ea] px-2 py-0.5 rounded font-bold">
                      {currentStageItems.length} món
                    </span>
                  </div>

                  <p className="text-[11px] text-[#6e706a]">
                    Nhấp vào món đồ để chọn và chỉnh sửa kể cả khi bị đè khuất phía sau:
                  </p>

                  <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                    {[...currentStageItems]
                      .map((item, originalIdx) => ({ item, originalIdx }))
                      .reverse()
                      .map(({ item, originalIdx }) => {
                        const isThisSelected = selectedItemId === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => setSelectedItemId(item.id)}
                            className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                              isThisSelected
                                ? 'bg-[#04092b] text-white border-[#04092b] shadow-md ring-2 ring-[#c5a26c]/50'
                                : 'bg-[#faf8f5] hover:bg-white text-[#04092b] border-[#e2ddd3]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span
                                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                                  isThisSelected ? 'bg-[#c5a26c] text-[#04092b]' : 'bg-[#e2ddd3] text-[#04092b]'
                                }`}
                              >
                                #{originalIdx + 1}
                              </span>
                              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-black/10 bg-white shrink-0">
                                <Image src={item.image} alt={item.name} fill className="object-contain" />
                              </div>
                              <span className="text-[12.5px] font-bold truncate">
                                {item.name}
                              </span>
                            </div>

                            {/* Quick Layer Reordering Controls */}
                            <div
                              className="flex items-center gap-1 shrink-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                onClick={() => bringForward(originalIdx)}
                                disabled={originalIdx >= currentStageItems.length - 1}
                                className={`p-1 rounded text-xs transition-colors disabled:opacity-20 ${
                                  isThisSelected ? 'hover:bg-white/20 text-white' : 'hover:bg-[#e2ddd3] text-[#04092b]'
                                }`}
                                title="Nâng lên 1 lớp"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                onClick={() => sendBackward(originalIdx)}
                                disabled={originalIdx <= 0}
                                className={`p-1 rounded text-xs transition-colors disabled:opacity-20 ${
                                  isThisSelected ? 'hover:bg-white/20 text-white' : 'hover:bg-[#e2ddd3] text-[#04092b]'
                                }`}
                                title="Hạ xuống 1 lớp"
                              >
                                ▼
                              </button>
                              <button
                                type="button"
                                onClick={() => bringToFront(originalIdx)}
                                className={`p-1 rounded text-xs transition-colors ${
                                  isThisSelected ? 'hover:bg-white/20 text-[#c5a26c]' : 'hover:bg-[#c5a26c] text-[#04092b]'
                                }`}
                                title="Đưa lên trên cùng"
                              >
                                🔝
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DEDICATED CANVA CROP LIGHTBOX MODAL */}
      {cropModalItemIndex !== null && currentStage?.items?.[cropModalItemIndex] && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border-2 border-[#04092b] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#e2ddd3] flex items-center justify-between bg-[#04092b] text-white">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#c5a26c] text-[#04092b]">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-white">
                    Crop Studio: {currentStage.items[cropModalItemIndex].name}
                  </h3>
                  <p className="text-[11.5px] text-[#c5a26c]">
                    Kéo thanh trượt 4 cạnh để cắt gọn bớt khoảng trắng hoặc phóng to/dịch chuyển ảnh
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCropModalItemIndex(null)}
                  className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[12px] font-bold rounded-xl transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={applyCropStudio}
                  className="px-5 py-1.5 bg-[#c5a26c] hover:brightness-110 text-[#04092b] text-[12px] font-bold rounded-xl shadow transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Áp Dụng Cắt
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 overflow-y-auto flex-1 items-center bg-[#faf8f5]">
              {/* Left Live Crop Frame Workstation */}
              <div className="md:col-span-7 flex flex-col items-center justify-center">
                <div
                  className="relative w-full max-w-[420px] aspect-video rounded-2xl bg-white border-2 border-dashed border-[#c5a26c] p-3 shadow-xl overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #ded6c8 1.2px, transparent 1.2px)',
                    backgroundSize: '20px 20px'
                  }}
                >
                  {/* The Cropped Image Viewport */}
                  <div
                    className="relative w-full h-full overflow-hidden rounded-xl border border-red-500 shadow-md"
                    style={{
                      aspectRatio: cropDraft.aspectRatio,
                      clipPath: `inset(${cropDraft.top}% ${cropDraft.right}% ${cropDraft.bottom}% ${cropDraft.left}%)`
                    }}
                  >
                    <Image
                      src={currentStage.items[cropModalItemIndex].image}
                      alt="Crop preview"
                      fill
                      className="object-contain transition-all"
                      style={{
                        transform: `scale(${cropDraft.zoom}) translate(${cropDraft.offsetX}%, ${cropDraft.offsetY}%)`
                      }}
                    />
                  </div>

                  {/* Visual Crop Frame Label */}
                  <span className="absolute bottom-2 right-3 text-[10px] font-mono text-[#04092b] bg-white/90 px-2 py-0.5 rounded shadow border border-[#e2ddd3]">
                    Tỉ lệ: {cropDraft.aspectRatio}
                  </span>
                </div>
              </div>

              {/* Right Controls Panel */}
              <div className="md:col-span-5 space-y-4 bg-white p-5 rounded-2xl border border-[#e2ddd3] shadow-sm">
                {/* Ratio Presets */}
                <div className="space-y-1.5">
                  <label className="text-[11.5px] font-bold text-[#04092b] uppercase tracking-wider block">
                    1. Tỉ Lệ Khung Hình:
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 text-[11px] font-bold">
                    {[
                      { label: '21:9 (Sofa)', ratio: '21/9' },
                      { label: '16:9', ratio: '16/9' },
                      { label: '4:3', ratio: '4/3' },
                      { label: '1:1', ratio: '1/1' },
                    ].map((r) => (
                      <button
                        key={r.ratio}
                        type="button"
                        onClick={() => setCropDraft((prev) => ({ ...prev, aspectRatio: r.ratio }))}
                        className={`py-1.5 rounded-lg border text-center transition-all ${
                          cropDraft.aspectRatio === r.ratio
                            ? 'bg-[#04092b] text-[#c5a26c] border-[#04092b]'
                            : 'bg-[#faf8f5] text-[#04092b] border-[#e2ddd3] hover:bg-[#e2ddd3]'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4-Way Inset Cut Controls */}
                <div className="space-y-2 pt-2 border-t border-[#e2ddd3]">
                  <div className="flex items-center justify-between">
                    <label className="text-[11.5px] font-bold text-[#04092b] uppercase tracking-wider">
                      2. Cắt 4 Cạnh (Crop Inset):
                    </label>
                    <button
                      type="button"
                      onClick={() => setCropDraft((prev) => ({ ...prev, top: 0, bottom: 0, left: 0, right: 0 }))}
                      className="text-[10.5px] text-yellow-600 font-bold hover:underline"
                    >
                      ↺ Xóa Cắt
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                    <div>
                      <span className="text-[#6e706a] block">Cắt Trên: {cropDraft.top}%</span>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={cropDraft.top}
                        onChange={(e) => setCropDraft((prev) => ({ ...prev, top: parseInt(e.target.value) }))}
                        className="w-full accent-red-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="text-[#6e706a] block">Cắt Dưới: {cropDraft.bottom}%</span>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={cropDraft.bottom}
                        onChange={(e) => setCropDraft((prev) => ({ ...prev, bottom: parseInt(e.target.value) }))}
                        className="w-full accent-red-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="text-[#6e706a] block">Cắt Trái: {cropDraft.left}%</span>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={cropDraft.left}
                        onChange={(e) => setCropDraft((prev) => ({ ...prev, left: parseInt(e.target.value) }))}
                        className="w-full accent-red-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="text-[#6e706a] block">Cắt Phải: {cropDraft.right}%</span>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={cropDraft.right}
                        onChange={(e) => setCropDraft((prev) => ({ ...prev, right: parseInt(e.target.value) }))}
                        className="w-full accent-red-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Zoom & Pan inside crop */}
                <div className="space-y-2 pt-2 border-t border-[#e2ddd3]">
                  <label className="text-[11.5px] font-bold text-[#04092b] uppercase tracking-wider block">
                    3. Phóng To &amp; Căn Chỉnh Vị Trí:
                  </label>

                  <div className="space-y-1.5 text-[10.5px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6e706a]">Zoom: {cropDraft.zoom}x</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="2.5"
                      step="0.05"
                      value={cropDraft.zoom}
                      onChange={(e) => setCropDraft((prev) => ({ ...prev, zoom: parseFloat(e.target.value) }))}
                      className="w-full accent-[#c5a26c] cursor-pointer"
                    />

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <span className="text-[#6e706a] block">Trục Ngang (X): {cropDraft.offsetX}%</span>
                        <input
                          type="range"
                          min="-50"
                          max="50"
                          value={cropDraft.offsetX}
                          onChange={(e) => setCropDraft((prev) => ({ ...prev, offsetX: parseInt(e.target.value) }))}
                          className="w-full accent-[#04092b] cursor-pointer"
                        />
                      </div>
                      <div>
                        <span className="text-[#6e706a] block">Trục Dọc (Y): {cropDraft.offsetY}%</span>
                        <input
                          type="range"
                          min="-50"
                          max="50"
                          value={cropDraft.offsetY}
                          onChange={(e) => setCropDraft((prev) => ({ ...prev, offsetY: parseInt(e.target.value) }))}
                          className="w-full accent-[#04092b] cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full Reset in Modal */}
                <button
                  type="button"
                  onClick={() =>
                    setCropDraft({
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zoom: 1,
                      offsetX: 0,
                      offsetY: 0,
                      aspectRatio: '21/9'
                    })
                  }
                  className="w-full py-1.5 bg-[#f4f1ea] hover:bg-[#e2ddd3] text-[#04092b] rounded-xl text-[11px] font-bold transition-colors"
                >
                  ↺ Khôi Phục Toàn Bộ Ảnh Ban Đầu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Hero Slideshow */}
      {activeTab === 'hero' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column */}
          <div className={`${previewLayout === 'full' ? 'hidden' : 'lg:col-span-4'} bg-white p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#e2ddd3] shadow-sm space-y-6 transition-all`}>
            <div className="flex items-center justify-between border-b border-[#e2ddd3] pb-4">
              <h3 className="font-bold text-[18px] text-[#04092b] flex items-center gap-2">
                <Layout className="w-5 h-5 text-[#c5a26c]" /> Hero Banner
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-mono text-[#6e706a] bg-[#f4f1ea] px-2 py-0.5 rounded-full">
                  Slide {heroSlideIndex + 1} / {hero?.slides?.length || 3}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newSlide = {
                      tag: 'ĐÔNG HÒA PROPERTY',
                      monogram: 'Đ',
                      line1: 'Không gian sống',
                      line2: 'Đẳng cấp & Tinh tế',
                      description: 'Bất động sản cao cấp & giải pháp không gian mang dấu ấn độc bản.',
                      backgroundImage: '/uploads/hero_slide_1.png',
                      buttonText: 'Xem thêm',
                      buttonTarget: '#projects',
                      secondaryText: 'Tìm hiểu về chúng tôi →',
                      secondaryTarget: '#philosophy'
                    };
                    const updated = [...(hero?.slides || []), newSlide];
                    setData({ ...data, hero: { ...hero, slides: updated } });
                    setHeroSlideIndex(updated.length - 1);
                  }}
                  className="px-2.5 py-1 bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> + Thêm Slide
                </button>
              </div>
            </div>

            {/* Slide Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {hero?.slides?.map((slide, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setHeroSlideIndex(idx)}
                    className={`px-3 py-2 rounded-xl font-bold text-[13px] border transition-all text-center ${
                      idx === heroSlideIndex
                        ? 'bg-[#04092b] text-[#c5a26c] shadow-md ring-2 ring-[#c5a26c]/40'
                        : 'bg-[#f4f1ea] text-[#04092b] hover:bg-[#e2ddd3]'
                    }`}
                  >
                    Slide {idx + 1} ({slide.monogram})
                  </button>
                  {hero.slides.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = hero.slides.filter((_, i) => i !== idx);
                        setData({ ...data, hero: { ...hero, slides: updated } });
                        if (heroSlideIndex >= updated.length) {
                          setHeroSlideIndex(Math.max(0, updated.length - 1));
                        }
                      }}
                      className="p-1 text-red-400 hover:text-red-600 rounded"
                      title="Xóa slide này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Current Slide Editor */}
            {hero?.slides?.[heroSlideIndex] && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Nhãn Tag Nhỏ (Eyebrow)</label>
                  <input
                    type="text"
                    value={hero.slides[heroSlideIndex].tag || ''}
                    onChange={(e) => {
                      const updated = [...hero.slides];
                      updated[heroSlideIndex].tag = e.target.value;
                      setData({ ...data, hero: { ...hero, slides: updated } });
                    }}
                    className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] font-bold focus:border-[#c5a26c] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Monogram</label>
                    <input
                      type="text"
                      maxLength={2}
                      value={hero.slides[heroSlideIndex].monogram}
                      onChange={(e) => {
                        const updated = [...hero.slides];
                        updated[heroSlideIndex].monogram = e.target.value;
                        setData({ ...data, hero: { ...hero, slides: updated } });
                      }}
                      className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[20px] font-bold font-serif text-[#04092b] text-center focus:border-[#c5a26c] focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Dòng Tiêu Đề 1</label>
                    <input
                      type="text"
                      value={hero.slides[heroSlideIndex].line1}
                      onChange={(e) => {
                        const updated = [...hero.slides];
                        updated[heroSlideIndex].line1 = e.target.value;
                        setData({ ...data, hero: { ...hero, slides: updated } });
                      }}
                      className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] font-bold focus:border-[#c5a26c] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Dòng Tiêu Đề 2</label>
                  <input
                    type="text"
                    value={hero.slides[heroSlideIndex].line2}
                    onChange={(e) => {
                      const updated = [...hero.slides];
                      updated[heroSlideIndex].line2 = e.target.value;
                      setData({ ...data, hero: { ...hero, slides: updated } });
                    }}
                    className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] font-bold focus:border-[#c5a26c] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Mô Tả Slide</label>
                  <textarea
                    rows={3}
                    value={hero.slides[heroSlideIndex].description}
                    onChange={(e) => {
                      const updated = [...hero.slides];
                      updated[heroSlideIndex].description = e.target.value;
                      setData({ ...data, hero: { ...hero, slides: updated } });
                    }}
                    className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] focus:border-[#c5a26c] focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Background Image with 1-Click Picker */}
                <div>
                  <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">
                    Ảnh Nền Slide {heroSlideIndex + 1}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={hero.slides[heroSlideIndex].backgroundImage || ''}
                      onChange={(e) => {
                        const updated = [...hero.slides];
                        updated[heroSlideIndex].backgroundImage = e.target.value;
                        setData({ ...data, hero: { ...hero, slides: updated } });
                      }}
                      className="flex-1 p-3 border border-[#e2ddd3] rounded-xl text-[13px] font-mono focus:border-[#c5a26c] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        openMediaPicker(`Chọn ảnh nền cho Slide ${heroSlideIndex + 1}`, (url) => {
                          const updated = [...hero.slides];
                          updated[heroSlideIndex].backgroundImage = url;
                          setData({ ...data, hero: { ...hero, slides: updated } });
                        })
                      }
                      className="px-4 py-3 bg-[#f4f1ea] hover:bg-[#c5a26c] hover:text-[#04092b] text-[#04092b] text-[13px] font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 border border-[#e2ddd3]"
                    >
                      <ImageIcon className="w-4 h-4" /> Đổi Ảnh
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Live Preview Workstation */}
          <div className={`${previewLayout === 'full' ? 'lg:col-span-12' : 'lg:col-span-8'} static lg:sticky lg:top-6 space-y-4 transition-all`}>
            {/* Viewport Switcher Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#e2ddd3] shadow-sm">
              <span className="text-[13.5px] font-bold text-[#04092b] uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#c5a26c]" /> Live Preview: Hero Banner
              </span>
              <div className="flex items-center flex-wrap gap-2">
                {/* Layout Toggle */}
                <button
                  type="button"
                  onClick={() => setPreviewLayout(previewLayout === 'split' ? 'full' : 'split')}
                  className="px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all flex items-center gap-1.5 border border-[#e2ddd3] bg-[#faf8f5] hover:bg-[#e2ddd3] text-[#04092b]"
                  title={previewLayout === 'split' ? 'Mở rộng khung xem thử toàn màn hình' : 'Thu nhỏ về chế độ 2 cột'}
                >
                  {previewLayout === 'split' ? <Maximize2 className="w-3.5 h-3.5 text-[#c5a26c]" /> : <Minimize2 className="w-3.5 h-3.5" />}
                  <span>{previewLayout === 'split' ? '⛶ Mở Rộng' : '◫ Chia Đôi'}</span>
                </button>

                {/* Preview Zoom Controls */}
                <div className="flex items-center gap-1 bg-[#f4f1ea] px-2 py-1 rounded-xl border border-[#e2ddd3]">
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((prev) => Math.max(0.7, parseFloat((prev - 0.1).toFixed(2))))}
                    className="p-1 hover:bg-white rounded text-[#04092b]"
                    title="Thu nhỏ preview"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-bold text-[#04092b] px-1">
                    {Math.round(previewZoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((prev) => Math.min(1.4, parseFloat((prev + 0.1).toFixed(2))))}
                    className="p-1 hover:bg-white rounded text-[#04092b]"
                    title="Phóng to preview"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-3 py-1.5 rounded-xl text-[12.5px] font-bold transition-all flex items-center gap-1.5 ${
                    previewDevice === 'desktop'
                      ? 'bg-[#04092b] text-[#c5a26c] shadow-sm'
                      : 'bg-[#f4f1ea] text-[#6e706a] hover:text-[#04092b]'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop (1440px)
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-3 py-1.5 rounded-xl text-[12.5px] font-bold transition-all flex items-center gap-1.5 ${
                    previewDevice === 'mobile'
                      ? 'bg-[#04092b] text-[#c5a26c] shadow-sm'
                      : 'bg-[#f4f1ea] text-[#6e706a] hover:text-[#04092b]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile (390px)
                </button>
                <button
                  type="button"
                  onClick={() => setFullscreenPreviewSection('hero')}
                  className="px-3 py-1.5 rounded-xl bg-[#04092b] hover:bg-[#c5a26c] text-[#c5a26c] hover:text-[#04092b] text-[12px] font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                  title="Phóng to toàn màn hình"
                >
                  <Maximize2 className="w-3.5 h-3.5" /> <span>Toàn Màn Hình</span>
                </button>
              </div>
            </div>

            {/* Desktop Mode Live Preview */}
            {previewDevice === 'desktop' ? (
              <div
                style={{
                  transform: previewZoom !== 1 ? `scale(${previewZoom})` : undefined,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease-out'
                }}
                className="relative w-full min-h-[660px] sm:min-h-[720px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#c5a26c] bg-[#04092b] text-white p-8 sm:p-14 flex flex-col justify-between"
              >
                {hero?.slides?.[heroSlideIndex]?.backgroundImage && (
                  <Image
                    src={hero.slides[heroSlideIndex].backgroundImage!}
                    alt="Slide preview"
                    fill
                    className="object-cover opacity-50"
                  />
                )}
                <div className="relative z-10 space-y-2">
                  <span className="text-[12px] font-bold text-[#c5a26c] uppercase tracking-widest bg-black/50 px-3.5 py-1 rounded-lg border border-[#c5a26c]/30 inline-block font-accent">
                    {hero?.slides?.[heroSlideIndex]?.tag || 'THIẾT KẾ NỘI THẤT CAO CẤP'}
                  </span>
                  <div className="text-[38px] sm:text-[52px] font-serif font-bold text-[#c5a26c] leading-tight">
                    <span className="text-[54px] sm:text-[72px] font-serif italic mr-2 text-[#c5a26c]">
                      {hero?.slides?.[heroSlideIndex]?.monogram}
                    </span>
                    <span className="font-display text-white">{hero?.slides?.[heroSlideIndex]?.line1}</span>
                  </div>
                  {hero?.slides?.[heroSlideIndex]?.line2 && (
                    <p className="text-[30px] sm:text-[40px] font-bold text-white/90 font-display">
                      {hero?.slides?.[heroSlideIndex]?.line2}
                    </p>
                  )}
                </div>

                <div className="relative z-10 space-y-4 pt-8">
                  <p className="text-[15px] sm:text-[16px] text-white/80 max-w-2xl leading-relaxed">
                    {hero?.slides?.[heroSlideIndex]?.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <button className="bg-[#c5a26c] text-[#04092b] font-bold text-[13px] px-7 py-3 rounded-xl uppercase tracking-wider shadow-lg flex items-center gap-2">
                      <span>{hero?.slides?.[heroSlideIndex]?.buttonText || 'Khám Phá Dự Án'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      {hero?.slides?.map((_, i) => (
                        <div
                          key={i}
                          className={`h-2.5 rounded-full transition-all ${
                            i === heroSlideIndex ? 'w-10 bg-[#c5a26c]' : 'w-2.5 bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Mobile Mode Live Preview — Large iPhone Frame */
              <div className="w-full flex justify-center py-6 bg-[#1a1c29]/5 rounded-3xl border border-[#e2ddd3] overflow-x-auto">
                <div
                  style={{
                    transform: previewZoom !== 1 ? `scale(${previewZoom})` : undefined,
                    transformOrigin: 'top center',
                    transition: 'transform 0.15s ease-out'
                  }}
                  className="w-[390px] sm:w-[420px] min-h-[780px] sm:min-h-[840px] bg-[#04092b] text-white rounded-[48px] shadow-2xl border-[10px] border-[#222738] relative overflow-hidden flex flex-col justify-between p-7 sm:p-8"
                >
                  {/* Speaker Notch */}
                  <div className="w-28 h-4 bg-black rounded-full mx-auto mb-4 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#1a1a1a] mr-2" />
                    <div className="w-10 h-1.5 bg-[#252525] rounded-full" />
                  </div>

                  {hero?.slides?.[heroSlideIndex]?.backgroundImage && (
                    <Image
                      src={hero.slides[heroSlideIndex].backgroundImage!}
                      alt="Slide preview"
                      fill
                      className="object-cover opacity-50 pointer-events-none"
                    />
                  )}

                  <div className="relative z-10 space-y-2 mt-4">
                    <span className="text-[10px] font-bold text-[#c5a26c] uppercase tracking-widest bg-black/60 px-2.5 py-1 rounded-md border border-[#c5a26c]/30 inline-block font-accent">
                      {hero?.slides?.[heroSlideIndex]?.tag || 'THIẾT KẾ NỘI THẤT'}
                    </span>
                    <div className="text-[28px] sm:text-[32px] font-serif font-bold text-[#c5a26c] leading-tight">
                      <span className="text-[40px] sm:text-[46px] font-serif italic mr-1 text-[#c5a26c]">
                        {hero?.slides?.[heroSlideIndex]?.monogram}
                      </span>
                      <span className="font-display text-white">{hero?.slides?.[heroSlideIndex]?.line1}</span>
                    </div>
                    {hero?.slides?.[heroSlideIndex]?.line2 && (
                      <p className="text-[22px] sm:text-[24px] font-bold text-white/90 font-display">
                        {hero?.slides?.[heroSlideIndex]?.line2}
                      </p>
                    )}
                  </div>

                  <div className="relative z-10 space-y-4 mb-4">
                    <p className="text-[13px] text-white/85 line-clamp-4 leading-relaxed">
                      {hero?.slides?.[heroSlideIndex]?.description}
                    </p>
                    <button className="w-full bg-[#c5a26c] text-[#04092b] font-bold text-[12px] py-3 rounded-xl uppercase tracking-wider shadow-lg flex items-center justify-center gap-2">
                      <span>{hero?.slides?.[heroSlideIndex]?.buttonText || 'Khám Phá'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Tầm Nhìn & Sứ Mệnh (Philosophy) */}
      {activeTab === 'philosophy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Form Column */}
          <div className={`${previewLayout === 'full' ? 'hidden' : 'lg:col-span-4'} bg-white p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#e2ddd3] shadow-sm space-y-6 transition-all`}>
            <h3 className="font-bold text-[18px] text-[#04092b] border-b border-[#e2ddd3] pb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#c5a26c]" /> Tầm Nhìn &amp; Sứ Mệnh
            </h3>

            {/* Left Visual Photo */}
            <div className="space-y-2">
              <label className="block text-[13.5px] font-bold text-[#04092b]">Ảnh Phòng Khách Bên Trái</label>
              <div className="flex items-center gap-3">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#e2ddd3] bg-black/10 shrink-0">
                  <Image
                    src={philosophy?.image || '/uploads/figma_philosophy_photo.png'}
                    alt="Philosophy Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <input
                  type="text"
                  value={philosophy?.image || ''}
                  onChange={(e) => setData({ ...data, philosophy: { ...philosophy, image: e.target.value } })}
                  className="flex-1 p-3 border border-[#e2ddd3] rounded-xl text-[13px] font-mono focus:border-[#c5a26c] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    openMediaPicker('Chọn ảnh cho phần Tầm Nhìn & Sứ Mệnh', (url) => {
                      setData({ ...data, philosophy: { ...philosophy, image: url } });
                    })
                  }
                  className="px-4 py-3 bg-[#f4f1ea] hover:bg-[#c5a26c] hover:text-[#04092b] text-[#04092b] text-[13px] font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 border border-[#e2ddd3]"
                >
                  <ImageIcon className="w-4 h-4" /> Đổi Ảnh
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Tagline Nhỏ</label>
              <input
                type="text"
                value={philosophy?.tag || ''}
                onChange={(e) => setData({ ...data, philosophy: { ...philosophy, tag: e.target.value } })}
                className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] font-bold focus:border-[#c5a26c] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Tiêu Đề Lớn</label>
              <input
                type="text"
                value={philosophy?.heading || ''}
                onChange={(e) => setData({ ...data, philosophy: { ...philosophy, heading: e.target.value } })}
                className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] font-bold focus:border-[#c5a26c] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Đoạn Văn Triết Lý</label>
              <textarea
                rows={4}
                value={philosophy?.description || ''}
                onChange={(e) => setData({ ...data, philosophy: { ...philosophy, description: e.target.value } })}
                className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] focus:border-[#c5a26c] focus:outline-none leading-relaxed"
              />
            </div>

            {/* 3 Philosophy Features / Pillars */}
            <div className="space-y-3 pt-3 border-t border-[#e2ddd3]">
              <div className="flex items-center justify-between">
                <label className="text-[13.5px] font-bold text-[#04092b] uppercase tracking-wider">
                  3 Trụ Cột / Đặc Trưng Nổi Bật
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const newFeat = { title: 'Tiêu chuẩn chất lượng', description: 'Cam kết chất lượng vật liệu và thẩm mỹ đạt chuẩn cao nhất.' };
                    const feats = [...(philosophy?.features || []), newFeat];
                    setData({ ...data, philosophy: { ...philosophy, features: feats } });
                  }}
                  className="px-2.5 py-1 bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> + Thêm Trụ Cột
                </button>
              </div>

              <div className="space-y-3">
                {philosophy?.features?.map((feat, fIdx) => (
                  <div key={fIdx} className="p-3.5 bg-[#faf8f5] rounded-xl border border-[#e2ddd3] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11.5px] font-bold text-[#c5a26c]">Trụ cột #{fIdx + 1}</span>
                      {philosophy.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = philosophy.features.filter((_, i) => i !== fIdx);
                            setData({ ...data, philosophy: { ...philosophy, features: updated } });
                          }}
                          className="text-red-400 hover:text-red-600 p-1"
                          title="Xóa trụ cột này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Tiêu đề (VD: Thiết kế độc bản)"
                      value={feat.title}
                      onChange={(e) => {
                        const updated = [...philosophy.features];
                        updated[fIdx] = { ...updated[fIdx], title: e.target.value };
                        setData({ ...data, philosophy: { ...philosophy, features: updated } });
                      }}
                      className="w-full p-2 bg-white border border-[#e2ddd3] rounded-lg text-[13px] font-bold focus:border-[#c5a26c] focus:outline-none"
                    />
                    <textarea
                      rows={2}
                      placeholder="Mô tả chi tiết"
                      value={feat.description}
                      onChange={(e) => {
                        const updated = [...philosophy.features];
                        updated[fIdx] = { ...updated[fIdx], description: e.target.value };
                        setData({ ...data, philosophy: { ...philosophy, features: updated } });
                      }}
                      className="w-full p-2 bg-white border border-[#e2ddd3] rounded-lg text-[12px] focus:border-[#c5a26c] focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Live Preview Workstation */}
          <div className={`${previewLayout === 'full' ? 'lg:col-span-12' : 'lg:col-span-8'} static lg:sticky lg:top-6 space-y-4 transition-all`}>
            {/* Viewport Switcher Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#e2ddd3] shadow-sm">
              <span className="text-[13.5px] font-bold text-[#04092b] uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#c5a26c]" /> Live Preview: Tầm Nhìn &amp; Sứ Mệnh
              </span>
              <div className="flex items-center flex-wrap gap-2">
                {/* Layout Toggle */}
                <button
                  type="button"
                  onClick={() => setPreviewLayout(previewLayout === 'split' ? 'full' : 'split')}
                  className="px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all flex items-center gap-1.5 border border-[#e2ddd3] bg-[#faf8f5] hover:bg-[#e2ddd3] text-[#04092b]"
                  title={previewLayout === 'split' ? 'Mở rộng khung xem thử toàn màn hình' : 'Thu nhỏ về chế độ 2 cột'}
                >
                  {previewLayout === 'split' ? <Maximize2 className="w-3.5 h-3.5 text-[#c5a26c]" /> : <Minimize2 className="w-3.5 h-3.5" />}
                  <span>{previewLayout === 'split' ? '⛶ Mở Rộng' : '◫ Chia Đôi'}</span>
                </button>

                {/* Preview Zoom Controls */}
                <div className="flex items-center gap-1 bg-[#f4f1ea] px-2 py-1 rounded-xl border border-[#e2ddd3]">
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((prev) => Math.max(0.7, parseFloat((prev - 0.1).toFixed(2))))}
                    className="p-1 hover:bg-white rounded text-[#04092b]"
                    title="Thu nhỏ preview"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-bold text-[#04092b] px-1">
                    {Math.round(previewZoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((prev) => Math.min(1.4, parseFloat((prev + 0.1).toFixed(2))))}
                    className="p-1 hover:bg-white rounded text-[#04092b]"
                    title="Phóng to preview"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-3 py-1.5 rounded-xl text-[12.5px] font-bold transition-all flex items-center gap-1.5 ${
                    previewDevice === 'desktop'
                      ? 'bg-[#04092b] text-[#c5a26c] shadow-sm'
                      : 'bg-[#f4f1ea] text-[#6e706a] hover:text-[#04092b]'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop (1440px)
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-3 py-1.5 rounded-xl text-[12.5px] font-bold transition-all flex items-center gap-1.5 ${
                    previewDevice === 'mobile'
                      ? 'bg-[#04092b] text-[#c5a26c] shadow-sm'
                      : 'bg-[#f4f1ea] text-[#6e706a] hover:text-[#04092b]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile (390px)
                </button>
                <button
                  type="button"
                  onClick={() => setFullscreenPreviewSection('philosophy')}
                  className="px-3 py-1.5 rounded-xl bg-[#04092b] hover:bg-[#c5a26c] text-[#c5a26c] hover:text-[#04092b] text-[12px] font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                  title="Phóng to toàn màn hình"
                >
                  <Maximize2 className="w-3.5 h-3.5" /> <span>Toàn Màn Hình</span>
                </button>
              </div>
            </div>

            {previewDevice === 'desktop' ? (
              <div
                style={{
                  transform: previewZoom !== 1 ? `scale(${previewZoom})` : undefined,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease-out'
                }}
                className="bg-[#faf8f5] p-8 sm:p-14 rounded-3xl border-2 border-[#c5a26c] shadow-2xl space-y-8 min-h-[660px] sm:min-h-[720px] flex flex-col justify-between"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5 relative h-[360px] rounded-2xl overflow-hidden border border-[#e2ddd3] shadow-md">
                    <Image
                      src={philosophy?.image || '/uploads/figma_philosophy_photo.png'}
                      alt="Philosophy Live Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:col-span-7 space-y-4">
                    <span className="text-[12px] font-bold text-[#c5a26c] uppercase tracking-widest font-accent">
                      {philosophy?.tag || 'VỀ CHÚNG TÔI'}
                    </span>
                    <h4 className="text-[32px] sm:text-[40px] font-bold text-[#04092b] font-display leading-tight">
                      {philosophy?.heading || 'TẦM NHÌN VÀ SỨ MỆNH'}
                    </h4>
                    <p className="text-[15px] sm:text-[16px] text-[#5f6361] leading-relaxed">
                      {philosophy?.description || 'Mang lại những giải pháp thiết kế nội thất hoàn mỹ...'}
                    </p>
                  </div>
                </div>

                {/* 3 Pillar Mockup */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#e2ddd3]">
                  {[
                    { num: '01', title: 'Thiết kế độc bản', desc: 'Cá nhân hóa 100% theo phong cách & phong thủy' },
                    { num: '02', title: 'Thi công trọn gói', desc: 'Chuẩn xác 99% so với bản vẽ phối cảnh 3D' },
                    { num: '03', title: 'Xưởng trực tiếp', desc: 'Tối ưu 20–30% chi phí thị trường' },
                  ].map((p) => (
                    <div key={p.num} className="bg-white p-5 rounded-2xl border border-[#e2ddd3] shadow-xs">
                      <span className="text-[14px] font-mono font-bold text-[#c5a26c] block">{p.num}</span>
                      <h5 className="text-[14px] font-bold text-[#04092b] mt-1">{p.title}</h5>
                      <p className="text-[12px] text-[#6e706a] mt-1.5 leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Mobile Viewport — Large iPhone Frame */
              <div className="w-full flex justify-center py-6 bg-[#1a1c29]/5 rounded-3xl border border-[#e2ddd3] overflow-x-auto">
                <div
                  style={{
                    transform: previewZoom !== 1 ? `scale(${previewZoom})` : undefined,
                    transformOrigin: 'top center',
                    transition: 'transform 0.15s ease-out'
                  }}
                  className="w-[390px] sm:w-[420px] min-h-[780px] sm:min-h-[840px] bg-[#faf8f5] text-[#04092b] rounded-[48px] shadow-2xl border-[10px] border-[#222738] relative overflow-hidden flex flex-col justify-between p-7 sm:p-8"
                >
                  <div className="w-28 h-4 bg-black rounded-full mx-auto mb-4 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#1a1a1a] mr-2" />
                    <div className="w-10 h-1.5 bg-[#252525] rounded-full" />
                  </div>

                  <div className="space-y-4">
                    <div className="relative w-full h-[240px] rounded-2xl overflow-hidden shadow-sm border border-[#e2ddd3]">
                      <Image
                        src={philosophy?.image || '/uploads/figma_philosophy_photo.png'}
                        alt="Philosophy Preview Mobile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-[#c5a26c] uppercase tracking-wider block">
                        {philosophy?.tag}
                      </span>
                      <h4 className="text-[24px] font-bold text-[#04092b] font-display leading-tight">{philosophy?.heading}</h4>
                      <p className="text-[13px] text-[#6e706a] leading-relaxed">
                        {philosophy?.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#e2ddd3]">
                      {[
                        { num: '01', title: 'Thiết kế độc bản' },
                        { num: '02', title: 'Thi công trọn gói' },
                        { num: '03', title: 'Xưởng trực tiếp' },
                      ].map((p) => (
                        <div key={p.num} className="bg-white p-3 rounded-xl border border-[#e2ddd3] flex items-center gap-3">
                          <span className="text-[12px] font-mono font-bold text-[#c5a26c]">{p.num}</span>
                          <span className="text-[13px] font-bold text-[#04092b]">{p.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Kết Nối & Báo Giá (Contact) */}
      {activeTab === 'contact' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form */}
          <div className={`${previewLayout === 'full' ? 'hidden' : 'lg:col-span-5'} bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#e2ddd3] shadow-sm space-y-6 transition-all`}>
            <h3 className="font-bold text-[19px] text-[#04092b] border-b border-[#e2ddd3] pb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#c5a26c]" /> Khối Kết Nối &amp; Báo Giá (Contact Form)
            </h3>

            {/* Left Photo */}
            <div className="space-y-2">
              <label className="block text-[13.5px] font-bold text-[#04092b]">
                Ảnh Sảnh Tiếp Khách Bên Trái
              </label>
              <div className="flex items-center gap-3">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-[#e2ddd3] bg-black/10 shrink-0 shadow-sm">
                  <Image
                    src={contact?.image || '/uploads/clean_contact_photo.png'}
                    alt="Contact Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <input
                  type="text"
                  value={contact?.image || ''}
                  onChange={(e) => setData({ ...data, contact: { ...contact, image: e.target.value } })}
                  className="flex-1 p-3 border border-[#e2ddd3] rounded-xl text-[13px] font-mono focus:border-[#c5a26c] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    openMediaPicker('Chọn ảnh cho Khối Kết Nối & Tư Vấn', (url) => {
                      setData({ ...data, contact: { ...contact, image: url } });
                    })
                  }
                  className="px-4 py-3 bg-[#f4f1ea] hover:bg-[#c5a26c] hover:text-[#04092b] text-[#04092b] text-[13px] font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 border border-[#e2ddd3]"
                >
                  <ImageIcon className="w-4 h-4" /> Đổi Ảnh
                </button>
              </div>
            </div>

            {/* Tag & Heading */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Thẻ Tiêu Đề Nhỏ</label>
                <input
                  type="text"
                  value={contact?.tag || ''}
                  onChange={(e) => setData({ ...data, contact: { ...contact, tag: e.target.value } })}
                  className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] focus:border-[#c5a26c] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Tiêu Đề Chính</label>
                <input
                  type="text"
                  value={contact?.heading || ''}
                  onChange={(e) => setData({ ...data, contact: { ...contact, heading: e.target.value } })}
                  className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] font-bold focus:border-[#c5a26c] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Lời Nhắn / Báo Giá (Quote)</label>
              <textarea
                rows={3}
                value={contact?.quote || ''}
                onChange={(e) => setData({ ...data, contact: { ...contact, quote: e.target.value } })}
                className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] focus:border-[#c5a26c] focus:outline-none leading-relaxed"
                placeholder="Để lại thông tin, đội ngũ Kiến trúc sư..."
              />
            </div>
          </div>

          {/* Right Live Preview Workstation */}
          <div className={`${previewLayout === 'full' ? 'lg:col-span-12' : 'lg:col-span-7'} static lg:sticky lg:top-6 space-y-4 transition-all`}>
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#e2ddd3] shadow-sm">
              <span className="text-[13.5px] font-bold text-[#04092b] uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#c5a26c]" /> Live Preview: Kết Nối &amp; Báo Giá
              </span>
              <div className="flex items-center flex-wrap gap-2">
                {/* Layout Toggle */}
                <button
                  type="button"
                  onClick={() => setPreviewLayout(previewLayout === 'split' ? 'full' : 'split')}
                  className="px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all flex items-center gap-1.5 border border-[#e2ddd3] bg-[#faf8f5] hover:bg-[#e2ddd3] text-[#04092b]"
                  title={previewLayout === 'split' ? 'Mở rộng khung xem thử toàn màn hình' : 'Thu nhỏ về chế độ 2 cột'}
                >
                  {previewLayout === 'split' ? <Maximize2 className="w-3.5 h-3.5 text-[#c5a26c]" /> : <Minimize2 className="w-3.5 h-3.5" />}
                  <span>{previewLayout === 'split' ? '⛶ Mở Rộng' : '◫ Chia Đôi'}</span>
                </button>

                {/* Preview Zoom Controls */}
                <div className="flex items-center gap-1 bg-[#f4f1ea] px-2 py-1 rounded-xl border border-[#e2ddd3]">
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((prev) => Math.max(0.7, parseFloat((prev - 0.1).toFixed(2))))}
                    className="p-1 hover:bg-white rounded text-[#04092b]"
                    title="Thu nhỏ preview"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-bold text-[#04092b] px-1">
                    {Math.round(previewZoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((prev) => Math.min(1.4, parseFloat((prev + 0.1).toFixed(2))))}
                    className="p-1 hover:bg-white rounded text-[#04092b]"
                    title="Phóng to preview"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-3 py-1.5 rounded-xl text-[12.5px] font-bold transition-all flex items-center gap-1.5 ${
                    previewDevice === 'desktop'
                      ? 'bg-[#04092b] text-[#c5a26c] shadow-sm'
                      : 'bg-[#f4f1ea] text-[#6e706a] hover:text-[#04092b]'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop (1440px)
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-3 py-1.5 rounded-xl text-[12.5px] font-bold transition-all flex items-center gap-1.5 ${
                    previewDevice === 'mobile'
                      ? 'bg-[#04092b] text-[#c5a26c] shadow-sm'
                      : 'bg-[#f4f1ea] text-[#6e706a] hover:text-[#04092b]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile (390px)
                </button>
                <button
                  type="button"
                  onClick={() => setFullscreenPreviewSection('contact')}
                  className="p-2 rounded-xl bg-[#f4f1ea] hover:bg-[#c5a26c] text-[#04092b] transition-colors"
                  title="Phóng to toàn màn hình"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {previewDevice === 'desktop' ? (
              <div
                style={{
                  transform: previewZoom !== 1 ? `scale(${previewZoom})` : undefined,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease-out'
                }}
                className="bg-[#04092b] text-white p-8 sm:p-12 rounded-3xl border-2 border-[#c5a26c] shadow-2xl min-h-[660px] sm:min-h-[720px] flex items-center"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
                  {/* Left Column Visual Info */}
                  <div className="md:col-span-6 space-y-4">
                    <div className="relative w-full h-[260px] rounded-2xl overflow-hidden border border-[#c5a26c]/30 shadow-lg">
                      <Image
                        src={contact?.image || '/uploads/clean_contact_photo.png'}
                        alt="Contact Live Preview"
                        fill
                        className="object-cover opacity-80"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#c5a26c] uppercase tracking-widest font-accent">
                        {contact?.tag || 'LIÊN HỆ'}
                      </span>
                      <h4 className="text-[26px] font-bold font-display whitespace-pre-line leading-tight text-white mt-1">
                        {contact?.heading}
                      </h4>
                      <p className="text-[13.5px] text-white/75 mt-2 leading-relaxed">{contact?.quote}</p>
                    </div>
                  </div>

                  {/* Right Column Inquiry Form Mockup */}
                  <div className="md:col-span-6 bg-white/10 backdrop-blur-md p-7 rounded-2xl border border-white/15 space-y-3.5">
                    <h5 className="text-[15px] font-bold text-[#c5a26c] uppercase tracking-wider">
                      Nhận Báo Giá Thiết Kế
                    </h5>
                    <div className="space-y-2.5 text-[13px]">
                      <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-white/60">
                        Họ và tên của bạn
                      </div>
                      <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-white/60">
                        Số điện thoại liên hệ
                      </div>
                      <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-white/60">
                        Diện tích căn hộ (m²)
                      </div>
                    </div>
                    {/* Minimalist Swipe Pill */}
                    <div className="pt-2">
                      <div className="bg-[#2D302E] text-white p-3.5 rounded-full flex items-center justify-between border border-[#c5a26c]/40 shadow-md">
                        <span className="text-[13px] font-bold pl-4">Yêu cầu tư vấn</span>
                        <div className="w-8 h-8 rounded-full bg-[#c5a26c] text-[#04092b] flex items-center justify-center font-bold">
                          →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Mobile Viewport — Large iPhone Frame */
              <div className="w-full flex justify-center py-6 bg-[#1a1c29]/5 rounded-3xl border border-[#e2ddd3] overflow-x-auto">
                <div
                  style={{
                    transform: previewZoom !== 1 ? `scale(${previewZoom})` : undefined,
                    transformOrigin: 'top center',
                    transition: 'transform 0.15s ease-out'
                  }}
                  className="w-[390px] sm:w-[420px] min-h-[780px] sm:min-h-[840px] bg-[#04092b] text-white rounded-[48px] shadow-2xl border-[10px] border-[#222738] relative overflow-hidden flex flex-col justify-between p-7 sm:p-8"
                >
                  <div className="w-28 h-4 bg-black rounded-full mx-auto mb-4 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#1a1a1a] mr-2" />
                    <div className="w-10 h-1.5 bg-[#252525] rounded-full" />
                  </div>

                  <div className="space-y-4 flex-1">
                    <div className="relative w-full h-[180px] rounded-2xl overflow-hidden shadow-md">
                      <Image
                        src={contact?.image || '/uploads/clean_contact_photo.png'}
                        alt="Contact Preview Mobile"
                        fill
                        className="object-cover opacity-80"
                      />
                    </div>
                    <div>
                      <span className="text-[10.5px] font-bold text-[#c5a26c] uppercase tracking-wider block">
                        {contact?.tag}
                      </span>
                      <h4 className="text-[20px] font-bold font-display mt-0.5">{contact?.heading}</h4>
                      <p className="text-[12px] text-white/75 mt-1 leading-relaxed">{contact?.quote}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 space-y-2 text-[12px]">
                      <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-white/60">
                        Họ và tên của bạn
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-white/60">
                        Số điện thoại liên hệ
                      </div>
                    </div>
                  </div>

                  {/* Mobile minimalist pill */}
                  <div className="bg-[#2D302E] text-white p-3 rounded-full flex items-center justify-between border border-[#c5a26c]/40 mt-4">
                    <span className="text-[12.5px] font-bold pl-3">Yêu cầu tư vấn</span>
                    <div className="w-8 h-8 rounded-full bg-[#c5a26c] text-[#04092b] flex items-center justify-center font-bold text-xs">
                      →
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Phong Cách Thiết Kế (Styles Overview) */}
      {activeTab === 'styles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form */}
          <div className={`${previewLayout === 'full' ? 'hidden' : 'lg:col-span-5'} bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#e2ddd3] shadow-sm space-y-6 transition-all`}>
            <h3 className="font-bold text-[19px] text-[#04092b] border-b border-[#e2ddd3] pb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#c5a26c]" /> 4 Thẻ Phong Cách Thiết Kế
              </span>
              <span className="text-[12.5px] font-mono bg-[#f4f1ea] px-3 py-1 rounded-lg text-[#04092b] font-bold">
                Thẻ {selectedStyleIndex + 1} / {stylesOverview?.styles?.length || 4}
              </span>
            </h3>

            {/* Style Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {stylesOverview?.styles?.map((st, idx) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedStyleIndex(idx)}
                  className={`p-3 rounded-xl text-[12.5px] font-bold transition-all text-center border ${
                    selectedStyleIndex === idx
                      ? 'bg-[#04092b] text-[#c5a26c] border-[#04092b] shadow-md ring-2 ring-[#c5a26c]/40'
                      : 'bg-[#f4f1ea] text-[#04092b] border-[#e2ddd3] hover:bg-[#e2ddd3]'
                  }`}
                >
                  {st.name}
                </button>
              ))}
            </div>

            {/* Section Level Settings */}
            <div className="space-y-3 p-4 bg-[#faf8f5] rounded-2xl border border-[#e2ddd3]">
              <span className="text-[12px] font-bold text-[#c5a26c] uppercase tracking-wider block">
                Tiêu Đề &amp; Mô Tả Khối Phong Cách
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-bold text-[#04092b] mb-1">Tag Nhỏ (Eyebrow)</label>
                  <input
                    type="text"
                    value={stylesOverview?.tag || ''}
                    onChange={(e) => setData({ ...data, stylesOverview: { ...stylesOverview, tag: e.target.value } })}
                    className="w-full p-2 bg-white border border-[#e2ddd3] rounded-lg text-[13px] focus:border-[#c5a26c] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#04092b] mb-1">Tiêu Đề Lớn</label>
                  <input
                    type="text"
                    value={stylesOverview?.heading || ''}
                    onChange={(e) => setData({ ...data, stylesOverview: { ...stylesOverview, heading: e.target.value } })}
                    className="w-full p-2 bg-white border border-[#e2ddd3] rounded-lg text-[13px] font-bold focus:border-[#c5a26c] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#04092b] mb-1">Đoạn Văn Giới Thiệu Chung</label>
                <textarea
                  rows={2}
                  value={stylesOverview?.description || ''}
                  onChange={(e) => setData({ ...data, stylesOverview: { ...stylesOverview, description: e.target.value } })}
                  className="w-full p-2 bg-white border border-[#e2ddd3] rounded-lg text-[12.5px] focus:border-[#c5a26c] focus:outline-none leading-relaxed"
                />
              </div>
            </div>

            {/* Current Style Card Editor */}
            {stylesOverview?.styles?.[selectedStyleIndex] && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Tên Phong Cách</label>
                    <input
                      type="text"
                      value={stylesOverview.styles[selectedStyleIndex].name}
                      onChange={(e) => {
                        const updated = [...stylesOverview.styles];
                        updated[selectedStyleIndex].name = e.target.value;
                        setData({ ...data, stylesOverview: { ...stylesOverview, styles: updated } });
                      }}
                      className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] font-bold focus:border-[#c5a26c] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Phụ Đề / Đặc Trưng</label>
                    <input
                      type="text"
                      value={stylesOverview.styles[selectedStyleIndex].subtitle}
                      onChange={(e) => {
                        const updated = [...stylesOverview.styles];
                        updated[selectedStyleIndex].subtitle = e.target.value;
                        setData({ ...data, stylesOverview: { ...stylesOverview, styles: updated } });
                      }}
                      className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] focus:border-[#c5a26c] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Mô Tả Chi Tiết Thẻ</label>
                  <textarea
                    rows={3}
                    value={stylesOverview.styles[selectedStyleIndex].description || ''}
                    onChange={(e) => {
                      const updated = [...stylesOverview.styles];
                      updated[selectedStyleIndex].description = e.target.value;
                      setData({ ...data, stylesOverview: { ...stylesOverview, styles: updated } });
                    }}
                    className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[13px] focus:border-[#c5a26c] focus:outline-none leading-relaxed"
                    placeholder="Mô tả phong cách thiết kế..."
                  />
                </div>

                {/* Card Thumbnail Image */}
                <div>
                  <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">
                    Ảnh Thẻ Lưới (Card Thumbnail Image)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-[#e2ddd3] bg-black/10 shrink-0 shadow-sm">
                      <Image
                        src={stylesOverview.styles[selectedStyleIndex].cardImage}
                        alt="Card preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <input
                      type="text"
                      value={stylesOverview.styles[selectedStyleIndex].cardImage}
                      onChange={(e) => {
                        const updated = [...stylesOverview.styles];
                        updated[selectedStyleIndex].cardImage = e.target.value;
                        setData({ ...data, stylesOverview: { ...stylesOverview, styles: updated } });
                      }}
                      className="flex-1 p-3 border border-[#e2ddd3] rounded-xl text-[13px] font-mono focus:border-[#c5a26c] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        openMediaPicker(`Chọn ảnh thẻ cho ${stylesOverview.styles[selectedStyleIndex].name}`, (url) => {
                          const updated = [...stylesOverview.styles];
                          updated[selectedStyleIndex].cardImage = url;
                          setData({ ...data, stylesOverview: { ...stylesOverview, styles: updated } });
                        })
                      }
                      className="px-4 py-3 bg-[#f4f1ea] hover:bg-[#c5a26c] hover:text-[#04092b] text-[#04092b] text-[13px] font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 border border-[#e2ddd3]"
                    >
                      <ImageIcon className="w-4 h-4" /> Đổi Ảnh
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Live Preview Workstation */}
          <div className={`${previewLayout === 'full' ? 'lg:col-span-12' : 'lg:col-span-7'} static lg:sticky lg:top-6 space-y-4 transition-all`}>
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#e2ddd3] shadow-sm">
              <span className="text-[13.5px] font-bold text-[#04092b] uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#c5a26c]" /> Live Preview: Phong Cách Thiết Kế
              </span>
              <div className="flex items-center flex-wrap gap-2">
                {/* Layout Toggle */}
                <button
                  type="button"
                  onClick={() => setPreviewLayout(previewLayout === 'split' ? 'full' : 'split')}
                  className="px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all flex items-center gap-1.5 border border-[#e2ddd3] bg-[#faf8f5] hover:bg-[#e2ddd3] text-[#04092b]"
                  title={previewLayout === 'split' ? 'Mở rộng khung xem thử toàn màn hình' : 'Thu nhỏ về chế độ 2 cột'}
                >
                  {previewLayout === 'split' ? <Maximize2 className="w-3.5 h-3.5 text-[#c5a26c]" /> : <Minimize2 className="w-3.5 h-3.5" />}
                  <span>{previewLayout === 'split' ? '⛶ Mở Rộng' : '◫ Chia Đôi'}</span>
                </button>

                {/* Preview Zoom Controls */}
                <div className="flex items-center gap-1 bg-[#f4f1ea] px-2 py-1 rounded-xl border border-[#e2ddd3]">
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((prev) => Math.max(0.7, parseFloat((prev - 0.1).toFixed(2))))}
                    className="p-1 hover:bg-white rounded text-[#04092b]"
                    title="Thu nhỏ preview"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-bold text-[#04092b] px-1">
                    {Math.round(previewZoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((prev) => Math.min(1.4, parseFloat((prev + 0.1).toFixed(2))))}
                    className="p-1 hover:bg-white rounded text-[#04092b]"
                    title="Phóng to preview"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-3 py-1.5 rounded-xl text-[12.5px] font-bold transition-all flex items-center gap-1.5 ${
                    previewDevice === 'desktop'
                      ? 'bg-[#04092b] text-[#c5a26c] shadow-sm'
                      : 'bg-[#f4f1ea] text-[#6e706a] hover:text-[#04092b]'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop (1440px)
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-3 py-1.5 rounded-xl text-[12.5px] font-bold transition-all flex items-center gap-1.5 ${
                    previewDevice === 'mobile'
                      ? 'bg-[#04092b] text-[#c5a26c] shadow-sm'
                      : 'bg-[#f4f1ea] text-[#6e706a] hover:text-[#04092b]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile (390px)
                </button>
                <button
                  type="button"
                  onClick={() => setFullscreenPreviewSection('styles')}
                  className="p-2 rounded-xl bg-[#f4f1ea] hover:bg-[#c5a26c] text-[#04092b] transition-colors"
                  title="Phóng to toàn màn hình"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {previewDevice === 'desktop' ? (
              <div
                style={{
                  transform: previewZoom !== 1 ? `scale(${previewZoom})` : undefined,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease-out'
                }}
                className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-[#c5a26c] shadow-2xl min-h-[660px] sm:min-h-[720px] space-y-8 flex flex-col justify-center"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#c5a26c] uppercase tracking-widest font-accent">
                    {stylesOverview?.tag || 'CÁC BỘ SƯU TẬP'}
                  </span>
                  <h4 className="text-[28px] font-bold text-[#04092b] font-display mt-1">
                    {stylesOverview?.heading || 'PHONG CÁCH THIẾT KẾ ĐẶC TRƯNG'}
                  </h4>
                </div>

                {/* 4 Cards Grid */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                  {stylesOverview?.styles?.map((st, idx) => {
                    const isCurrent = selectedStyleIndex === idx;
                    return (
                      <div
                        key={st.id || idx}
                        onClick={() => setSelectedStyleIndex(idx)}
                        className={`group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all p-3 bg-[#faf8f5] flex flex-col ${
                          isCurrent
                            ? 'border-[#c5a26c] shadow-lg ring-2 ring-[#c5a26c]/40 bg-white'
                            : 'border-[#e2ddd3] hover:border-[#c5a26c] hover:shadow-md'
                        }`}
                      >
                        <div className="relative w-full h-[180px] rounded-xl overflow-hidden shadow-xs">
                          <Image
                            src={st.cardImage || '/uploads/clean_style_modern.png'}
                            alt={st.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {isCurrent && (
                            <span className="absolute top-2.5 right-2.5 bg-[#04092b] text-[#c5a26c] text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border border-[#c5a26c]/40 shadow-sm">
                              Đang chọn
                            </span>
                          )}
                        </div>
                        <div className="pt-3 pb-1 space-y-1">
                          <h5 className="text-[15px] font-bold text-[#04092b] line-clamp-1">{st.name}</h5>
                          <p className="text-[12px] text-[#6e706a] line-clamp-1">{st.subtitle}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Mobile Viewport — Large iPhone Frame */
              <div className="w-full flex justify-center py-6 bg-[#1a1c29]/5 rounded-3xl border border-[#e2ddd3] overflow-x-auto">
                <div
                  style={{
                    transform: previewZoom !== 1 ? `scale(${previewZoom})` : undefined,
                    transformOrigin: 'top center',
                    transition: 'transform 0.15s ease-out'
                  }}
                  className="w-[390px] sm:w-[420px] min-h-[780px] sm:min-h-[840px] bg-white text-[#04092b] rounded-[48px] shadow-2xl border-[10px] border-[#222738] relative overflow-hidden flex flex-col justify-between p-7 sm:p-8"
                >
                  <div className="w-28 h-4 bg-black rounded-full mx-auto mb-4 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#1a1a1a] mr-2" />
                    <div className="w-10 h-1.5 bg-[#252525] rounded-full" />
                  </div>

                  <div className="space-y-4 flex-1">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#c5a26c] uppercase tracking-wider block">
                        {stylesOverview?.tag}
                      </span>
                      <h4 className="text-[20px] font-bold font-display">{stylesOverview?.heading}</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {stylesOverview?.styles?.slice(0, 4).map((st, idx) => (
                        <div key={idx} className="rounded-2xl overflow-hidden border border-[#e2ddd3] p-2 bg-[#faf8f5] shadow-xs">
                          <div className="relative w-full h-[110px] rounded-xl overflow-hidden">
                            <Image src={st.cardImage} alt={st.name} fill className="object-cover" />
                          </div>
                          <p className="text-[12px] font-bold text-[#04092b] mt-1.5 truncate">{st.name}</p>
                          <p className="text-[10.5px] text-[#6e706a] truncate">{st.subtitle}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 6: Nội Thất Văn Phòng (Office) */}
      {activeTab === 'office' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form */}
          <div className={`${previewLayout === 'full' ? 'hidden' : 'lg:col-span-5'} bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#e2ddd3] shadow-sm space-y-6 transition-all`}>
            <h3 className="font-bold text-[19px] text-[#04092b] border-b border-[#e2ddd3] pb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#c5a26c]" /> Khối Nội Thất Văn Phòng (Office)
            </h3>

            {/* Hero Main Photo */}
            <div className="space-y-2">
              <label className="block text-[13.5px] font-bold text-[#04092b]">
                Ảnh Phòng Làm Việc Giám Đốc
              </label>
              <div className="flex items-center gap-3">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-[#e2ddd3] bg-black/10 shrink-0 shadow-sm">
                  <Image
                    src={office?.heroImage || '/uploads/office_hero_main.png'}
                    alt="Office Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <input
                  type="text"
                  value={office?.heroImage || ''}
                  onChange={(e) => setData({ ...data, office: { ...office, heroImage: e.target.value } })}
                  className="flex-1 p-3 border border-[#e2ddd3] rounded-xl text-[13px] font-mono focus:border-[#c5a26c] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    openMediaPicker('Chọn ảnh văn phòng giám đốc', (url) => {
                      setData({ ...data, office: { ...office, heroImage: url } });
                    })
                  }
                  className="px-4 py-3 bg-[#f4f1ea] hover:bg-[#c5a26c] hover:text-[#04092b] text-[#04092b] text-[13px] font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 border border-[#e2ddd3]"
                >
                  <ImageIcon className="w-4 h-4" /> Đổi Ảnh
                </button>
              </div>
            </div>

            {/* Headings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Tiêu Đề Dòng 1</label>
                <input
                  type="text"
                  value={office?.headingLine1 || ''}
                  onChange={(e) => setData({ ...data, office: { ...office, headingLine1: e.target.value } })}
                  className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] font-bold focus:border-[#c5a26c] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Tiêu Đề Dòng 2</label>
                <input
                  type="text"
                  value={office?.headingLine2 || ''}
                  onChange={(e) => setData({ ...data, office: { ...office, headingLine2: e.target.value } })}
                  className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] font-bold focus:border-[#c5a26c] focus:outline-none"
                />
              </div>
            </div>

            {/* Tagline / Subtitle */}
            <div>
              <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Tagline / Tiêu Đề Phụ</label>
              <input
                type="text"
                value={office?.tag || ''}
                onChange={(e) => setData({ ...data, office: { ...office, tag: e.target.value } })}
                className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] focus:border-[#c5a26c] focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Mô Tả Không Gian Văn Phòng</label>
              <textarea
                rows={4}
                value={office?.description || ''}
                onChange={(e) => setData({ ...data, office: { ...office, description: e.target.value } })}
                className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] focus:border-[#c5a26c] focus:outline-none leading-relaxed"
              />
            </div>

            {/* Color Swatches Editor */}
            <div className="space-y-3 pt-3 border-t border-[#e2ddd3]">
              <div className="flex items-center justify-between">
                <label className="block text-[13.5px] font-bold text-[#04092b]">
                  Bảng Màu Thiết Kế (Color Swatches)
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const current = office?.colorSwatches || [
                      { color: '#e5dfd7', label: 'Sand Cream' },
                      { color: '#8c7b6c', label: 'Earthy Taupe' },
                      { color: '#395224', label: 'Forest Sage' },
                      { color: '#d2a679', label: 'Warm Caramel' }
                    ];
                    setData({
                      ...data,
                      office: {
                        ...office,
                        colorSwatches: [...current, { color: '#c5a26c', label: 'Tông màu mới' }]
                      }
                    });
                  }}
                  className="px-2.5 py-1 bg-[#f4f1ea] hover:bg-[#c5a26c] hover:text-[#04092b] text-[#04092b] text-[12px] font-bold rounded-lg border border-[#e2ddd3] transition-colors"
                >
                  + Thêm Màu
                </button>
              </div>
              <div className="space-y-2">
                {(office?.colorSwatches || [
                  { color: '#e5dfd7', label: 'Sand Cream' },
                  { color: '#8c7b6c', label: 'Earthy Taupe' },
                  { color: '#395224', label: 'Forest Sage' },
                  { color: '#d2a679', label: 'Warm Caramel' }
                ]).map((swatch, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 p-2 bg-[#faf8f5] rounded-xl border border-[#e2ddd3]">
                    <input
                      type="color"
                      value={swatch.color}
                      onChange={(e) => {
                        const next = [...(office?.colorSwatches || [
                          { color: '#e5dfd7', label: 'Sand Cream' },
                          { color: '#8c7b6c', label: 'Earthy Taupe' },
                          { color: '#395224', label: 'Forest Sage' },
                          { color: '#d2a679', label: 'Warm Caramel' }
                        ])];
                        next[sIdx] = { ...next[sIdx], color: e.target.value };
                        setData({ ...data, office: { ...office, colorSwatches: next } });
                      }}
                      className="w-8 h-8 rounded cursor-pointer border border-[#e2ddd3] p-0.5 bg-white shrink-0"
                    />
                    <input
                      type="text"
                      value={swatch.color}
                      onChange={(e) => {
                        const next = [...(office?.colorSwatches || [
                          { color: '#e5dfd7', label: 'Sand Cream' },
                          { color: '#8c7b6c', label: 'Earthy Taupe' },
                          { color: '#395224', label: 'Forest Sage' },
                          { color: '#d2a679', label: 'Warm Caramel' }
                        ])];
                        next[sIdx] = { ...next[sIdx], color: e.target.value };
                        setData({ ...data, office: { ...office, colorSwatches: next } });
                      }}
                      className="w-24 p-1.5 border border-[#e2ddd3] rounded-lg text-[12px] font-mono"
                      placeholder="#hex"
                    />
                    <input
                      type="text"
                      value={swatch.label}
                      onChange={(e) => {
                        const next = [...(office?.colorSwatches || [
                          { color: '#e5dfd7', label: 'Sand Cream' },
                          { color: '#8c7b6c', label: 'Earthy Taupe' },
                          { color: '#395224', label: 'Forest Sage' },
                          { color: '#d2a679', label: 'Warm Caramel' }
                        ])];
                        next[sIdx] = { ...next[sIdx], label: e.target.value };
                        setData({ ...data, office: { ...office, colorSwatches: next } });
                      }}
                      className="flex-1 p-1.5 border border-[#e2ddd3] rounded-lg text-[12px]"
                      placeholder="Tên màu"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = (office?.colorSwatches || [
                          { color: '#e5dfd7', label: 'Sand Cream' },
                          { color: '#8c7b6c', label: 'Earthy Taupe' },
                          { color: '#395224', label: 'Forest Sage' },
                          { color: '#d2a679', label: 'Warm Caramel' }
                        ]).filter((_, i) => i !== sIdx);
                        setData({ ...data, office: { ...office, colorSwatches: next } });
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                      title="Xóa màu"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Cards (3 Cards) */}
            <div className="space-y-4 pt-3 border-t border-[#e2ddd3]">
              <label className="block text-[13.5px] font-bold text-[#04092b]">
                Bộ Sưu Tập Ảnh Dưới Khối Văn Phòng (3 Thẻ)
              </label>
              {(office?.galleryCards || [
                { id: 1, image: '/uploads/office_card_1.png', alt: 'Không gian làm việc văn phòng hiện đại' },
                { id: 2, image: '/uploads/office_card_2.png', alt: 'Khu vực làm việc cá nhân & tiếp khách' },
                { id: 3, image: '/uploads/office_card_3.png', alt: 'Module bàn làm việc linh hoạt' }
              ]).map((card, cIdx) => (
                <div key={cIdx} className="p-3 bg-[#faf8f5] rounded-xl border border-[#e2ddd3] space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#e2ddd3] bg-black/10 shrink-0">
                      <Image
                        src={card.image || '/uploads/office_card_1.png'}
                        alt={card.alt || `Card ${cIdx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={card.image || ''}
                          onChange={(e) => {
                            const next = [...(office?.galleryCards || [
                              { id: 1, image: '/uploads/office_card_1.png', alt: 'Không gian làm việc văn phòng hiện đại' },
                              { id: 2, image: '/uploads/office_card_2.png', alt: 'Khu vực làm việc cá nhân & tiếp khách' },
                              { id: 3, image: '/uploads/office_card_3.png', alt: 'Module bàn làm việc linh hoạt' }
                            ])];
                            next[cIdx] = { ...next[cIdx], image: e.target.value };
                            setData({ ...data, office: { ...office, galleryCards: next } });
                          }}
                          className="flex-1 p-2 border border-[#e2ddd3] rounded-lg text-[12px] font-mono focus:border-[#c5a26c] focus:outline-none"
                          placeholder="Đường dẫn ảnh"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            openMediaPicker(`Chọn ảnh thẻ #${cIdx + 1}`, (url) => {
                              const next = [...(office?.galleryCards || [
                                { id: 1, image: '/uploads/office_card_1.png', alt: 'Không gian làm việc văn phòng hiện đại' },
                                { id: 2, image: '/uploads/office_card_2.png', alt: 'Khu vực làm việc cá nhân & tiếp khách' },
                                { id: 3, image: '/uploads/office_card_3.png', alt: 'Module bàn làm việc linh hoạt' }
                              ])];
                              next[cIdx] = { ...next[cIdx], image: url };
                              setData({ ...data, office: { ...office, galleryCards: next } });
                            })
                          }
                          className="px-3 py-2 bg-white hover:bg-[#c5a26c] hover:text-[#04092b] text-[#04092b] text-[12px] font-bold rounded-lg transition-colors shrink-0 border border-[#e2ddd3]"
                        >
                          <ImageIcon className="w-3.5 h-3.5 inline mr-1" /> Chọn
                        </button>
                      </div>
                      <input
                        type="text"
                        value={card.alt || ''}
                        onChange={(e) => {
                          const next = [...(office?.galleryCards || [
                            { id: 1, image: '/uploads/office_card_1.png', alt: 'Không gian làm việc văn phòng hiện đại' },
                            { id: 2, image: '/uploads/office_card_2.png', alt: 'Khu vực làm việc cá nhân & tiếp khách' },
                            { id: 3, image: '/uploads/office_card_3.png', alt: 'Module bàn làm việc linh hoạt' }
                          ])];
                          next[cIdx] = { ...next[cIdx], alt: e.target.value };
                          setData({ ...data, office: { ...office, galleryCards: next } });
                        }}
                        className="w-full p-2 border border-[#e2ddd3] rounded-lg text-[12px] focus:border-[#c5a26c] focus:outline-none"
                        placeholder="Mô tả / Alt text cho ảnh"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Live Preview Workstation */}
          <div className={`${previewLayout === 'full' ? 'lg:col-span-12' : 'lg:col-span-7'} static lg:sticky lg:top-6 space-y-4 transition-all`}>
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#e2ddd3] shadow-sm">
              <span className="text-[13.5px] font-bold text-[#04092b] uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#c5a26c]" /> Live Preview: Nội Thất Văn Phòng
              </span>
              <div className="flex items-center flex-wrap gap-2">
                {/* Layout Toggle */}
                <button
                  type="button"
                  onClick={() => setPreviewLayout(previewLayout === 'split' ? 'full' : 'split')}
                  className="px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all flex items-center gap-1.5 border border-[#e2ddd3] bg-[#faf8f5] hover:bg-[#e2ddd3] text-[#04092b]"
                  title={previewLayout === 'split' ? 'Mở rộng khung xem thử toàn màn hình' : 'Thu nhỏ về chế độ 2 cột'}
                >
                  {previewLayout === 'split' ? <Maximize2 className="w-3.5 h-3.5 text-[#c5a26c]" /> : <Minimize2 className="w-3.5 h-3.5" />}
                  <span>{previewLayout === 'split' ? '⛶ Mở Rộng' : '◫ Chia Đôi'}</span>
                </button>

                {/* Preview Zoom Controls */}
                <div className="flex items-center gap-1 bg-[#f4f1ea] px-2 py-1 rounded-xl border border-[#e2ddd3]">
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((prev) => Math.max(0.7, parseFloat((prev - 0.1).toFixed(2))))}
                    className="p-1 hover:bg-white rounded text-[#04092b]"
                    title="Thu nhỏ preview"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-bold text-[#04092b] px-1">
                    {Math.round(previewZoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((prev) => Math.min(1.4, parseFloat((prev + 0.1).toFixed(2))))}
                    className="p-1 hover:bg-white rounded text-[#04092b]"
                    title="Phóng to preview"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-3 py-1.5 rounded-xl text-[12.5px] font-bold transition-all flex items-center gap-1.5 ${
                    previewDevice === 'desktop'
                      ? 'bg-[#04092b] text-[#c5a26c] shadow-sm'
                      : 'bg-[#f4f1ea] text-[#6e706a] hover:text-[#04092b]'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop (1440px)
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-3 py-1.5 rounded-xl text-[12.5px] font-bold transition-all flex items-center gap-1.5 ${
                    previewDevice === 'mobile'
                      ? 'bg-[#04092b] text-[#c5a26c] shadow-sm'
                      : 'bg-[#f4f1ea] text-[#6e706a] hover:text-[#04092b]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile (390px)
                </button>
                <button
                  type="button"
                  onClick={() => setFullscreenPreviewSection('office')}
                  className="p-2 rounded-xl bg-[#f4f1ea] hover:bg-[#c5a26c] text-[#04092b] transition-colors"
                  title="Phóng to toàn màn hình"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {previewDevice === 'desktop' ? (
              <div
                style={{
                  transform: previewZoom !== 1 ? `scale(${previewZoom})` : undefined,
                  transformOrigin: 'top center',
                  transition: 'transform 0.15s ease-out'
                }}
                className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-[#c5a26c] shadow-2xl min-h-[660px] sm:min-h-[720px] space-y-7 flex flex-col justify-center"
              >
                <div className="relative w-full h-[280px] rounded-2xl overflow-hidden border border-[#e2ddd3] shadow-md">
                  <Image
                    src={office?.heroImage || '/uploads/office_hero_main.png'}
                    alt="Office Hero Live Preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                    <span className="text-white text-[13.5px] font-bold bg-[#04092b]/80 px-3.5 py-1.5 rounded-lg border border-[#c5a26c]/40">
                      Không Gian Giám Đốc Cao Cấp
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="text-[11px] font-bold text-[#c5a26c] uppercase tracking-widest font-accent">
                    {office?.tag || 'VĂN PHÒNG DOANH NGHIỆP'}
                  </span>
                  <h4 className="text-[28px] font-bold text-[#04092b] font-display">
                    {office?.headingLine1} {office?.headingLine2}
                  </h4>
                  <p className="text-[14.5px] text-[#5f6361] leading-relaxed line-clamp-3">{office?.description}</p>
                </div>

                {/* Color Swatches Preview */}
                <div className="flex items-center gap-2 pt-1">
                  {(office?.colorSwatches || [
                    { color: '#e5dfd7', label: 'Sand Cream' },
                    { color: '#8c7b6c', label: 'Earthy Taupe' },
                    { color: '#395224', label: 'Forest Sage' },
                    { color: '#d2a679', label: 'Warm Caramel' }
                  ]).map((swatch, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border border-[#e2ddd3] shadow-xs"
                      style={{ backgroundColor: swatch.color }}
                      title={swatch.label}
                    />
                  ))}
                </div>

                {/* 3 Gallery Cards Preview */}
                <div className="grid grid-cols-3 gap-3.5 pt-3 border-t border-[#e2ddd3]">
                  {(office?.galleryCards || [
                    { id: 1, image: '/uploads/office_card_1.png', alt: 'Không gian làm việc văn phòng hiện đại' },
                    { id: 2, image: '/uploads/office_card_2.png', alt: 'Khu vực làm việc cá nhân & tiếp khách' },
                    { id: 3, image: '/uploads/office_card_3.png', alt: 'Module bàn làm việc linh hoạt' }
                  ]).map((card, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-[#e2ddd3] bg-[#faf8f5] p-2.5 shadow-xs">
                      <div className="relative w-full h-[105px] rounded-lg overflow-hidden bg-black/10">
                        <Image src={card.image || '/uploads/office_card_1.png'} alt={card.alt || `Card ${i + 1}`} fill className="object-cover" />
                      </div>
                      <p className="text-[12px] font-bold text-[#04092b] mt-2 truncate">{card.alt || `Ảnh #${i + 1}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Mobile Viewport — Large iPhone Frame */
              <div className="w-full flex justify-center py-6 bg-[#1a1c29]/5 rounded-3xl border border-[#e2ddd3] overflow-x-auto">
                <div
                  style={{
                    transform: previewZoom !== 1 ? `scale(${previewZoom})` : undefined,
                    transformOrigin: 'top center',
                    transition: 'transform 0.15s ease-out'
                  }}
                  className="w-[390px] sm:w-[420px] min-h-[780px] sm:min-h-[840px] bg-white text-[#04092b] rounded-[48px] shadow-2xl border-[10px] border-[#222738] relative overflow-hidden flex flex-col justify-between p-7 sm:p-8"
                >
                  <div className="w-28 h-4 bg-black rounded-full mx-auto mb-4 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#1a1a1a] mr-2" />
                    <div className="w-10 h-1.5 bg-[#252525] rounded-full" />
                  </div>

                  <div className="space-y-4 flex-1">
                    <div className="relative w-full h-[180px] rounded-2xl overflow-hidden shadow-sm border border-[#e2ddd3]">
                      <Image
                        src={office?.heroImage || '/uploads/office_hero_main.png'}
                        alt="Office Mobile Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[10.5px] font-bold text-[#c5a26c] uppercase tracking-wider block">
                      {office?.tag || 'CÁC SẢN PHẨM ĐẶC BIỆT'}
                    </span>
                    <h4 className="text-[20px] font-bold font-display">
                      {office?.headingLine1} {office?.headingLine2}
                    </h4>
                    <p className="text-[12.5px] text-[#6e706a] line-clamp-3 leading-relaxed">{office?.description}</p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#e2ddd3]">
                      {(office?.galleryCards || [
                        { id: 1, image: '/uploads/office_card_1.png', alt: 'Không gian làm việc văn phòng hiện đại' },
                        { id: 2, image: '/uploads/office_card_2.png', alt: 'Khu vực làm việc cá nhân & tiếp khách' },
                      ]).slice(0, 2).map((card, i) => (
                        <div key={i} className="rounded-xl overflow-hidden border border-[#e2ddd3] bg-[#faf8f5] p-2">
                          <div className="relative w-full h-[75px] rounded-lg overflow-hidden">
                            <Image src={card.image || '/uploads/office_card_1.png'} alt={card.alt || `Card ${i + 1}`} fill className="object-cover" />
                          </div>
                          <p className="text-[11px] font-bold text-[#04092b] mt-1 truncate">{card.alt || `Ảnh #${i + 1}`}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 7: Thương Hiệu & Cài Đặt (Settings) */}
      {activeTab === 'settings' && (
        <div className="bg-white p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-[#e2ddd3] shadow-sm max-w-4xl space-y-6">
          <h3 className="font-bold text-[20px] text-[#04092b] border-b border-[#e2ddd3] pb-4 flex items-center gap-2.5">
            <Building className="w-5 h-5 text-[#c5a26c]" /> Thông Tin Thương Hiệu &amp; Cài Đặt Chung
          </h3>

          {/* Logo */}
          <div className="space-y-2">
            <label className="block text-[13.5px] font-bold text-[#04092b]">
              Logo Thương Hiệu (Header &amp; Footer)
            </label>
            <div className="flex items-center gap-3">
              <div className="relative w-36 h-14 rounded-xl overflow-hidden border border-[#e2ddd3] bg-[#04092b] p-2 shrink-0 shadow-sm flex items-center justify-center">
                <Image
                  src={settings?.logo || '/uploads/logo-dong-hoa-property.png'}
                  alt="Logo Preview"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <input
                type="text"
                value={settings?.logo || ''}
                onChange={(e) => setData({ ...data, settings: { ...settings, logo: e.target.value } })}
                className="flex-1 p-3 border border-[#e2ddd3] rounded-xl text-[13px] font-mono focus:border-[#c5a26c] focus:outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  openMediaPicker('Chọn Logo thương hiệu', (url) => {
                    setData({ ...data, settings: { ...settings, logo: url } });
                  })
                }
                className="px-4 py-3 bg-[#f4f1ea] hover:bg-[#c5a26c] hover:text-[#04092b] text-[#04092b] text-[13px] font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0 border border-[#e2ddd3]"
              >
                <ImageIcon className="w-4 h-4" /> Đổi Logo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Tên Website (Site Name)</label>
              <input
                type="text"
                value={settings?.siteName || ''}
                onChange={(e) => setData({ ...data, settings: { ...settings, siteName: e.target.value } })}
                className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] font-bold focus:border-[#c5a26c] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Tên Thương Hiệu (Brand Name)</label>
              <input
                type="text"
                value={settings?.brandName || ''}
                onChange={(e) => setData({ ...data, settings: { ...settings, brandName: e.target.value } })}
                className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] font-bold focus:border-[#c5a26c] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Khẩu Hiệu (Tagline)</label>
              <input
                type="text"
                value={settings?.siteTagline || ''}
                onChange={(e) => setData({ ...data, settings: { ...settings, siteTagline: e.target.value } })}
                className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] focus:border-[#c5a26c] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Hotline Liên Hệ</label>
              <input
                type="text"
                value={settings?.hotline || ''}
                onChange={(e) => setData({ ...data, settings: { ...settings, hotline: e.target.value } })}
                className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] focus:border-[#c5a26c] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Email Công Ty</label>
              <input
                type="email"
                value={settings?.email || ''}
                onChange={(e) => setData({ ...data, settings: { ...settings, email: e.target.value } })}
                className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] focus:border-[#c5a26c] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Website Chính Thức</label>
              <input
                type="text"
                value={settings?.website || ''}
                onChange={(e) => setData({ ...data, settings: { ...settings, website: e.target.value } })}
                className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] focus:border-[#c5a26c] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Địa Chỉ Trụ Sở Văn Phòng</label>
              <input
                type="text"
                value={settings?.address || ''}
                onChange={(e) => setData({ ...data, settings: { ...settings, address: e.target.value } })}
                className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] focus:border-[#c5a26c] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Mô Tả Chân Trang / Giới Thiệu Chân Trang (Footer)</label>
            <textarea
              rows={3}
              value={settings?.siteDescription || ''}
              onChange={(e) => setData({ ...data, settings: { ...settings, siteDescription: e.target.value } })}
              className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] focus:border-[#c5a26c] focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-[13.5px] font-bold text-[#04092b] mb-1.5">Dòng Bản Quyền Footer</label>
            <input
              type="text"
              value={settings?.copyright || ''}
              onChange={(e) => setData({ ...data, settings: { ...settings, copyright: e.target.value } })}
              className="w-full p-3 border border-[#e2ddd3] rounded-xl text-[14px] focus:border-[#c5a26c] focus:outline-none"
            />
          </div>

          {/* Navigation Links Editor */}
          <div className="space-y-3 pt-3 border-t border-[#e2ddd3]">
            <div className="flex items-center justify-between">
              <label className="block text-[13.5px] font-bold text-[#04092b]">
                Menu Thanh Điều Hướng (Navbar Links)
              </label>
              <button
                type="button"
                onClick={() => {
                  const current = settings?.navLinks || [
                    { label: 'Giới thiệu', url: '#about' },
                    { label: 'Phong cách thiết kế', url: '#styles' },
                    { label: 'Thi công', url: '#about' },
                    { label: 'Tin tức', url: '/blog' },
                    { label: 'Liên hệ', url: '#contact' }
                  ];
                  setData({
                    ...data,
                    settings: {
                      ...settings,
                      navLinks: [...current, { label: 'Mục mới', url: '#' }]
                    }
                  });
                }}
                className="px-2.5 py-1 bg-[#f4f1ea] hover:bg-[#c5a26c] hover:text-[#04092b] text-[#04092b] text-[12px] font-bold rounded-lg border border-[#e2ddd3] transition-colors"
              >
                + Thêm Menu
              </button>
            </div>
            <div className="space-y-2">
              {(settings?.navLinks || [
                { label: 'Giới thiệu', url: '#about' },
                { label: 'Phong cách thiết kế', url: '#styles' },
                { label: 'Thi công', url: '#about' },
                { label: 'Tin tức', url: '/blog' },
                { label: 'Liên hệ', url: '#contact' }
              ]).map((link, lIdx) => (
                <div key={lIdx} className="flex items-center gap-2 p-2 bg-[#faf8f5] rounded-xl border border-[#e2ddd3]">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => {
                      const next = [...(settings?.navLinks || [
                        { label: 'Giới thiệu', url: '#about' },
                        { label: 'Phong cách thiết kế', url: '#styles' },
                        { label: 'Thi công', url: '#about' },
                        { label: 'Tin tức', url: '/blog' },
                        { label: 'Liên hệ', url: '#contact' }
                      ])];
                      next[lIdx] = { ...next[lIdx], label: e.target.value };
                      setData({ ...data, settings: { ...settings, navLinks: next } });
                    }}
                    className="w-1/2 p-2 border border-[#e2ddd3] rounded-lg text-[13px] font-medium focus:border-[#c5a26c] focus:outline-none"
                    placeholder="Tên mục menu"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => {
                      const next = [...(settings?.navLinks || [
                        { label: 'Giới thiệu', url: '#about' },
                        { label: 'Phong cách thiết kế', url: '#styles' },
                        { label: 'Thi công', url: '#about' },
                        { label: 'Tin tức', url: '/blog' },
                        { label: 'Liên hệ', url: '#contact' }
                      ])];
                      next[lIdx] = { ...next[lIdx], url: e.target.value };
                      setData({ ...data, settings: { ...settings, navLinks: next } });
                    }}
                    className="flex-1 p-2 border border-[#e2ddd3] rounded-lg text-[13px] font-mono focus:border-[#c5a26c] focus:outline-none"
                    placeholder="#anchor hoặc /duong-dan"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const next = (settings?.navLinks || [
                        { label: 'Giới thiệu', url: '#about' },
                        { label: 'Phong cách thiết kế', url: '#styles' },
                        { label: 'Thi công', url: '#about' },
                        { label: 'Tin tức', url: '/blog' },
                        { label: 'Liên hệ', url: '#contact' }
                      ]).filter((_, i) => i !== lIdx);
                      setData({ ...data, settings: { ...settings, navLinks: next } });
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    title="Xóa mục"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Preview Lightbox Modal */}
      {fullscreenPreviewSection && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-6xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#e2ddd3]">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#e2ddd3] flex items-center justify-between bg-[#faf8f5]">
              <div className="flex items-center gap-3">
                <span className="text-[14px] font-bold text-[#04092b] uppercase tracking-wider flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#c5a26c]" /> Phóng To Live Preview:{' '}
                  {fullscreenPreviewSection.toUpperCase()}
                </span>
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#e2ddd3]">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-3 py-1 text-[12px] font-bold rounded-lg ${
                      previewDevice === 'desktop' ? 'bg-[#04092b] text-[#c5a26c]' : 'text-[#6e706a]'
                    }`}
                  >
                    Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-3 py-1 text-[12px] font-bold rounded-lg ${
                      previewDevice === 'mobile' ? 'bg-[#04092b] text-[#c5a26c]' : 'text-[#6e706a]'
                    }`}
                  >
                    Mobile
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFullscreenPreviewSection(null)}
                className="w-9 h-9 rounded-full bg-white border border-[#e2ddd3] hover:bg-[#04092b] hover:text-white flex items-center justify-center font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body with Full Resolution Preview */}
            <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-[#f4f1ea] flex items-center justify-center">
              {fullscreenPreviewSection === 'hero' && (
                <div className="w-full max-w-5xl">
                  {previewDevice === 'desktop' ? (
                    <div className="relative w-full min-h-[520px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#c5a26c] bg-[#04092b] text-white p-12 flex flex-col justify-between">
                      {hero?.slides?.[heroSlideIndex]?.backgroundImage && (
                        <Image
                          src={hero.slides[heroSlideIndex].backgroundImage!}
                          alt="Hero Fullscreen"
                          fill
                          className="object-cover opacity-50"
                        />
                      )}
                      <div className="relative z-10 space-y-3">
                        <span className="text-[12px] font-bold text-[#c5a26c] uppercase tracking-widest bg-black/50 px-3.5 py-1 rounded-lg border border-[#c5a26c]/30 inline-block font-accent">
                          {hero?.slides?.[heroSlideIndex]?.tag || 'THIẾT KẾ NỘI THẤT CAO CẤP'}
                        </span>
                        <div className="text-[44px] font-serif font-bold text-[#c5a26c] leading-tight">
                          <span className="text-[68px] font-serif italic mr-3 text-[#c5a26c]">
                            {hero?.slides?.[heroSlideIndex]?.monogram}
                          </span>
                          <span className="font-display text-white">{hero?.slides?.[heroSlideIndex]?.line1}</span>
                        </div>
                        {hero?.slides?.[heroSlideIndex]?.line2 && (
                          <p className="text-[32px] font-bold text-white/90 font-display">
                            {hero?.slides?.[heroSlideIndex]?.line2}
                          </p>
                        )}
                      </div>
                      <div className="relative z-10 space-y-4 pt-8">
                        <p className="text-[16px] text-white/85 max-w-2xl leading-relaxed">
                          {hero?.slides?.[heroSlideIndex]?.description}
                        </p>
                        <button className="bg-[#c5a26c] text-[#04092b] font-bold text-[14px] px-8 py-3 rounded-xl uppercase tracking-wider shadow-xl flex items-center gap-2">
                          <span>{hero?.slides?.[heroSlideIndex]?.buttonText || 'Khám Phá Dự Án'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[360px] mx-auto rounded-[38px] p-4 bg-[#1a1c24] shadow-2xl border-4 border-[#2d3039]">
                      <div className="relative w-full aspect-[9/16] rounded-[26px] overflow-hidden bg-[#04092b] text-white p-6 flex flex-col justify-between">
                        {hero?.slides?.[heroSlideIndex]?.backgroundImage && (
                          <Image
                            src={hero.slides[heroSlideIndex].backgroundImage!}
                            alt="Hero Mobile"
                            fill
                            className="object-cover opacity-50"
                          />
                        )}
                        <div className="relative z-10 space-y-2">
                          <span className="text-[10px] font-bold text-[#c5a26c] uppercase tracking-widest bg-black/50 px-2 py-0.5 rounded">
                            {hero?.slides?.[heroSlideIndex]?.tag}
                          </span>
                          <h4 className="text-[26px] font-serif font-bold text-[#c5a26c]">
                            <span className="text-[36px] italic mr-1">{hero?.slides?.[heroSlideIndex]?.monogram}</span>
                            {hero?.slides?.[heroSlideIndex]?.line1}
                          </h4>
                        </div>
                        <p className="relative z-10 text-[13px] text-white/80 line-clamp-3">
                          {hero?.slides?.[heroSlideIndex]?.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {fullscreenPreviewSection === 'philosophy' && (
                <div className="w-full max-w-5xl bg-[#faf8f5] p-10 rounded-3xl border-2 border-[#c5a26c] shadow-2xl space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-5 relative h-[320px] rounded-2xl overflow-hidden shadow-lg border border-[#e2ddd3]">
                      <Image
                        src={philosophy?.image || '/uploads/figma_philosophy_photo.png'}
                        alt="Philosophy Fullscreen"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:col-span-7 space-y-4">
                      <span className="text-[12px] font-bold text-[#c5a26c] uppercase tracking-widest font-accent">
                        {philosophy?.tag}
                      </span>
                      <h3 className="text-[32px] font-bold text-[#04092b] font-display leading-tight">
                        {philosophy?.heading}
                      </h3>
                      <p className="text-[15px] text-[#5f6361] leading-relaxed">{philosophy?.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {fullscreenPreviewSection === 'contact' && (
                <div className="w-full max-w-5xl bg-[#04092b] text-white p-10 rounded-3xl border-2 border-[#c5a26c] shadow-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-6 space-y-4">
                      <div className="relative w-full h-[280px] rounded-2xl overflow-hidden border border-[#c5a26c]/30 shadow-lg">
                        <Image
                          src={contact?.image || '/uploads/clean_contact_photo.png'}
                          alt="Contact Fullscreen"
                          fill
                          className="object-cover opacity-80"
                        />
                      </div>
                      <h4 className="text-[26px] font-bold font-display">{contact?.heading}</h4>
                      <p className="text-[14px] text-white/80">{contact?.quote}</p>
                    </div>
                    <div className="md:col-span-6 bg-white/10 p-8 rounded-2xl border border-white/15 space-y-4">
                      <h5 className="text-[17px] font-bold text-[#c5a26c] uppercase">Nhận Báo Giá Thiết Kế</h5>
                      <div className="bg-[#2D302E] text-white p-3.5 rounded-full flex items-center justify-between border border-[#c5a26c]/40">
                        <span className="font-bold pl-4">Yêu cầu tư vấn</span>
                        <div className="w-8 h-8 rounded-full bg-[#c5a26c] text-[#04092b] flex items-center justify-center font-bold">
                          →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {fullscreenPreviewSection === 'styles' && (
                <div className="w-full max-w-5xl bg-white p-10 rounded-3xl border-2 border-[#c5a26c] shadow-2xl space-y-6">
                  <h3 className="text-[28px] font-bold text-[#04092b] font-display">{stylesOverview?.heading}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stylesOverview?.styles?.map((st, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden border border-[#e2ddd3] p-3 bg-[#faf8f5]">
                        <div className="relative w-full h-[160px] rounded-xl overflow-hidden">
                          <Image src={st.cardImage} alt={st.name} fill className="object-cover" />
                        </div>
                        <h5 className="font-bold text-[14px] text-[#04092b] mt-2">{st.name}</h5>
                        <p className="text-[12px] text-[#6e706a]">{st.subtitle}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {fullscreenPreviewSection === 'office' && (
                <div className="w-full max-w-5xl bg-white p-10 rounded-3xl border-2 border-[#c5a26c] shadow-2xl space-y-6">
                  <div className="relative w-full h-[280px] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={office?.heroImage || '/uploads/office_hero_main.png'}
                      alt="Office Fullscreen"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-[28px] font-bold text-[#04092b] font-display">
                    {office?.headingLine1} {office?.headingLine2}
                  </h3>
                  <p className="text-[15px] text-[#5f6361] leading-relaxed">{office?.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#e2ddd3] overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#e2ddd3] flex items-center justify-between bg-[#f4f1ea]">
              <div>
                <h3 className="font-bold text-[16px] text-[#04092b] flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#c5a26c]" />
                  {currentMediaTarget?.title || 'Chọn hoặc tải lên hình ảnh'}
                </h3>
                <p className="text-[12px] text-[#6e706a]">
                  Chọn ảnh từ thư viện hoặc tải trực tiếp ảnh mới từ máy tính của bạn vào danh mục.
                </p>
              </div>
              <button
                onClick={() => setIsMediaModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#e2ddd3] hover:bg-[#04092b] hover:text-white flex items-center justify-center text-[14px] font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Direct Image Upload Toolbar with Category Selector */}
            <div className="p-3.5 bg-[#faf8f5] border-b border-[#e2ddd3] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[12px]">
                <span className="font-bold text-[#04092b] uppercase">Tải Ảnh Lên Danh Mục:</span>
                <select
                  value={mediaFilter === 'all' ? 'Asset' : mediaFilter}
                  onChange={(e) => setMediaFilter(e.target.value)}
                  className="p-1.5 bg-white border border-[#e2ddd3] rounded-lg font-bold text-[12px] text-[#04092b] focus:outline-none focus:border-[#c5a26c]"
                >
                  <option value="Asset">🪑 Đồ Nội Thất (Asset)</option>
                  <option value="Styles">🛋️ Phong Cách (Styles)</option>
                  <option value="Hero">🖼️ Hero Slideshow</option>
                  <option value="Philosophy">🧭 Tầm Nhìn & Sứ Mệnh</option>
                  <option value="Contact">💬 Kết Nối & Báo Giá</option>
                  <option value="Office">💼 Nội Thất Văn Phòng</option>
                  <option value="Branding">🏢 Thương Hiệu (Branding)</option>
                </select>
              </div>

              <label className="cursor-pointer bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] px-4 py-1.5 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm">
                <Plus className="w-3.5 h-3.5" />
                <span>+ Tải Ảnh Từ Máy Tính</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (!files || files.length === 0) return;
                    const targetCategory = mediaFilter === 'all' ? 'Asset' : mediaFilter;

                    for (let i = 0; i < files.length; i++) {
                      const file = files[i];
                      const formData = new FormData();
                      formData.append('file', file);
                      formData.append('category', targetCategory);
                      formData.append('altText', file.name.replace(/\.[^/.]+$/, ''));

                      const res = await fetch('/api/media', {
                        method: 'POST',
                        body: formData
                      });
                      if (res.ok) {
                        const newItem = await res.json();
                        setMediaList((prev) => [newItem, ...prev]);
                      }
                    }
                  }}
                />
              </label>
            </div>

            {/* Media Categories Filter */}
            <div className="p-3 border-b border-[#e2ddd3] flex items-center gap-1.5 overflow-x-auto bg-white">
              {[
                { id: 'all', label: 'Tất cả ảnh' },
                { id: 'Asset', label: '🪑 Đồ Nội Thất (Asset)' },
                { id: 'Styles', label: '🛋️ Phong Cách' },
                { id: 'Hero', label: '🖼️ Hero' },
                { id: 'Philosophy', label: '🧭 Tầm Nhìn' },
                { id: 'Contact', label: '💬 Liên Hệ' },
                { id: 'Office', label: '💼 Văn Phòng' },
                { id: 'Branding', label: '🏢 Thương Hiệu' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setMediaFilter(cat.id)}
                  className={`px-3 py-1 rounded-lg text-[11.5px] font-bold whitespace-nowrap transition-all ${
                    mediaFilter === cat.id
                      ? 'bg-[#04092b] text-[#c5a26c] shadow-sm'
                      : 'bg-[#f4f1ea] text-[#6e706a] hover:text-[#04092b]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Media Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 flex-1">
              {mediaList
                .filter((item) => mediaFilter === 'all' || item.category === mediaFilter)
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => selectMediaItem(item.url)}
                    className="group flex flex-col rounded-xl overflow-hidden border border-[#e2ddd3] hover:border-[#c5a26c] hover:shadow-lg transition-all text-left bg-[#faf8f5]"
                  >
                    <div className="relative w-full aspect-square bg-white overflow-hidden p-2">
                      <Image
                        src={item.url}
                        alt={item.altText || item.fileName}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-2.5 space-y-0.5 border-t border-[#e2ddd3]">
                      <p className="text-[11px] font-bold text-[#04092b] line-clamp-1 group-hover:text-[#c5a26c]">
                        {item.altText || item.fileName}
                      </p>
                      <p className="text-[9.5px] text-[#6e706a] font-mono truncate">{item.category || 'Asset'}</p>
                    </div>
                  </button>
                ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#e2ddd3] bg-[#faf8f5] flex justify-between items-center text-[12px] text-[#6e706a]">
              <span>Có {mediaList.length} ảnh trong thư viện Figma</span>
              <button
                onClick={() => setIsMediaModalOpen(false)}
                className="px-4 py-2 bg-white border border-[#e2ddd3] hover:bg-[#e2ddd3] text-[#04092b] font-semibold rounded-lg transition-colors"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
