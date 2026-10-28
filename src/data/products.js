export const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Earphones',
    nameZh: '無線藍牙耳機',
    price: 2999,
    category: 'Audio',
    description: 'Premium wireless earphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. IPX5 water resistant.',
    stock: 25,
    rating: 4.5,
    icon: '🎧'
  },
  {
    id: 2,
    name: 'Smartwatch Pro',
    nameZh: '智慧手錶',
    price: 8999,
    category: 'Wearables',
    description: 'Advanced smartwatch with health monitoring, GPS tracking, AMOLED display, and 7-day battery life. Compatible with iOS and Android.',
    stock: 12,
    rating: 4.8,
    icon: '⌚'
  },
  {
    id: 3,
    name: 'Powerbank 20000mAh',
    nameZh: '便攜式充電器',
    price: 1299,
    category: 'Accessories',
    description: 'High-capacity portable charger with fast charging support. Dual USB-C and USB-A ports. LED battery indicator.',
    stock: 50,
    rating: 4.3,
    icon: '🔋'
  },
  {
    id: 4,
    name: 'Wireless Mouse',
    nameZh: '無線滑鼠',
    price: 899,
    category: 'Accessories',
    description: 'Ergonomic wireless mouse with silent clicks, adjustable DPI up to 4000, and USB-C rechargeable battery.',
    stock: 40,
    rating: 4.2,
    icon: '🖱️'
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    nameZh: '機械鍵盤',
    price: 3999,
    category: 'Computing',
    description: 'RGB mechanical keyboard with hot-swappable switches, aluminum frame, PBT keycaps, and customizable macros.',
    stock: 18,
    rating: 4.7,
    icon: '⌨️'
  },
  {
    id: 6,
    name: 'HD Webcam 1080p',
    nameZh: '網路攝影機',
    price: 2199,
    category: 'Audio',
    description: 'Full HD webcam with auto-focus, built-in noise-cancelling microphone, and adjustable field of view.',
    stock: 30,
    rating: 4.1,
    icon: '📷'
  },
  {
    id: 7,
    name: 'USB Flash Drive 128GB',
    nameZh: 'USB 隨身碟',
    price: 599,
    category: 'Accessories',
    description: 'Ultra-fast USB 3.2 flash drive with read speeds up to 400MB/s. Metal casing with keyring loop.',
    stock: 100,
    rating: 4.0,
    icon: '💾'
  },
  {
    id: 8,
    name: 'Desktop Speakers',
    nameZh: '桌面擴音器',
    price: 1599,
    category: 'Audio',
    description: 'Premium desktop speakers with deep bass, 3D surround sound, and Bluetooth 5.3 connectivity.',
    stock: 22,
    rating: 4.4,
    icon: '🔊'
  },
  {
    id: 9,
    name: 'Gaming Headset',
    nameZh: '電競耳機',
    price: 4599,
    category: 'Gaming',
    description: '7.1 surround sound gaming headset with retractable microphone, RGB lighting, and memory foam ear cushions.',
    stock: 15,
    rating: 4.6,
    icon: '🎮'
  },
  {
    id: 10,
    name: 'Smart LED Bulb Pack',
    nameZh: '智能LED燈泡',
    price: 1899,
    category: 'Smart Home',
    description: 'Pack of 3 smart LED bulbs with 16 million colors. Voice control compatible with Alexa and Google Home.',
    stock: 35,
    rating: 4.3,
    icon: '💡'
  },
  {
    id: 11,
    name: 'Laptop Stand',
    nameZh: '筆電支架',
    price: 1499,
    category: 'Accessories',
    description: 'Adjustable aluminum laptop stand with 360° rotation, heat dissipation design, and foldable structure.',
    stock: 28,
    rating: 4.5,
    icon: '💻'
  },
  {
    id: 12,
    name: 'Wireless Charger Pad',
    nameZh: '無線充電板',
    price: 999,
    category: 'Accessories',
    description: '15W fast wireless charging pad with LED indicator, anti-slip surface, and foreign object detection.',
    stock: 45,
    rating: 4.1,
    icon: '⚡'
  },
  {
    id: 13,
    name: 'Portable Monitor 15.6"',
    nameZh: '便攜式螢幕',
    price: 7999,
    category: 'Computing',
    description: '15.6 inch portable monitor with 1080p IPS display, USB-C connectivity, built-in speakers, and protective case.',
    stock: 8,
    rating: 4.7,
    icon: '🖥️'
  },
  {
    id: 14,
    name: 'Smart Security Camera',
    nameZh: '智能攝影機',
    price: 3499,
    category: 'Smart Home',
    description: '2K smart security camera with night vision, motion detection, two-way audio, and cloud storage.',
    stock: 20,
    rating: 4.4,
    icon: '📹'
  },
  {
    id: 15,
    name: 'Gaming Mouse Pad XL',
    nameZh: '電競滑鼠墊',
    price: 699,
    category: 'Gaming',
    description: 'Extra-large gaming mouse pad with RGB edge lighting, micro-textured surface, and anti-slip rubber base.',
    stock: 55,
    rating: 4.2,
    icon: '🎯'
  },
  {
    id: 16,
    name: 'Smart Plug WiFi',
    nameZh: '智能插座',
    price: 499,
    category: 'Smart Home',
    description: 'WiFi smart plug with energy monitoring, scheduling, and voice control. Works with Alexa, Google Home, and Siri.',
    stock: 60,
    rating: 4.0,
    icon: '🔌'
  }
];

export const categories = [
  'All',
  'Audio',
  'Wearables',
  'Accessories',
  'Computing',
  'Gaming',
  'Smart Home'
];

export const getCategoryMeta = (category) => {
  switch (category) {
    case 'Audio':
      return { gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: '🎧' };
    case 'Wearables':
      return { gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', icon: '⌚' };
    case 'Computing':
      return { gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', icon: '💻' };
    case 'Gaming':
      return { gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', icon: '🎮' };
    case 'Smart Home':
      return { gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', icon: '🏠' };
    default:
      return { gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', icon: '💻' };
  }
};
