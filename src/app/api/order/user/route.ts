import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../db/connectDB';
import Order from '../../models/order.model';


export async function POST(req: NextRequest) {
  await connectDB();

  const { userId } = await req.json();

  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (err) {
    console.error('Fetch order failed:', err);
    return NextResponse.json({ message: 'Failed to fetch orders' }, { status: 500 });
  }
}