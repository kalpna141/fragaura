"use client";
import { useCartStore } from "@/app/store/cartStore";
import { useCouponStore } from "@/app/store/couponStore";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, MapPin, CreditCard, Tag, X, Check } from "lucide-react";

export default function CheckoutPage() {
  const { items } = useCartStore();
  const { appliedCoupon, applyCoupon, removeCoupon, calculateDiscount } = useCouponStore();

  const subtotal = items.reduce((a,b)=>a+b.price*b.qty,0);
  const itemCount = items.reduce((a,b)=>a+b.qty,0);
  const shippingFee = items.length ? 50 : 0;
  const discount = calculateDiscount(subtotal, itemCount);
  const tax = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + shippingFee + tax;

  const [shipping, setShipping] = useState({
    fullName:"", phone:"", address:"", city:"", state:"", pin:""
  });
  const [paymentMethod, setPaymentMethod] = useState<"COD"|"UPI"|"CARD">("UPI");
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  // Mock coupon data - in production, this would come from an API
  const availableCoupons = [
    {
      code: "WELCOME10",
      type: "percentage" as const,
      value: 10,
      description: "10% off on first order",
      minPurchase: 500,
      maxDiscount: 200
    },
    {
      code: "FLAT200",
      type: "fixed" as const,
      value: 200,
      description: "Flat ₹200 off",
      minPurchase: 1000,
      maxDiscount: 200
    },
    {
      code: "B2G1FREE",
      type: "b2g1" as const,
      value: 0,
      description: "Buy 2 Get 1 Free",
      minPurchase: 0,
      maxDiscount: 999999
    }
  ];

  function handleApplyCoupon() {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (!coupon) {
      setCouponError("Invalid coupon code");
      return;
    }
    if (subtotal < coupon.minPurchase) {
      setCouponError(`Minimum purchase of ₹${coupon.minPurchase} required`);
      return;
    }
    applyCoupon(coupon);
    setCouponError("");
    setCouponCode("");
  }

  function next() {
    sessionStorage.setItem("shipping", JSON.stringify(shipping));
    sessionStorage.setItem("paymentMethod", paymentMethod);
    window.location.href = "/payment";
  }

  const inputLabels: Record<string, string> = {
    fullName: "Full Name",
    phone: "Phone Number",
    address: "Address",
    city: "City",
    state: "State",
    pin: "PIN Code"
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent"
      >
        CHECKOUT
      </motion.h1>

      <div className="grid md:grid-cols-[1fr_400px] gap-8">

        {/* SHIPPING DETAILS LEFT */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border-2 border-sky-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl">
              <User className="text-sky-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-sky-800">SHIPPING DETAILS</h3>
          </div>

          <div className="space-y-4">
            {Object.entries(shipping).map(([k, v]) => (
              <div key={k}>
                <label className="block text-sm font-medium text-sky-700 mb-2">
                  {inputLabels[k]}
                </label>
                <input
                  className="w-full border-2 border-sky-300 rounded-xl px-4 py-3 text-sky-900 focus:border-sky-500 focus:outline-none transition-colors"
                  placeholder={inputLabels[k]}
                  value={v}
                  onChange={e => setShipping({ ...shipping, [k]: e.target.value })}
                  required
                />
              </div>
            ))}
          </div>

          <div className="pt-6 border-t-2 border-sky-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl">
                <CreditCard className="text-sky-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-sky-800">PAYMENT METHODS</h3>
            </div>

            <div className="space-y-3">
              {[
                { value: "COD", label: "Cash on Delivery" },
                { value: "UPI", label: "UPI Payment" },
                { value: "CARD", label: "Card Payment" }
              ].map(option => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === option.value
                      ? "border-sky-500 bg-sky-50"
                      : "border-sky-200 hover:border-sky-300 hover:bg-sky-50/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === option.value as any}
                    onChange={() => setPaymentMethod(option.value as any)}
                    className="w-5 h-5 accent-sky-500"
                  />
                  <span className="text-sky-900 font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ORDER SUMMARY RIGHT */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border-2 border-sky-200 rounded-3xl p-6 h-fit shadow-lg sticky top-20"
        >
          <h3 className="text-2xl font-bold mb-6 text-sky-800">ORDER SUMMARY</h3>

          {/* Coupon Section */}
          <div className="mb-6 p-4 bg-gradient-to-r from-sky-50 to-blue-50 border-2 border-sky-200 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="text-sky-600" size={20} />
              <h4 className="font-semibold text-sky-800">Apply Coupon</h4>
            </div>

            {appliedCoupon ? (
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3 flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <Check className="text-green-600 mt-0.5" size={18} />
                  <div>
                    <p className="font-bold text-green-800 font-mono">{appliedCoupon.code}</p>
                    <p className="text-sm text-green-700">{appliedCoupon.description}</p>
                    <p className="text-xs text-green-600 mt-1">
                      Saved ₹{Math.round(discount)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError("");
                    }}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 border-2 border-sky-300 rounded-lg focus:border-sky-500 focus:outline-none text-sm font-mono uppercase"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-md transition-shadow text-sm"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-xs text-red-600 mt-2">{couponError}</p>
                )}
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-sky-600 font-medium">Available Coupons:</p>
                  {availableCoupons.map(c => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCouponCode(c.code);
                        setCouponError("");
                      }}
                      className="block w-full text-left text-xs text-sky-700 hover:text-sky-900 hover:bg-sky-100 px-2 py-1 rounded transition-colors"
                    >
                      <span className="font-mono font-bold">{c.code}</span> - {c.description}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sky-900">
              <span>Items total</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Coupon discount</span>
                <span className="font-semibold">-₹{Math.round(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sky-900">
              <span>Shipping</span>
              <span className="font-semibold">₹{shippingFee}</span>
            </div>
            <div className="flex justify-between text-sky-900">
              <span>Tax (5%)</span>
              <span className="font-semibold">₹{tax}</span>
            </div>

            <div className="border-t-2 border-sky-200 pt-4">
              <div className="flex justify-between text-lg font-bold text-sky-800">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              {discount > 0 && (
                <p className="text-sm text-green-600 text-right mt-1">
                  You saved ₹{Math.round(discount)}!
                </p>
              )}
            </div>
          </div>

          <motion.button
            onClick={next}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-bold rounded-xl py-4 mt-6 shadow-lg transition-all"
          >
            PLACE ORDER
          </motion.button>

          <p className="text-xs text-sky-600 text-center mt-4">
            By placing this order, you agree to our Terms & Conditions
          </p>
        </motion.aside>

      </div>
    </div>
  );
}
