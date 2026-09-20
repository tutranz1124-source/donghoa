'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Phone,
  Mail,
  Calendar,
  Building,
  CheckCircle2,
  Clock,
  MessageSquare,
  Trash2,
  RefreshCw,
  Filter,
  UserCheck,
  ChevronDown,
  Plus,
  Send,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { CustomerInquiry, InquiryStatus } from '@/lib/types';
import { useToast } from '@/components/admin/ToastContext';
import ConfirmModal from '@/components/admin/ConfirmModal';

const STATUS_CONFIG: Record<InquiryStatus, { label: string; bg: string; text: string; border: string; icon: any }> = {
  new: {
    label: 'Mới tiếp nhận',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: Clock
  },
  contacted: {
    label: 'Đã liên hệ',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    icon: Phone
  },
  appointment: {
    label: 'Hẹn lịch tư vấn',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    icon: Calendar
  },
  closed: {
    label: 'Hoàn tất',
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: CheckCircle2
  }
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<CustomerInquiry | null>(null);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const { showToast } = useToast();

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      if (!res.ok) throw new Error('Không thể tải danh sách khách hàng');
      const data = await res.json();
      if (Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      }
    } catch (err: any) {
      showToast(err.message || 'Lỗi khi tải dữ liệu', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Cập nhật trạng thái thất bại');

      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus, updatedAt: new Date().toISOString() } : item))
      );

      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }

      showToast(`Đã chuyển trạng thái sang "${STATUS_CONFIG[newStatus].label}"`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Lỗi khi cập nhật', 'error');
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !newNoteContent.trim()) return;

    setSubmittingNote(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedInquiry.id, note: newNoteContent.trim() })
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Thêm ghi chú thất bại');

      if (data.inquiry) {
        setInquiries((prev) => prev.map((item) => (item.id === data.inquiry.id ? data.inquiry : item)));
        setSelectedInquiry(data.inquiry);
      }

      setNewNoteContent('');
      showToast('Đã thêm ghi chú nội bộ thành công', 'success');
    } catch (err: any) {
      showToast(err.message || 'Lỗi khi thêm ghi chú', 'error');
    } finally {
      setSubmittingNote(false);
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const res = await fetch(`/api/contact?id=${itemToDelete}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Xóa thất bại');

      setInquiries((prev) => prev.filter((i) => i.id !== itemToDelete));
      if (selectedInquiry?.id === itemToDelete) setSelectedInquiry(null);
      showToast('Đã xóa yêu cầu tư vấn', 'success');
    } catch (err: any) {
      showToast(err.message || 'Lỗi khi xóa', 'error');
    } finally {
      setItemToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const filteredInquiries = inquiries.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.fullName.toLowerCase().includes(q) ||
      item.phone.includes(q) ||
      (item.email && item.email.toLowerCase().includes(q)) ||
      (item.projectName && item.projectName.toLowerCase().includes(q)) ||
      (item.need && item.need.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  const countByStatus = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === 'new').length,
    contacted: inquiries.filter((i) => i.status === 'contacted').length,
    appointment: inquiries.filter((i) => i.status === 'appointment').length,
    closed: inquiries.filter((i) => i.status === 'closed').length
  };

  const exportCSV = () => {
    const headers = ['Họ và tên', 'Số điện thoại', 'Email', 'Dự án', 'Loại BĐS', 'Diện tích', 'Nhu cầu', 'Trạng thái', 'Ngày nhận'];
    const rows = filteredInquiries.map((i) => [
      `"${i.fullName}"`,
      `"${i.phone}"`,
      `"${i.email || ''}"`,
      `"${i.projectName || ''}"`,
      `"${i.propertyType || ''}"`,
      `"${i.area || ''}"`,
      `"${i.need || ''}"`,
      `"${STATUS_CONFIG[i.status]?.label || i.status}"`,
      `"${new Date(i.createdAt).toLocaleString('vi-VN')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DongHoaProperty_KhachHang_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 max-w-[1440px] mx-auto pb-12 text-[12px] text-[#2d302e]">
      {/* Header Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#e2ddd3] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#c5a26c]/15 text-[#04092b] text-[10px] font-bold uppercase tracking-wider font-accent mb-1">
            <Users className="w-3 h-3 text-[#c5a26c]" /> CRM Quản Lý Khách Hàng
          </div>
          <h1 className="text-[18px] sm:text-[20px] font-bold text-[#04092b] font-display">
            Yêu Cầu Tư Vấn & Danh Sách Lead
          </h1>
          <p className="text-[11.5px] text-[#6e706a]">
            Theo dõi tiến độ liên hệ, lịch hẹn tư vấn dự án và chăm sóc khách hàng Đông Hòa Property.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchInquiries}
            disabled={loading}
            className="px-3 py-1.5 bg-[#faf8f5] hover:bg-[#f4f1ea] border border-[#e2ddd3] text-[#04092b] font-semibold text-[11.5px] rounded-lg transition-colors flex items-center gap-1.5"
            title="Tải lại dữ liệu"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#c5a26c]' : ''}`} />
            <span>Làm mới</span>
          </button>

          <button
            onClick={exportCSV}
            disabled={filteredInquiries.length === 0}
            className="px-3 py-1.5 bg-[#04092b] hover:bg-[#0c154a] text-white font-semibold text-[11.5px] rounded-lg transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#c5a26c]" />
            <span>Xuất Excel/CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-[#e2ddd3] shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#faf8f5] p-1 rounded-lg border border-[#e2ddd3]">
            {[
              { key: 'all', label: 'Tất cả' },
              { key: 'new', label: 'Mới nhận' },
              { key: 'contacted', label: 'Đã liên hệ' },
              { key: 'appointment', label: 'Hẹn lịch' },
              { key: 'closed', label: 'Hoàn tất' }
            ].map((tab) => {
              const active = statusFilter === tab.key;
              const count = countByStatus[tab.key as keyof typeof countByStatus];
              return (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  className={`px-3 py-1.5 rounded-md text-[11.5px] font-bold transition-all flex items-center gap-1.5 ${
                    active ? 'bg-[#04092b] text-white shadow-xs' : 'text-[#6e706a] hover:text-[#04092b] hover:bg-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      active ? 'bg-[#c5a26c] text-[#04092b]' : 'bg-[#e2ddd3] text-[#2d302e]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-[#6e706a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên, SĐT, dự án..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#faf8f5] border border-[#e2ddd3] rounded-lg text-[12px] focus:bg-white focus:outline-none focus:border-[#c5a26c]"
            />
          </div>
        </div>
      </div>

      {/* Main Table or Empty State */}
      {loading ? (
        <div className="bg-white p-12 rounded-xl border border-[#e2ddd3] flex flex-col items-center justify-center text-center space-y-2">
          <div className="w-8 h-8 border-2 border-[#c5a26c] border-t-transparent rounded-full animate-spin" />
          <p className="text-[12px] font-bold text-[#04092b]">Đang tải danh sách yêu cầu tư vấn...</p>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-[#e2ddd3] text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#faf8f5] border border-[#e2ddd3] flex items-center justify-center mx-auto text-[#6e706a]">
            <Users className="w-6 h-6 text-[#c5a26c]" />
          </div>
          <h3 className="font-bold text-[14px] text-[#04092b]">Chưa có yêu cầu tư vấn nào phù hợp</h3>
          <p className="text-[11.5px] text-[#6e706a] max-w-sm mx-auto">
            {searchQuery
              ? `Không tìm thấy kết quả nào khớp với "${searchQuery}". Hãy thử lại từ khóa khác.`
              : 'Khi khách hàng để lại thông tin qua trang chủ hoặc modal tư vấn, danh sách sẽ hiển thị tại đây.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#e2ddd3] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#faf8f5] border-b border-[#e2ddd3] text-[10.5px] uppercase font-bold text-[#6e706a] tracking-wider font-accent">
                  <th className="py-3 px-4">Khách Hàng</th>
                  <th className="py-3 px-4">Liên Hệ</th>
                  <th className="py-3 px-4">Dự Án & Nhu Cầu</th>
                  <th className="py-3 px-4">Trạng Thái</th>
                  <th className="py-3 px-4">Thời Gian</th>
                  <th className="py-3 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2ddd3]/60 text-[12px]">
                {filteredInquiries.map((item) => {
                  const statusInfo = STATUS_CONFIG[item.status] || STATUS_CONFIG.new;
                  const StatusIcon = statusInfo.icon;
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[#faf8f5]/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedInquiry(item)}
                    >
                      {/* Customer Name */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#04092b] group-hover:text-[#c5a26c] transition-colors flex items-center gap-1.5">
                          <span>{item.fullName}</span>
                          {item.notes && item.notes.length > 0 && (
                            <span className="text-[9.5px] bg-[#c5a26c]/20 text-[#04092b] px-1.5 py-0.2 rounded font-mono" title={`${item.notes.length} ghi chú nội bộ`}>
                              {item.notes.length} note
                            </span>
                          )}
                        </div>
                        {item.email && <div className="text-[11px] text-[#6e706a]">{item.email}</div>}
                      </td>

                      {/* Contact Phone */}
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={`tel:${item.phone.replace(/\D/g, '')}`}
                          className="inline-flex items-center gap-1 font-mono font-bold text-[#04092b] hover:text-[#c5a26c] bg-[#faf8f5] hover:bg-[#f4f1ea] px-2 py-1 rounded border border-[#e2ddd3] transition-colors"
                        >
                          <Phone className="w-3 h-3 text-[#c5a26c]" />
                          <span>{item.phone}</span>
                        </a>
                      </td>

                      {/* Project / Property / Need */}
                      <td className="py-3 px-4">
                        {item.projectName ? (
                          <div className="font-semibold text-[#04092b] flex items-center gap-1">
                            <Building className="w-3 h-3 text-[#c5a26c]" />
                            <span>{item.projectName}</span>
                          </div>
                        ) : (
                          <div className="text-[#6e706a] italic">Tư vấn chung</div>
                        )}
                        <div className="text-[11px] text-[#6e706a] truncate max-w-xs">
                          {[item.propertyType, item.area, item.need].filter(Boolean).join(' • ') || 'Chưa ghi chi tiết'}
                        </div>
                      </td>

                      {/* Status Selector */}
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value as InquiryStatus)}
                          className={`text-[11px] font-bold px-2 py-1 rounded-md border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border} focus:outline-none focus:ring-1 focus:ring-[#c5a26c] cursor-pointer`}
                        >
                          <option value="new">Mới nhận</option>
                          <option value="contacted">Đã liên hệ</option>
                          <option value="appointment">Hẹn lịch</option>
                          <option value="closed">Hoàn tất</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 text-[#6e706a] text-[11px] whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedInquiry(item)}
                          className="p-1.5 hover:bg-[#c5a26c]/20 hover:text-[#04092b] text-[#6e706a] rounded-lg transition-colors"
                          title="Xem chi tiết & Ghi chú"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setItemToDelete(item.id);
                            setDeleteModalOpen(true);
                          }}
                          className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition-colors"
                          title="Xóa yêu cầu"
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

      {/* Inquiry Detail & Internal Notes Drawer Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white max-w-2xl w-full rounded-2xl border border-[#e2ddd3] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#04092b] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#c5a26c]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#c5a26c] text-[#04092b] font-bold flex items-center justify-center font-display text-[14px]">
                  {selectedInquiry.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-[14px] sm:text-[16px] text-white">{selectedInquiry.fullName}</h3>
                  <p className="text-[10.5px] text-[#c5a26c]">
                    Mã lead: <span className="font-mono">{selectedInquiry.id}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as InquiryStatus)}
                  className="bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-[11px] font-bold focus:outline-none"
                >
                  <option value="new" className="text-black">Mới nhận</option>
                  <option value="contacted" className="text-black">Đã liên hệ</option>
                  <option value="appointment" className="text-black">Hẹn lịch</option>
                  <option value="closed" className="text-black">Hoàn tất</option>
                </select>

                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              {/* Customer Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#faf8f5] p-3.5 rounded-xl border border-[#e2ddd3] text-[11.5px]">
                <div>
                  <span className="text-[#6e706a] block text-[10px] uppercase font-bold">Số điện thoại</span>
                  <a
                    href={`tel:${selectedInquiry.phone.replace(/\D/g, '')}`}
                    className="font-mono font-bold text-[#04092b] hover:text-[#c5a26c] flex items-center gap-1 mt-0.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#c5a26c]" /> {selectedInquiry.phone}
                  </a>
                </div>

                <div>
                  <span className="text-[#6e706a] block text-[10px] uppercase font-bold">Email</span>
                  <span className="text-[#04092b] font-medium block mt-0.5">
                    {selectedInquiry.email || 'Chưa cung cấp'}
                  </span>
                </div>

                <div>
                  <span className="text-[#6e706a] block text-[10px] uppercase font-bold">Dự án quan tâm</span>
                  <span className="font-bold text-[#04092b] block mt-0.5">
                    {selectedInquiry.projectName || 'Tư vấn chung'}
                  </span>
                </div>

                <div>
                  <span className="text-[#6e706a] block text-[10px] uppercase font-bold">Loại hình & Diện tích</span>
                  <span className="text-[#04092b] block mt-0.5">
                    {[selectedInquiry.propertyType, selectedInquiry.area].filter(Boolean).join(' - ') || 'Chưa ghi'}
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-[#6e706a] block text-[10px] uppercase font-bold">Nhu cầu cụ thể</span>
                  <p className="text-[#04092b] mt-0.5 bg-white p-2.5 rounded border border-[#e2ddd3]">
                    {selectedInquiry.need || 'Không có ghi chú thêm từ khách hàng.'}
                  </p>
                </div>
              </div>

              {/* Internal Notes History */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-[12.5px] text-[#04092b] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#c5a26c]" /> Nhật Ký Chăm Sóc & Ghi Chú Nội Bộ
                </h4>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="Thêm ghi chú cuộc gọi, lịch hẹn, yêu cầu khách hàng..."
                    className="flex-1 px-3 py-2 bg-white border border-[#e2ddd3] rounded-lg text-[12px] focus:outline-none focus:border-[#c5a26c]"
                  />
                  <button
                    type="submit"
                    disabled={submittingNote || !newNoteContent.trim()}
                    className="px-4 py-2 bg-[#04092b] hover:bg-[#c5a26c] hover:text-[#04092b] text-white font-bold rounded-lg text-[11.5px] transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Send className="w-3 h-3" />
                    <span>Lưu note</span>
                  </button>
                </form>

                {/* Notes List */}
                <div className="space-y-2">
                  {selectedInquiry.notes && selectedInquiry.notes.length > 0 ? (
                    selectedInquiry.notes.map((note) => (
                      <div key={note.id} className="p-2.5 bg-[#faf8f5] border border-[#e2ddd3] rounded-lg text-[11.5px]">
                        <div className="flex items-center justify-between text-[#6e706a] text-[10px] mb-1">
                          <span className="font-bold text-[#04092b]">{note.author}</span>
                          <span>{new Date(note.createdAt).toLocaleString('vi-VN')}</span>
                        </div>
                        <p className="text-[#2d302e] whitespace-pre-wrap">{note.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-[#6e706a] italic py-2">
                      Chưa có ghi chú nào cho khách hàng này.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#faf8f5] p-3 border-t border-[#e2ddd3] flex items-center justify-between">
              <a
                href={`tel:${selectedInquiry.phone.replace(/\D/g, '')}`}
                className="px-3 py-1.5 bg-[#c5a26c] hover:bg-[#b5915a] text-[#04092b] font-bold rounded-lg text-[11.5px] flex items-center gap-1.5 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Gọi ngay {selectedInquiry.phone}</span>
              </a>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-3 py-1.5 bg-white border border-[#e2ddd3] hover:bg-gray-100 text-[#2d302e] font-semibold rounded-lg text-[11.5px]"
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
        title="Xóa Yêu Cầu Tư Vấn"
        message="Bạn có chắc chắn muốn xóa vĩnh viễn yêu cầu tư vấn này khỏi hệ thống CRM?"
        confirmText="Xóa Yêu Cầu"
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
