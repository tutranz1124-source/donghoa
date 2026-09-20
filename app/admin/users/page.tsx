'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  ShieldCheck,
  Edit3,
  Trash2,
  AlertCircle,
  Mail,
  User as UserIcon,
  Lock,
  Search,
  Crown,
  CheckCircle2
} from 'lucide-react';
import { UserAccount, UserRole } from '@/lib/types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor' as UserRole
  });
  const [errorMsg, setErrorMsg] = useState('');

  const loadUsers = async () => {
    try {
      setLoading(true);
      const [resUsers, resAuth] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/auth')
      ]);

      if (resUsers.ok) {
        const data = await resUsers.json();
        setUsers(data);
      }
      if (resAuth.ok) {
        const authData = await resAuth.json();
        setCurrentUser(authData.user);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.password) {
      setErrorMsg('Vui lòng điền đầy đủ các trường thông tin.');
      return;
    }

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Không thể tạo tài khoản.');
        return;
      }

      setFormData({ name: '', email: '', password: '', role: 'editor' });
      setIsAddModalOpen(false);
      loadUsers();
    } catch {
      setErrorMsg('Đã có lỗi xảy ra khi tạo tài khoản.');
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setErrorMsg('');

    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedUser.id,
          name: formData.name,
          email: formData.email,
          password: formData.password || undefined,
          role: formData.role
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Không thể cập nhật tài khoản.');
        return;
      }

      setIsEditModalOpen(false);
      setSelectedUser(null);
      loadUsers();
    } catch {
      setErrorMsg('Đã có lỗi xảy ra khi cập nhật.');
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    const target = users.find((u) => u.id === id);
    const adminCount = users.filter((u) => u.role === 'admin').length;

    if (target?.role === 'admin' && adminCount <= 1) {
      alert('⚠️ Hệ thống bắt buộc phải duy trì ít nhất 1 tài khoản Quản Trị Viên (Admin). Không thể xóa Admin duy nhất.');
      return;
    }

    if (!confirm(`Bạn có chắc chắn muốn xóa tài khoản "${name}" không?`)) return;

    try {
      const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Không thể xóa tài khoản.');
        return;
      }
      loadUsers();
    } catch {
      alert('Đã có lỗi xảy ra khi xóa tài khoản.');
    }
  };

  const openEditModal = (u: UserAccount) => {
    setSelectedUser(u);
    setFormData({
      name: u.name,
      email: u.email,
      password: '',
      role: u.role
    });
    setErrorMsg('');
    setIsEditModalOpen(true);
  };

  const adminCount = users.filter((u) => u.role === 'admin').length;

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-3.5 sm:p-6 lg:p-10 max-w-[1440px] mx-auto space-y-5 sm:space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#e2ddd3] bg-white p-4 sm:p-8 shadow-sm rounded-2xl sm:rounded-3xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-[#04092b] text-[#c5a26c] px-3 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider font-accent">
            <ShieldCheck className="w-3.5 h-3.5" /> Phân Quyền &amp; Quản Trị Hệ Thống
          </div>
          <h1 className="text-[22px] sm:text-[32px] font-bold text-[#04092b] font-display">
            Quản Lý Tài Khoản Người Dùng
          </h1>
          <p className="text-[12.5px] sm:text-[13px] text-[#6e706a] max-w-2xl">
            Tạo và phân quyền tài khoản: <strong className="text-[#04092b]">Quản Trị Viên (Admin)</strong> có quyền chỉnh sửa toàn bộ trang chủ, thiết kế canvas và quản lý người dùng; <strong className="text-[#04092b]">Biên Tập Viên (Editor)</strong> chỉ được tạo và chỉnh sửa bài viết Blog.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({ name: '', email: '', password: '', role: 'editor' });
            setErrorMsg('');
            setIsAddModalOpen(true);
          }}
          className="bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] px-5 sm:px-6 py-3 rounded-xl text-[12.5px] sm:text-[13px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shrink-0 w-full sm:w-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Thêm Tài Khoản Mới</span>
        </button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#e2ddd3] shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#04092b]/5 text-[#04092b] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-[11px] sm:text-[11.5px] font-bold text-[#6e706a] uppercase tracking-wider">Tổng Tài Khoản</p>
            <h3 className="text-[22px] sm:text-[24px] font-bold text-[#04092b]">{users.length}</h3>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#e2ddd3] shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-[11px] sm:text-[11.5px] font-bold text-[#6e706a] uppercase tracking-wider">Quản Trị Viên (Admin)</p>
              <span className="text-[9.5px] bg-green-100 text-green-800 font-bold px-1.5 py-0.2 rounded">Bảo vệ ≥ 1</span>
            </div>
            <h3 className="text-[22px] sm:text-[24px] font-bold text-amber-800">
              {adminCount}
            </h3>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#e2ddd3] shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Edit3 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-[11px] sm:text-[11.5px] font-bold text-[#6e706a] uppercase tracking-wider">Biên Tập Viên Blog</p>
            <h3 className="text-[22px] sm:text-[24px] font-bold text-blue-800">
              {users.filter((u) => u.role === 'editor').length}
            </h3>
          </div>
        </div>
      </div>

      {/* Search & Users Display */}
      <div className="bg-white border border-[#e2ddd3] shadow-sm rounded-2xl overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-[#e2ddd3] bg-[#faf8f5] flex items-center gap-3">
          <Search className="w-4 h-4 text-[#6e706a] shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm tài khoản theo tên hoặc email..."
            className="w-full text-[13px] bg-transparent focus:outline-none placeholder-[#6e706a]"
          />
        </div>

        {loading ? (
          <div className="p-12 text-center text-[#6e706a]">
            <div className="w-8 h-8 border-2 border-[#04092b] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-[13px]">Đang tải danh sách tài khoản...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-[#6e706a] space-y-2">
            <Users className="w-10 h-10 mx-auto text-[#e2ddd3]" />
            <p className="text-[14px] font-medium">Không tìm thấy tài khoản phù hợp.</p>
          </div>
        ) : (
          <>
            {/* MOBILE CARD VIEW (< sm) */}
            <div className="block sm:hidden divide-y divide-[#e2ddd3]">
              {filteredUsers.map((u) => {
                const isCurrent = currentUser?.id === u.id || currentUser?.email === u.email;
                const isAdmin = u.role === 'admin';
                const isOnlyAdmin = isAdmin && adminCount <= 1;

                return (
                  <div key={u.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[14px] text-white shadow-sm shrink-0 ${
                            isAdmin ? 'bg-[#04092b]' : 'bg-[#c5a26c]'
                          }`}
                        >
                          {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[#04092b] text-[13.5px] truncate flex items-center gap-1.5">
                            <span className="truncate">{u.name}</span>
                            {isCurrent && (
                              <span className="text-[9px] bg-green-100 text-green-800 font-bold px-1.5 py-0.2 rounded border border-green-300 shrink-0">
                                Bạn
                              </span>
                            )}
                            {isOnlyAdmin && (
                              <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded border border-amber-300 shrink-0">
                                Admin
                              </span>
                            )}
                          </p>
                          <p className="text-[11.5px] text-[#6e706a] font-mono truncate">{u.email}</p>
                        </div>
                      </div>

                      {isAdmin ? (
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                          Admin
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full shrink-0">
                          Editor
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-[#6e706a]">
                      <span>Ngày tạo: {u.createdAt || 'Mặc định'}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(u)}
                          className="px-3 py-1.5 bg-[#f4f1ea] hover:bg-[#c5a26c] hover:text-[#04092b] text-[#04092b] rounded-lg text-[11.5px] font-bold transition-colors inline-flex items-center gap-1 border border-[#e2ddd3]"
                        >
                          <Edit3 className="w-3 h-3" /> Sửa / Đổi MK
                        </button>
                        {!isCurrent && !isOnlyAdmin && (
                          <button
                            onClick={() => handleDeleteUser(u.id, u.name)}
                            className="p-1.5 text-red-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                            title="Xóa tài khoản này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DESKTOP TABLE VIEW (>= sm) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#e2ddd3] bg-[#f4f1ea] text-[11.5px] font-bold text-[#04092b] uppercase tracking-wider">
                    <th className="py-3.5 px-6">Người Dùng</th>
                    <th className="py-3.5 px-6">Email / Đăng Nhập</th>
                    <th className="py-3.5 px-6">Vai Trò &amp; Quyền Hạn</th>
                    <th className="py-3.5 px-6">Ngày Tạo</th>
                    <th className="py-3.5 px-6 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2ddd3] text-[13px]">
                  {filteredUsers.map((u) => {
                    const isCurrent = currentUser?.id === u.id || currentUser?.email === u.email;
                    const isAdmin = u.role === 'admin';
                    const isOnlyAdmin = isAdmin && adminCount <= 1;

                    return (
                      <tr key={u.id} className="hover:bg-[#faf8f5] transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[14px] text-white shadow-sm shrink-0 ${
                                isAdmin ? 'bg-[#04092b]' : 'bg-[#c5a26c]'
                              }`}
                            >
                              {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div>
                              <p className="font-bold text-[#04092b] flex items-center gap-1.5">
                                {u.name}
                                {isCurrent && (
                                  <span className="text-[9px] bg-green-100 text-green-800 font-bold px-1.5 py-0.2 rounded border border-green-300">
                                    Bạn
                                  </span>
                                )}
                                {isOnlyAdmin && (
                                  <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded border border-amber-300 flex items-center gap-0.5">
                                    <Crown className="w-2.5 h-2.5 text-amber-600" /> Admin Duy Nhất
                                  </span>
                                )}
                              </p>
                              <p className="text-[11px] text-[#6e706a] font-mono">ID: {u.id}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <span className="font-mono text-[#04092b] font-medium">{u.email}</span>
                        </td>

                        <td className="py-4 px-6">
                          {isAdmin ? (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11.5px] font-bold shadow-xs">
                              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                              <span>Quản Trị Viên (Admin)</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-[11.5px] font-bold shadow-xs">
                              <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                              <span>Biên Tập Viên (Editor)</span>
                            </div>
                          )}
                          <p className="text-[10px] text-[#6e706a] mt-0.5">
                            {isAdmin
                              ? 'Toàn quyền chỉnh sửa trang chủ, canvas & bài viết'
                              : 'Chỉ được thêm / sửa / xóa bài viết Blog'}
                          </p>
                        </td>

                        <td className="py-4 px-6 text-[#6e706a] text-[12px] font-mono">
                          {u.createdAt || 'Mặc định'}
                        </td>

                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => openEditModal(u)}
                            className="px-3 py-1.5 bg-[#f4f1ea] hover:bg-[#c5a26c] hover:text-[#04092b] text-[#04092b] rounded-lg text-[12px] font-bold transition-colors inline-flex items-center gap-1 border border-[#e2ddd3]"
                            title="Sửa thông tin hoặc đổi mật khẩu"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Sửa / Đổi MK
                          </button>

                          {!isCurrent && !isOnlyAdmin && (
                            <button
                              onClick={() => handleDeleteUser(u.id, u.name)}
                              className="p-1.5 text-red-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                              title="Xóa tài khoản này"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}

                          {isOnlyAdmin && !isCurrent && (
                            <span
                              className="text-[11px] text-gray-400 italic px-2"
                              title="Hệ thống bảo vệ: Không thể xóa Admin duy nhất"
                            >
                              🔒 Đã khóa
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* MODAL: Thêm Tài Khoản Mới */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#e2ddd3] overflow-hidden">
            <div className="p-6 border-b border-[#e2ddd3] flex items-center justify-between bg-[#f4f1ea]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#04092b] text-[#c5a26c] flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-[#04092b]">Thêm Tài Khoản Mới</h3>
                  <p className="text-[11.5px] text-[#6e706a]">Tạo tài khoản và phân quyền chức năng</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#e2ddd3] hover:bg-[#04092b] hover:text-white flex items-center justify-center text-[13px] font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[12px] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-[12.5px] font-bold text-[#04092b]">Họ và Tên</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="VD: Nguyễn Văn A"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 border border-[#e2ddd3] rounded-xl text-[13px] focus:outline-none focus:border-[#c5a26c]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[12.5px] font-bold text-[#04092b]">Email hoặc Tên Đăng Nhập</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="VD: editor@donghoaproperty.vn"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 border border-[#e2ddd3] rounded-xl text-[13px] focus:outline-none focus:border-[#c5a26c]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[12.5px] font-bold text-[#04092b]">Mật Khẩu</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="Nhập mật khẩu an toàn..."
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 border border-[#e2ddd3] rounded-xl text-[13px] focus:outline-none focus:border-[#c5a26c]"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#e2ddd3]">
                <label className="block text-[12.5px] font-bold text-[#04092b]">Chọn Vai Trò & Phân Quyền</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      formData.role === 'editor'
                        ? 'border-[#04092b] bg-[#04092b]/5 shadow-sm'
                        : 'border-[#e2ddd3] bg-white hover:border-[#c5a26c]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-[13px] text-[#04092b] flex items-center gap-1.5">
                        <Edit3 className="w-4 h-4 text-blue-600" /> Biên Tập Viên Blog
                      </span>
                      <input
                        type="radio"
                        name="role"
                        value="editor"
                        checked={formData.role === 'editor'}
                        onChange={() => setFormData({ ...formData, role: 'editor' })}
                        className="accent-[#04092b]"
                      />
                    </div>
                    <p className="text-[10.5px] text-[#6e706a] leading-relaxed">
                      Chỉ được quản lý, thêm, sửa, xóa bài viết Blog.
                    </p>
                  </label>

                  <label
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      formData.role === 'admin'
                        ? 'border-[#04092b] bg-[#04092b]/5 shadow-sm'
                        : 'border-[#e2ddd3] bg-white hover:border-[#c5a26c]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-[13px] text-[#04092b] flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-amber-600" /> Quản Trị Viên (Admin)
                      </span>
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={formData.role === 'admin'}
                        onChange={() => setFormData({ ...formData, role: 'admin' })}
                        className="accent-[#04092b]"
                      />
                    </div>
                    <p className="text-[10.5px] text-[#6e706a] leading-relaxed">
                      Toàn quyền: Chỉnh sửa trang chủ, canvas, bài viết và tài khoản.
                    </p>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#e2ddd3]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 border border-[#e2ddd3] rounded-xl text-[12.5px] font-bold text-[#6e706a] hover:bg-[#faf8f5]"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] rounded-xl text-[12.5px] font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  Tạo Tài Khoản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Sửa Thông Tin & Đổi Mật Khẩu */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#e2ddd3] overflow-hidden">
            <div className="p-6 border-b border-[#e2ddd3] flex items-center justify-between bg-[#f4f1ea]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#04092b] text-[#c5a26c] flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-[#04092b]">Sửa Tài Khoản: {selectedUser.name}</h3>
                  <p className="text-[11.5px] text-[#6e706a]">Cập nhật quyền hạn hoặc đặt lại mật khẩu</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#e2ddd3] hover:bg-[#04092b] hover:text-white flex items-center justify-center text-[13px] font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[12px] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {selectedUser.role === 'admin' && adminCount <= 1 && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[12px] flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Đây là <strong>Quản Trị Viên (Admin) duy nhất</strong> của hệ thống. Quyền Admin được bảo vệ và không thể hạ cấp.</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-[12.5px] font-bold text-[#04092b]">Họ và Tên</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 border border-[#e2ddd3] rounded-xl text-[13px] focus:outline-none focus:border-[#c5a26c]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[12.5px] font-bold text-[#04092b]">Email / Tên Đăng Nhập</label>
                <input
                  type="text"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2.5 border border-[#e2ddd3] rounded-xl text-[13px] focus:outline-none focus:border-[#c5a26c]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[12.5px] font-bold text-[#04092b]">
                  Mật Khẩu Mới (Bỏ trống nếu không đổi)
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới..."
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2.5 border border-[#e2ddd3] rounded-xl text-[13px] focus:outline-none focus:border-[#c5a26c]"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-[#e2ddd3]">
                <label className="block text-[12.5px] font-bold text-[#04092b]">Vai Trò & Quyền Hạn</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                      selectedUser.role === 'admin' && adminCount <= 1
                        ? 'opacity-50 cursor-not-allowed border-[#e2ddd3] bg-gray-50'
                        : formData.role === 'editor'
                        ? 'cursor-pointer border-[#04092b] bg-[#04092b]/5 shadow-sm'
                        : 'cursor-pointer border-[#e2ddd3] bg-white hover:border-[#c5a26c]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-[13px] text-[#04092b] flex items-center gap-1.5">
                        <Edit3 className="w-4 h-4 text-blue-600" /> Biên Tập Viên Blog
                      </span>
                      <input
                        type="radio"
                        name="edit-role"
                        value="editor"
                        disabled={selectedUser.role === 'admin' && adminCount <= 1}
                        checked={formData.role === 'editor'}
                        onChange={() => setFormData({ ...formData, role: 'editor' })}
                        className="accent-[#04092b]"
                      />
                    </div>
                    <p className="text-[10.5px] text-[#6e706a] leading-relaxed">
                      Chỉ quản lý bài viết Blog.
                    </p>
                  </label>

                  <label
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      formData.role === 'admin'
                        ? 'border-[#04092b] bg-[#04092b]/5 shadow-sm'
                        : 'border-[#e2ddd3] bg-white hover:border-[#c5a26c]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-[13px] text-[#04092b] flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-amber-600" /> Quản Trị Viên (Admin)
                      </span>
                      <input
                        type="radio"
                        name="edit-role"
                        value="admin"
                        checked={formData.role === 'admin'}
                        onChange={() => setFormData({ ...formData, role: 'admin' })}
                        className="accent-[#04092b]"
                      />
                    </div>
                    <p className="text-[10.5px] text-[#6e706a] leading-relaxed">
                      Toàn quyền hệ thống.
                    </p>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#e2ddd3]">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 border border-[#e2ddd3] rounded-xl text-[12.5px] font-bold text-[#6e706a] hover:bg-[#faf8f5]"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#04092b] hover:bg-[#c5a26c] text-white hover:text-[#04092b] rounded-xl text-[12.5px] font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  Lưu Thay Đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
