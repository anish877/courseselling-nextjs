import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  _id: string;
  content: string;
  createdAt: Date;
}
export interface Cart extends Document {
  _id: string;
}

export interface User extends Document {
  username: string;
  email: string;
  phone:string;
  password: string;
  verifyCode: string | undefined;
  verifyCodeExpiry: Date | undefined;
  isAcceptingMessage: boolean;
  isVerified: boolean;
  messages: Message[];
  cart: Cart[];
  purchasedCourses: mongoose.Schema.Types.ObjectId[]; // References to Course IDs course
  isAdmin:boolean
}

const MessageSchema: Schema<Message> = new Schema(
  {
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const UserSchema: Schema<User> = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "please use a valid email",
      ],
    },

    phone: {
      type: String,
      required: [true, "phone number is required"],
      trim: true,
      unique: true,
      match: [
        /^\+?[1-9]\d{1,14}$/,
        "please use a valid phone number",
      ],
    },
    
    verifyCode: { type: String, required: [true, "verification code is required"] },
    verifyCodeExpiry: { type: Date, required: [true, "verification code expiry is required"] },
    isVerified: { type: Boolean, default: false },
    isAcceptingMessage: { type: Boolean, default: true },
    cart: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // Reference to Course
        addedAt: { type: Date, default: Date.now }, // Optional metadata
      },
    ],
    messages: [MessageSchema],
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);


const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
