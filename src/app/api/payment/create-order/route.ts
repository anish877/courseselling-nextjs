import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    const { amount, currency="INR" } = await request.json();

    if (!amount || !currency) {
      return NextResponse.json({ message: "Amount and currency are required" }, { status: 400 });
    }

    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    return NextResponse.json({
      orderId: order.id, // Send only necessary details
      key: process.env.RAZORPAY_KEY_ID, // Public key for Razorpay Checkout
    },{status:200});
  } catch (error) {
    return NextResponse.json({ message: "Failed to create order", error }, { status: 500 });
  }
}
