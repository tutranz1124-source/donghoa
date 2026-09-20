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
  Building
} from 'lucide-react';
import { ProjectItem, MediaItem } from '@/lib/types';
import { useToast } from '@/components/admin/ToastContext';
import ConfirmModal from '@/components/admin/ConfirmModal';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
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
    developer: '',
    location: '',
    area: '',
    propertyTypes: '',
    image: '/uploads/vinhomes-can-gio.png',
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
      showToast(err.message || 'Lỗi khi tải danh sách dự án', 'error');
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
      developer: '',
      location: '',
      area: '',
      propertyTypes: '',
      image: '/uploads/vinhomes-can-gio.png',
      featured: false
    });
    setIsEditorOpen(true);
  };

  const openEditModal = (proj: ProjectItem) => {
    setEditingProject(proj);
    setFormData({ ...proj });
    setIsEditorOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.image) {
      showToast('Vui lòng điền tên dự án và chọn hình ảnh', 'error');
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
        showToast('Đã cập nhật dự án thành công', 'success');
      } else {
        setProjects((prev) => [data.project, ...prev]);
        showToast('Đã tạo dự án mới thành công', 'success');
      }

      setIsEditorOpen(false);
    } catch (err: any) {
      showToast(err.message || 'Lỗi khi lưu dự án', 'error');
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
      showToast(`Đã ${updated.featured ? 'đặt làm Nổi bật' : 'bỏ Nổi bật'}`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Lỗi cập nhật', 'error');
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
      showToast('Đã cập nhật thứ tự hiển thị', 'success');
    } catch {
      showToast('Lỗi khi lưu thứ tự', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const res = await fetch(`/api/projects?id=${itemToDelete}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Xóa thất bại');

      setProjects((prev) => prev.filter((p) => p.id !== itemToDelete));
      showToast('Đã xóa dự án thành công', 'success');
    } catch (err: any) {
      showToast(err.message || 'Lỗi khi xóa', 'error');
    } finally {
      setItemToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesFeatured =
      featuredFilter === 'all' ||
      (featuredFilter === 'featured' && p.featured) ||
      (featuredFilter === 'standard' && !p.featured);

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      (p.name || p.title || '').toLowerCase().includes(q) ||
      (p.developer && p.developer.toLowerCase().includes(q)) ||
      (p.location && p.location.toLowerCase().includes(q)) ||
      (p.propertyTypes && p.propertyTypes.toLowerCase().includes(q));

    return matchesFeatured && matchesSearch;
  });

  return (
    <div className="space-y-4 max-w-[1440px] mx-auto pb-12 text-[12px] text-[#2d302e]">
      {/* Top Header Card */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#e2ddd3] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#c5a26c]/15 text-[#04092b] text-[10px] font-bold uppercase tracking-wider font-accent mb-1">
            <Building2 className="w-3 h-3 text-[#c5a26c]" /> Quản Lý Danh Mục Bất Động Sản
          </div>
          <h1 className="text-[18px] sm:text-[20px] font-bold text-[#04092b] font-display">
            Danh Sách Dự Án Bất Động Sản
          </h1>
          <p className="text-[11.5px] text-[#6e706a]">
            Thêm mới, sắp xếp thứ tự và gắn cờ dự án nổi bật hiển thị trên website Đông Hòa Property.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchProjects}
            disabled={loading}
            className="px-3 py-1.5 bg-[#faf8f5] hover:bg-[#f4f1ea] border border-[#e2ddd3] text-[#04092b] font-semibold text-[11.5px] rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#c5a26c]' : ''}`} />
            <span>Làm mới</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-3.5 py-1.5 bg-[#c5a26c] hover:bg-[#b5915a] text-[#04092b] font-bold text-[11.5px] rounded-lg transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Dự Án Mới</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-[#e2ddd3] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#faf8f5] p-1 rounded-lg border border-[#e2ddd3]">
          {[
            { key: 'all', label: `Tất cả (${projects.length})` },
            { key: 'featured', label: `Nổi bật (${projects.filter((p) => p.featured).length})` },
            { key: 'standard', label: `Tiêu chuẩn (${projects.filter((p) => !p.featured).length})` }
          ].map((tab) => {
            const active = featuredFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setFeaturedFilter(tab.key as any)}
                className={`px-3 py-1.5 rounded-md text-[11.5px] font-bold transition-all ${
                  active ? 'bg-[#04092b] text-white shadow-xs' : 'text-[#6e706a] hover:text-[#04092b]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search & View Switcher */}
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-[#6e706a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm dự án, chủ đầu tư..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#faf8f5] border border-[#e2ddd3] rounded-lg text-[12px] focus:bg-white focus:outline-none focus:border-[#c5a26c]"
            />
          </div>

          <div className="flex items-center bg-[#faf8f5] border border-[#e2ddd3] p-0.5 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-xs text-[#04092b]' : 'text-[#6e706a]'}`}
              title="Dạng lưới"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-white shadow-xs text-[#04092b]' : 'text-[#6e706a]'}`}
              title="Dạng bảng"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main List */}
      {loading ? (
        <div className="bg-white p-12 rounded-xl border border-[#e2ddd3] flex flex-col items-center justify-center text-center space-y-2">
          <div className="w-8 h-8 border-2 border-[#c5a26c] border-t-transparent rounded-full animate-spin" />
          <p className="text-[12px] font-bold text-[#04092b]">Đang tải danh sách dự án...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-[#e2ddd3] text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#faf8f5] border border-[#e2ddd3] flex items-center justify-center mx-auto text-[#6e706a]">
            <Building2 className="w-6 h-6 text-[#c5a26c]" />
          </div>
          <h3 className="font-bold text-[14px] text-[#04092b]">Không tìm thấy dự án nào</h3>
          <p className="text-[11.5px] text-[#6e706a] max-w-sm mx-auto">
            {searchQuery ? `Không có dự án nào khớp với "${searchQuery}".` : 'Hãy bấm "Thêm Dự Án Mới" để tạo dự án đầu tiên.'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {filteredProjects.map((proj, idx) => {
            const rawIndex = projects.findIndex((p) => p.id === proj.id);
            return (
              <div
                key={proj.id}
                className="bg-white rounded-xl border border-[#e2ddd3] hover:border-[#c5a26c] shadow-2xs hover:shadow-xs transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image Cover */}
                  <div className="relative w-full aspect-[16/10] bg-[#04092b] overflow-hidden">
                    <Image
                      src={proj.image || '/uploads/vinhomes-can-gio.png'}
                      alt={proj.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      {proj.featured && (
                        <span className="bg-[#c5a26c] text-[#04092b] font-bold text-[9.5px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm font-accent uppercase tracking-wider">
                          <Star className="w-2.5 h-2.5 fill-[#04092b]" /> Nổi bật
                        </span>
                      )}
                      {proj.developer && (
                        <span className="bg-black/60 backdrop-blur-xs text-white text-[9.5px] px-2 py-0.5 rounded-full border border-white/20">
                          {proj.developer}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="p-3.5 sm:p-4 space-y-2">
                    <h3 className="font-bold text-[14px] text-[#04092b] group-hover:text-[#c5a26c] transition-colors line-clamp-1">
                      {proj.name}
                    </h3>

                    <div className="space-y-1 text-[11px] text-[#6e706a]">
                      {proj.location && (
                        <p className="flex items-center gap-1 line-clamp-1">
                          <MapPin className="w-3 h-3 text-[#c5a26c] shrink-0" />
                          <span>{proj.location}</span>
                        </p>
                      )}
                      {proj.area && (
                        <p className="flex items-center gap-1 line-clamp-1">
                          <Building className="w-3 h-3 text-[#c5a26c] shrink-0" />
                          <span>{proj.area}</span>
                        </p>
                      )}
                      {proj.propertyTypes && (
                        <p className="text-[#04092b] font-medium pt-1 line-clamp-1">
                          Loại hình: {proj.propertyTypes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-3 bg-[#faf8f5] border-t border-[#e2ddd3] flex items-center justify-between">
                  {/* Order reorder */}
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => moveOrder(rawIndex, 'up')}
                      disabled={rawIndex === 0}
                      className="p-1 hover:bg-white text-[#6e706a] hover:text-[#04092b] rounded disabled:opacity-30"
                      title="Chuyển lên trước"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveOrder(rawIndex, 'down')}
                      disabled={rawIndex === projects.length - 1}
                      className="p-1 hover:bg-white text-[#6e706a] hover:text-[#04092b] rounded disabled:opacity-30"
                      title="Chuyển xuống sau"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleFeatured(proj)}
                      className={`p-1.5 rounded transition-colors ${
                        proj.featured ? 'text-[#c5a26c] hover:bg-[#c5a26c]/20' : 'text-gray-400 hover:text-[#c5a26c]'
                      }`}
                      title={proj.featured ? 'Bỏ nổi bật' : 'Đặt làm nổi bật'}
                    >
                      <Star className={`w-3.5 h-3.5 ${proj.featured ? 'fill-[#c5a26c]' : ''}`} />
                    </button>
                    <button
                      onClick={() => openEditModal(proj)}
                      className="p-1.5 hover:bg-white text-[#04092b] rounded transition-colors"
                      title="Chỉnh sửa dự án"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setItemToDelete(proj.id);
                        setDeleteModalOpen(true);
                      }}
                      className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-700 rounded transition-colors"
                      title="Xóa dự án"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-xl border border-[#e2ddd3] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#faf8f5] border-b border-[#e2ddd3] text-[10.5px] uppercase font-bold text-[#6e706a] tracking-wider font-accent">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Dự Án</th>
                  <th className="py-3 px-4">Chủ Đầu Tư</th>
                  <th className="py-3 px-4">Vị Trí & Quy Mô</th>
                  <th className="py-3 px-4">Loại Hình</th>
                  <th className="py-3 px-4 text-center">Nổi Bật</th>
                  <th className="py-3 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2ddd3]/60 text-[12px]">
                {filteredProjects.map((proj, idx) => {
                  const rawIndex = projects.findIndex((p) => p.id === proj.id);
                  return (
                    <tr key={proj.id} className="hover:bg-[#faf8f5]/80 transition-colors">
                      <td className="py-3 px-4 text-center font-mono text-[#6e706a]">{rawIndex + 1}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-9 rounded overflow-hidden bg-[#04092b] shrink-0">
                            <Image src={proj.image || '/uploads/vinhomes-can-gio.png'} alt={proj.name} fill className="object-cover" />
                          </div>
                          <span className="font-bold text-[#04092b]">{proj.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#6e706a]">{proj.developer || '—'}</td>
                      <td className="py-3 px-4">
                        <div className="text-[#04092b]">{proj.location || '—'}</div>
                        <div className="text-[11px] text-[#6e706a]">{proj.area}</div>
                      </td>
                      <td className="py-3 px-4 text-[#6e706a]">{proj.propertyTypes || '—'}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => toggleFeatured(proj)}
                          className={`p-1 rounded ${proj.featured ? 'text-[#c5a26c]' : 'text-gray-300 hover:text-[#c5a26c]'}`}
                        >
                          <Star className={`w-4 h-4 ${proj.featured ? 'fill-[#c5a26c]' : ''}`} />
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                        <button onClick={() => moveOrder(rawIndex, 'up')} disabled={rawIndex === 0} className="p-1 text-gray-500 hover:text-black disabled:opacity-30">
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => moveOrder(rawIndex, 'down')} disabled={rawIndex === projects.length - 1} className="p-1 text-gray-500 hover:text-black disabled:opacity-30">
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => openEditModal(proj)} className="p-1 text-[#04092b] hover:text-[#c5a26c]">
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
        </div>
      )}

      {/* Create / Edit Project Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white max-w-xl w-full rounded-2xl border border-[#e2ddd3] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#04092b] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#c5a26c]/30">
              <h3 className="font-bold text-[14px] sm:text-[16px]">
                {editingProject ? 'Chỉnh Sửa Dự Án Bất Động Sản' : 'Thêm Dự Án Mới'}
              </h3>
              <button onClick={() => setIsEditorOpen(false)} className="text-white/70 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-4 sm:p-6 overflow-y-auto space-y-3.5 flex-1">
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#6e706a] mb-1">
                  Tên Dự Án <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="VD: Vinhomes Cần Giờ, The Gió Riverside..."
                  className="w-full px-3 py-2 bg-white border border-[#e2ddd3] rounded-lg text-[12.5px] focus:outline-none focus:border-[#c5a26c]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#6e706a] mb-1">Chủ Đầu Tư</label>
                  <input
                    type="text"
                    value={formData.developer || ''}
                    onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                    placeholder="VD: Vingroup, Masterise Homes..."
                    className="w-full px-3 py-2 bg-white border border-[#e2ddd3] rounded-lg text-[12.5px] focus:outline-none focus:border-[#c5a26c]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#6e706a] mb-1">Vị Trí</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="VD: Cần Giờ, TP.HCM..."
                    className="w-full px-3 py-2 bg-white border border-[#e2ddd3] rounded-lg text-[12.5px] focus:outline-none focus:border-[#c5a26c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#6e706a] mb-1">Quy Mô / Diện Tích</label>
                  <input
                    type="text"
                    value={formData.area || ''}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="VD: 2.870 ha / 3.000 căn hộ..."
                    className="w-full px-3 py-2 bg-white border border-[#e2ddd3] rounded-lg text-[12.5px] focus:outline-none focus:border-[#c5a26c]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-bold text-[#6e706a] mb-1">Loại Hình Sản Phẩm</label>
                  <input
                    type="text"
                    value={formData.propertyTypes || ''}
                    onChange={(e) => setFormData({ ...formData, propertyTypes: e.target.value })}
                    placeholder="VD: Căn hộ cao cấp, Biệt thự biển..."
                    className="w-full px-3 py-2 bg-white border border-[#e2ddd3] rounded-lg text-[12.5px] focus:outline-none focus:border-[#c5a26c]"
                  />
                </div>
              </div>

              {/* Image Picker */}
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#6e706a] mb-1">
                  Hình Ảnh Đại Diện <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-[#04092b] border border-[#e2ddd3] shrink-0">
                    {formData.image ? (
                      <Image src={formData.image} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/40">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      required
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/uploads/ten-anh.png"
                      className="w-full px-3 py-1.5 bg-white border border-[#e2ddd3] rounded-lg text-[12px] font-mono focus:outline-none focus:border-[#c5a26c]"
                    />
                    <button
                      type="button"
                      onClick={() => setMediaPickerOpen(true)}
                      className="px-2.5 py-1 bg-[#faf8f5] hover:bg-[#e2ddd3] text-[#04092b] font-semibold text-[11px] rounded border border-[#e2ddd3] transition-colors flex items-center gap-1"
                    >
                      <ImageIcon className="w-3 h-3 text-[#c5a26c]" /> Chọn từ Thư viện Media
                    </button>
                  </div>
                </div>
              </div>

              {/* Featured checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#c5a26c] focus:ring-[#c5a26c]"
                  />
                  <span className="font-bold text-[12px] text-[#04092b]">
                    Đánh dấu dự án Nổi Bật (Ưu tiên hiển thị trên Trang Chủ)
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#e2ddd3] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-3.5 py-2 bg-white border border-[#e2ddd3] hover:bg-gray-100 font-semibold rounded-lg text-[12px]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#04092b] hover:bg-[#c5a26c] hover:text-[#04092b] text-white font-bold rounded-lg text-[12px] transition-colors flex items-center gap-1.5 disabled:opacity-50"
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

      {/* Media Picker Modal */}
      {mediaPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white max-w-3xl w-full rounded-2xl border border-[#e2ddd3] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-[#04092b] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-[14px] flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#c5a26c]" /> Chọn Hình Ảnh Cho Dự Án
              </h3>
              <button onClick={() => setMediaPickerOpen(false)} className="text-white/70 hover:text-white">✕</button>
            </div>

            <div className="p-4 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 flex-1">
              {mediaList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setFormData({ ...formData, image: item.url });
                    setMediaPickerOpen(false);
                  }}
                  className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 border border-[#e2ddd3] hover:border-[#c5a26c] hover:ring-2 hover:ring-[#c5a26c] cursor-pointer transition-all"
                >
                  <Image src={item.url} alt={item.altText || item.fileName} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold text-center p-1">
                    Chọn ảnh này
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#faf8f5] border-t border-[#e2ddd3] flex justify-end">
              <button
                onClick={() => setMediaPickerOpen(false)}
                className="px-3.5 py-1.5 bg-white border border-[#e2ddd3] rounded-lg font-semibold text-[11.5px]"
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
