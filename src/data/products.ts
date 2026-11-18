// 1. Blueprint: What fields every product must have
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Audio" | "Computing" | "Accessories";
  rating: number;
  reviewCount: number;
  inStock: boolean;
  image: string;
  specs: Record<string, string>;
}

// 2. Realistic Product Catalog Data
export const PRODUCTS: Product[] = [
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5 Wireless Headphones",
    description:
      "Industry-leading noise canceling with two processors and eight microphones for unprecedented sound quality and crystal-clear hands-free calling.",
    price: 399,
    category: "Audio",
    rating: 4.8,
    reviewCount: 1420,
    inStock: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    specs: {
      "Battery Life": "30 Hours",
      "Connectivity": "Bluetooth 5.2 / 3.5mm",
      "Weight": "250g",
    },
  },
  {
    id: "macbook-air-m3",
    name: "MacBook Air 15\" (M3 Chip)",
    description:
      "Strikingly thin and fast with up to 18 hours of battery life and an expansive Liquid Retina display for effortless multitasking.",
    price: 1299,
    category: "Computing",
    rating: 4.9,
    reviewCount: 890,
    inStock: true,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    specs: {
      "Chip": "Apple M3 (8-core CPU, 10-core GPU)",
      "Memory": "16GB Unified",
      "Storage": "512GB SSD",
    },
  },
  {
    id: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S Performance Mouse",
    description:
      "Quiet Click technology with an 8,000 DPI track-on-glass sensor and MagSpeed electromagnetic scrolling for supreme precision.",
    price: 99,
    category: "Accessories",
    rating: 4.7,
    reviewCount: 3100,
    inStock: true,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
    specs: {
      "Sensor": "8000 DPI Darkfield",
      "Battery": "Up to 70 days",
      "Buttons": "7 custom programmable",
    },
  },
  {
    id: "dell-ultrasharp-27",
    name: "Dell UltraSharp 27\" 4K USB-C Hub Monitor",
    description:
      "Experience pure brilliance with IPS Black technology, exceptional 2000:1 contrast ratio, and 98% DCI-P3 color coverage.",
    price: 549,
    category: "Computing",
    rating: 4.6,
    reviewCount: 420,
    inStock: false,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
    specs: {
      "Resolution": "3840 x 2160 (4K UHD)",
      "Refresh Rate": "60Hz",
      "Power Delivery": "90W via USB-C",
    },
  },
  {
    id: "keychron-q1-pro",
    name: "Keychron Q1 Pro Custom Mechanical Keyboard",
    description:
      "All-metal QMK/VIA wireless custom mechanical keyboard with double-gasket design, screw-in stabs, and hot-swappable switches.",
    price: 199,
    category: "Accessories",
    rating: 4.8,
    reviewCount: 650,
    inStock: true,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    specs: {
      "Layout": "75% ANSI",
      "Connectivity": "Bluetooth 5.1 / Type-C",
      "Body": "Full CNC Aluminum",
    },
  },
];

// 3. Lookup helper: Finds a single product by its id
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

// 4. List helper: Returns all products
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

// 5. Query Filter helper: Filters and sorts products based on searchParams
export interface FilterOptions {
  category?: string;
  sort?: string;
  search?: string;
}

export function getFilteredProducts(options: FilterOptions): Product[] {
  let result = [...PRODUCTS];

  // Filter by Category
  if (options.category && options.category !== "All") {
    result = result.filter(
      (p) => p.category.toLowerCase() === options.category?.toLowerCase()
    );
  }

  // Filter by Search Query
  if (options.search) {
    const q = options.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  // Sort Results
  if (options.sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (options.sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (options.sort === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  }

  return result;
}
