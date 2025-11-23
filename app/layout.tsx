"use client";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith("/signin") || pathname?.startsWith("/signup");

  return (
    <html lang="en" className="h-full">
      <body
        className={`min-h-full ${
          !isAuthPage
            ? "bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50"
            : ""
        } text-sky-900 flex flex-col`}
      >
        {!isAuthPage && <Navbar />}
        <main className="flex-1">{children}</main>
        {!isAuthPage && <Footer />}
        <ToastContainer autoClose={5000} />
      </body>
    </html>
  );
}
