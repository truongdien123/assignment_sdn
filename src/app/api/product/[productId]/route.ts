import { NextRequest } from "next/server";
import cloudinary from "../../../../../utils/cloudinary";
import { connectDB } from "../../db/connectDB";
import Product from "../../models/product.model";

export async function GET(req: NextRequest) {
    await connectDB();
    const productId = req.nextUrl.pathname.split('/').pop();
    const product = await Product.findById(productId);
    if (!product) {
        return Response.json({ message: "Product not found" }, { status: 400 });
    }
    return Response.json({ product }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
    await connectDB();
    const productId = req.nextUrl.pathname.split('/').pop();
    const product = await Product.findById(productId);
    if (!product) {
        return Response.json({ message: "Product not found." }, { status: 400 })
    }
    const parts = product.image.split("/");
    const fileName = parts[parts.length - 1];
    const imageId = fileName.split(".")[0];

    cloudinary.uploader
        .destroy(`watches/${imageId}`)
        .then((result) => console.log("Result", result));
    await Product.findByIdAndDelete(productId);
    return Response.json({ message: "Product deleted successfully" }, { status: 200 });
}