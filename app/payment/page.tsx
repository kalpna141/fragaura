"use client";
import { useCartStore } from "@/app/store/cartStore";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, QrCode, Wallet, Lock } from "lucide-react";

export default function PaymentPage() {
  const { items, clear } = useCartStore();
  const [shipping, setShipping] = useState<any>({});
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "UPI" | "CARD">("COD");
  const [mounted, setMounted] = useState(false);

  const subtotal = items.reduce((a, b) => a + b.price * b.qty, 0);
  const shippingFee = items.length ? 50 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shippingFee + tax;

  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvv: "" });
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    // Load from sessionStorage only on client side
    const shippingData = sessionStorage.getItem("shipping");
    const paymentData = sessionStorage.getItem("paymentMethod");

    if (shippingData) {
      setShipping(JSON.parse(shippingData));
    }
    if (paymentData) {
      setPaymentMethod(paymentData as "COD" | "UPI" | "CARD");
    }
    setMounted(true);
  }, []);

  async function payNow() {
    setLoading(true);

    const res = await fetch("/api/auth/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        shipping,
        paymentMethod,
        subtotal,
        shippingFee,
        tax,
        total,
      }),
    });

    setLoading(false);

    if (res.ok) {
      clear();
      window.location.href = "/order/success";
    } else {
      window.location.href = "/order/failed";
    }
  }

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-sky-600 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent"
      >
        SECURE PAYMENT
      </motion.h1>

      <div className="grid md:grid-cols-[1fr_350px] gap-6">
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border-2 border-sky-200 rounded-3xl p-6 md:p-8 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl">
              <Lock className="text-sky-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-sky-800">
                Payment Method
              </h2>
              <p className="text-sm text-sky-600">
                All transactions are secure and encrypted
              </p>
            </div>
          </div>

          {paymentMethod === "UPI" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border border-sky-200">
                <QrCode className="text-sky-600" size={32} />
                <div>
                  <h3 className="font-semibold text-sky-900">UPI Payment</h3>
                  <p className="text-sm text-sky-600">
                    Fast & secure UPI payment
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-2">
                  Enter UPI ID
                </label>
                <input
                  className="w-full border-2 border-sky-300 rounded-xl px-4 py-3 text-sky-900 focus:border-sky-500 focus:outline-none"
                  placeholder="yourname@upi"
                  value={upi}
                  onChange={(e) => setUpi(e.target.value)}
                />
              </div>

              <button
                onClick={() => setShowQR(!showQR)}
                className="w-full border-2 border-sky-300 rounded-xl py-3 text-sky-700 font-medium hover:bg-sky-50 transition-colors flex items-center justify-center gap-2"
              >
                <QrCode size={20} />
                {showQR ? "Hide QR Code" : "Show QR Code"}
              </button>

              <AnimatePresence>
                {showQR && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white border-2 border-sky-300 rounded-xl p-6 flex flex-col items-center"
                  >
                    <div className="bg-white p-4 rounded-lg shadow-inner">
                      {/* <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=kalpnathakur141@oksbi&pn=Kalpna%20Attar&am=${total}&cu=INR`}
                        alt="UPI QR Code"
                        className="w-48 h-48"
                      /> */}
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=kalpnathakur141@oksbi&pn=Kalpna%20Attar&am=${total}&cu=INR`}
                        alt="UPI QR Code"
                        className="w-48 h-48"
                      />
                    </div>
                    <p className="text-sm text-sky-600 mt-3">
                      Scan with any UPI app
                    </p>
                    <p className="text-xs text-sky-500 mt-1">
                      kalpnathakur141@oksbi
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {paymentMethod === "CARD" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border border-sky-200">
                <CreditCard className="text-sky-600" size={32} />
                <div>
                  <h3 className="font-semibold text-sky-900">Card Payment</h3>
                  <p className="text-sm text-sky-600">
                    Credit/Debit card payment
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-2">
                  Card Number
                </label>
                <input
                  className="w-full border-2 border-sky-300 rounded-xl px-4 py-3 text-sky-900 focus:border-sky-500 focus:outline-none"
                  placeholder="1234 5678 9012 3456"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                  maxLength={19}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-2">
                  Name on Card
                </label>
                <input
                  className="w-full border-2 border-sky-300 rounded-xl px-4 py-3 text-sky-900 focus:border-sky-500 focus:outline-none"
                  placeholder="John Doe"
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    className="w-full border-2 border-sky-300 rounded-xl px-4 py-3 text-sky-900 focus:border-sky-500 focus:outline-none"
                    placeholder="MM/YY"
                    value={card.exp}
                    onChange={(e) => setCard({ ...card, exp: e.target.value })}
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="password"
                    className="w-full border-2 border-sky-300 rounded-xl px-4 py-3 text-sky-900 focus:border-sky-500 focus:outline-none"
                    placeholder="123"
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                    maxLength={3}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {paymentMethod === "COD" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 p-6 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border border-sky-200"
            >
              <Wallet className="text-sky-600" size={48} />
              <div>
                <h3 className="font-semibold text-sky-900 text-lg">
                  Cash on Delivery
                </h3>
                <p className="text-sm text-sky-600 mt-1">
                  Pay with cash when your order arrives at your doorstep
                </p>
              </div>
            </motion.div>
          )}
        </motion.section>

        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border-2 border-sky-200 rounded-3xl p-6 h-fit shadow-lg sticky top-20"
        >
          <h3 className="text-2xl font-bold mb-6 text-sky-800">
            ORDER SUMMARY
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sky-900">
              <span>Subtotal</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sky-900">
              <span>Shipping</span>
              <span className="font-semibold">₹{shippingFee}</span>
            </div>
            <div className="flex justify-between text-sky-900">
              <span>Tax</span>
              <span className="font-semibold">₹{tax}</span>
            </div>

            <div className="border-t-2 border-sky-200 pt-3">
              <div className="flex justify-between text-xl font-bold text-sky-800">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          <motion.button
            disabled={loading}
            onClick={payNow}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl py-4 shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock size={20} />
                PAY NOW
              </>
            )}
          </motion.button>

          <p className="text-xs text-sky-600 text-center mt-4">
            Your payment information is safe and secure
          </p>
        </motion.aside>
      </div>
    </div>
  );
}
