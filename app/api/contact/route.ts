import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getInquiries, saveInquiry, updateInquiryStatus, deleteInquiry, addInquiryNote } from '@/lib/storage';
import { verifyAdminSession, verifyEditorSession, getSessionUser } from '@/lib/auth';
import { InquiryStatus } from '@/lib/types';

export const dynamic = 'force-dynamic';

const TARGET_EMAIL = process.env.CONTACT_EMAIL || 'info@donghoagroup.vn';

async function sendViaFormSubmit(data: {
  fullName: string;
  phone: string;
  email?: string;
  propertyType?: string;
  area?: string;
  need?: string;
  projectName?: string;
}) {
  try {
    const formattedTime = new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
    });

    const target = process.env.FORMSUBMIT_EMAIL || 'nhatdong1511@gmail.com';
    const response = await fetch(`https://formsubmit.co/ajax/${target}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        _subject: `[Đông Hòa Property] Yêu Cầu Tư Vấn Mới: ${data.fullName} - ${data.phone}`,
        'Khách hàng': data.fullName,
        'Số điện thoại': data.phone,
        Email: data.email || 'Chưa ghi',
        'Dự án quan tâm': data.projectName || 'Chung',
        'Loại hình bất động sản': data.propertyType || 'Chưa ghi',
        'Diện tích (m²)': data.area ? `${data.area} m²` : 'Chưa ghi',
        'Nhu cầu tư vấn': data.need || 'Chưa ghi',
        'Thời gian gửi': formattedTime,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    const resJson = await response.json();
    return { success: true, resJson };
  } catch (err: any) {
    console.warn('FormSubmit dispatch warning:', err.message);
    return { success: false, error: err.message };
  }
}

async function sendViaSmtp(data: {
  fullName: string;
  phone: string;
  email?: string;
  propertyType?: string;
  area?: string;
  need?: string;
  projectName?: string;
}) {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

  if (!user || !pass) {
    return { skipped: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2ddd3; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #04092b; color: #ffffff; padding: 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px; letter-spacing: 1px; color: #c5a26c;">ĐÔNG HÒA PROPERTY</h2>
          <p style="margin: 6px 0 0; font-size: 14px; color: #e2ddd3;">THÔNG BÁO YÊU CẦU TƯ VẤN KHÁCH HÀNG</p>
        </div>
        <div style="padding: 24px; background-color: #faf8f5;">
          <p style="font-size: 14px; color: #333; line-height: 1.6;">Website vừa ghi nhận yêu cầu tư vấn mới từ khách hàng:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px; background-color: #ffffff; border-radius: 6px; overflow: hidden;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 16px; font-weight: bold; color: #04092b; width: 35%;">Họ và tên:</td>
              <td style="padding: 12px 16px; color: #333;">${data.fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 16px; font-weight: bold; color: #04092b;">Số điện thoại:</td>
              <td style="padding: 12px 16px; color: #a70c0c; font-weight: bold;"><a href="tel:${data.phone}" style="color: #a70c0c; text-decoration: none;">${data.phone}</a></td>
            </tr>
            ${data.email ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 16px; font-weight: bold; color: #04092b;">Email:</td><td style="padding: 12px 16px; color: #333;">${data.email}</td></tr>` : ''}
            ${data.projectName ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 16px; font-weight: bold; color: #04092b;">Dự án quan tâm:</td><td style="padding: 12px 16px; color: #04092b; font-weight: bold;">${data.projectName}</td></tr>` : ''}
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 16px; font-weight: bold; color: #04092b;">Loại hình BĐS:</td>
              <td style="padding: 12px 16px; color: #333;">${data.propertyType || 'Chưa ghi'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 16px; font-weight: bold; color: #04092b;">Diện tích (m²):</td>
              <td style="padding: 12px 16px; color: #333;">${data.area ? `${data.area} m²` : 'Chưa ghi'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 16px; font-weight: bold; color: #04092b;">Nhu cầu:</td>
              <td style="padding: 12px 16px; color: #333;">${data.need || 'Chưa ghi'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-weight: bold; color: #04092b;">Thời gian nhận:</td>
              <td style="padding: 12px 16px; color: #666; font-size: 13px;">${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; text-align: center;">
            <a href="tel:${data.phone}" style="display: inline-block; background-color: #04092b; color: #ffffff; padding: 12px 28px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 13px; letter-spacing: 0.5px;">GỌI NGAY CHO KHÁCH HÀNG</a>
          </div>
        </div>
        <div style="background-color: #f0ebe1; padding: 14px; text-align: center; font-size: 12px; color: #777;">
          Email tự động gửi từ hệ thống Đông Hòa Property (gửi tới ${TARGET_EMAIL})
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Đông Hòa Property" <${user}>`,
      to: TARGET_EMAIL,
      subject: `[Đông Hòa Property] Yêu Cầu Tư Vấn Mới - ${data.fullName} (${data.phone})`,
      html: htmlContent,
    });

    return { success: true };
  } catch (err: any) {
    console.error('SMTP send error:', err);
    return { success: false, error: err.message };
  }
}

// ----------------------------------------------------
// 1. GET: Fetch all inquiries (CRM protected route)
// ----------------------------------------------------
export async function GET(request: Request) {
  const isAuth = verifyAdminSession() || verifyEditorSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized. Vui lòng đăng nhập quyền quản trị để xem danh sách khách hàng.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') as InquiryStatus | null;
  const search = searchParams.get('search')?.toLowerCase();

  let list = getInquiries();

  if (status && ['new', 'contacted', 'appointment', 'closed'].includes(status)) {
    list = list.filter((item) => item.status === status);
  }

  if (search) {
    list = list.filter(
      (item) =>
        item.fullName.toLowerCase().includes(search) ||
        item.phone.includes(search) ||
        (item.email && item.email.toLowerCase().includes(search)) ||
        (item.projectName && item.projectName.toLowerCase().includes(search)) ||
        (item.need && item.need.toLowerCase().includes(search))
    );
  }

  return NextResponse.json({
    success: true,
    total: list.length,
    inquiries: list
  });
}

// ----------------------------------------------------
// 2. POST: Public customer consultation submission
// ----------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, propertyType, area, need, projectName } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: 'Vui lòng nhập họ tên và số điện thoại liên hệ.' },
        { status: 400 }
      );
    }

    const newRecord = saveInquiry({
      fullName,
      phone,
      email,
      propertyType,
      area,
      need,
      projectName,
      targetEmail: TARGET_EMAIL,
      status: 'new'
    });

    // Dispatch background notifications asynchronously without blocking user response
    sendViaFormSubmit({
      fullName: newRecord.fullName,
      phone: newRecord.phone,
      email: newRecord.email,
      propertyType: newRecord.propertyType,
      area: newRecord.area,
      need: newRecord.need,
      projectName: newRecord.projectName
    }).catch(() => {});

    sendViaSmtp({
      fullName: newRecord.fullName,
      phone: newRecord.phone,
      email: newRecord.email,
      propertyType: newRecord.propertyType,
      area: newRecord.area,
      need: newRecord.need,
      projectName: newRecord.projectName
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: 'Yêu cầu tư vấn của quý khách đã được gửi thành công!',
      data: newRecord,
    });
  } catch (err: any) {
    console.error('API /api/contact POST error:', err);
    return NextResponse.json(
      { error: 'Đã có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
}

// ----------------------------------------------------
// 3. PATCH: Update inquiry status or add note (CRM protected)
// ----------------------------------------------------
export async function PATCH(request: Request) {
  const isAuth = verifyAdminSession() || verifyEditorSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const currentUser = getSessionUser();
  const authorName = currentUser?.name || 'Admin';

  try {
    const body = await request.json();
    const { id, status, note } = body;

    if (!id) {
      return NextResponse.json({ error: 'Thiếu mã yêu cầu (id).' }, { status: 400 });
    }

    let updated = null;

    if (status) {
      updated = updateInquiryStatus(id, status);
    }

    if (note && typeof note === 'string' && note.trim()) {
      updated = addInquiryNote(id, note.trim(), authorName);
    }

    if (!updated) {
      return NextResponse.json({ error: 'Không tìm thấy yêu cầu tư vấn.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to update inquiry' }, { status: 500 });
  }
}

// ----------------------------------------------------
// 4. DELETE: Remove inquiry (Admin only)
// ----------------------------------------------------
export async function DELETE(request: Request) {
  const isAuth = verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Chỉ Quản Trị Viên mới có quyền xóa yêu cầu tư vấn.' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Thiếu mã yêu cầu (id).' }, { status: 400 });
  }

  const deleted = deleteInquiry(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Không tìm thấy yêu cầu để xóa.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Đã xóa yêu cầu thành công.' });
}
