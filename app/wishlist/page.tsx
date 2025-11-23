"use client";
import { useWishlistStore } from "@/app/store/wishlistStore";
import { useCartStore } from "@/app/store/cartStore";
import { motion } from "framer-motion";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore(s => s.addItem);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Heart className="text-pink-500 fill-pink-500" size={32} />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
            MY WISHLIST
          </h1>
        </div>
        <p className="text-sky-600">Your favorite attars in one place</p>
      </motion.div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <Heart className="mx-auto text-gray-300 mb-4" size={80} />
          <h2 className="text-2xl font-bold text-gray-400 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Add some products you love!</p>
          <Link
            href="/shop"
            className="inline-block bg-gradient-to-r from-sky-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-sky-600 hover:to-blue-600 transition-all"
          >
            Browse Products
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border-2 border-pink-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
            >
              <Link href={`/product/${item.slug}`} className="block relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeItem(item._id);
                    }}
                    className="p-2 bg-white/90 rounded-full hover:bg-red-500 hover:text-white transition-colors shadow-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </Link>

              <div className="p-4">
                <Link href={`/product/${item.slug}`}>
                  <h3 className="font-bold text-lg text-sky-900 hover:text-sky-600 transition-colors mb-1">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-sky-700 font-semibold mb-3">₹{item.price}</p>

                <button
                  onClick={() => {
                    addToCart({
                      _id: item._id,
                      name: item.name,
                      price: item.price,
                      image: item.image
                    });
                    removeItem(item._id);
                  }}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
