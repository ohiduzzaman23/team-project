import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  if (!clientPromise) {
    return NextResponse.json({ error: "MONGODB_URI is not configured." }, { status: 500 });
  }

  try {
    const client = await clientPromise!;
    const db = client.db();
    const products = await db.collection("products").find({}).toArray();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Failed to load products." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, price, category, description, image } = data;

    if (!name || !price || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise!;
    const db = client.db();

    const result = await db.collection("products").insertOne({
      name,
      price: Number(price),
      category,
      description: description || "",
      image:
        image ||
        "https://images.unsplash.com/photo-1601379840446-596efe29c64f?auto=format&fit=crop&w=800&q=80",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId.toString() }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
