/**
 * ==========================================================================
 * THE FASHION SENSE - PRODUCT DATABASE
 * --------------------------------------------------------------------------
 * මෙතනින් ඔයාට ඕන විදියට Products add කරන්න, delete කරන්න, හෝ edit කරන්න පුලුවන්.
 * (Easily add, edit or remove products from this array)
 * ==========================================================================
 */

const PRODUCTS_DATA = [
  {
    id: 1,
    title: "Minimalist Oversized Linen Shirt",
    category: "men",
    categoryName: "Men's Collection",
    price: 4850,
    originalPrice: 6200,
    badge: "Sale",
    rating: 4.9,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#ffffff", "#2b2b2b", "#d4af37"],
    description: "Crafted from 100% breathable organic linen, this relaxed-fit shirt is perfect for both casual weekends and upscale evening events. Designed for maximum comfort in tropical climates.",
    featured: true,
    tab: "new"
  },
  {
    id: 2,
    title: "Silk Touch Maxi Wrap Dress",
    category: "women",
    categoryName: "Women's Collection",
    price: 7950,
    originalPrice: 9500,
    badge: "Hot",
    rating: 5.0,
    reviewsCount: 54,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["#991b1b", "#1e293b", "#0f766e"],
    description: "A show-stopping silk-blend wrap dress that flatters all silhouettes. Features flutter sleeves and an adjustable self-tie waist.",
    featured: true,
    tab: "best"
  },
  {
    id: 3,
    title: "Vintage Washed Denim Jacket",
    category: "unisex",
    categoryName: "Streetwear",
    price: 6400,
    originalPrice: 8000,
    badge: "New",
    rating: 4.8,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#3b82f6", "#1f2937"],
    description: "Heavyweight 12oz premium denim with authentic vintage distressing and antique brass hardware. Built to last generations.",
    featured: true,
    tab: "new"
  },
  {
    id: 4,
    title: "Tailored Chino Trousers Slim-Fit",
    category: "men",
    categoryName: "Men's Collection",
    price: 4200,
    originalPrice: 5000,
    badge: null,
    rating: 4.7,
    reviewsCount: 22,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["30", "32", "34", "36"],
    colors: ["#d97706", "#374151", "#1e3a8a"],
    description: "Premium cotton twill with 2% elastane for seamless stretch and comfort. Versatile styling from office boardroom to evening dinner.",
    featured: true,
    tab: "best"
  },
  {
    id: 5,
    title: "Boho Floral Summer Sundress",
    category: "women",
    categoryName: "Women's Collection",
    price: 5200,
    originalPrice: 6500,
    badge: "Sale",
    rating: 4.9,
    reviewsCount: 41,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L"],
    colors: ["#f43f5e", "#fbbf24"],
    description: "Airy, soft cotton sundress featuring delicate hand-printed floral motifs. Features an elastic smocked back for the perfect contour.",
    featured: true,
    tab: "offer"
  },
  {
    id: 6,
    title: "Heavyweight Graphic Drop-Shoulder Tee",
    category: "unisex",
    categoryName: "Streetwear",
    price: 3200,
    originalPrice: 3800,
    badge: "Hot",
    rating: 4.8,
    reviewsCount: 63,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["#111827", "#f3f4f6"],
    description: "240 GSM 100% combed cotton with screen-printed original minimalist typography. Pre-shrunk for the ultimate boxy fit.",
    featured: true,
    tab: "new"
  },
  {
    id: 7,
    title: "Italian Leather Minimalist Belt",
    category: "accessories",
    categoryName: "Accessories",
    price: 2900,
    originalPrice: 3500,
    badge: null,
    rating: 4.9,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["M", "L"],
    colors: ["#78350f", "#000000"],
    description: "Handcrafted full-grain leather belt paired with a brushed nickel buckle. A timeless luxury essential.",
    featured: false,
    tab: "best"
  },
  {
    id: 8,
    title: "Classic Ribbed Knit Cardigan",
    category: "women",
    categoryName: "Women's Collection",
    price: 6800,
    originalPrice: 8200,
    badge: "Sale",
    rating: 4.6,
    reviewsCount: 15,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L"],
    colors: ["#d6d3d1", "#44403c"],
    description: "Buttery soft fine-gauge knit cardigan with tortoise-shell buttons and relaxed drop shoulders.",
    featured: true,
    tab: "offer"
  }
];

// Helper to format currency in Sri Lankan Rupees
function formatPrice(amount) {
  return "Rs. " + amount.toLocaleString('en-US');
}
