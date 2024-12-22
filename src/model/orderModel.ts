import mongoose, { Schema, Document } from "mongoose";

export interface Order extends Document {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId[];
  amount: mongoose.Types.Decimal128;
  status: "pending" | "completed" | "failed";
  paymentMethod: "stripe" | "paypal" | "razorpay" | "manual"; // Added Razorpay
  paymentId?: string; // Payment gateway transaction ID
  orderId?: string; // Payment gateway order ID
  statusHistory?: { status: string; updatedAt: Date }[];
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema<Order> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // Array of Course ObjectIds
    ],
    amount: { type: mongoose.Types.Decimal128, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["stripe", "paypal", "razorpay", "manual"],
      default: "manual",
    },
    paymentId: { type: String }, // Payment ID from gateway
    orderId: { type: String }, // Order ID from gateway
    statusHistory: [
      {
        status: { type: String, enum: ["pending", "completed", "failed"] },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Indexing for faster lookups
OrderSchema.index({ user: 1 });
OrderSchema.index({ course: 1 });

const OrderModel =
  (mongoose.models.Order as mongoose.Model<Order>) ||
  mongoose.model<Order>("Order", OrderSchema);

export default OrderModel;
