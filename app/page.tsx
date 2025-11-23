"use client";
import { useEffect, useState } from "react";
import AnimatedSection from "./components/AnimatedSection";
import ProductCard from "./components/ProductCard";
import CategoryPill from "./components/CategoryPill";
import { motion } from "framer-motion";
import amb from "../public/file copy.svg"
import Image from "next/image";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`/api/auth/products`),
        fetch(`/api/auth/categories`)
      ]);
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      setProducts(productsData);
      setCategories(categoriesData);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="inline-block w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const featured = products.slice(0,4);
  const bestSellers = products.filter((p:any)=>p.isTopSeller).slice(0,6);

  return (
    <div className="max-w-6xl mx-auto px-4">

      {/* HERO BANNER */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mt-6 rounded-3xl bg-gradient-to-br from-sky-400 via-blue-500 to-purple-600 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: "linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)",
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold relative z-10">Discover Your Signature Attar</h1>
          <p className="mt-2 text-sky-50 relative z-10">Luxury oils crafted to match your aura.</p>
        </motion.div>
        <motion.a
          href="/shop"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-sky-600 px-8 py-4 rounded-xl font-bold hover:bg-sky-50 transition-colors shadow-lg relative z-10"
        >
          Shop Now
        </motion.a>
      </motion.section>

      {/* FEATURED PRODUCTS */}
      <AnimatedSection>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mt-12 mb-6 bg-gradient-to-r from-sky-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Featured Products
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((p:any, idx:number)=> (
            <motion.div
              key={p._id}
              initial={{
                opacity: 0,
                x: idx % 2 === 0 ? -50 : 50,
                y: 30
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0
              }}
              viewport={{ once: true }}
              transition={{
                delay: idx * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
            >
              <ProductCard p={p} />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* CATEGORIES */}
      <AnimatedSection>
        <motion.h2
          id="categories"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mt-12 mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent"
        >
          Categories
        </motion.h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((c:any, idx:number)=> (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <CategoryPill c={c} />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* BEST SELLERS CAROUSEL */}
      <AnimatedSection>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mt-12 mb-6 bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 bg-clip-text text-transparent"
        >
          Best Sellers
        </motion.h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {bestSellers.map((p:any, idx:number)=> (
            <motion.div
              key={p._id}
              className="min-w-60"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
            >
              <ProductCard p={p} />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* ABOUT YOU */}
      <AnimatedSection>
        <section id="about" className="mt-14 bg-white border-2 border-sky-200 rounded-3xl p-8 grid md:grid-cols-2 gap-6 items-center shadow-md">
          <Image
          width = {100}
            src={amb}
            className="rounded-2xl object-cover h-72 w-full"
            alt="Kalpna"
          />
          <div>
            <h3 className="text-2xl font-bold text-sky-700">Kalpna — Brand Ambassador</h3>
            <p className="mt-2 text-sky-900">
              I created Fragura to bring timeless, alcohol-free luxury scents
              to everyday life. Each blend is crafted to feel personal,
              memorable, and long-lasting.
            </p>
          </div>
        </section>
      </AnimatedSection>

    </div>
  );
}
