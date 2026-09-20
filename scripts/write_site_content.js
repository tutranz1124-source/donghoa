const fs = require('fs');

const data = {
  settings: {
    siteName: "��ng H�a Design",
    brandName: "��NG H�A DESIGN",
    siteTagline: "Thi?t K? Kh�ng Gian - Truy?n C?m H?ng S?ng",
    siteDescription: "Gi?i ph�p thi?t k? & thi c�ng n?i th?t tr?n g�i, bi?n ng�i nh� mo u?c c?a b?n th�nh hi?n th?c v?i d?u ?n c� nh�n d?c b?n.",
    logo: "/uploads/logo-dong-hoa-property.png",
    hotline: "0906.499.279",
    email: "info@donghoagroup.vn",
    address: "113-115 Ung Van Khi�m, Phu?ng Th?nh M? T�y, TP H? Ch� Minh, Vi?t Nam",
    website: "www.DongHoaGroup.vn",
    navLinks: [
      { label: "Gi?i thi?u", url: "#philosophy" },
      { label: "Phong c�ch thi?t k?", url: "#styles" },
      { label: "Thi c�ng", url: "#philosophy" },
      { label: "Tin t?c", url: "/blog" },
      { label: "Li�n h?", url: "#contact" }
    ],
    copyright: "� 2026 ��ng H�a Design - Dong Hoa Group. All rights reserved."
  },
  hero: {
    backgroundImage: "/uploads/figma_hero.png",
    slides: [
      {
        tag: "��NG H�A DESIGN",
        monogram: "T",
        line1: "hi?t k? kh�ng gian",
        line2: "ruy?n c?m h?ng s?ng",
        description: "N?i th?t sang tr?ng du?c t?o n�n v?i s? s�ng t?o, t�nh c�ng nang v� v? d?p vu?t th?i gian. Gi?i ph�p thi?t k? & thi c�ng n?i th?t tr?n g�i v?i d?u ?n c� nh�n d?c b?n.",
        buttonText: "Xem th�m",
        buttonTarget: "#contact",
        secondaryText: "T�m hi?u v? ch�ng t�i ?",
        secondaryTarget: "#philosophy"
      },
      {
        tag: "��NG H�A DESIGN",
        monogram: "K",
        line1: "h�c bi?t",
        line2: "chu?n x�c t?ng chi ti?t",
        description: "100% b?n v? chu?n th?c t?, kh�ng thi?t k? \"?o\". Xu?ng s?n xu?t tr?c ti?p � Gi?m chi ph� trung gian. B?o h�nh 2 nam, b?o tr� tr?n d?i.",
        buttonText: "Xem th�m",
        buttonTarget: "#philosophy",
        secondaryText: "Kh�m ph� phong c�ch ?",
        secondaryTarget: "#styles"
      },
      {
        tag: "��NG H�A DESIGN",
        monogram: "L",
        line1: "i�n h? ngay",
        line2: "tu v?n kh�ng gian",
        description: "Hotline: 0906.499.279 | Email: info@donghoagroup.vn | Van ph�ng l�m vi?c: 113-115 Ung Van Khi�m, Th?nh M? T�y, TP.HCM",
        buttonText: "G?i y�u c?u",
        buttonTarget: "#contact",
        secondaryText: "Xem tin t?c & c?m nang ?",
        secondaryTarget: "/blog"
      }
    ]
  },
  philosophy: {
    tag: "V? CH�NG T�I",
    heading: "T?M NH�N V� S? M?NH",
    description: "V?i nh?ng d? �n d� ho�n th�nh (t? can h? cao c?p d?n bi?t th?, van ph�ng, showroom). ��ng H�a Design t? h�o mang d?n tr?i nghi?m s?ng tinh t?, ti?n nghi v� d?m ch?t ri�ng cho t?ng gia ch?",
    image: "/uploads/clean_philosophy_photo.png",
    features: [
      {
        title: "Thi?t k? d?c b?n",
        description: "C� nh�n h�a 100% theo phong c�ch v� phong th?y c?a ch? nh�."
      },
      {
        title: "Thi c�ng tr?n g�i",
        description: "�?m b?o d�ng 99% so v?i b?n v? 3D."
      },
      {
        title: "Xu?ng s?n xu?t tr?c ti?p",
        description: "T?i uu 20�30% chi ph� so v?i th? tru?ng."
      }
    ]
  },
  contact: {
    tag: "LI�N H? NGAY V?I CH�NG T�I",
    heading: "K?T N?I C�NG\n��NG H�A DESIGN",
    quote: "�? l?i th�ng tin, d?i ngu Ki?n tr�c su ��ng H�a Design s? li�n h? tu v?n tr?c ti?p v� g?i b�o gi� chi ti?t trong v�ng 15 ph�t.",
    image: "/uploads/clean_contact_photo.png"
  },
  stylesOverview: {
    tag: "C�C S?N PH?M �?C BI?T",
    heading: "PHONG C�CH THI?T K?",
    description: "D� theo du?i n�t t?i gi?n hi?n d?i hay v? d?p sang tr?ng c? di?n, kh�ng gian s?ng lu�n c?n ph?n �nh d�ng th?n th�i c?a ngu?i s? h?u. �� ch�nh l� ch�a kh�a t?o n�n s? kh�c bi?t v� gi� tr? b?n v?ng cho m?i c�ng tr�nh.",
    styles: [
      {
        id: "modern",
        name: "Modern & Minimalist",
        subtitle: "LESS IS MORE",
        description: "Phuong ch�m \"Less is more\". �?y cao s? tinh gi?n trong n?i th?t, ch? gi? l?i nh?ng g� th?c s? c?n thi?t. M�u s?c d?u nh? (tr?ng, kem, x�m), kh�ng gian m? v� ng?p tr�n �nh s�ng t? nhi�n.",
        cardImage: "/uploads/clean_style_modern.png",
        showcaseImage: "/uploads/clean_style_modern.png",
        anchor: "#modern-section"
      },
      {
        id: "cozy",
        name: "Cozy & Warm",
        subtitle: "JAPANDI & NORDIC",
        description: "S? k?t h?p ho�n h?o gi?a n�t tinh t?, g?n g�ng c?a Nh?t B?n v� s? ?m �p, m?c m?c c?a B?c �u. D�ng nhi?u ch?t li?u g? s�ng m�u, m�y, tre, v?i th� v� gam m�u earthy (m�u d?t, kem, xanh l� nh?t).",
        cardImage: "/uploads/clean_style_cozy.png",
        showcaseImage: "/uploads/clean_cozy_armchair.png",
        anchor: "#cozy-section"
      },
      {
        id: "luxury",
        name: "Luxury & Classic",
        subtitle: "�?NG C?P THU?NG LUU",
        description: "�?y t�nh xa hoa v� sang tr?ng l�n m?c t?i da. S? d?ng c�c v?t li?u si�u cao c?p (g? t? nhi�n qu�, d� xuy�n s�ng, kim lo?i m? v�ng, d? th?a ri�ng - bespoke) v?i m?c d? ho�n thi?n t? m?.",
        cardImage: "/uploads/clean_style_luxury.png",
        showcaseImage: "/uploads/clean_luxury_bed.png",
        anchor: "#luxury-section"
      },
      {
        id: "heritage",
        name: "Heritage & Retro",
        subtitle: "HO�I NI?M & C�NG NGHI?P",
        description: "G?i nh? v? th?p ni�n 50 � 80. K?t h?p gi?a nh?ng m�n d? cu k?/k? ni?m v?i nh?ng gam m�u vui tuoi, ph� c�ch (v�ng mustard, xanh teal, cam d?t). M� ph?ng l?i c�c nh� xu?ng cu. �i?m nh?n l� tu?ng g?ch tr?n, s�n b� t�ng m�i, tr?n d? l? ?ng k? thu?t, k?t h?p khung s?t den v� g? th� t?i m�u.",
        cardImage: "/uploads/clean_style_heritage.png",
        showcaseImage: "/uploads/clean_heritage_furniture.png",
        anchor: "#heritage-section"
      }
    ]
  },
  office: {
    tag: "C�C S?N PH?M �?C BI?T",
    headingLine1: "N?I TH?T",
    headingLine2: "VAN PH�NG",
    description: "Thi?t k? n?i th?t van ph�ng kh�ng ch? l� vi?c t?o ra m?t noi l�m vi?c th?m m? v� t?i uu c�ng nang, m� c�n l� gi?i ph�p ki?n t?o kh�ng gian truy?n c?m h?ng, n�ng cao hi?u su?t v� th? hi?n tr?n v?n n�t van h�a doanh nghi?p.",
    heroImage: "/uploads/office_hero_main.png",
    colorSwatches: [
      { color: "#04092b", label: "Deep Navy" },
      { color: "#c5a26c", label: "Warm Gold" },
      { color: "#8c7b6c", label: "Earthy Stone" },
      { color: "#3d4a41", label: "Forest Sage" }
    ],
    galleryCards: [
      { id: 1, image: "/uploads/office_card_1.png", alt: "Kh�ng gian l�m vi?c van ph�ng hi?n d?i" },
      { id: 2, image: "/uploads/office_card_2.png", alt: "Khu v?c l�m vi?c c� nh�n & ti?p kh�ch" },
      { id: 3, image: "/uploads/office_card_3.png", alt: "Module b�n l�m vi?c linh ho?t" }
    ]
  }
};

fs.writeFileSync('data/site-content.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully saved data/site-content.json clean UTF-8!');
