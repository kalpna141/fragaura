"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Tag, X, Percent, Gift } from "lucide-react";

interface Coupon {
  _id: string;
  code: string;
  type: "percentage" | "fixed" | "b2g1" | "b3g1";
  value: number;
  description: string;
  minPurchase: number;
  maxDiscount: number;
  expiryDate: string;
  isActive: boolean;
  usageCount: number;
  maxUsage: number;
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      _id: "1",
      code: "WELCOME10",
      type: "percentage",
      value: 10,
      description: "10% off on first order",
      minPurchase: 500,
      maxDiscount: 200,
      expiryDate: "2025-12-31",
      isActive: true,
      usageCount: 45,
      maxUsage: 100
    },
    {
      _id: "2",
      code: "FLAT200",
      type: "fixed",
      value: 200,
      description: "Flat ₹200 off",
      minPurchase: 1000,
      maxDiscount: 200,
      expiryDate: "2025-12-31",
      isActive: true,
      usageCount: 23,
      maxUsage: 50
    },
    {
      _id: "3",
      code: "B2G1FREE",
      type: "b2g1",
      value: 0,
      description: "Buy 2 Get 1 Free",
      minPurchase: 0,
      maxDiscount: 999999,
      expiryDate: "2025-06-30",
      isActive: true,
      usageCount: 12,
      maxUsage: 30
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage" as Coupon["type"],
    value: 0,
    description: "",
    minPurchase: 0,
    maxDiscount: 0,
    expiryDate: "",
    maxUsage: 100
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCoupon) {
      setCoupons(coupons.map(c =>
        c._id === editingCoupon._id
          ? { ...c, ...formData }
          : c
      ));
    } else {
      const newCoupon: Coupon = {
        _id: Date.now().toString(),
        ...formData,
        isActive: true,
        usageCount: 0
      };
      setCoupons([...coupons, newCoupon]);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      code: "",
      type: "percentage",
      value: 0,
      description: "",
      minPurchase: 0,
      maxDiscount: 0,
      expiryDate: "",
      maxUsage: 100
    });
    setEditingCoupon(null);
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      description: coupon.description,
      minPurchase: coupon.minPurchase,
      maxDiscount: coupon.maxDiscount,
      expiryDate: coupon.expiryDate,
      maxUsage: coupon.maxUsage
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      setCoupons(coupons.filter(c => c._id !== id));
    }
  };

  const toggleActive = (id: string) => {
    setCoupons(coupons.map(c =>
      c._id === id ? { ...c, isActive: !c.isActive } : c
    ));
  };

  const getCouponIcon = (type: Coupon["type"]) => {
    switch (type) {
      case "b2g1":
      case "b3g1":
        return <Gift size={20} />;
      case "percentage":
        return <Percent size={20} />;
      default:
        return <Tag size={20} />;
    }
  };

  const getCouponValue = (coupon: Coupon) => {
    switch (coupon.type) {
      case "percentage":
        return `${coupon.value}% OFF`;
      case "fixed":
        return `₹${coupon.value} OFF`;
      case "b2g1":
        return "Buy 2 Get 1";
      case "b3g1":
        return "Buy 3 Get 1";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Coupons
          </h1>
          <p className="text-sky-600">Manage discount codes and promotions</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Plus size={20} />
          Add Coupon
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon, idx) => (
          <motion.div
            key={coupon._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow ${
              coupon.isActive
                ? "bg-white border-sky-200"
                : "bg-gray-50 border-gray-300 opacity-60"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl shadow-md ${
                coupon.type === "b2g1" || coupon.type === "b3g1"
                  ? "bg-gradient-to-br from-pink-500 to-rose-500"
                  : "bg-gradient-to-br from-sky-500 to-blue-500"
              }`}>
                {getCouponIcon(coupon.type)}
                <span className="text-white ml-2"></span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(coupon)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(coupon._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold text-sky-900 font-mono">{coupon.code}</h3>
                <button
                  onClick={() => toggleActive(coupon._id)}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    coupon.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {coupon.isActive ? "Active" : "Inactive"}
                </button>
              </div>
              <p className="text-sm text-sky-600">{coupon.description}</p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-sky-500">Discount:</span>
                <span className="font-bold text-sky-900">{getCouponValue(coupon)}</span>
              </div>
              {coupon.minPurchase > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-sky-500">Min Purchase:</span>
                  <span className="font-semibold text-sky-700">₹{coupon.minPurchase}</span>
                </div>
              )}
              {coupon.type === "percentage" && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-sky-500">Max Discount:</span>
                  <span className="font-semibold text-sky-700">₹{coupon.maxDiscount}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-sky-200 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-sky-500">Usage:</span>
                <span className="font-semibold text-sky-900">
                  {coupon.usageCount} / {coupon.maxUsage}
                </span>
              </div>
              <div className="w-full bg-sky-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-sky-500 to-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${(coupon.usageCount / coupon.maxUsage) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-sky-500">Expires:</span>
                <span className="font-semibold text-sky-700">
                  {new Date(coupon.expiryDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {coupons.length === 0 && (
        <div className="text-center py-20">
          <p className="text-sky-600 text-lg">No coupons created yet</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-sky-900">
                    {editingCoupon ? "Edit Coupon" : "Add New Coupon"}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-sky-700 mb-2">
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none font-mono"
                      placeholder="WELCOME10"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-sky-700 mb-2">
                      Coupon Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as Coupon["type"] })}
                      className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none"
                    >
                      <option value="percentage">Percentage Discount</option>
                      <option value="fixed">Fixed Amount</option>
                      <option value="b2g1">Buy 2 Get 1 Free</option>
                      <option value="b3g1">Buy 3 Get 1 Free</option>
                    </select>
                  </div>

                  {(formData.type === "percentage" || formData.type === "fixed") && (
                    <div>
                      <label className="block text-sm font-semibold text-sky-700 mb-2">
                        {formData.type === "percentage" ? "Discount Percentage" : "Discount Amount (₹)"}
                      </label>
                      <input
                        type="number"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                        className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none"
                        min="0"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-sky-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none"
                      rows={2}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-sky-700 mb-2">
                      Minimum Purchase (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.minPurchase}
                      onChange={(e) => setFormData({ ...formData, minPurchase: Number(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none"
                      min="0"
                    />
                  </div>

                  {formData.type === "percentage" && (
                    <div>
                      <label className="block text-sm font-semibold text-sky-700 mb-2">
                        Maximum Discount (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.maxDiscount}
                        onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                        className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none"
                        min="0"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-sky-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-sky-700 mb-2">
                      Maximum Usage
                    </label>
                    <input
                      type="number"
                      value={formData.maxUsage}
                      onChange={(e) => setFormData({ ...formData, maxUsage: Number(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none"
                      min="1"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    {editingCoupon ? "Update Coupon" : "Create Coupon"}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
