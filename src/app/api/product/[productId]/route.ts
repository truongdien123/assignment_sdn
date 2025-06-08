import cloudinary from "../../../../../utils/cloudinary";
import { connectDB } from "../../db/connectDB";
import Product from "../../models/product.model";

export async function GET({ params }: { params: Promise<{ productId: string }> }) {
    await connectDB();
    const productId = (await params).productId;
    const product = await Product.findById(productId);
    if (!product) {
        return Response.json({ message: "Product not found" }, { status: 400 });
    }
    return Response.json({ product }, { status: 200 });
}

export async function DELETE({ params }: { params: Promise<{ productId: string }> }) {
    await connectDB();
    const productId = (await params).productId;
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