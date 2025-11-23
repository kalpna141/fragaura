"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, UserPlus, Edit2, Trash2, Mail, Phone, X } from "lucide-react";

export default function AdminUsers() {
  // Mock data - replace with actual API call
  const [users, setUsers] = useState([
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
      orders: 5,
      totalSpent: 2500,
      joinedDate: "2024-01-15"
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 98765 43211",
      orders: 3,
      totalSpent: 1800,
      joinedDate: "2024-02-20"
    },
    {
      _id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+91 98765 43212",
      orders: 8,
      totalSpent: 4200,
      joinedDate: "2024-01-10"
    },
     {
      _id: "4",
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
      orders: 5,
      totalSpent: 2500,
      joinedDate: "2024-01-15"
    },
     {
      _id: "5",
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
      orders: 5,
      totalSpent: 2500,
      joinedDate: "2024-01-15"
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone
    });
    setShowEditModal(true);
  };

  const handleDelete = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u._id !== userId));
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers(users.map(u =>
      u._id === editingUser._id
        ? { ...u, ...formData }
        : u
    ));
    setShowEditModal(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Users
          </h1>
          <p className="text-sky-600">Manage your customers</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <UserPlus size={20} />
          Add User
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" size={20} />
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none text-sky-900"
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-sky-900">{user.name}</h3>
                  <p className="text-xs text-sky-500">Joined {new Date(user.joinedDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-sky-700">
                <Mail size={16} className="text-sky-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-sky-700">
                <Phone size={16} className="text-sky-400" />
                <span>{user.phone}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sky-200">
              <div>
                <p className="text-xs text-sky-500 mb-1">Orders</p>
                <p className="text-lg font-bold text-sky-900">{user.orders}</p>
              </div>
              <div>
                <p className="text-xs text-sky-500 mb-1">Total Spent</p>
                <p className="text-lg font-bold text-sky-900">₹{user.totalSpent}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-20">
          <p className="text-sky-600 text-lg">No users found</p>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-sky-900">Edit User</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSaveEdit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-sky-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-sky-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-sky-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    Save Changes
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
