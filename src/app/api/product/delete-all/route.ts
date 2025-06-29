// app/api/products/delete-all/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '../../db/connectDB';
import Product from '../../models/product.model';


export async function DELETE() {
  try {
    await connectDB(); // đảm bảo đã kết nối MongoDB
    await Product.deleteMany({});
    return NextResponse.json({ message: 'All products deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
