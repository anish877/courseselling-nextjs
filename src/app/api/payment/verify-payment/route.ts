import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      return NextResponse.json({ success: true, message:"Payment verification successfull" }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Failed to verify payment", error }, { status: 500 });
  }
}
