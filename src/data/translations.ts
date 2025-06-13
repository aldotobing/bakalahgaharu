import { Translation, Language } from '../types';

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

export const translations: Record<string, Translation> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      contact: 'Contact'
    },
    hero: {
      title: 'Premium Agarwood Exporter from Indonesia',
      subtitle: 'Welcome to PT Bakalah Gaharu Nusantara – Your trusted partner for high-quality agarwood products, sustainably sourced from East Java',
      cta: 'Explore Products'
    },
    about: {
      title: 'About Our Company',
      established: 'Established in 2015',
      location: 'Located in Probolinggo, East Java',
      description: 'PT Bakalah Gaharu Nusantara is a leading exporter of premium agarwood products from Indonesia. We are committed to sustainable harvesting practices while delivering the finest quality agarwood to international markets.',
      features: [
        'Premium Quality Assurance',
        'Sustainable Harvesting',
        'International Export Standards',
        'Community Partnership',
        'Environmental Responsibility'
      ],
      customOrder: {
        title: 'Looking for custom orders or bulk quantities?',
        subtitle: 'Quick Contact via WhatsApp',
        button: 'Contact Us Now'
      }
    },
    products: {
      title: 'Our Premium Products',
      subtitle: 'Discover our carefully selected agarwood collection, highly demanded in Middle Eastern markets',
      grade: 'Grade',
      colors: 'Colors',
      price: 'Price',
      viewDetails: 'View Details',
      inquiryNote: 'Click to inquire about pricing and availability',
      productDetails: {
        description: 'Product Description',
        details: 'Product Details',
        productId: 'Product ID',
        availability: 'Availability',
        inStock: 'In Stock',
        shipping: 'Shipping',
        worldwide: 'Worldwide',
        leadTime: 'Lead Time',
        businessDays: 'business days',
        share: 'Share this product',
        shareOn: 'Share on',
        copyLink: 'Copy link',
        linkCopied: 'Link copied to clipboard!'
      },
      customOrder: {
        title: 'Looking for custom orders or bulk quantities?',
        button: 'Contact Us',
        whatsappButton: 'Chat on WhatsApp'
      }
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Ready to place an order or have questions? Get in touch with our team',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      workingHours: 'Monday - Friday: 9:00 - 17:00 WIB',
      emailUs: 'Email Us',
      callUs: 'Call Us',
      visitUs: 'Visit Us',
      socialMedia: 'Follow Us',
      getDirections: 'Get Directions',
      info: 'Contact Information',
      whatsapp: {
        defaultMessage: "Hello! I'm interested in your products and would like to get more information. Could you please provide details about your offerings and pricing?",
        name: 'Name',
        email: 'Email',
        message: 'Message',
        lookingForward: 'Looking forward to your response!',
        sentFrom: 'Sent from bakalahgaharu.com'
      },
      form: {
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message',
        send: 'Send Message'
      }
    },
    footer: {
      company: 'PT Bakalah Gaharu Nusantara',
      tagline: 'Premium Agarwood Exporter',
      description: 'Your trusted partner for high-quality agarwood products, sustainably sourced from East Java, Indonesia.',
      quickLinks: 'Quick Links',
      contactInfo: 'Contact Info',
      followUs: 'Follow Us',
      rights: 'All rights reserved.',
      madeWith: 'Made with',
      inIndonesia: 'in Indonesia',
      phone: '+62 85124776840',
      language: 'Language',
      copyright: '©',
      socialMedia: {
        facebook: 'Visit our Facebook',
        instagram: 'Follow us on Instagram',
        twitter: 'Follow us on Twitter'
      }
    }
  },
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      products: 'Produk',
      contact: 'Kontak'
    },
    hero: {
      title: 'Eksportir Gaharu Premium dari Indonesia',
      subtitle: 'Selamat datang di PT Bakalah Gaharu Nusantara – Mitra terpercaya untuk produk gaharu berkualitas tinggi, dipanen secara berkelanjutan dari Jawa Timur',
      cta: 'Jelajahi Produk'
    },
    about: {
      title: 'Tentang Perusahaan Kami',
      established: 'Didirikan pada tahun 2015',
      location: 'Berlokasi di Probolinggo, Jawa Timur',
      description: 'PT Bakalah Gaharu Nusantara adalah eksportir terkemuka produk gaharu premium dari Indonesia. Kami berkomitmen pada praktik pemanenan berkelanjutan sambil menghadirkan gaharu berkualitas terbaik ke pasar internasional.',
      features: [
        'Jaminan Kualitas Premium',
        'Pemanenan Berkelanjutan',
        'Standar Ekspor Internasional',
        'Kemitraan Komunitas',
        'Tanggung Jawab Lingkungan'
      ],
      customOrder: {
        title: 'Mencari pesanan khusus atau jumlah besar?',
        subtitle: 'Hubungi Cepat melalui WhatsApp',
        button: 'Hubungi Kami Sekarang'
      }
    },
    products: {
      title: 'Produk Unggulan Kami',
      subtitle: 'Temukan koleksi gaharu pilihan kami yang sangat diminati di pasar Timur Tengah',
      grade: 'Kelas',
      colors: 'Warna',
      price: 'Harga',
      viewDetails: 'Lihat Detail',
      inquiryNote: 'Klik untuk menanyakan harga dan ketersediaan',
      productDetails: {
        description: 'Deskripsi Produk',
        details: 'Detail Produk',
        productId: 'ID Produk',
        availability: 'Ketersediaan',
        inStock: 'Tersedia',
        shipping: 'Pengiriman',
        worldwide: 'Seluruh Dunia',
        leadTime: 'Waktu Pengerjaan',
        businessDays: 'hari kerja',
        share: 'Bagikan produk ini',
        shareOn: 'Bagikan di',
        copyLink: 'Salin tautan',
        linkCopied: 'Tautan berhasil disalin!'
      },
      customOrder: {
        title: 'Mencari pesanan khusus atau jumlah besar?',
        button: 'Hubungi Kami',
        whatsappButton: 'Chat via WhatsApp'
      }
    },
    contact: {
      title: 'Hubungi Kami',
      subtitle: 'Siap memesan atau ada pertanyaan? Hubungi tim kami',
      email: 'Email',
      phone: 'Telepon',
      address: 'Alamat',
      workingHours: 'Senin - Jumat: 09:00 - 17:00 WIB',
      emailUs: 'Email Kami',
      callUs: 'Telepon Kami',
      visitUs: 'Kunjungi Kami',
      socialMedia: 'Ikuti Kami',
      getDirections: 'Dapatkan Petunjuk',
      info: 'Informasi Kontak',
      whatsapp: {
        defaultMessage: 'Halo! Saya tertarik dengan produk Anda dan ingin mendapatkan informasi lebih lanjut. Bisakah Anda memberikan detail tentang penawaran dan harga?',
        name: 'Nama',
        email: 'Email',
        message: 'Pesan',
        lookingForward: 'Menunggu kabar baik dari Anda!',
        sentFrom: 'Dikirim dari bakalahgaharu.com'
      },
      form: {
        name: 'Nama Anda',
        email: 'Email Anda',
        message: 'Pesan Anda',
        send: 'Kirim Pesan'
      }
    },
    footer: {
      company: 'PT Bakalah Gaharu Nusantara',
      tagline: 'Eksportir Gaharu Premium',
      description: 'Mitra terpercaya untuk produk gaharu berkualitas tinggi, dipanen secara berkelanjutan dari Jawa Timur, Indonesia.',
      quickLinks: 'Tautan Cepat',
      contactInfo: 'Info Kontak',
      followUs: 'Ikuti Kami',
      rights: 'Hak Cipta Dilindungi.',
      madeWith: 'Dibuat dengan',
      inIndonesia: 'di Indonesia',
      phone: '+62 85124776840',
      language: 'Bahasa',
      copyright: '©',
      socialMedia: {
        facebook: 'Kunjungi Facebook kami',
        instagram: 'Ikuti kami di Instagram',
        twitter: 'Ikuti kami di Twitter'
      }
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'حولنا',
      products: 'المنتجات',
      contact: 'اتصل بنا'
    },
    hero: {
      title: 'مصدر العود الفاخر من إندونيسيا',
      subtitle: 'مرحباً بكم في شركة PT Bakalah Gaharu Nusantara – شريككم الموثوق لمنتجات العود عالية الجودة، المحصودة بشكل مستدام من جاوة الشرقية',
      cta: 'استكشف المنتجات'
    },
    about: {
      title: 'حول شركتنا',
      established: 'تأسست في عام 2015',
      location: 'تقع في بروبولينجو، جاوة الشرقية',
      description: 'شركة PT Bakalah Gaharu Nusantara هي مصدر رائد لمنتجات العود الفاخرة من إندونيسيا. نحن ملتزمون بممارسات الحصاد المستدامة مع تقديم أجود أنواع العود للأسواق الدولية.',
      features: [
        'ضمان الجودة الممتازة',
        'حصاد مستدام',
        'معايير التصدير الدولية',
        'شراكة مجتمعية',
        'المسؤولية البيئية'
      ],
      customOrder: {
        title: 'هل تبحث عن طلبات مخصصة أو كميات كبيرة؟',
        subtitle: 'اتصل بنا سريعًا عبر واتساب',
        button: 'اتصل بنا الآن'
      }
    },
    products: {
      title: 'منتجاتنا المميزة',
      subtitle: 'اكتشف مجموعتنا المختارة بعناية من خشب العود، المطلوبة بشدة في أسواق الشرق الأوسط',
      grade: 'الجودة',
      colors: 'الألوان',
      price: 'السعر',
      viewDetails: 'عرض التفاصيل',
      inquiryNote: 'انقر للاستفسار عن الأسعار والتوفر',
      productDetails: {
        description: 'وصف المنتج',
        details: 'تفاصيل المنتج',
        productId: 'معرّف المنتج',
        availability: 'التوفر',
        inStock: 'متوفر',
        shipping: 'الشحن',
        worldwide: 'شحن عالمي',
        leadTime: 'مدة التجهيز',
        businessDays: 'يوم عمل',
        share: 'مشاركة المنتج',
        shareOn: 'مشاركة عبر',
        copyLink: 'نسخ الرابط',
        linkCopied: 'تم نسخ الرابط بنجاح!'
      },
      customOrder: {
        title: 'هل تبحث عن طلبات مخصصة أو كميات كبيرة؟',
        button: 'اتصل بنا',
        whatsappButton: 'تواصل عبر واتساب'
      }
    },
    contact: {
      title: 'اتصل بنا',
      subtitle: 'هل أنت مستعد للطلب أو لديك استفسارات؟ تواصل مع فريقنا',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      address: 'العنوان',
      workingHours: 'الاثنين - الجمعة: 9:00 - 17:00 بتوقيت غرب إندونيسيا',
      emailUs: 'راسلنا عبر البريد',
      callUs: 'اتصل بنا',
      visitUs: 'زورنا',
      socialMedia: 'تابعنا',
      getDirections: 'احصل على الاتجاهات',
      info: 'معلومات الاتصال',
      whatsapp: {
        defaultMessage: 'مرحباً! أنا مهتم بمنتجاتكم وأود الحصول على مزيد من المعلومات. هل يمكنكم تقديم تفاصيل عن عروضكم وأسعاركم؟',
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        message: 'الرسالة',
        lookingForward: 'نتطلع لردكم!',
        sentFrom: 'مرسل من bakalahgaharu.com'
      },
      form: {
        name: 'اسمك',
        email: 'بريدك الإلكتروني',
        message: 'رسالتك',
        send: 'إرسال الرسالة'
      }
    },
    footer: {
      company: 'شركة بقالة عود النوسانتارا',
      tagline: 'مصدر خشب العود الفاخر',
      description: 'شريكك الموثوق لمنتجات خشب العود عالية الجودة، مصدرها مستدام من شرق جاوة، إندونيسيا.',
      quickLinks: 'روابط سريعة',
      contactInfo: 'معلومات الاتصال',
      followUs: 'تابعنا',
      rights: 'جميع الحقوق محفوظة.',
      madeWith: 'مصنوع بـ',
      inIndonesia: 'في إندونيسيا',
      phone: '٦٢ ٨٥١٢٤٧٧٦٨٤٠+',
      language: 'اللغة',
      copyright: '©',
      socialMedia: {
        facebook: 'زوروا صفحتنا على فيسبوك',
        instagram: 'تابعونا على إنستغرام',
        twitter: 'تابعونا على تويتر'
      }
    }
  }
};