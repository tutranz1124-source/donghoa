# Hướng Dẫn Triển Khai Website Đông Hòa Design Lên Tên Miền Riêng

Bộ mã nguồn này là ứng dụng Fullstack Next.js (kèm CMS Canva Studio, Blog và API Backend). Bạn có thể triển khai lên tên miền theo 4 phương án phổ biến nhất dưới đây:

---

## PHƯƠNG ÁN 1: Gắn Tên Miền Trực Tiếp Vào Vercel (Nhanh Nhất & Miễn Phí SSL - KHUYÊN DÙNG)
Dự án của bạn hiện đã được build và deploy sẵn trên Vercel:
`https://donghoa-design-six.vercel.app`

Để gắn tên miền riêng của bạn (Ví dụ: `donghoadesign.vn` hoặc `donghoadesign.com`):
1. Đăng nhập vào [Vercel Dashboard](https://vercel.com).
2. Chọn dự án **`donghoa-design`**.
3. Vào **Settings** > **Domains**.
4. Nhập tên miền của bạn vào ô và bấm **Add**.
5. Cập nhật bản ghi DNS tại nhà cung cấp tên miền của bạn (ví dụ: PA Việt Nam, Mắt Bão, Cloudflare, Namecheap...):
   - **Bản ghi A**: Host `@` trỏ về IP `76.76.21.21`
   - **Bản ghi CNAME**: Host `www` trỏ về `cname.vercel-dns.com`
6. Chờ 1-5 phút là website sẽ tự động kích hoạt kèm chứng chỉ SSL HTTPS miễn phí trọn đời!

---

## PHƯƠNG ÁN 2: Triển Khai Lên VPS / Server Riêng (Ubuntu / Debian + Nginx + PM2)

### Bước 1: Tải và giải nén source code
```bash
# Upload file donghoa-design.zip lên VPS, sau đó giải nén:
unzip donghoa-design.zip -d /var/www/donghoa-design
cd /var/www/donghoa-design
```

### Bước 2: Cài đặt thư viện và build dự án
```bash
# Cài dependencies (yêu cầu Node.js >= 18)
npm install

# Build dự án
npm run build
```

### Bước 3: Khởi chạy nền với PM2
```bash
# Cài PM2 nếu chưa có: npm install -g pm2
pm2 start npm --name "donghoa-design" -- start -- -p 3000
pm2 save
pm2 startup
```

### Bước 4: Cấu hình Nginx Reverse Proxy
Tạo file cấu hình `/etc/nginx/sites-available/donghoa`:
```nginx
server {
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Kích hoạt và cài SSL Let's Encrypt:
```bash
sudo ln -s /etc/nginx/sites-available/donghoa /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## PHƯƠNG ÁN 3: Triển Khai Lên cPanel (Setup Node.js App)
1. Đăng nhập cPanel, vào mục **Setup Node.js App** > **Create Application**.
2. Chọn **Node.js version**: 18.x hoặc 20.x.
3. **Application root**: Nhập thư mục chứa mã nguồn (ví dụ: `donghoa-design`).
4. **Application URL**: Chọn tên miền của bạn.
5. Upload và giải nén file `donghoa-design.zip` vào thư mục `donghoa-design`.
6. Bấm nút **Run NPM Install**.
7. Mở terminal trong cPanel hoặc SSH, chạy lệnh:
   ```bash
   npm run build
   ```
8. Quay lại giao diện **Setup Node.js App** và bấm **Restart**.

---

## PHƯƠNG ÁN 4: Chạy Bằng Docker
Nếu máy chủ của bạn đã cài Docker:
```bash
docker compose up -d --build
```
Website sẽ tự động chạy tại cổng `3000`.

---

## THÔNG TIN ĐĂNG NHẬP CMS QUẢN TRỊ:
- **Đường dẫn**: `/admin/login` hoặc `/admin/pages`
- **Email**: `admin@donghoaproperty.vn`
- **Mật khẩu**: `donghoa2026`
*(Bạn có thể đổi mật khẩu bất kỳ lúc nào trong mục Quản lý Tài khoản & Phân quyền).*
