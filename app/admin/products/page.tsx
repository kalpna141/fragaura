"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Edit2, Trash2, Eye, X } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

interface ProductForm {
  _id?: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  categorySlug: string;
  notes: string[];
  bottleSizeMl: number;
  isTopSeller: boolean;
  isMostPopular: boolean;
  rating: number;
}

const emptyForm: ProductForm = {
  name: "",
  slug: "",
  price: 0,
  images: [""],
  categorySlug: "",
  notes: [""],
  bottleSizeMl: 6,
  isTopSeller: false,
  isMostPopular: false,
  rating: 5,
};

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductForm | null>(null);
  const [formData, setFormData] = useState<ProductForm>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.categorySlug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function openAddModal() {
    setEditingProduct(null);
    setFormData(emptyForm);
    setShowModal(true);
  }

  function openEditModal(product: any) {
    setEditingProduct(product);
    setFormData({
      ...product,
      images: product.images || [""],
      notes: product.notes || [""],
    });
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          images: formData.images.filter(img => img.trim()),
          notes: formData.notes.filter(note => note.trim()),
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save product");
      }

      toast.success(editingProduct ? "Product updated!" : "Product added!");
      setShowModal(false);
      loadProducts();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(productId: string, productName: string) {
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to delete product");
      }

      toast.success("Product deleted!");
      loadProducts();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse text-sky-600 text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Products
          </h1>
          <p className="text-sky-600">Manage your product catalog</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" size={20} />
        <input
          type="text"
          placeholder="Search products by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-sky-200 rounded-xl focus:border-sky-500 focus:outline-none text-sky-900"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white border-2 border-sky-200 rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-sky-50 to-blue-50">
              <tr>
                <th className="text-left py-4 px-6 text-sky-700 font-semibold">Product</th>
                <th className="text-left py-4 px-6 text-sky-700 font-semibold">Category</th>
                <th className="text-left py-4 px-6 text-sky-700 font-semibold">Price</th>
                <th className="text-left py-4 px-6 text-sky-700 font-semibold">Size</th>
                <th className="text-left py-4 px-6 text-sky-700 font-semibold">Status</th>
                <th className="text-center py-4 px-6 text-sky-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, idx) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-t border-sky-100 hover:bg-sky-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg border border-sky-200"
                      />
                      <div>
                        <p className="font-semibold text-sky-900">{product.name}</p>
                        <p className="text-xs text-sky-500">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium capitalize">
                      {product.categorySlug.replace(/-/g, ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sky-900 font-semibold">
                    ₹{product.price}
                  </td>
                  <td className="py-4 px-6 text-sky-700">
                    {product.bottleSizeMl} ml
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      {product.isTopSeller && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          Top Seller
                        </span>
                      )}
                      {product.isMostPopular && (
                        <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/product/${product.slug}`}
                        target="_blank"
                        className="p-2 text-sky-600 hover:bg-sky-100 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id, product.name)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-sky-600 text-lg">No products found</p>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b-2 border-sky-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-sky-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-sky-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border-2 border-sky-300 rounded-xl px-4 py-2 focus:border-sky-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-sky-700 mb-2">
                      Slug *
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full border-2 border-sky-300 rounded-xl px-4 py-2 focus:border-sky-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-sky-700 mb-2">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full border-2 border-sky-300 rounded-xl px-4 py-2 focus:border-sky-500 focus:outline-none"
                      required
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-sky-700 mb-2">
                      Category Slug *
                    </label>
                    <input
                      type="text"
                      value={formData.categorySlug}
                      onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                      className="w-full border-2 border-sky-300 rounded-xl px-4 py-2 focus:border-sky-500 focus:outline-none"
                      required
                      placeholder="e.g., floral, woody"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-sky-700 mb-2">
                      Bottle Size (ml) *
                    </label>
                    <input
                      type="number"
                      value={formData.bottleSizeMl}
                      onChange={(e) => setFormData({ ...formData, bottleSizeMl: Number(e.target.value) })}
                      className="w-full border-2 border-sky-300 rounded-xl px-4 py-2 focus:border-sky-500 focus:outline-none"
                      required
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-sky-700 mb-2">
                      Rating (1-5) *
                    </label>
                    <input
                      type="number"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                      className="w-full border-2 border-sky-300 rounded-xl px-4 py-2 focus:border-sky-500 focus:outline-none"
                      required
                      min="1"
                      max="5"
                      step="0.1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sky-700 mb-2">
                    Image URLs (one per line)
                  </label>
                  {formData.images.map((img, idx) => (
                    <input
                      key={idx}
                      type="url"
                      value={img}
                      onChange={(e) => {
                        const newImages = [...formData.images];
                        newImages[idx] = e.target.value;
                        setFormData({ ...formData, images: newImages });
                      }}
                      className="w-full border-2 border-sky-300 rounded-xl px-4 py-2 focus:border-sky-500 focus:outline-none mb-2"
                      placeholder="https://example.com/image.jpg"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, images: [...formData.images, ""] })}
                    className="text-sm text-sky-600 hover:text-sky-500 underline"
                  >
                    + Add another image
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sky-700 mb-2">
                    Notes (one per line)
                  </label>
                  {formData.notes.map((note, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={note}
                      onChange={(e) => {
                        const newNotes = [...formData.notes];
                        newNotes[idx] = e.target.value;
                        setFormData({ ...formData, notes: newNotes });
                      }}
                      className="w-full border-2 border-sky-300 rounded-xl px-4 py-2 focus:border-sky-500 focus:outline-none mb-2"
                      placeholder="e.g., Top: Rose, Jasmine"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, notes: [...formData.notes, ""] })}
                    className="text-sm text-sky-600 hover:text-sky-500 underline"
                  >
                    + Add another note
                  </button>
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isTopSeller}
                      onChange={(e) => setFormData({ ...formData, isTopSeller: e.target.checked })}
                      className="w-5 h-5 accent-sky-500"
                    />
                    <span className="text-sm font-semibold text-sky-700">Top Seller</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isMostPopular}
                      onChange={(e) => setFormData({ ...formData, isMostPopular: e.target.checked })}
                      className="w-5 h-5 accent-sky-500"
                    />
                    <span className="text-sm font-semibold text-sky-700">Most Popular</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-semibold rounded-xl py-3 disabled:opacity-50"
                  >
                    {submitting ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 border-2 border-sky-300 text-sky-700 font-semibold rounded-xl hover:bg-sky-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
