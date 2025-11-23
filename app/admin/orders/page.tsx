"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Truck, CheckCircle, XCircle, Clock } from "lucide-react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("/api/auth/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shipping?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === "all" || order.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} />;
      case "processing":
        return <Clock size={16} />;
      case "shipped":
        return <Truck size={16} />;
      case "cancelled":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse text-sky-600 text-xl">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Orders
        </h1>
        <p className="text-sky-600">Manage customer orders</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" size={20} />
          <input
            type="text"
            placeholder="Search by order ID or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none text-sky-900"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none text-sky-900 font-medium"
        >
          <option value="all">All Status</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Grid */}
      <div className="space-y-4">
        {filteredOrders.map((order, idx) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl">
                  <Truck className="text-sky-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-sky-500 font-medium">Order ID</p>
                  <p className="text-lg font-bold text-sky-900 font-mono">
                    #{order._id?.slice(-8) || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(order.status || 'processing')}`}>
                  {getStatusIcon(order.status || 'processing')}
                  {(order.status || 'processing').charAt(0).toUpperCase() + (order.status || 'processing').slice(1)}
                </span>
                <button className="flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors font-medium">
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl">
              <div>
                <p className="text-xs text-sky-500 mb-1">Customer</p>
                <p className="font-semibold text-sky-900">{order.shipping?.name || 'Guest'}</p>
                <p className="text-sm text-sky-600">{order.shipping?.email || 'N/A'}</p>
              </div>

              <div>
                <p className="text-xs text-sky-500 mb-1">Items</p>
                <p className="font-semibold text-sky-900">
                  {order.items?.reduce((sum: number, item: any) => sum + item.qty, 0) || 0} items
                </p>
                <p className="text-sm text-sky-600">
                  {order.items?.length || 0} products
                </p>
              </div>

              <div>
                <p className="text-xs text-sky-500 mb-1">Payment</p>
                <p className="font-semibold text-sky-900">{order.paymentMethod || 'COD'}</p>
                <p className="text-sm text-sky-600">₹{order.total || 0}</p>
              </div>

              <div>
                <p className="text-xs text-sky-500 mb-1">Date</p>
                <p className="font-semibold text-sky-900">
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                </p>
                <p className="text-sm text-sky-600">
                  {order.createdAt ? new Date(order.createdAt).toLocaleTimeString() : 'N/A'}
                </p>
              </div>
            </div>

            {order.items && order.items.length > 0 && (
              <div className="mt-4 pt-4 border-t border-sky-200">
                <p className="text-sm font-semibold text-sky-700 mb-2">Order Items:</p>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item: any, itemIdx: number) => (
                    <div
                      key={itemIdx}
                      className="flex items-center gap-2 bg-white border border-sky-200 rounded-lg p-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium text-sky-900">{item.name}</p>
                        <p className="text-xs text-sky-600">Qty: {item.qty} × ₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-20">
          <p className="text-sky-600 text-lg">No orders found</p>
        </div>
      )}
    </div>
  );
}
