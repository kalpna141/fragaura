import { NextResponse } from "next/server";
import User from "@/app/models/User";
import { signToken } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
export async function POST(req: Request) {
  const { email, fullName } = await req.json();
  if (!email || !fullName) {
    return NextResponse.json({ error: "Invalid Google payload" }, { status: 400 });
  }

  await connectDB();
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email, fullName, provider: "google" });
  }

  const token = signToken({ id: user._id, email, fullName });

  const res = NextResponse.json({ ok: true });
  res.cookies.set("token", token, { httpOnly: true, path: "/" });
  return res;
}
