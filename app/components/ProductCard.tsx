"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { useState } from "react";

export default function ProductCard({ p }: { p: any }) {
  const addItem = useCartStore(s => s.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const inWishlist = isInWishlist(p._id);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border-2 border-sky-200 bg-white shadow-md hover:shadow-xl overflow-hidden transition-shadow group"
    >
      <Link
        href={`/product/${p.slug}`}
        className="block relative"
        onMouseEnter={() => {
          setIsHovering(true);
          let currentIdx = 0;
          const interval = setInterval(() => {
            currentIdx = (currentIdx + 1) % p.images.length;
            setImageIndex(currentIdx);
          }, 600);
          (window as any)[`interval_${p._id}`] = interval;
        }}
        onMouseLeave={() => {
          setIsHovering(false);
          setImageIndex(0);
          if ((window as any)[`interval_${p._id}`]) {
            clearInterval((window as any)[`interval_${p._id}`]);
          }
        }}
      >
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-sky-100 to-purple-100">
          <motion.img
            key={imageIndex}
            src={p.images[imageIndex]}
            alt={p.name}
            className="h-48 w-full object-cover"
            animate={{
              opacity: isHovering ? [0.7, 1] : 1,
              scale: isHovering ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        {(p.isTopSeller || p.isMostPopular) && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">
            {p.isTopSeller ? "Top Seller" : "Most Popular"}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (inWishlist) {
              removeFromWishlist(p._id);
            } else {
              addToWishlist({
                _id: p._id,
                name: p.name,
                price: p.price,
                image: p.images[0],
                slug: p.slug
              });
            }
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:scale-110 transition-transform shadow-md"
        >
          <Heart
            size={18}
            className={inWishlist ? "fill-pink-500 text-pink-500" : "text-gray-600"}
          />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-sky-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </Link>

      <div className="p-4 space-y-1">
        <Link href={`/product/${p.slug}`}>
          <h4 className="font-semibold text-sky-900 hover:text-sky-600 transition-colors">{p.name}</h4>
        </Link>
        <p className="text-sm text-sky-700 font-medium">₹{p.price}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            addItem({ _id: p._id, name: p.name, price: p.price, image: p.images[0] });
          }}
          className="mt-2 w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white py-2 text-sm font-medium transition-all shadow-md"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
