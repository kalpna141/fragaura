"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, Check } from "lucide-react";
import attar from "../.././../public/freepik__talk__29484.png";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  async function submit(e: any) {
    try {
      e.preventDefault();
      setError("");
      setOk(false);

      const res = await axios.post("/api/auth/signup", form);
      console.log("res", res);

      if (res && res?.data?.status === 201) {
        setOk(true);
        router.push("/signin");
        toast.success(res?.data?.message || "Registered Successfully");
      }
    } catch (error: any) {
      console.log("error", error);
      toast.error(error.response.data.message || "Signup failed");
    }
  }

  return (
    <div className="h-full grid md:grid-cols-2 relative">
      {/* Background Image for Mobile */}
      <div className="md:hidden absolute inset-0 bg-black">
        <Image
          src={attar}
          alt="Luxury Perfume Bottles"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-6 md:p-12 order-2 md:order-1 overflow-y-auto relative z-10">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-3xl border border-white/20 p-8 space-y-6 shadow-2xl shadow-black/20"
        >
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-600 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-sky-700 font-medium">
              Join us and discover your signature attars
            </p>
          </div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.3 },
              },
            }}
          >
            <motion.div
              className="relative"
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 },
              }}
            >
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500"
                size={20}
              />
              <input
                type="text"
                className="w-full border-2 border-sky-300 rounded-xl pl-11 pr-4 py-3 focus:border-sky-500 focus:outline-none text-sky-900 transition-all"
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
            </motion.div>

            <motion.div
              className="relative"
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 },
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
                show: { opacity: 1, x: 0 },
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

            <motion.div
              className="relative"
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 },
              }}
            >
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500"
                size={20}
              />
              <input
                type="password"
                className="w-full border-2 border-sky-300 rounded-xl pl-11 pr-4 py-3 focus:border-sky-500 focus:outline-none text-sky-900 transition-all"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
              />
            </motion.div>
          </motion.div>

          <label className="flex items-center gap-3 text-sm text-sky-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) => setForm({ ...form, agree: e.target.checked })}
              className="w-5 h-5 accent-sky-500 cursor-pointer"
              required
            />
            <span>I agree to the Terms & Conditions</span>
          </label>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {ok && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <Check size={18} />
              Account created successfully! Please sign in.
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-600 hover:from-blue-700 hover:via-cyan-600 hover:to-sky-700 text-white font-bold rounded-xl py-3 shadow-lg transition-all hover:shadow-xl transform hover:scale-[1.02]"
          >
            SIGN UP
          </button>

          <p className="text-center text-sm text-sky-700">
            Already have an account?{" "}
            <Link
              className="font-semibold text-sky-600 hover:text-sky-500 underline"
              href="/signin"
            >
              Sign in
            </Link>
          </p>
        </motion.form>
      </div>

      {/* Right Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="hidden md:flex relative overflow-hidden order-1 md:order-2 items-center justify-center bg-black"
      >
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full h-full"
        >
          <Image
            src={attar}
            alt="Luxury Perfume Bottles"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
