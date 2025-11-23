"use client";

import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isSignin = pathname?.includes("signin");

  const bgClass = isSignin
    ? "bg-gradient-to-l from-sky-300 via-sky-100 to-gray-200"
    : "bg-gradient-to-r from-sky-300 via-sky-100 to-gray-200";

  return (
    <div className={`h-screen w-full overflow-hidden ${bgClass}`}>
      {children}
    </div>
  );
}
