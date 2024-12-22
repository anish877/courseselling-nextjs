import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!, // Replace with your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET!, // Replace with your Razorpay Key Secret
});

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    // Create a Razorpay order
    const options = {
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${new Date().getTime()}`,
    };
    const order = await razorpayInstance.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      key: process.env.RAZORPAY_KEY_ID, // Send the key to the frontend
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
