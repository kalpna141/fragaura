"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FiltersSidebar from "@/app/components/FiltersSidebar";
import ProductCard from "@/app/components/ProductCard";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    sort: "name_asc",
    topSeller: false,
    mostPopular: false,
    q: "",
  });

  async function load() {
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    params.set("sort", filters.sort);
    params.set("topSeller", String(filters.topSeller));
    params.set("mostPopular", String(filters.mostPopular));

    const res = await fetch(`/api/products?${params.toString()}`);
    setProducts(await res.json());
  }

  useEffect(() => {
    load();
  }, [filters]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-extrabold mb-8 text-center bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
      >
        EXPLORE OUR COLLECTION
      </motion.h1>

      <div className="space-y-6">
        
        <FiltersSidebar onChange={setFilters} />

        {/* PRODUCT GRID RIGHT */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {products.map((p, idx) => (
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
              <p className="text-sky-600 text-lg">No products found</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
