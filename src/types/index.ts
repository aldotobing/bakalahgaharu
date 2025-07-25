export type LanguageCode = "en" | "id" | "ar";

export interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
}

export interface PriceOption {
  price: number;
  size: string;
  unit: string;
}

export interface Product {
  id: string;
  name: {
    en: string;
    id: string;
    ar: string;
  };
  grade: string;
  colors: string[];
  prices?: PriceOption[]; // For products with multiple price options
  price?: number; // For backward compatibility with single-price products
  unit?: string; // Unit for single-price products (e.g., 'kg', 'g', 'ml')
  currency: string;
  description: {
    en: string;
    id: string;
    ar: string;
  };
  image: string; // This remains for backward compatibility
  images?: string[]; // New array of image URLs
  badge?: {
    en: string;
    id: string;
    ar: string;
  };
}

export interface Translation {
  nav: {
    home: string;
    about: string;
    products: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    established: string;
    location: string;
    description: string;
    features: string[];
    customOrder: {
      title: string;
      subtitle: string;
      button: string;
    };
  };
  products: {
    title: string;
    subtitle: string;
    grade: string;
    colors: string;
    price: string;
    viewDetails: string;
    inquiryNote: string;
    productDetails: {
      description: string;
      details: string;
      productId: string;
      availability: string;
      inStock: string;
      shipping: string;
      worldwide: string;
      leadTime: string;
      businessDays: string;
      share: string;
      shareOn: string;
      copyLink: string;
      linkCopied: string;
    };
    customOrder: {
      title: string;
      button: string;
      whatsappButton: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    address: string;
    workingHours: string;
    emailUs: string;
    callUs: string;
    visitUs: string;
    socialMedia: string;
    getDirections: string;
    info: string;
    whatsapp: {
      defaultMessage: string;
      name: string;
      email: string;
      message: string;
      lookingForward: string;
      sentFrom: string;
    };
    form: {
      name: string;
      email: string;
      message: string;
      send: string;
    };
  };
  footer: {
    company: string;
    tagline: string;
    description: string;
    quickLinks: string;
    contactInfo: string;
    followUs: string;
    rights: string;
    madeWith: string;
    inIndonesia: string;
    phone: string;
    language: string;
    copyright: string;
    socialMedia: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
  };
}
