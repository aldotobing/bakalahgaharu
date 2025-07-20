import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    name: {
      en: "Merauke Mid Grade",
      id: "Gaharu Merauke Kualitas Menengah",
      ar: "عود ميراوكي درجة متوسطة",
    },
    grade: "Mid Grade",
    colors: ["Brown", "Black", "Red"],
    prices: [{ price: 200, size: "1", unit: "kg" }],
    currency: "USD",
    description: {
      en: "The distinctive aroma of super grade merauke gaharu when burned and smelled, is very thick and dense, forming a mini natural or super merauke. This model is very familiar and most in demand by countries such as Saudi Arabia, Abu Dhabi, Dubai, Qatar, and other Middle Eastern regions. Its strong and distinctive aroma can calm, relax and also add a positive aura to the room and yourself.",
      id: "Aroma khas gaharu merauke kualitas super ketika dibakar dan dicium sangat tebal dan padat, membentuk mini natural atau super merauke. Model ini sangat familiar dan paling diminati oleh negara-negara seperti Arab Saudi, Abu Dhabi, Dubai, Qatar, dan wilayah Timur Tengah lainnya. Aroma yang kuat dan khasnya dapat menenangkan, merilekskan dan juga menambah aura positif pada ruangan dan diri Anda.",
      ar: "العطر المميز لخشب العود من نوع ميراوكي عندما يتم حرقه واستنشاقه، يكون كثيفًا وغنيًا، مشكلاً رائحة طبيعية مصغرة أو ميراوكي فائق. هذا النوع مألوف جداً والأكثر طلباً في دول مثل المملكة العربية السعودية وأبو ظبي ودبي وقطر ومناطق الشرق الأوسط الأخرى. رائحته القوية والمميزة يمكن أن تهدئ وتريح وتضيف أيضاً طاقة إيجابية للغرفة ولنفسك.",
    },
    image: "/images/products/product1.jpg",
    badge: {
      en: "Best Seller",
      id: "Paling Laris",
      ar: "الأكثر مبيعاً",
    },
  },
  {
    id: "2",
    name: {
      en: "Merauke Super Grade",
      id: "Gaharu Merauke Kualitas Super",
      ar: "عود ميراوكي درجة ممتازة",
    },
    grade: "Super Grade",
    colors: ["Yellow", "Brown", "Black"],
    prices: [{ price: 375, size: "1", unit: "kg" }],
    currency: "USD",
    description: {
      en: 'The aroma of "Gaharu Merauke Sanai Muhassan" premium grade undoubtedly possesses a distinctive dimension of spices. When burned, it emits not only a sweet and woody scent but also resonates with remarkable spice notes. This fragrance has depth and warmth, evoking nostalgia for the spices traditionally used in Arab and Asian cultures, creating a rich and elegant atmosphere. With each inhalation, this aroma elevates the experience, becoming a symbol of luxury highly valued by the elite.',
      id: 'Aroma "Gaharu Merauke Sanai Muhassan" kualitas premium memiliki dimensi rempah yang khas. Saat dibakar, tidak hanya mengeluarkan aroma manis dan kayu, tetapi juga beresonansi dengan catatan rempah yang luar biasa. Keharuman ini memiliki kedalaman dan kehangatan, membangkitkan kenangan akan rempah-rempah yang secara tradisional digunakan dalam budaya Arab dan Asia, menciptakan suasana yang mewah dan elegan. Dengan setiap tarikan nafas, aroma ini meningkatkan pengalaman, menjadi simbol kemewahan yang sangat dihargai oleh kalangan elit.',
      ar: 'عطر "عود ميراوكي ثاني محسن" من الدرجة الممتازة يمتلك بلا شك بُعداً متميزاً من التوابل. عند حرقه، لا يطلق فقط رائحة حلوة وخشبية، بل يتناغم أيضاً مع نفحات توابل استثنائية. لهذا العطر عمق ودفء، يثير الحنين إلى التوابل المستخدمة تقليدياً في الثقافتين العربية والآسيوية، مما يخلق أجواءً غنية وأنيقة. مع كل استنشاق، يرتقي هذا العطر بالتجربة، ليصبح رمزاً للفخامة التي يقدرها النخبة بشكل كبير.',
    },
    image: "/images/products/product2.jpg",
    badge: {
      en: "Most Wanted",
      id: "Paling Dicari",
      ar: "الأكثر طلباً",
    },
  },
  {
    id: "3",
    name: {
      en: "Premium Sumatran Agarwood Oil",
      id: "Minyak Gaharu Sumatera Premium",
      ar: "زيت العود السومطري الفاخر",
    },
    grade: "Premium Grade",
    colors: ["Golden Amber"],
    prices: [
      { price: 125, size: "12", unit: "ml" },
      { price: 65, size: "6", unit: "ml" },
      { price: 35, size: "3", unit: "ml" },
    ],
    currency: "USD",
    description: {
      en: "Sumatran agarwood oil is a highly esteemed product cherished worldwide. Sourced from the native Aquilaria trees of Sumatra, renowned for producing the finest quality agarwood, this premium commodity is in high demand in the global market. Using traditional steam distillation methods to preserve its aromatic quality and therapeutic properties, our oil captures the essence of centuries-old expertise. It presents a rich, complex fragrance with woody notes, sweet undertones, and subtle spices, while its gentle smoky note adds warmth and character. These characteristics make our Sumatran agarwood oil not just an ordinary essential oil, but an experience that honors both nature and tradition.",
      id: "Minyak gaharu Sumatera adalah produk yang sangat dihargai di seluruh dunia Minyak gaharu Sumatera merupakan komoditas premium yang sangat dicari di pasar global. Diambil dari pohon Aquilaria, asli Sumatera, yang terkenal dengan kualitas gaharu terbaik, dan di proses dengan menggunakan metode suling uap tradisional untuk mempertahankan kualitas aroma dan sifat terapeutik. Memiliki aroma yang kaya, kompleks, dengan nuansa kayu, manis, dan sedikit rempah yang menenangkan, dan aroma sedikit terbakar memberikan kesan dan kehangatan. Dengan karakteristik ini, minyak gaharu Sumatera tidak hanya sekadar minyak gaharu biasa, tetapi juga sebuah pengalaman yang menghargai alam dan tradisi.",
      ar: "زيت العود السومطري هو منتج مرموق يحظى بتقدير عالمي. يتم استخراجه من أشجار العود الأصلية في سومطرة، المعروفة بإنتاج أجود أنواع خشب العود، وهو سلعة فاخرة تحظى بطلب كبير في السوق العالمية. باستخدام طرق التقطير البخاري التقليدية للحفاظ على جودته العطرية وخصائصه العلاجية، يلتقط زيتنا جوهر خبرة قرون من الزمن. يقدم عطراً غنياً ومعقداً مع نفحات خشبية ولمسات حلوة وتوابل خفيفة، بينما تضيف نفحته الدخانية اللطيفة الدفء والشخصية المميزة. هذه الخصائص تجعل زيت العود السومطري ليس مجرد زيت عطري عادي، بل تجربة تكرم الطبيعة والتقاليد.",
    },
    image: "/images/products/MinyakGaharu.jpg",
    badge: {
      en: "Best Seller",
      id: "Paling Laris",
      ar: "الأكثر مبيعاً",
    },
  },
  {
    id: "4",
    name: {
      en: "Patchouli Oil",
      id: "Minyak Nilam",
      ar: "زيت الباتشولي",
    },
    grade: "Super Grade",
    colors: ["Golden Amber"],
    prices: [{ price: 100, size: "1", unit: "kg" }],
    currency: "USD",
    description: {
      en: "Patchouli Oil is an essential oil extracted from the leaves of the Pogostemon cablin plant. Known for its rich and unique aroma, this oil is widely used in perfumes, beauty products, and aromatherapy. Patchouli oil has a strong, sweet, and earthy fragrance, making it popular in the perfume and cosmetics industry. Additionally, it is frequently used in aromatherapy to help alleviate stress and anxiety. Patchouli oil is also known for its antibacterial and antiseptic properties, making it a common ingredient in skincare products to help treat acne and nourish the skin. Overall, patchouli oil is considered a natural ingredient beneficial in various aspects, from beauty to health.",
      id: "Minyak Nilam / Patchouli Oil, adalah minyak esensial yang dihasilkan dari daun tanaman Pogostemon cablin. Dikenal karena aroma yang kaya dan unik, minyak ini sering digunakan dalam parfum, produk kecantikan, dan aromaterapi. Minyak nilam memiliki aroma yang kuat, manis, dan earthy, menjadikannya populer dalam industri parfum dan kosmetik. Selain itu, minyak ini sering digunakan dalam aromaterapi untuk membantu meredakan stres dan kecemasan. Minyak nilam juga dikenal memiliki sifat antibakteri dan antiseptik, sehingga sering ditambahkan dalam produk perawatan kulit untuk membantu mengatasi jerawat dan merawat kulit. Secara umum, minyak nilam dianggap sebagai bahan alami yang bermanfaat dalam berbagai aspek, dari kecantikan hingga kesehatan.",
      ar: "زيت الباتشولي هو زيت عطري يستخرج من أوراق نبات البوغوستيمون كابلن. يُعرف بعطره الغني والفريد، ويستخدم على نطاق واسع في العطور ومستحضرات التجميل والعلاج بالروائح. يتميز زيت الباتشولي برائحة قوية وحلوة وترابية، مما يجعله مفضلاً في صناعة العطور ومستحضرات التجميل. كما يستخدم بشكل متكرر في العلاج بالروائح للمساعدة في تخفيف التوتر والقلق. يُعرف زيت الباتشولي أيضاً بخصائصه المضادة للبكتيريا والمطهرة، مما يجعله مكوناً شائعاً في منتجات العناية بالبشرة للمساعدة في علاج حب الشباب وتغذية البشرة. بشكل عام، يعتبر زيت الباتشولي مكوناً طبيعياً مفيداً في جوانب متعددة، من الجمال إلى الصحة.",
    },
    image: "/images/products/patchouliOil.jpg",
    badge: {
      en: "Best Seller",
      id: "Paling Laris",
      ar: "الأكثر مبيعاً",
    },
  },
];
