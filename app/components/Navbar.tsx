"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  LogIn,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const count = useCartStore((s) => s.items.reduce((a, b) => a + b.qty, 0));
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Connect to real auth

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/shop#categories" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="w-full border-b border-sky-200 bg-white/95 backdrop-blur sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Sparkles
              className="text-sky-500 group-hover:text-sky-600 transition-colors"
              size={32}
            />
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-purple-400 opacity-50" size={32} />
            </motion.div>
          </div>
          <div>
            <span className="font-bold text-xl tracking-wide bg-linear-to-r from-sky-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Fragaura
            </span>
            {/* <p className="text-[10px] text-sky-500 tracking-widest">LUXURY FRAGRANCES</p> */}
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-sky-700">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-sky-500 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4 text-sky-600">
          {isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center gap-2 hover:text-sky-500 transition-colors"
            >
              <LogOut size={20} onClick={() => localStorage.clear()} />
              <span className="text-sm">Logout</span>
            </button>
          ) : (
            <Link
              href="/signin"
              className="flex items-center gap-2 hover:text-sky-500 transition-colors"
            >
              <LogIn size={20} />
              <span className="text-sm">Login</span>
            </Link>
          )}
          <Link
            href="/cart"
            className="relative hover:text-sky-500 transition-colors"
          >
            <ShoppingCart />
            {count > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-linear-to-r from-sky-500 to-blue-500 text-white text-xs rounded-full px-1.5 py-0.5 font-medium"
              >
                {count}
              </motion.span>
            )}
          </Link>
          <Link
            href="/wishlist"
            className="relative hover:text-pink-500 transition-colors"
          >
            <Heart
              className={wishlistCount > 0 ? "fill-pink-500 text-pink-500" : ""}
            />
            {wishlistCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-linear-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full px-1.5 py-0.5 font-medium"
              >
                {wishlistCount}
              </motion.span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <Link href="/cart" className="relative text-sky-600">
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-linear-to-r from-sky-500 to-blue-500 text-white text-xs rounded-full px-1.5 py-0.5 font-medium">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-sky-600 hover:text-sky-500"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-sky-200 bg-linear-to-br from-sky-50 to-blue-50"
          >
            <div className="px-4 py-4 space-y-3">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 px-4 rounded-lg text-sky-700 font-medium hover:bg-sky-100 transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.1 }}
                className="pt-2 border-t border-sky-200"
              >
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 py-2 px-4 rounded-lg text-sky-700 font-medium hover:bg-sky-100 transition-colors"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-2 px-4 rounded-lg text-sky-700 font-medium hover:bg-sky-100 transition-colors"
                  >
                    <LogIn size={20} />
                    Login
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
