'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  Image as ImageIcon,
  Plus,
  Filter,
  Eye,
  X,
  ExternalLink,
  Sparkles,
  Download,
  FolderOpen
} from 'lucide-react';
import { MediaItem } from '@/lib/types';
import { useToast } from '@/components/admin/ToastContext';
import ConfirmModal from '@/components/admin/ConfirmModal';
import EmptyState from '@/components/admin/EmptyState';

export default function AdminMediaLibraryPage() {
  const { success, error, info } = useToast();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [uploadCategory, setUploadCategory] = useState<string>('Asset');
  const [isDragOver, setIsDragOver] = useState(false);

  // Detail / Lightbox Modal
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);

  // Delete Confirm Modal
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = () => {
    fetch('/api/media')
      .then((r) => r.json())
      .then((json) => {
        if (Array.isArray(json)) setMedia(json);
      })
      .catch(() => error('Không thể tải danh sách media.'));
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleUploadFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const data = new FormData();
      data.append('file', file);
      data.append('category', uploadCategory);
      data.append('altText', file.name.replace(/\.[^/.]+$/, ''));

      try {
        const res = await fetch('/api/media', {
          method: 'POST',
          body: data
        });
        if (res.ok) successCount++;
      } catch (err) {
        console.error(err);
      }
    }

    setUploading(false);
    if (successCount > 0) {
      success(`Đã tải lên thành công ${successCount} hình ảnh!`);
      loadMedia();
    } else {
      error('Tải ảnh thất bại. Vui lòng thử lại.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleUploadFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      handleUploadFiles(e.dataTransfer.files);
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const res = await fetch(`/api/media?id=${itemToDelete}`, { method: 'DELETE' });
      if (res.ok) {
        setMedia((prev) => prev.filter((m) => m.id !== itemToDelete));
        success('Đã xóa hình ảnh khỏi thư viện.');
        if (activeItem?.id === itemToDelete) {
          setActiveItem(null);
        }
      } else {
        error('Không thể xóa hình ảnh.');
      }
    } catch {
      error('Lỗi khi gửi yêu cầu xóa.');
    } finally {
      setItemToDelete(null);
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    success('Đã sao chép đường dẫn ảnh vào Clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    { id: 'all', label: 'Tất cả ảnh' },
    { id: 'Asset', label: '🪑 Đồ Nội Thất (Asset)' },
    { id: 'Styles', label: '🛋️ Phong Cách (Styles)' },
    { id: 'Hero', label: '🖼️ Hero Slideshow' },
    { id: 'Philosophy', label: '🧭 Tầm Nhìn & Sứ Mệnh' },
    { id: 'Contact', label: '💬 Kết Nối & Báo Giá' },
    { id: 'Office', label: '💼 Nội Thất Văn Phòng' },
    { id: 'Branding', label: '🏢 Thương Hiệu' }
  ];

  const filtered = media.filter((m) => {
    const matchSearch =
      (m.fileName && m.fileName.toLowerCase().includes(search.toLowerCase())) ||
      (m.altText && m.altText.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = selectedCategory === 'all' || m.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-4 sm:space-y-5 max-w-[1440px] mx-auto pb-8 text-[12.5px]">
      {/* Header & Upload Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#e2ddd3] shadow-2xs">
        <div className="space-y-1 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#faf8f5] border border-[#e2ddd3] text-[#c5a26c] text-[10.5px] font-bold uppercase tracking-wider font-accent">
            <ImageIcon className="w-3 h-3" /> Thư Viện Media
          </div>
          <h1 className="text-[18px] sm:text-[22px] font-bold text-[#04092b] font-display">
            Kho Tài Nguyên Hình Ảnh &amp; Asset
          </h1>
          <p className="text-[12px] text-[#6e706a] leading-relaxed">
            Tải lên và phân loại hình ảnh theo khối trang chủ hoặc bài viết blog.
          </p>
        </div>

        {/* Upload Action Group */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-[#faf8f5] p-2 rounded-xl border border-[#e2ddd3] shrink-0">
          <div className="space-y-0.5">
            <span className="text-[9.5px] font-bold text-[#6e706a] uppercase block">
              Gắn vào danh mục:
            </span>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="w-full sm:w-44 p-1.5 bg-white border border-[#e2ddd3] rounded-lg font-bold text-[12px] text-[#04092b] focus:border-[#c5a26c] focus:outline-none"
            >
              <option value="Asset">🪑 Đồ Nội Thất (Asset)</option>
              <option value="Styles">🛋️ Phong Cách (Styles)</option>
              <option value="Hero">🖼️ Hero Slideshow</option>
              <option value="Philosophy">🧭 Tầm Nhìn &amp; Sứ Mệnh</option>
              <option value="Contact">💬 Kết Nối &amp; Báo Giá</option>
              <option value="Office">💼 Nội Thất Văn Phòng</option>
              <option value="Branding">🏢 Thương Hiệu</option>
            </select>
          </div>

          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="sm:self-end px-3.5 py-2 bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] font-bold text-[12px] rounded-lg transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{uploading ? 'Đang Tải...' : 'Tải Ảnh Mới'}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Drag & Drop Quick Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`p-4 sm:p-5 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1.5 ${
          isDragOver
            ? 'border-[#c5a26c] bg-[#c5a26c]/10 scale-[1.01]'
            : 'border-[#e2ddd3] bg-white hover:border-[#c5a26c] hover:bg-[#faf8f5]'
        }`}
      >
        <div className="w-9 h-9 rounded-xl bg-[#faf8f5] border border-[#e2ddd3] flex items-center justify-center text-[#c5a26c]">
          <Upload className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-[13px] text-[#04092b]">
            Kéo và thả ảnh vào đây để tải lên nhanh
          </h3>
          <p className="text-[11px] text-[#6e706a]">
            Hỗ trợ PNG, JPG, WEBP, SVG
          </p>
        </div>
      </div>

      {/* Filter Category Tabs & Search */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-[11.5px] font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#04092b] text-[#c5a26c] border-[#04092b] shadow-2xs'
                  : 'bg-white text-[#04092b] border-[#e2ddd3] hover:bg-[#faf8f5]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[9.5px] px-1.5 py-0.2 rounded font-mono font-bold ${
                  selectedCategory === cat.id ? 'bg-[#c5a26c] text-[#04092b]' : 'bg-[#faf8f5] text-[#6e706a]'
                }`}
              >
                {cat.id === 'all'
                  ? media.length
                  : media.filter((m) => m.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white p-2.5 sm:p-3 border border-[#e2ddd3] shadow-2xs rounded-xl flex items-center gap-2.5">
          <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm hình ảnh theo tên file hoặc mô tả..."
            className="w-full text-[12px] focus:outline-none bg-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-gray-400 hover:text-gray-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Media Gallery Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="Không tìm thấy hình ảnh phù hợp"
          description={
            search
              ? `Không có kết quả nào khớp với từ khóa "${search}".`
              : 'Chưa có ảnh nào trong danh mục này. Hãy tải lên ảnh đầu tiên!'
          }
          actionText="Tải Ảnh Ngay"
          onAction={() => fileInputRef.current?.click()}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#e2ddd3] hover:border-[#c5a26c] shadow-2xs hover:shadow-xs rounded-xl group overflow-hidden flex flex-col justify-between transition-all"
            >
              {/* Image Preview Thumbnail */}
              <div
                onClick={() => setActiveItem(item)}
                className="relative h-28 sm:h-36 bg-[#faf8f5] overflow-hidden p-2 border-b border-[#e2ddd3] flex items-center justify-center cursor-pointer"
              >
                <Image
                  src={item.url}
                  alt={item.altText || item.fileName || 'Media image'}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300 p-1.5"
                />

                {/* Category Badge */}
                <span className="absolute top-1.5 left-1.5 text-[8.5px] font-bold text-[#04092b] bg-white/90 px-1.5 py-0.2 rounded shadow-2xs border border-[#e2ddd3]">
                  {item.category || 'Asset'}
                </span>

                {/* Hover Quick Zoom Trigger */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveItem(item);
                    }}
                    className="p-1.5 bg-white rounded-lg text-[#04092b] hover:bg-[#c5a26c] transition-colors shadow-xs"
                    title="Xem chi tiết"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyUrl(item.url, item.id);
                    }}
                    className="p-1.5 bg-white rounded-lg text-[#04092b] hover:bg-[#c5a26c] transition-colors shadow-xs"
                    title="Sao chép URL"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Meta & Bottom Controls */}
              <div className="p-2.5 space-y-1.5">
                <p
                  className="text-[11.5px] font-bold text-[#04092b] truncate"
                  title={item.altText || item.fileName}
                >
                  {item.altText || item.fileName}
                </p>

                <div className="flex items-center justify-between text-[9.5px] text-[#6e706a] font-mono">
                  <span className="truncate max-w-[80px]">{item.fileName}</span>
                  <span>{item.uploadedAt || 'Ready'}</span>
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-[#e2ddd3]">
                  <button
                    type="button"
                    onClick={() => copyUrl(item.url, item.id)}
                    className="text-[10.5px] font-bold text-[#c5a26c] hover:underline flex items-center gap-1"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-green-600" /> <span>Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> <span>Chép URL</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setItemToDelete(item.id)}
                    className="text-red-400 hover:text-red-600 p-0.5 transition-colors"
                    title="Xóa hình ảnh"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Detail Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row border border-[#e2ddd3]">
            {/* Preview Left */}
            <div className="relative w-full md:w-3/5 h-60 md:h-auto bg-[#faf8f5] p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#e2ddd3]">
              <Image
                src={activeItem.url}
                alt={activeItem.altText || activeItem.fileName}
                fill
                className="object-contain p-3"
              />
            </div>

            {/* Info Right */}
            <div className="w-full md:w-2/5 p-4 sm:p-5 flex flex-col justify-between space-y-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#e2ddd3] pb-2">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#c5a26c] font-accent">
                    Chi Tiết Hình Ảnh
                  </span>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="p-1 text-gray-400 hover:text-black rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#6e706a] uppercase">Tên Tệp</label>
                  <p className="font-bold text-[12.5px] text-[#04092b] break-all">{activeItem.fileName}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#6e706a] uppercase">Danh Mục</label>
                  <p className="text-[12px] font-bold text-[#04092b]">{activeItem.category || 'Asset'}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#6e706a] uppercase">Đường Dẫn URL</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      readOnly
                      value={activeItem.url}
                      className="w-full p-2 bg-[#faf8f5] border border-[#e2ddd3] rounded-lg text-[11px] font-mono text-[#04092b]"
                    />
                    <button
                      type="button"
                      onClick={() => copyUrl(activeItem.url, activeItem.id)}
                      className="px-2.5 py-2 bg-[#04092b] text-white hover:bg-[#c5a26c] hover:text-[#04092b] font-bold text-[11px] rounded-lg transition-all shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#e2ddd3]">
                <a
                  href={activeItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11.5px] font-bold text-[#c5a26c] hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Mở tab mới
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setItemToDelete(activeItem.id);
                  }}
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold text-[11px] rounded-lg transition-all"
                >
                  Xóa Ảnh
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!itemToDelete}
        isDestructive={true}
        title="Xác nhận xóa hình ảnh"
        message="Hành động này sẽ xóa tệp ảnh khỏi thư viện."
        confirmText="Xóa Ảnh"
        cancelText="Hủy"
        onConfirm={confirmDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
}
