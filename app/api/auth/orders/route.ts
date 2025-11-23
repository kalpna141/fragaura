import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Order from "@/app/models/ Order";

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();

  const order = await Order.create(body);
return NextResponse.json({ ok: true, orderId: (order as any)._id });}
