"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import attar from "../.././../public/freepik__talk__29484.png";
import Image from "next/image";

export default function SigninPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function submit(e: any) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || "Signin failed");
    else window.location.href = "/";
  }

  async function googleLogin() {
    alert(
      "Connect Google OAuth. This button is wired to /api/auth/google after OAuth."
    );
  }

  return (
    <div className="h-full grid md:grid-cols-2 relative">
      {/* Background Image for Mobile */}
      <div className="md:hidden absolute inset-0 bg-black">
        <Image
          src={attar}
          alt="Luxury Attars"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Left Side - Image (Desktop) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="hidden md:flex relative overflow-hidden items-center justify-center bg-black"
      >
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full h-full"
        >
          <Image
            src={attar}
            alt="Luxury Attars"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-6 md:p-12 relative z-10">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 p-8 space-y-6 shadow-2xl shadow-black/20"
        >
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-sky-700 font-medium">Sign in to continue your journey</p>
          </div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.3 }
              }
            }}
          >
            <motion.div
              className="relative"
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 }
              }}
            >
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500"
                size={20}
              />
              <input
                type="email"
                className="w-full border-2 border-sky-300 rounded-xl pl-11 pr-4 py-3 focus:border-sky-500 focus:outline-none text-sky-900 transition-all"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </motion.div>

            <motion.div
              className="relative"
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 }
              }}
            >
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500"
                size={20}
              />
              <input
                type="password"
                className="w-full border-2 border-sky-300 rounded-xl pl-11 pr-4 py-3 focus:border-sky-500 focus:outline-none text-sky-900 transition-all"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </motion.div>
          </motion.div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-sky-600 hover:text-sky-500 underline"
            >
              Forgot password?
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-600 hover:from-blue-700 hover:via-cyan-600 hover:to-sky-700 text-white font-bold rounded-xl py-3 shadow-lg transition-all hover:shadow-xl transform hover:scale-[1.02]"
          >
            SIGN IN
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-sky-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-sky-600">
                or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={googleLogin}
            className="w-full border-2 border-sky-300 rounded-xl py-3 text-sky-700 font-medium hover:bg-sky-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>

          <p className="text-center text-sm text-sky-700">
            No account?{" "}
            <Link
              className="font-semibold text-sky-600 hover:text-sky-500 underline"
              href="/signup"
            >
              Sign up
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
