"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Package,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  TrendingDown
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    productsSold: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/auth/orders")
        ]);

        const products = await productsRes.json();
        const orders = ordersRes.ok ? await ordersRes.json() : [];

        const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
        const productsSold = orders.reduce(
          (sum: number, order: any) =>
            sum + (order.items?.reduce((itemSum: number, item: any) => itemSum + item.qty, 0) || 0),
          0
        );

        setStats({
          totalUsers: 150, // Mock data - replace with actual API call
          totalProducts: products.length,
          totalRevenue,
          productsSold,
          recentOrders: orders.slice(0, 5)
        });
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      change: "+12%",
      isPositive: true
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      change: "+5%",
      isPositive: true
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      change: "+23%",
      isPositive: true
    },
    {
      title: "Products Sold",
      value: stats.productsSold,
      icon: ShoppingBag,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      change: "+18%",
      isPositive: true
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse text-sky-600 text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-sky-600">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${stat.bgColor} border-2 border-sky-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-md`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.isPositive ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-sm text-sky-600 font-medium mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-sky-900">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-md"
      >
        <h2 className="text-2xl font-bold text-sky-800 mb-4">Recent Orders</h2>
        {stats.recentOrders.length === 0 ? (
          <p className="text-sky-600 text-center py-8">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sky-200">
                  <th className="text-left py-3 px-4 text-sky-700 font-semibold">Order ID</th>
                  <th className="text-left py-3 px-4 text-sky-700 font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 text-sky-700 font-semibold">Items</th>
                  <th className="text-left py-3 px-4 text-sky-700 font-semibold">Total</th>
                  <th className="text-left py-3 px-4 text-sky-700 font-semibold">Payment</th>
                  <th className="text-left py-3 px-4 text-sky-700 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order: any, idx: number) => (
                  <tr key={order._id || idx} className="border-b border-sky-100 hover:bg-sky-50 transition-colors">
                    <td className="py-3 px-4 text-sky-900 font-mono text-sm">
                      #{order._id?.slice(-6) || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-sky-900">
                      {order.shipping?.name || 'Guest'}
                    </td>
                    <td className="py-3 px-4 text-sky-900">
                      {order.items?.length || 0} items
                    </td>
                    <td className="py-3 px-4 text-sky-900 font-semibold">
                      ₹{order.total || 0}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.paymentMethod === 'COD'
                          ? 'bg-blue-100 text-blue-700'
                          : order.paymentMethod === 'UPI'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {order.paymentMethod || 'N/A'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sky-600 text-sm">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
