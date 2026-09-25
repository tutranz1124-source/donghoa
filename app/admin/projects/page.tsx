'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Search,
  Star,
  ArrowUp,
  ArrowDown,
  LayoutGrid,
  Table as TableIcon,
  Check,
  X,
  ExternalLink,
  ImageIcon,
  Upload,
  RefreshCw,
  Sparkles,
  Layers,
  MapPin,
  Building,
  DollarSign
} from 'lucide-react';
import { ProjectItem, MediaItem } from '@/lib/types';
import { useToast } from '@/components/admin/ToastContext';
import ConfirmModal from '@/components/admin/ConfirmModal';

const CATEGORY_OPTIONS = [
  { key: 'can-ho', label: '01 / Căn Hộ Hạng Sang & Penthouse' },
  { key: 'biet-thu', label: '02 / Biệt Thự & Nhà Phố Đô Thị' },
  { key: 'nghi-duong', label: '03 / Bất Động Sản Nghỉ Dưỡng' },
  { key: 'thuong-mai', label: '04 / Shophouse & Thương Mại' }
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [featuredFilter, setFeaturedFilter] = useState<'all' | 'featured' | 'standard'>('all');

  // Modal states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<ProjectItem>>({
    name: '',
    title: '',
    category: 'can-ho',
    developer: '',
    investor: '',
    location: '',
    area: '',
    scale: '',
    priceRange: '',
    price: '',
    propertyTypes: '',
    description: '',
    image: '/uploads/the-gio-riverside.png',
    featured: false
  });

  const { showToast } = useToast();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const [projRes, mediaRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/media')
      ]);

      const projData = await projRes.json();
      const mediaData = await mediaRes.json();

      if (Array.isArray(projData.projects)) {
        setProjects(projData.projects);
      }
      if (Array.isArray(mediaData)) {
        setMediaList(mediaData);
      }
    } catch (err: any) {
      showToast('Lỗi tải dữ liệu', err.message || 'Lỗi khi tải danh sách dự án', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      name: '',
      title: '',
      category: 'can-ho',
      developer: '',
      investor: '',
      location: '',
      area: '',
      scale: '',
      priceRange: '',
      price: '',
      propertyTypes: '',
      description: '',
      image: '/uploads/the-gio-riverside.png',
      featured: false
    });
    setIsEditorOpen(true);
  };

  const openEditModal = (proj: ProjectItem) => {
    setEditingProject(proj);
    setFormData({
      ...proj,
      name: proj.name || proj.title || '',
      title: proj.title || proj.name || '',
      developer: proj.developer || proj.investor || '',
      investor: proj.investor || proj.developer || '',
      priceRange: proj.priceRange || proj.price || '',
      price: proj.price || proj.priceRange || '',
      category: proj.category || 'can-ho'
    });
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.image) {
      showToast('Thiếu thông tin', 'Vui lòng điền tên dự án và chọn hình ảnh', 'error');
      return;
    }

    setSaving(true);
    try {
      const isEdit = Boolean(editingProject?.id);
      const url = '/api/projects';
      const method = isEdit ? 'PUT' : 'POST';
      const payload = isEdit ? { ...formData, id: editingProject!.id } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Lưu thất bại');

      if (isEdit) {
        setProjects((prev) => prev.map((p) => (p.id === data.project.id ? data.project : p)));
        showToast('Đã cập nhật dự án!', 'Dữ liệu đã được lưu & tự động commit vào Source Code.', 'success');
      } else {
        setProjects((prev) => [data.project, ...prev]);
        showToast('Đã tạo dự án mới!', 'Dự án mới đã được lưu vào hệ thống.', 'success');
      }

      setIsEditorOpen(false);
    } catch (err: any) {
      showToast('Lỗi lưu dự án', err.message || 'Lỗi khi lưu dự án', 'error');
    } finally {
      setSaving(false);
    }
  };

  const toggleFeatured = async (project: ProjectItem) => {
    const updated = { ...project, featured: !project.featured };
    try {
      const res = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (!res.ok) throw new Error('Không thể đổi trạng thái');
      setProjects((prev) => prev.map((p) => (p.id === project.id ? updated : p)));
      showToast('Cập nhật trạng thái', `Đã ${updated.featured ? 'đặt làm Dự Án Tâm Điểm' : 'bỏ Tâm điểm'}`, 'success');
    } catch (err: any) {
      showToast('Lỗi cập nhật', err.message, 'error');
    }
  };

  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= projects.length) return;

    const newItems = [...projects];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIdx, 0, moved);

    setProjects(newItems);

    try {
      await fetch('/api/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: newItems })
      });
      showToast('Thành công', 'Đã cập nhật thứ tự hiển thị dự án', 'success');
    } catch {
      showToast('Lỗi', 'Lỗi khi lưu thứ tự', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const res = await fetch(`/api/projects?id=${itemToDelete}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Xóa thất bại');

      setProjects((prev) => prev.filter((p) => p.id !== itemToDelete));
      showToast('Đã xóa', 'Đã xóa dự án khỏi danh mục thành công', 'success');
    } catch (err: any) {
      showToast('Lỗi khi xóa', err.message, 'error');
    } finally {
      setItemToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const nameMatch = (p.name || p.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const devMatch = (p.developer || p.investor || '').toLowerCase().includes(searchQuery.toLowerCase());
    const locMatch = (p.location || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchSearch = nameMatch || devMatch || locMatch;

    const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;

    let matchFeatured = true;
    if (featuredFilter === 'featured') matchFeatured = Boolean(p.featured);
    if (featuredFilter === 'standard') matchFeatured = !p.featured;

    return matchSearch && matchCategory && matchFeatured;
  });

  return (
    <div className="space-y-5 max-w-[1440px] mx-auto pb-12 text-[12.5px]">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-[#e2ddd3] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-lg bg-[#04092b] text-[#c5a26c]">
              <Building2 className="w-5 h-5" />
            </span>
            <h1 className="text-lg font-serif font-medium text-charcoal">Danh Mục Dự Án Trọng Điểm</h1>
          </div>
          <p className="text-xs text-charcoal-600">
            Quản lý các dự án bất động sản cao cấp, phân khúc, khoảng giá, quy mô và hình ảnh đại diện.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchProjects}
            className="p-2.5 rounded-xl border border-[#e2ddd3] hover:bg-[#faf8f5] text-charcoal transition-colors"
            title="Tải lại dữ liệu"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-gold' : ''}`} />
          </button>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 bg-[#04092b] hover:bg-gold hover:text-charcoal text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Dự Án Mới</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-[#e2ddd3] p-4 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm dự án theo tên, chủ đầu tư, vị trí..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#faf8f5] border border-[#e2ddd3] text-xs text-charcoal outline-none focus:border-gold"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              categoryFilter === 'all'
                ? 'bg-[#04092b] text-white'
                : 'bg-[#faf8f5] text-charcoal-600 hover:bg-[#e2ddd3]'
            }`}
          >
            Tất Cả ({projects.length})
          </button>
          {CATEGORY_OPTIONS.map((cat) => {
            const count = projects.filter((p) => p.category === cat.key).length;
            return (
              <button
                key={cat.key}
                onClick={() => setCategoryFilter(cat.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  categoryFilter === cat.key
                    ? 'bg-[#04092b] text-white'
                    : 'bg-[#faf8f5] text-charcoal-600 hover:bg-[#e2ddd3]'
                }`}
              >
                {cat.label.split(' / ')[1]} ({count})
              </button>
            );
          })}
        </div>

        {/* View Mode & Featured Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-[#faf8f5] border border-[#e2ddd3] text-xs text-charcoal outline-none"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="featured">Chỉ Tâm Điểm</option>
            <option value="standard">Tiêu chuẩn</option>
          </select>

          <div className="flex items-center p-1 bg-[#faf8f5] rounded-xl border border-[#e2ddd3]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-charcoal text-white' : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-charcoal text-white' : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content View: Grid or Table */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((proj, idx) => {
            const rawIndex = projects.findIndex((p) => p.id === proj.id);
            const catInfo = CATEGORY_OPTIONS.find((c) => c.key === proj.category);

            return (
              <div
                key={proj.id}
                className="group bg-white rounded-2xl border border-[#e2ddd3] hover:border-gold/60 transition-all overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div className="relative aspect-[16/10] w-full bg-warm-200 overflow-hidden">
                  <Image
                    src={proj.image || proj.imageUrl || '/uploads/the-gio-riverside.png'}
                    alt={proj.name || proj.title || 'Dự án'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {proj.featured && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-[#04092b] text-gold rounded-full text-[10.5px] uppercase font-bold tracking-wider shadow-xs">
                      Tâm Điểm
                    </div>
                  )}
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10.5px] font-semibold text-charcoal border border-[#e2ddd3]">
                    {catInfo?.label.split(' / ')[1] || 'Căn Hộ'}
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-gold uppercase tracking-wider block">
                      {proj.developer || proj.investor || 'Chủ đầu tư uy tín'}
                    </span>
                    <h3 className="font-serif font-medium text-base text-charcoal group-hover:text-gold transition-colors">
                      {proj.name || proj.title}
                    </h3>
                    <p className="text-xs text-charcoal-600 line-clamp-2">
                      {proj.description || `${proj.location} • ${proj.scale || proj.area}`}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#e2ddd3] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-charcoal-muted uppercase block">Mức giá</span>
                      <span className="font-semibold text-charcoal text-xs">
                        {proj.priceRange || proj.price || 'Liên hệ tư vấn'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-charcoal-muted uppercase block">Quy mô</span>
                      <span className="font-semibold text-charcoal text-xs">
                        {proj.scale || proj.area || 'Đang cập nhật'}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 border-t border-[#e2ddd3] flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleFeatured(proj)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                        proj.featured
                          ? 'bg-gold/20 text-gold border border-gold/40'
                          : 'bg-[#faf8f5] text-charcoal-600 hover:bg-[#e2ddd3]'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${proj.featured ? 'fill-gold text-gold' : ''}`} />
                      <span>{proj.featured ? 'Tâm điểm' : 'Đặt tâm điểm'}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(proj)}
                        className="p-1.5 rounded-lg bg-[#faf8f5] hover:bg-gold hover:text-white text-charcoal transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete(proj.id);
                          setDeleteModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-500 hover:text-white text-red-500 transition-colors"
                        title="Xóa dự án"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-[#e2ddd3] overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#faf8f5] border-b border-[#e2ddd3] text-[10.5px] uppercase font-bold text-charcoal-muted tracking-wider">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Dự Án</th>
                <th className="py-3 px-4">Phân Khúc</th>
                <th className="py-3 px-4">Chủ Đầu Tư</th>
                <th className="py-3 px-4">Mức Giá & Quy Mô</th>
                <th className="py-3 px-4 text-center">Tâm Điểm</th>
                <th className="py-3 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2ddd3]/60 text-xs">
              {filteredProjects.map((proj, idx) => {
                const rawIndex = projects.findIndex((p) => p.id === proj.id);
                const catInfo = CATEGORY_OPTIONS.find((c) => c.key === proj.category);

                return (
                  <tr key={proj.id} className="hover:bg-[#faf8f5]/80 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-charcoal-muted">{rawIndex + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-9 rounded-lg overflow-hidden bg-[#04092b] shrink-0">
                          <Image src={proj.image || '/uploads/the-gio-riverside.png'} alt="" fill className="object-cover" />
                        </div>
                        <div>
                          <span className="font-semibold text-charcoal block">{proj.name || proj.title}</span>
                          <span className="text-[11px] text-charcoal-muted">{proj.location}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-[#faf8f5] border border-[#e2ddd3] text-[11px] font-semibold text-charcoal">
                        {catInfo?.label.split(' / ')[1] || 'Căn Hộ'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-charcoal-600">{proj.developer || proj.investor || '—'}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-charcoal">{proj.priceRange || proj.price || 'Liên hệ'}</div>
                      <div className="text-[11px] text-charcoal-muted">{proj.scale || proj.area}</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleFeatured(proj)}
                        className={`p-1 rounded ${proj.featured ? 'text-gold' : 'text-gray-300 hover:text-gold'}`}
                      >
                        <Star className={`w-4 h-4 ${proj.featured ? 'fill-gold' : ''}`} />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                      <button onClick={() => moveOrder(rawIndex, 'up')} disabled={rawIndex === 0} className="p-1 text-gray-500 hover:text-black disabled:opacity-30">
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => moveOrder(rawIndex, 'down')} disabled={rawIndex === projects.length - 1} className="p-1 text-gray-500 hover:text-black disabled:opacity-30">
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => openEditModal(proj)} className="p-1 text-charcoal hover:text-gold">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete(proj.id);
                          setDeleteModalOpen(true);
                        }}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* CREATE / EDIT PROJECT MODAL */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white max-w-2xl w-full rounded-2xl border border-[#e2ddd3] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="bg-[#04092b] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#c5a26c]/30">
              <h3 className="font-serif font-medium text-base text-white">
                {editingProject ? 'Chỉnh Sửa Dự Án Bất Động Sản' : 'Thêm Dự Án Mới'}
              </h3>
              <button onClick={() => setIsEditorOpen(false)} className="text-white/70 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSave} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-charcoal-muted mb-1">
                    Tên Dự Án <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value, title: e.target.value })}
                    placeholder="VD: The Gió Riverside, Grand Marina Saigon..."
                    className="w-full px-3 py-2 bg-white border border-[#e2ddd3] rounded-xl text-xs focus:border-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-charcoal-muted mb-1">
                    Phân Khúc Bất Động Sản <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category || 'can-ho'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#e2ddd3] rounded-xl text-xs focus:border-gold outline-none"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat.key} value={cat.key}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-charcoal-muted mb-1">Chủ Đầu Tư</label>
                  <input
                    type="text"
                    value={formData.developer || ''}
                    onChange={(e) => setFormData({ ...formData, developer: e.target.value, investor: e.target.value })}
                    placeholder="VD: Masterise Homes, An Gia, Vingroup..."
                    className="w-full px-3 py-2 bg-white border border-[#e2ddd3] rounded-xl text-xs focus:border-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-charcoal-muted mb-1">Vị Trí Dự Án</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="VD: Quận 1, TP. Thủ Đức, Cần Giờ..."
                    className="w-full px-3 py-2 bg-white border border-[#e2ddd3] rounded-xl text-xs focus:border-gold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-charcoal-muted mb-1">Mức Giá Dự Kiến</label>
                  <input
                    type="text"
                    value={formData.priceRange || ''}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value, price: e.target.value })}
                    placeholder="VD: Từ 1.8 Tỷ / Căn"
                    className="w-full px-3 py-2 bg-white border border-[#e2ddd3] rounded-xl text-xs focus:border-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-charcoal-muted mb-1">Quy Mô / Tòa Tháp</label>
                  <input
                    type="text"
                    value={formData.scale || ''}
                    onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                    placeholder="VD: 2 Tháp • 40 Tầng"
                    className="w-full px-3 py-2 bg-white border border-[#e2ddd3] rounded-xl text-xs focus:border-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-charcoal-muted mb-1">Diện Tích Căn</label>
                  <input
                    type="text"
                    value={formData.area || ''}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="VD: 45m² - 120m²"
                    className="w-full px-3 py-2 bg-white border border-[#e2ddd3] rounded-xl text-xs focus:border-gold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-charcoal-muted mb-1">Loại Hình Chi Tiết</label>
                <input
                  type="text"
                  value={formData.propertyTypes || ''}
                  onChange={(e) => setFormData({ ...formData, propertyTypes: e.target.value })}
                  placeholder="VD: Căn hộ view sông, Penthouse độc bản, Shophouse khối đế..."
                  className="w-full px-3 py-2 bg-white border border-[#e2ddd3] rounded-xl text-xs focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold text-charcoal-muted mb-1">Mô Tả Chi Tiết Dự Án</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Giới thiệu vị trí đắc địa, tiện ích chuẩn quốc tế, tiêu chuẩn bàn giao..."
                  className="w-full px-3 py-2 bg-white border border-[#e2ddd3] rounded-xl text-xs focus:border-gold outline-none leading-relaxed"
                />
              </div>

              {/* Image Picker */}
              <div>
                <label className="block text-[11px] uppercase font-bold text-charcoal-muted mb-1">
                  Hình Ảnh Đại Diện Dự Án <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-[#04092b] border border-[#e2ddd3] shrink-0">
                    {formData.image ? (
                      <Image src={formData.image} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/40">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      required
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value, imageUrl: e.target.value })}
                      placeholder="/uploads/ten-anh.png hoặc https://..."
                      className="w-full px-3 py-2 bg-white border border-[#e2ddd3] rounded-xl text-xs font-mono focus:border-gold outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setMediaPickerOpen(true)}
                      className="px-3 py-1.5 bg-[#faf8f5] hover:bg-[#e2ddd3] text-charcoal font-semibold text-xs rounded-lg border border-[#e2ddd3] transition-colors flex items-center gap-1.5"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-gold" />
                      <span>Chọn từ Thư viện Hình Ảnh</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Featured Checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-gold focus:ring-gold"
                  />
                  <span className="font-semibold text-xs text-charcoal">
                    Đánh dấu là <strong>Dự Án Tâm Điểm</strong> (Ưu tiên hiển thị card lớn 65% ở đầu danh mục)
                  </span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#e2ddd3] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 bg-white border border-[#e2ddd3] hover:bg-gray-100 font-semibold rounded-xl text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#04092b] hover:bg-gold hover:text-charcoal text-white font-semibold rounded-xl text-xs transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>Lưu Dự Án</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MEDIA PICKER MODAL */}
      {mediaPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white max-w-3xl w-full rounded-2xl border border-[#e2ddd3] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-[#04092b] text-white p-4 flex items-center justify-between">
              <h3 className="font-serif font-medium text-sm text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-gold" /> Chọn Hình Ảnh Cho Dự Án
              </h3>
              <button onClick={() => setMediaPickerOpen(false)} className="text-white/70 hover:text-white">✕</button>
            </div>

            <div className="p-4 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 flex-1">
              {mediaList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setFormData({ ...formData, image: item.url, imageUrl: item.url });
                    setMediaPickerOpen(false);
                  }}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-[#e2ddd3] hover:border-gold hover:ring-2 hover:ring-gold cursor-pointer transition-all"
                >
                  <Image src={item.url} alt={item.altText || item.fileName} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-semibold text-center p-1">
                    Chọn ảnh này
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#faf8f5] border-t border-[#e2ddd3] flex justify-end">
              <button
                onClick={() => setMediaPickerOpen(false)}
                className="px-4 py-1.5 bg-white border border-[#e2ddd3] rounded-xl font-semibold text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Xóa Dự Án"
        message="Bạn có chắc chắn muốn xóa dự án này khỏi danh mục bất động sản?"
        confirmText="Xóa Dự Án"
        isDestructive={true}
        onConfirm={confirmDelete}
        onCancel={() => {
          setItemToDelete(null);
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
}
