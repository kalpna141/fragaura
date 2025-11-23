"use client";
import { useEffect, useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/app/store/cartStore";
import { useWishlistStore } from "@/app/store/wishlistStore";
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(s => s.addItem);
  const getItemQty = useCartStore(s => s.getItemQty);
  const cartQty = product ? getItemQty(product._id) : 0;
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  const inWishlist = product ? isInWishlist(product._id) : false;

  useEffect(() => {
    async function loadProduct() {
      const res = await fetch(`/api/auth/products`);
      const products = await res.json();
      const found = products.find((p: any) => p.slug === resolvedParams.slug);
      setProduct(found);
    }
    loadProduct();
  }, [resolvedParams.slug]);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse text-sky-600">Loading...</div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">

        {/* LEFT - IMAGE CAROUSEL */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border-2 border-sky-200 shadow-lg group">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="text-sky-600" size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="text-sky-600" size={24} />
                </button>
              </>
            )}

            {/* Image Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {product.isTopSeller && (
                <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                  Top Seller
                </span>
              )}
              {product.isMostPopular && (
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                  Most Popular
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                if (inWishlist) {
                  removeFromWishlist(product._id);
                } else {
                  addToWishlist({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    slug: product.slug
                  });
                }
              }}
              className="absolute top-4 right-4 p-3 bg-white/90 rounded-full hover:scale-110 transition-transform shadow-lg"
            >
              <Heart
                size={24}
                className={inWishlist ? "fill-pink-500 text-pink-500" : "text-gray-600"}
              />
            </button>
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === idx
                      ? "border-sky-500 ring-2 ring-sky-300"
                      : "border-sky-200 hover:border-sky-400"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT - PRODUCT INFO */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-sky-800 mb-2">{product.name}</h1>
            <p className="text-3xl font-bold text-sky-600">₹{product.price}</p>
          </div>

          <div className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-sky-700 uppercase tracking-wide mb-2">
                Fragrance Notes
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.notes?.map((note: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white border border-sky-300 text-sky-700 rounded-full text-sm font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-sky-700 uppercase tracking-wide mb-1">
                Bottle Size
              </h3>
              <p className="text-sky-900">{product.bottleSizeMl} ml</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-sky-700 uppercase tracking-wide mb-1">
                Category
              </h3>
              <span className="inline-block px-3 py-1 bg-sky-100 border border-sky-300 text-sky-700 rounded-full text-sm font-medium capitalize">
                {product.categorySlug}
              </span>
            </div>
          </div>

          {/* Current Cart Quantity */}
          {cartQty > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4">
              <p className="text-green-700 font-medium">
                ✓ {cartQty} {cartQty === 1 ? 'item' : 'items'} already in cart
              </p>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-sky-700 uppercase tracking-wide">
              Quantity to Add
            </h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border-2 border-sky-300 text-sky-600 hover:bg-sky-50 transition-colors font-semibold"
              >
                -
              </button>
              <span className="text-2xl font-bold text-sky-900 min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border-2 border-sky-300 text-sky-600 hover:bg-sky-50 transition-colors font-semibold"
              >
                +
              </button>
            </div>
            <p className="text-sm text-sky-600">
              Total after adding: {cartQty + quantity} {cartQty + quantity === 1 ? 'item' : 'items'}
            </p>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all"
          >
            <ShoppingCart size={24} />
            Add to Cart
          </motion.button>

          {/* Product Description */}
          <div className="pt-4 border-t-2 border-sky-200">
            <h3 className="text-lg font-bold text-sky-800 mb-3">About This Attar</h3>
            <p className="text-sky-900 leading-relaxed">
              Experience the luxurious scent of {product.name}, a masterfully crafted attar
              that combines {product.notes?.join(", ")} to create an unforgettable fragrance.
              Perfect for any occasion, this {product.bottleSizeMl}ml bottle delivers
              long-lasting sophistication and elegance.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
