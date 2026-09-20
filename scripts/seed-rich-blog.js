const fs = require('fs');
const path = require('path');

const posts = [
  {
    id: 'post-style-showcase',
    title: 'Khám Phá Phong Cách Thiết Kế Nội Thất Hiện Đại & Tối Giản (Modern Minimalist)',
    slug: 'kham-pha-phong-cach-thiet-ke-noi-that-hien-dai-toi-gian-modern-minimalist',
    excerpt: 'Vẻ đẹp tinh tế đến từ sự tinh giản, đường nét khúc chiết và nghệ thuật sắp đặt ánh sáng tạo nên không gian sống thanh lịch vượt thời gian.',
    featuredImage: '/uploads/figma_styles_grid.png',
    thumbnailImage: '/uploads/figma_styles_grid.png',
    author: 'KTS. Lê Đông Hòa',
    authorRole: 'Giám đốc Thiết kế',
    category: 'Phong cách thiết kế',
    tags: ['Phong cách thiết kế', 'Modern Minimalist', 'Đông Hòa Design', 'Nội thất sang trọng'],
    status: 'published',
    publishedAt: '2026-03-01',
    readingTime: '5 phút đọc',
    featured: true,
    seoTitle: 'Khám Phá Phong Cách Thiết Kế Nội Thất Hiện Đại & Tối Giản (Modern Minimalist) | Đông Hòa Design',
    seoDescription: 'Vẻ đẹp tinh tế đến từ sự tinh giản, đường nét khúc chiết và nghệ thuật sắp đặt ánh sáng tạo nên không gian sống thanh lịch vượt thời gian.',
    content: `## 1. Triết Lý Cốt Lõi Của Phong Cách

Trong kiến trúc nội thất đương đại, phong cách không chỉ là việc sắp xếp đồ đạc mà là sự kiến tạo cảm xúc và trải nghiệm sống. Triết lý cốt lõi tập trung vào việc **giảm thiểu sự rườm rà** để tôn vinh vẻ đẹp tự nhiên của vật liệu, hình khối và ánh sáng.

> "Sự hoàn hảo đạt được không phải khi không còn gì để thêm vào, mà là khi không còn gì để lược bỏ bớt." — *KTS. Lê Đông Hòa (Giám đốc Thiết kế Đông Hòa Design)*

> 💡 **Điểm cốt lõi từ KTS Đông Hòa:**
> Tối giản không đồng nghĩa với đơn điệu hay thiếu thốn tiện nghi. Ngược lại, mỗi chi tiết nội thất trong không gian Minimalist đều phải đạt độ tinh xảo cao nhất, giấu kín công năng thông minh và bề mặt hoàn thiện hoàn hảo.

---

## 2. Các Đặc Trưng Nổi Bật

- **Bảng màu chủ đạo:** Tông màu trung tính thanh lịch (Beige, Trắng kem, Xám xi măng) kết hợp các điểm nhấn gỗ trầm ấm và kim loại vàng ánh kim.
- **Đường nét & Hình khối:** Ưu tiên các khối kỷ hà dứt khoát, đường cong mềm mại ở các góc cạnh để tạo cảm giác thư thái, an yên.
- **Ánh sáng tự nhiên:** Tối đa hóa cửa kính chạm trần và hệ rèm vải voan lọc sáng mềm mại, giúp không gian luôn tràn ngập sinh khí.

![Bảng phối màu và vật liệu thực tế phong cách Modern Minimalist](/uploads/clean_style_modern.png)

---

## 3. Lựa Chọn Vật Liệu Cao Cấp

1. **Gỗ tự nhiên & Veneer cao cấp:** Giữ trọn vân gỗ mộc mạc, hoàn thiện sơn phủ mờ tự nhiên chống ẩm.
2. **Đá tự nhiên & Kim loại:** Đá Marble/Granite vân mây kết hợp chi tiết nẹp inox mạ PVD tinh xảo.
3. **Vải dệt & Da thuộc:** Vải Bouclé xù mềm mịn hoặc da bò Ý mang lại cảm giác chạm êm ái tối đa.

---

## 4. Ứng Dụng Vào Không Gian Thực Tế

### Phòng Khách (Living Room)
Trung tâm của ngôi nhà với bộ sofa cong nguyên khối, bàn trà đôi mặt đá và vách ốp nan gỗ kết hợp đèn hắt gián tiếp tạo chiều sâu thị giác.

### Phòng Ngủ Master (Master Bedroom)
Đề cao sự riêng tư và tái tạo năng lượng. Hệ tủ áo cánh kính lùa hiện đại, giường ngủ bọc đệm êm ái cùng hệ thống chiếu sáng thông minh điều chỉnh theo nhịp sinh học.

> 📞 **Tư Vấn Thiết Kế Miễn Phí Cùng KTS Đông Hòa**
> Quý khách đang mong muốn sở hữu không gian sống chuẩn phong cách Modern Minimalist? Hãy liên hệ ngay với chúng tôi để nhận phương án thiết kế 3D và báo giá chi tiết trực tiếp từ xưởng sản xuất.

---

## 5. Lời Khuyên Từ Kiến Trúc Sư Đông Hòa

Khi bắt đầu thiết kế không gian cho gia đình mình, hãy bắt đầu từ **thói quen sinh hoạt thực tế** thay vì chỉ chạy theo xu hướng ngắn hạn. Đội ngũ KTS Đông Hòa luôn sẵn sàng lắng nghe và đồng hành để hiện thực hóa ngôi nhà mơ ước của bạn.`
  },
  {
    id: 'post-construction-guide',
    title: 'Cẩm Nang Thi Công Nội Thất Trọn Gói: Từ Bản Vẽ 3D Đến Hiện Thực Không Lỗi',
    slug: 'cam-nang-thi-cong-noi-that-tron-goi-tu-ban-ve-3d-den-hien-thuc-khong-loi',
    excerpt: 'Bật mí quy trình chuẩn 5 bước giúp gia chủ kiểm soát tiến độ, bảo đảm chất lượng hoàn thiện 100% khớp bản vẽ và tiết kiệm đến 20% chi phí trung gian.',
    featuredImage: '/uploads/figma_philosophy.png',
    thumbnailImage: '/uploads/figma_philosophy.png',
    author: 'KTS. Trần Minh Khoa',
    authorRole: 'Chỉ huy trưởng công trình',
    category: 'Kinh nghiệm thi công',
    tags: ['Kinh nghiệm thi công', 'Quy trình chuẩn', 'Xưởng sản xuất trực tiếp', 'Đông Hòa Design'],
    status: 'published',
    publishedAt: '2026-02-24',
    readingTime: '6 phút đọc',
    featured: false,
    seoTitle: 'Cẩm Nang Thi Công Nội Thất Trọn Gói: Từ Bản Vẽ 3D Đến Hiện Thực Không Lỗi | Đông Hòa Design',
    seoDescription: 'Bật mí quy trình chuẩn 5 bước giúp gia chủ kiểm soát tiến độ, bảo đảm chất lượng hoàn thiện 100% khớp bản vẽ và tiết kiệm đến 20% chi phí trung gian.',
    content: `## 1. Thách Thức Thường Gặp Khi Thi Công Nội Thất

Rất nhiều gia chủ gặp phải tình trạng bản vẽ 3D lung linh nhưng khi bàn giao thực tế lại sai lệch màu sắc, phụ kiện ọp ẹp hoặc phát sinh chi phí ngoài tầm kiểm soát. Nguyên nhân chính là do thiếu sự đồng bộ giữa khâu thiết kế và xưởng sản xuất trực tiếp.

> Cam kết của Đông Hòa Design: **100% bản vẽ chuẩn thực tế, không thiết kế "ảo", sản xuất trực tiếp tại xưởng với quy chuẩn kiểm định nghiêm ngặt.**

> 💡 **Kinh nghiệm nghiệm thu công trình:**
> Gia chủ nên yêu cầu đối chiếu mẫu ván thực tế (mockup sample) có đóng dấu niêm phong của nhà cung cấp trước khi tiến hành cắt ván hàng loạt tại xưởng.

---

## 2. Quy Trình Thi Công Chuẩn 5 Bước Tại Đông Hòa

1. **Khảo sát hiện trạng & Đo đạc Laser 3D:** Ghi nhận chính xác từng milimet cốt tường, sàn, hệ thống điện nước ngầm.
2. **Thiết kế kỹ thuật chi tiết (2D & 3D):** Bóc tách vật liệu rõ ràng từng mã ván, thương hiệu phụ kiện (Blum, Hafele).
3. **Gia công sản xuất tại Xưởng Đông Hòa:** Ứng dụng máy cắt CNC tự động và máy dán cạnh tự động PUR không đường line.
4. **Lắp đặt hoàn thiện tại công trình:** Đội ngũ thợ tay nghề cao thi công nhanh gọn, bọc lót bảo vệ sàn và tường cẩn thận.
5. **Nghiệm thu chi tiết & Bàn giao:** Vệ sinh công nghiệp sạch sẽ, bàn giao hồ sơ bảo hành 2 năm và bảo trì trọn đời.

![Đội ngũ thợ lành nghề lắp đặt hoàn thiện nội thất may đo](/uploads/clean_philosophy_photo.png)

---

## 3. 4 Sai Lầm Phổ Biến Cần Tránh

- **Không chốt trước phương án công năng ổ cắm & công tắc điện:** Dẫn đến việc đục phá tường sau khi đã sơn bả.
- **Tiết kiệm sai chỗ với phụ kiện bản lề, ray trượt:** Phụ kiện kém chất lượng sẽ rỉ sét và xệ cánh chỉ sau 6 tháng sử dụng.
- **Chọn vật liệu không phù hợp khí hậu nóng ẩm:** Khu vực bếp và toilet cần sử dụng cốt gỗ chống ẩm MDF/HDF lõi xanh hoặc nhựa Picomat.
- **Thuê đơn vị trung gian không có xưởng sản xuất:** Chi phí đội lên 15 - 30% và khó kiểm soát bảo hành dài lâu.

---

## 4. Tối Ưu Chi Phí Nhờ Xưởng Sản Xuất Trực Tiếp

Nhờ sở hữu hệ thống xưởng mộc quy mô lớn với máy móc hiện đại, Đông Hòa Design trực tiếp sản xuất mọi sản phẩm đo ni đóng giày theo từng căn hộ, loại bỏ hoàn toàn chi phí hoa hồng trung gian, mang lại mức giá gốc tốt nhất cho quý khách hàng.

> 📞 **Liên Hệ Khảo Sát Hiện Trạng Miễn Phí**
> Kỹ sư trưởng Đông Hòa sẽ trực tiếp tới đo đạc, khảo sát hiện trạng công trình và tư vấn giải pháp bóc tách vật liệu tối ưu nhất cho gia đình bạn.`
  },
  {
    id: 'post-office-workspace',
    title: 'Xu Hướng Thiết Kế Nội Thất Văn Phòng Hiện Đại Nâng Cao Hiệu Suất Làm Việc',
    slug: 'xu-huong-thiet-ke-noi-that-van-phong-hien-dai-nang-cao-hieu-suat-lam-viec',
    excerpt: 'Văn phòng hiện đại không chỉ là nơi làm việc đơn thuần mà là không gian truyền cảm hứng sáng tạo, thể hiện đẳng cấp thương hiệu và thu hút nhân tài.',
    featuredImage: '/uploads/office_hero_main.png',
    thumbnailImage: '/uploads/office_hero_main.png',
    author: 'KTS. Nguyễn Hải Yến',
    authorRole: 'Chuyên gia Không gian Thương mại',
    category: 'Không gian làm việc',
    tags: ['Nội thất văn phòng', 'Không gian làm việc', 'Office Design', 'Đông Hòa Design'],
    status: 'published',
    publishedAt: '2026-02-18',
    readingTime: '4 phút đọc',
    featured: false,
    seoTitle: 'Xu Hướng Thiết Kế Nội Thất Văn Phòng Hiện Đại Nâng Cao Hiệu Suất Làm Việc | Đông Hòa Design',
    seoDescription: 'Văn phòng hiện đại không chỉ là nơi làm việc đơn thuần mà là không gian truyền cảm hứng sáng tạo, thể hiện đẳng cấp thương hiệu và thu hút nhân tài.',
    content: `## 1. Xu Hướng Chuyển Dịch Trong Thiết Kế Văn Phòng

Môi trường công sở hiện đại đang chuyển mình mạnh mẽ từ các cụm bàn làm việc cứng nhắc sang mô hình **Không gian làm việc linh hoạt (Agile Workspace)**. Mục tiêu hàng đầu là nâng cao sức khỏe tinh thần, khuyến khích sự tương tác và thúc đẩy hiệu suất sáng tạo vượt bậc.

> "Một không gian làm việc truyền cảm hứng có thể gia tăng đến 32% sự gắn kết của nhân sự và 25% năng suất lao động." — *Báo cáo Nghiên cứu Môi trường Công sở Đông Hòa*

---

## 2. Phân Khu Chức Năng Khoa Học

### 1. Khu Làm Việc Mở (Open Collaborative Area)
Module bàn làm việc thông minh tích hợp ray luồn dây điện âm, ghế công thái học Ergonomic và vách ngăn nỉ cách âm di động.

### 2. Phòng Họp & Phòng Giám Đốc Sang Trọng (Executive Suite)
Bàn họp mặt đá cao cấp tích hợp hệ thống họp trực tuyến hiện đại, vách kính cách âm 2 lớp đảm bảo tuyệt đối tính bảo mật.

### 3. Khu Nghỉ Ngơi & Pantry Thư Giãn (Pantry & Lounge)
Góc cafe ấm cúng với quầy bar nhỏ, cây xanh thanh lọc không khí giúp nhân viên nạp lại năng lượng sau những giờ làm việc tập trung cao độ.

![Không gian văn phòng phong cách hiện đại tinh tế](/uploads/office_hero_main.png)

---

## 3. Tích Hợp Nhận Diện Thương Hiệu Vào Không Gian

- **Màu sắc chủ đạo:** Đồng bộ chuẩn xác theo bộ nhận diện thương hiệu (Brand Guidelines) của công ty.
- **Khu vực lễ tân & Sảnh chờ:** Điểm chạm đầu tiên tạo ấn tượng chuyên nghiệp với đối tác và khách hàng thông qua vách logo phát sáng và vật liệu sang trọng.

> 💡 **Giải pháp âm học văn phòng:**
> Hãy sử dụng trần tiêu âm thạch cao đục lỗ kết hợp thảm trải sàn cao cấp để triệt tiêu tiếng vang trong các buổi trao đổi nhóm.

---

## 4. Dịch Vụ Thiết Kế & Thi Công Văn Phòng Trọn Gói

Đông Hòa Design cung cấp giải pháp trọn gói từ tư vấn layout mặt bằng, thiết kế 3D, thi công nội thất đến hệ thống M&E (Điện, mạng, điều hòa), đảm bảo tiến độ bàn giao nhanh chóng để doanh nghiệp đi vào vận hành đúng kế hoạch.

> 📞 **Khảo Sát & Nhận Báo Giá Thiết Kế Văn Phòng**
> Nhận bản vẽ layout tối ưu mặt bằng văn phòng miễn phí từ KTS Đông Hòa trong vòng 24 giờ làm việc.`
  },
  {
    id: 'post-materials-guide',
    title: 'Bí Quyết Chọn Vật Liệu Cao Cấp Kiến Tạo Đẳng Cấp Không Gian Sống',
    slug: 'bi-quyet-chon-vat-lieu-cao-cap-kien-tao-dang-cap-khong-gian-song',
    excerpt: 'Tìm hiểu chi tiết về các loại vật liệu thượng hạng được ưa chuộng trong thiết kế nội thất biệt thự và penthouse sang trọng.',
    featuredImage: '/uploads/figma_luxury_bed.png',
    thumbnailImage: '/uploads/figma_luxury_bed.png',
    author: 'KTS. Lê Đông Hòa',
    authorRole: 'Giám đốc Thiết kế',
    category: 'Vật liệu & Sản xuất',
    tags: ['Vật liệu cao cấp', 'Gỗ óc chó', 'Đá tự nhiên', 'Bespoke Furniture'],
    status: 'published',
    publishedAt: '2026-02-10',
    readingTime: '5 phút đọc',
    featured: false,
    seoTitle: 'Bí Quyết Chọn Vật Liệu Cao Cấp Kiến Tạo Đẳng Cấp Không Gian Sống | Đông Hòa Design',
    seoDescription: 'Tìm hiểu chi tiết về các loại vật liệu thượng hạng được ưa chuộng trong thiết kế nội thất biệt thự và penthouse sang trọng.',
    content: `## 1. Giá Trị Của Vật Liệu Tự Nhiên Trong Kiến Trúc Sang Trọng

Vật liệu cao cấp không chỉ thể hiện gu thẩm mỹ tinh tế của gia chủ mà còn sở hữu độ bền bỉ cùng thời gian. Càng sử dụng lâu, vật liệu tự nhiên càng toát lên vẻ đẹp trầm ấm và giá trị độc bản.

> "Vật liệu thật mang lại linh hồn thật cho không gian sống." — *KTS. Lê Đông Hòa*

---

## 2. Các Dòng Vật Liệu Được Ưa Chuộng Nhất

### Gỗ Óc Chó Bắc Mỹ (Walnut Wood)
- **Đặc tính:** Màu nâu hạt dẻ ấm áp, hệ vân gỗ cuộn xoáy uốn lượn mềm mại như những dòng sông.
- **Ứng dụng:** Bàn ăn nguyên tấm, giường ngủ master, sofa bọc da cao cấp.

### Đá Tự Nhiên Xuyên Sáng (Onyx & Patagonia Marble)
- **Đặc tính:** Độ cứng cao, vân đá tự nhiên độc nhất vô nhị, khả năng xuyên sáng huyền ảo khi kết hợp đèn LED.
- **Ứng dụng:** Đảo bếp, vách tivi phòng khách, bàn trà điểm nhấn.

### Kim Loại Mạ PVD & Kính Cường Lực
- **Đặc tính:** Công nghệ mạ PVD chống oxy hóa tuyệt đối, chống trầy xước, ánh kim bóng gương hoặc xước mờ sang trọng.
- **Ứng dụng:** Chân bàn ghế, nẹp vách trang trí, khung cánh tủ áo cao cấp.

![Chất liệu sang trọng được tinh chọn kỹ lưỡng](/uploads/clean_style_luxury.png)

---

## 3. Cách Bảo Dưỡng Và Giữ Gìn Độ Bền Đẹp

- Tránh tiếp xúc trực tiếp ánh nắng gắt chiếu lâu ngày lên bề mặt gỗ tự nhiên.
- Sử dụng dung dịch vệ sinh chuyên dụng có độ pH trung tính cho bề mặt đá và da.
- Lau sạch nước đọng ngay sau khi sử dụng để bề mặt luôn sáng bóng như mới.

> 💡 **Lưu ý quan trọng từ thợ mộc Đông Hòa:**
> Bề mặt gỗ óc chó tự nhiên cần được lau dầu dưỡng định kỳ 6 tháng một lần để giữ cho thớ gỗ luôn căng bóng và không bị khô nứt trong mùa hanh khô.

> 📞 **Tư Vấn Chọn Mẫu Vật Liệu Trực Tiếp Tại Showroom**
> Hãy đến tham quan xưởng và showroom Đông Hòa để trực tiếp cảm nhận độ hoàn thiện và vân gỗ chân thật nhất.`
  },
  {
    id: 'post-case-study',
    title: 'Bàn Giao Dự Án: Biến Đổi Không Gian Căn Hộ Penthouse 180m2 Sang Trọng',
    slug: 'ban-giao-du-an-bien-doi-khong-gian-can-ho-penthouse-180m2-sang-trong',
    excerpt: 'Khám phá hành trình 45 ngày thi công hoàn thiện căn hộ cao cấp với toàn bộ nội thất may đo độc bản sản xuất tại xưởng Đông Hòa Design.',
    featuredImage: '/uploads/figma_modern_minimalist.png',
    thumbnailImage: '/uploads/figma_modern_minimalist.png',
    author: 'KTS. Vũ Tuấn Anh',
    authorRole: 'Kiến trúc sư Trưởng',
    category: 'Kinh nghiệm thi công',
    tags: ['Dự án thực tế', 'Bàn giao căn hộ', 'Nội thất may đo', 'Khách hàng Đông Hòa'],
    status: 'published',
    publishedAt: '2026-01-28',
    readingTime: '4 phút đọc',
    featured: false,
    seoTitle: 'Bàn Giao Dự Án: Biến Đổi Không Gian Căn Hộ Penthouse 180m2 Sang Trọng | Đông Hòa Design',
    seoDescription: 'Khám phá hành trình 45 ngày thi công hoàn thiện căn hộ cao cấp với toàn bộ nội thất may đo độc bản sản xuất tại xưởng Đông Hòa Design.',
    content: `## 1. Thông Tin Tổng Quan Dự Án

- **Tên dự án:** Căn hộ Penthouse Sky Villa
- **Diện tích:** 180m² (3 Phòng ngủ, 1 Khách - Bếp mở)
- **Phong cách:** Modern Luxury & Contemporary
- **Thời gian thi công:** 45 ngày hoàn thiện trọn gói
- **Đơn vị thiết kế & thi công:** Đông Hòa Design

---

## 2. Thách Thức Ban Đầu & Giải Pháp Kiến Trúc

### Thách thức hiện trạng:
Căn hộ bàn giao thô có hệ cột chịu lực lớn ngay giữa phòng khách, trần thấp và bố cục phòng bếp bị tối.

### Giải pháp từ KTS Đông Hòa:
1. **Xóa mờ hệ cột:** Ốp gương xám khói và vách gỗ nan cong biến chiếc cột thô thành điểm nhấn nghệ thuật trung tâm.
2. **Mở rộng không gian phòng khách - bếp:** Đập thông tường ngăn, thay bằng đảo bếp kết hợp bàn ăn 8 chỗ thông minh.
3. **Hệ thống ánh sáng gián tiếp:** Giấu đèn LED âm trần tạo cảm giác trần cao thoáng và sang trọng hơn.

![Không gian thực tế căn hộ Penthouse sau khi bàn giao](/uploads/clean_style_heritage.png)

---

## 3. Đánh Giá & Cảm Nhận Của Gia Chủ

> "Gia đình tôi thực sự bất ngờ khi nhận bàn giao nhà. Từng đường chỉ nẹp, cánh tủ lùa êm ru và chất liệu gỗ thực tế còn đẹp hơn cả ảnh 3D. Cảm ơn đội ngũ KTS và thợ thi công của Đông Hòa Design đã làm việc rất tận tâm và đúng hẹn!" — *Anh Hoàng & Chị Mai (Chủ nhân căn hộ)*

---

## 4. Liên Hệ Khảo Sát & Nhận Báo Giá Dự Án

Quý khách hàng đang chuẩn bị nhận nhà hoặc có nhu cầu cải tạo không gian sống, hãy liên hệ ngay với Đông Hòa Design qua Hotline: **0906.499.279** để được tư vấn thiết kế và báo giá chi tiết trực tiếp từ xưởng sản xuất.

> 📞 **Đăng Ký Tư Vấn Trực Tiếp Cùng KTS Trưởng**
> Nhận ngay trọn bộ hồ sơ thiết kế 3D và phương án bố trí mặt bằng công năng miễn phí!`
  }
];

const dataDir = path.join(process.cwd(), 'data');
fs.writeFileSync(path.join(dataDir, 'blog-posts.json'), JSON.stringify(posts, null, 2), 'utf8');
const tsCode = 'import { BlogPost } from "./types";\n\nexport const DEFAULT_BLOG_POSTS: BlogPost[] = ' + JSON.stringify(posts, null, 2) + ';\n';
fs.writeFileSync(path.join(process.cwd(), 'lib/default-blog-posts.ts'), tsCode, 'utf8');
console.log('Successfully seeded rich posts!');