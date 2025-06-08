import { connectDB } from "../db/connectDB";
import Product from "../models/product.model";

export async function GET() {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return Response.json({ products }, { status: 200 });
}