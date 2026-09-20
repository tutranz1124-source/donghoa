const fs = require('fs');
const path = require('path');

// 1. Update data/site-content.json stages
const siteContentPath = path.join(process.cwd(), 'data/site-content.json');
const siteContent = JSON.parse(fs.readFileSync(siteContentPath, 'utf8'));

siteContent.stages = siteContent.stages || {};

// MODERN & MINIMALIST
siteContent.stages.modern = {
  styleId: 'modern',
  title: 'MODERN &\nMINIMALIST',
  description: 'Phương châm "Less is more". Đề cao sự tinh giản trong nội thất, chỉ giữ lại những gì thực sự cần thiết. Màu sắc dịu nhẹ (trắng, kem, xám), không gian mở và ngập tràn ánh sáng tự nhiên.',
  finalImage: '/uploads/figma_modern_minimalist.png',
  swatches: ['#2F3E46', '#8EA5B3', '#C7B299', '#ABA29B', '#D5D8D6'],
  items: [
    {
      id: 'modern_pendant',
      name: 'Đèn thả trần (Pendant Lamp)',
      image: '/uploads/figma_modern_pendant.png',
      position: { top: '0%', left: '77%', width: '11%', aspectRatio: '3/4', zIndex: 15 },
      animation: { direction: 'drop-top', offsetY: -80, delay: 0.1, duration: 0.85 }
    },
    {
      id: 'modern_bed',
      name: 'Giường ngủ Master Hiện đại (Bed)',
      image: '/uploads/figma_modern_bed.png',
      position: { top: '29%', left: '43%', width: '56%', aspectRatio: '4/3', zIndex: 10 },
      animation: { direction: 'slide-right', offsetX: 80, delay: 0.15, duration: 0.9 }
    },
    {
      id: 'modern_arc_lamp',
      name: 'Đèn cây uốn cong (Arc Floor Lamp)',
      image: '/uploads/figma_modern_arc_lamp.png',
      position: { top: '29%', left: '21.5%', width: '16%', aspectRatio: '4/5', zIndex: 12 },
      animation: { direction: 'slide-left', offsetX: -60, delay: 0.2, duration: 0.85 }
    },
    {
      id: 'modern_sofa',
      name: 'Sofa Bouclé Trắng Dài (Curved Sofa)',
      image: '/uploads/figma_modern_sofa.png',
      position: { top: '70%', left: '4.5%', width: '67%', aspectRatio: '1024/379', zIndex: 10 },
      animation: { direction: 'float-bottom', offsetY: 70, delay: 0.25, duration: 0.9 }
    },
    {
      id: 'modern_armchair',
      name: 'Ghế đơn Gỗ Tự nhiên (Wood Armchair)',
      image: '/uploads/figma_modern_armchair.png',
      position: { top: '69%', left: '77%', width: '18%', aspectRatio: '1/1', zIndex: 12 },
      animation: { direction: 'slide-right', offsetX: 60, delay: 0.3, duration: 0.85 }
    }
  ]
};

// LUXURY & CLASSIC
siteContent.stages.luxury = {
  styleId: 'luxury',
  title: 'LUXURY & CLASSIC',
  description: 'Đầy tính xa hoa và sang trọng lên mức tối đa. Sử dụng các vật liệu siêu cao cấp (gỗ tự nhiên quý, đá xuyên sáng, kim loại mạ vàng, đồ thửa riêng - bespoke) với mức độ hoàn thiện tỉ mỉ.',
  finalImage: '/uploads/figma_luxury_classic.png',
  items: [
    {
      id: 'luxury_bed',
      name: 'Giường ngủ Bọc nệm Sang trọng (Luxury Bed)',
      image: '/uploads/figma_luxury_bed.png',
      position: { top: '37%', left: '7%', width: '52%', aspectRatio: '4/3', zIndex: 10 },
      animation: { direction: 'slide-left', offsetX: -80, delay: 0.15, duration: 0.9 }
    },
    {
      id: 'luxury_palm_lamp',
      name: 'Đèn cây Lá cọ Mạ vàng (Golden Palm Lamp)',
      image: '/uploads/figma_luxury_palm_lamp.png',
      position: { top: '29%', left: '47%', width: '12%', aspectRatio: '604/1024', zIndex: 12 },
      animation: { direction: 'fade-scale', offsetY: 60, delay: 0.2, duration: 0.85 }
    },
    {
      id: 'luxury_swatch_1',
      name: 'Mẫu vật liệu Gỗ lượn sóng (Fluted Wood)',
      image: '/uploads/figma_luxury_swatch_1.png',
      position: { top: '29%', left: '75%', width: '16%', aspectRatio: '1.25/1', zIndex: 14 },
      animation: { direction: 'slide-right', offsetX: 60, delay: 0.25, duration: 0.85 }
    },
    {
      id: 'luxury_swatch_2',
      name: 'Mẫu vật liệu Gỗ xương cá (Chevron Wood)',
      image: '/uploads/figma_luxury_swatch_2.png',
      position: { top: '47%', left: '75%', width: '16%', aspectRatio: '1.25/1', zIndex: 14 },
      animation: { direction: 'slide-right', offsetX: 60, delay: 0.3, duration: 0.85 }
    },
    {
      id: 'luxury_vases',
      name: 'Bộ bình gốm & thủy tinh nghệ thuật (Luxury Vases)',
      image: '/uploads/figma_luxury_vases.png',
      position: { top: '61%', left: '80%', width: '9.5%', aspectRatio: '320/540', zIndex: 16 },
      animation: { direction: 'float-bottom', offsetY: 60, delay: 0.35, duration: 0.85 }
    }
  ]
};

// HERITAGE & RETRO
siteContent.stages.heritage = {
  styleId: 'heritage',
  title: 'HERITAGE &\nRETRO',
  description: 'Gợi nhớ về thập niên 50 – 80. Kết hợp giữa những món đồ cũ kỹ/kỷ niệm với những gam màu vui tươi, phá cách (vàng mustard, xanh teal, cam đất). Mô phỏng lại các nhà xưởng cũ. Điểm nhấn là tường gạch trần, sàn bê tông mài, trần để lộ ống kỹ thuật, kết hợp khung sắt đen và gỗ thô tối màu.',
  finalImage: '/uploads/figma_heritage_retro.png',
  swatchesTable: ['#301B17', '#5C2D25', '#E5A566', '#B7532A', '#7A221E'],
  swatchesChair: ['#0D4B75', '#007A87', '#88B8A6', '#F5B17B', '#F15A24'],
  items: [
    {
      id: 'heritage_chandelier',
      name: 'Đèn chùm Cổ điển Đồng (Chandelier)',
      image: '/uploads/figma_heritage_chandelier.png',
      position: { top: '3%', left: '17%', width: '15%', aspectRatio: '3/4', zIndex: 15 },
      animation: { direction: 'drop-top', offsetY: -70, delay: 0.1, duration: 0.9 }
    },
    {
      id: 'heritage_vignette',
      name: 'Góc tranh ảnh & Đèn bàn Retro (Vintage Vignette)',
      image: '/uploads/figma_heritage_vignette.png',
      position: { top: '35%', left: '4.5%', width: '37%', aspectRatio: '4/3', zIndex: 10 },
      animation: { direction: 'slide-left', offsetX: -70, delay: 0.15, duration: 0.9 }
    },
    {
      id: 'heritage_table',
      name: 'Bàn tròn Gỗ chạm khắc Cổ (Antique Table)',
      image: '/uploads/figma_heritage_table.png',
      position: { top: '56%', left: '49%', width: '18%', aspectRatio: '1/1', zIndex: 12 },
      animation: { direction: 'fade-scale', offsetY: 60, delay: 0.2, duration: 0.85 }
    },
    {
      id: 'heritage_armchair',
      name: 'Ghế bành Bọc nỉ Retro (Vintage Armchair)',
      image: '/uploads/figma_heritage_armchair.png',
      position: { top: '49%', left: '74%', width: '18%', aspectRatio: '1/1', zIndex: 14 },
      animation: { direction: 'slide-right', offsetX: 70, delay: 0.25, duration: 0.85 }
    }
  ]
};

fs.writeFileSync(siteContentPath, JSON.stringify(siteContent, null, 2), 'utf8');
console.log('Successfully updated data/site-content.json stages!');