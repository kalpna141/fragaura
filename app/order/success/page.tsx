"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function OrderSuccessPage() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [orderId, setOrderId] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate order ID on client side only
    setOrderId(Math.random().toString(36).substr(2, 9).toUpperCase());
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 3,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: ['#0ea5e9', '#8b5cf6', '#ec4899']
      });
    }, 50);

    // Get order details from session storage
    const shipping = sessionStorage.getItem("shipping");
    if (shipping) {
      setOrderDetails(JSON.parse(shipping));
    }

    setMounted(true);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-8">
              <CheckCircle className="text-white" size={80} />
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-sky-700">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </motion.div>

        {/* Order Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white border-2 border-sky-200 rounded-3xl p-8 shadow-xl mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-sky-500 font-medium">Order Number</p>
              <p className="text-2xl font-bold text-sky-900 font-mono">
                #{orderId || 'Loading...'}
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl">
              <Package className="text-sky-600" size={32} />
            </div>
          </div>

          {orderDetails && (
            <div className="space-y-4 mb-6 p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl">
              <h3 className="font-semibold text-sky-800">Delivery Address</h3>
              <div className="text-sky-700">
                <p className="font-medium">{orderDetails.fullName}</p>
                <p className="text-sm">{orderDetails.phone}</p>
                <p className="text-sm mt-2">
                  {orderDetails.address}, {orderDetails.city}
                </p>
                <p className="text-sm">
                  {orderDetails.state} - {orderDetails.pin}
                </p>
              </div>
            </div>
          )}

          {/* Order Timeline */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sky-800 mb-4">Order Status</h3>
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-white" size={16} />
                </div>
                <div className="w-0.5 h-12 bg-sky-200" />
              </div>
              <div className="flex-1 pb-4">
                <p className="font-semibold text-sky-900">Order Confirmed</p>
                <p className="text-sm text-sky-600">Your order has been placed successfully</p>
                <p className="text-xs text-sky-500 mt-1">{new Date().toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-sky-200 rounded-full flex items-center justify-center">
                  <Package className="text-sky-600" size={16} />
                </div>
                <div className="w-0.5 h-12 bg-sky-200" />
              </div>
              <div className="flex-1 pb-4">
                <p className="font-semibold text-sky-700">Processing</p>
                <p className="text-sm text-sky-600">We're preparing your order</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-sky-200 rounded-full flex items-center justify-center">
                  <Truck className="text-sky-600" size={16} />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sky-700">Out for Delivery</p>
                <p className="text-sm text-sky-600">Expected within 3-5 business days</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Home size={20} />
            Continue Shopping
          </Link>
          <Link
            href="/shop"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-sky-300 text-sky-700 font-bold rounded-xl hover:bg-sky-50 transition-colors"
          >
            <Package size={20} />
            View Products
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-sky-600">
            A confirmation email has been sent to your registered email address.
          </p>
          <p className="text-sm text-sky-600 mt-2">
            Track your order status in the Orders section.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
