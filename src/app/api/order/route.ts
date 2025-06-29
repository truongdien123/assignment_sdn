import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../db/connectDB';
import Order from '../models/order.model';


export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  try {
    const newOrder = await Order.create(body);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Order creation failed', error: err }, { status: 400 });
  }
}