"use client";
import { motion } from "framer-motion";
import { XCircle, Home, RotateCcw, Mail } from "lucide-react";
import Link from "next/link";

export default function OrderFailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Failed Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-400 rounded-full blur-xl opacity-50" />
            <div className="relative bg-gradient-to-r from-red-500 to-rose-500 rounded-full p-8">
              <XCircle className="text-white" size={80} />
            </div>
          </div>
        </motion.div>

        {/* Failed Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
            Order Failed
          </h1>
          <p className="text-xl text-sky-700 mb-2">
            We couldn't process your order at this time.
          </p>
          <p className="text-sky-600">
            Please try again or contact our support team for assistance.
          </p>
        </motion.div>

        {/* Error Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white border-2 border-red-200 rounded-3xl p-8 shadow-xl mb-8"
        >
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-red-800 mb-2">What went wrong?</h3>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• Payment processing failed</li>
              <li>• Payment gateway timeout</li>
              <li>• Insufficient funds or payment declined</li>
              <li>• Network connection issue</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-sky-50 to-blue-50 border-2 border-sky-200 rounded-xl p-6">
            <h3 className="font-semibold text-sky-800 mb-2">What can you do?</h3>
            <ul className="space-y-2 text-sm text-sky-700">
              <li>✓ Check your payment details and try again</li>
              <li>✓ Try a different payment method</li>
              <li>✓ Contact your bank or payment provider</li>
              <li>✓ Reach out to our customer support</li>
            </ul>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
        >
          <Link
            href="/checkout"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <RotateCcw size={20} />
            Try Again
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-sky-300 text-sky-700 font-bold rounded-xl hover:bg-sky-50 transition-colors"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-white border-2 border-sky-200 rounded-2xl p-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mail className="text-sky-600" size={24} />
            <h3 className="text-lg font-bold text-sky-800">Need Help?</h3>
          </div>
          <p className="text-sky-600 mb-4">
            Our support team is here to assist you with any payment issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:support@kalpnaattar.com"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
            >
              Email Support
            </a>
            <a
              href="tel:+919876543210"
              className="px-6 py-3 border-2 border-purple-300 text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-colors"
            >
              Call Us
            </a>
          </div>
        </motion.div>

        {/* Transaction Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-sky-600">
            Transaction ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <p className="text-sm text-sky-500 mt-1">
            {new Date().toLocaleString()}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
