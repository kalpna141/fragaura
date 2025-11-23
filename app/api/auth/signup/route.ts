import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";

export async function POST(req: Request) {
  try {
    const { fullName, email, password, confirmPassword } = await req.json();

    if (!fullName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    await connectDB();
    const exists = await User.findOne({ email });
    if (exists)
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await User.create({
      fullName,
      email,
      passwordHash,
      provider: "credentials",
    });
    const userObj = result.toObject();
    delete userObj.passwordHash;

    return NextResponse.json({
      message: "Account created successfully!!",
      status: 201,
      data: userObj,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
      error: error,
    });
  }
}
