import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "@/app/models/User";
import { signToken } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email & password required" }, { status: 400 });
  }

  await connectDB();
  const user = await User.findOne({ email });
  if (!user || user.provider !== "credentials") {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signToken({ id: user._id, email: user.email, fullName: user.fullName });

  const res = NextResponse.json({ ok: true });
  res.cookies.set("token", token, { httpOnly: true, path: "/" });
  return res;
}
