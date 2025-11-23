"use client";
import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/app/components/ProductCard";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch(`/api/products?category=${resolvedParams.slug}`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 mt-6 text-center py-20">
        <div className="animate-pulse text-sky-600">Loading...</div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold capitalize mb-2 bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
      >
        {resolvedParams.slug.replace(/-/g, " ")} Attars
      </motion.h1>
      <p className="text-sky-600 mb-8">Discover our exquisite collection of {resolvedParams.slug.replace(/-/g, " ")} fragrances</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p: any, idx: number) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <ProductCard p={p} />
          </motion.div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-sky-600 text-lg">No products found in this category</p>
        </div>
      )}
    </main>
  );
}
