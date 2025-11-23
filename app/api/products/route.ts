import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Product from "@/app/models/Product";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "name_asc";
  const topSeller = searchParams.get("topSeller") === "true";
  const mostPopular = searchParams.get("mostPopular") === "true";

  await connectDB();

  const filter: any = {};
  if (q) filter.name = { $regex: q, $options: "i" };
  if (category) filter.categorySlug = category;
  if (topSeller) filter.isTopSeller = true;
  if (mostPopular) filter.isMostPopular = true;

  let query = Product.find(filter);

  if (sort === "name_asc") query = query.sort({ name: 1 });
  if (sort === "name_desc") query = query.sort({ name: -1 });
  if (sort === "price_asc") query = query.sort({ price: 1 });
  if (sort === "price_desc") query = query.sort({ price: -1 });

  const products = await query.lean();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Generate slug from name if not provided
    if (!body.slug) {
      body.slug = body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 400 }
    );
  }
}
