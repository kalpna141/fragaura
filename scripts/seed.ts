import dotenv from "dotenv";
import path from "path";

// Load .env.local from project root FIRST
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function seed() {
  // Dynamic imports AFTER env vars are loaded
  const { connectDB } = await import("@/app/lib/db");
  const Category = (await import("@/app/models/Category")).default;
  const Product = (await import("@/app/models/Product")).default;

  await connectDB();

  // ----------------- Categories -----------------
  const categories = [
    {
      name: "Oud",
      slug: "oud",
      description: "Deep, rich Arabian oud attars crafted with natural wood resins."
    },
    {
      name: "Floral",
      slug: "floral",
      description: "Soft and elegant floral attars with rose, jasmine, and mogra notes."
    },
    {
      name: "Fresh",
      slug: "fresh",
      description: "Crisp, clean, refreshing daily-wear attars suitable for all seasons."
    },
    {
      name: "Sweet",
      slug: "sweet",
      description: "Gourmand and sweet blends with vanilla, amber, and honey."
    },
    {
      name: "Luxury",
      slug: "luxury",
      description: "Premium blends crafted from rare ingredients like saffron, ambergris, and oud."
    }
  ];

  await Category.deleteMany();
  await Category.insertMany(categories);

  // ----------------- Products -----------------
  const products = [
    {
      name: "Royal Oud",
      slug: "royal-oud",
      price: 899,
      images: [
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80",
        "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&q=80",
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80"
      ],
      categorySlug: "oud",
      notes: ["Oud Wood", "Amber", "Saffron"],
      bottleSizeMl: 6,
      isTopSeller: true,
      isMostPopular: true
    },
    {
      name: "Velvet Rose",
      slug: "velvet-rose",
      price: 749,
      images: [
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=500&q=80",
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80",
        "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500&q=80"
      ],
      categorySlug: "floral",
      notes: ["Rose", "Bulgarian Rose", "White Musk"],
      bottleSizeMl: 6,
      isTopSeller: true,
      isMostPopular: false
    },
    {
      name: "Fresh Aqua",
      slug: "fresh-aqua",
      price: 599,
      images: [
        "https://images.unsplash.com/photo-1541599468348-e96984315921?w=500&q=80",
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80",
        "https://images.unsplash.com/photo-1619994558699-447f88a0bb4b?w=500&q=80"
      ],
      categorySlug: "fresh",
      notes: ["Aqua", "Citrus", "White Amber"],
      bottleSizeMl: 6,
      isTopSeller: false,
      isMostPopular: true
    },
    {
      name: "Amber Vanilla",
      slug: "amber-vanilla",
      price: 699,
      images: [
        "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500&q=80",
        "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&q=80",
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&q=80"
      ],
      categorySlug: "sweet",
      notes: ["Amber", "Vanilla", "Honey"],
      bottleSizeMl: 6,
      isTopSeller: false,
      isMostPopular: false
    },
    {
      name: "Saffron Luxe",
      slug: "saffron-luxe",
      price: 1299,
      images: [
        "https://images.unsplash.com/photo-1546514355-7fdc90ccbd03?w=500&q=80",
        "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=500&q=80",
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80"
      ],
      categorySlug: "luxury",
      notes: ["Saffron", "Oud", "Ambergris"],
      bottleSizeMl: 6,
      isTopSeller: false,
      isMostPopular: true
    },
    {
      name: "Mystic Jasmine",
      slug: "mystic-jasmine",
      price: 799,
      images: [
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&q=80",
        "https://images.unsplash.com/photo-1592361756350-81f1748a7e2e?w=500&q=80",
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80"
      ],
      categorySlug: "floral",
      notes: ["Jasmine", "White Musk", "Sandalwood"],
      bottleSizeMl: 6,
      isTopSeller: true,
      isMostPopular: false
    },
    {
      name: "Golden Amber",
      slug: "golden-amber",
      price: 849,
      images: [
        "https://images.unsplash.com/photo-1590156206944-553982a512e8?w=500&q=80",
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80",
        "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&q=80"
      ],
      categorySlug: "sweet",
      notes: ["Amber", "Honey", "Tonka Bean"],
      bottleSizeMl: 6,
      isTopSeller: false,
      isMostPopular: true
    },
    {
      name: "Ocean Breeze",
      slug: "ocean-breeze",
      price: 649,
      images: [
        "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=500&q=80",
        "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&q=80",
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80"
      ],
      categorySlug: "fresh",
      notes: ["Sea Salt", "Bergamot", "Musk"],
      bottleSizeMl: 6,
      isTopSeller: false,
      isMostPopular: false
    }
  ];

  await Product.deleteMany();
  await Product.insertMany(products);

  console.log("SEED COMPLETED SUCCESSFULLY");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
