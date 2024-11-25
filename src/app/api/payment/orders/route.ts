// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect"; // Utility to handle DB connection
// import OrderModel from "@/model/orderModel";
// import UserModel from "@/model/userModel";
// import CourseModel from "@/model/courseModel";

// export async function POST(req: Request) {
//   try {
//     await dbConnect(); // Ensure DB connection

//     const body = await req.json();
//     console.log("Order creation route hit", body)
//     const { userId, courseId, amount, paymentMethod, paymentId, orderId } = body;

//     // Validate request data
//     if (!userId || !courseId || !amount || !paymentMethod) {
//       return NextResponse.json(
//         { message: "Missing required fields." },
//         { status: 400 }
//       );
//     }

//     // Check if the course exists
//     const course = await CourseModel.findById(courseId);
//     if (!course) {
//       return NextResponse.json(
//         { message: "Course not found." },
//         { status: 404 }
//       );
//     }

//     // Check if the user exists
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return NextResponse.json(
//         { message: "User not found." },
//         { status: 404 }
//       );
//     }

//     // Check if the user already purchased the course
//     if (user.purchasedCourses.includes(courseId)) {
//       return NextResponse.json(
//         { message: "Course already purchased." },
//         { status: 400 }
//       );
//     }

//     // Create a new order
//     const newOrder = await OrderModel.create({
//       user: userId,
//       course: courseId,
//       amount,
//       paymentMethod,
//       paymentId,
//       orderId,
//       status: "completed", // Default status
//     });

//     // Update user's purchased courses
//     user.purchasedCourses.push(courseId);
//     await user.save();

//     // Update course's purchasedBy field
//     course.purchasedBy.push(userId);
//     await course.save();

//     // Populate order with user and course details
//     const populatedOrder = await OrderModel.findById(newOrder._id)
//       .populate("user", "username email")
//       .populate("course", "_id title description price"); 

//     // Send the response
//     return NextResponse.json({
//       message: "Order created successfully.",
//       order: populatedOrder,
//     });
//   } catch (error:any) {
//     console.error("Error creating order:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error.", error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/orderModel";
import UserModel from "@/model/userModel";
import CourseModel from "@/model/courseModel";
import mongoose, { ObjectId } from "mongoose";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { userId, courseId, amount, paymentMethod, paymentId, orderId } = body;

    // Format course IDs as ObjectIds
    const formattedCourseIds = courseId.map((id: string) =>
      new mongoose.Types.ObjectId(id)
    );

    if (!userId || !formattedCourseIds || formattedCourseIds.length === 0 || !amount || !paymentMethod) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const alreadyPurchased = formattedCourseIds.filter((id:ObjectId) =>
      user.purchasedCourses.includes(id)
    );

    if (alreadyPurchased.length > 0) {
      return NextResponse.json(
        { message: "Some courses have already been purchased.", alreadyPurchased },
        { status: 400 }
      );
    }

    const courses = await CourseModel.find({ _id: { $in: formattedCourseIds } });
    if (courses.length !== formattedCourseIds.length) {
      return NextResponse.json(
        { message: "One or more courses not found." },
        { status: 404 }
      );
    }

    const newOrder = await OrderModel.create({
      user: userId,
      course: formattedCourseIds,
      amount: amount,
      paymentMethod,
      paymentId,
      orderId,
      status: "completed",
      statusHistory: [
        {
          status: "completed",
          updatedAt: new Date(),
        },
      ],
    });

    user.purchasedCourses.push(...formattedCourseIds);
    await user.save();

    
    const populatedOrder = await OrderModel.findById(newOrder._id)
      .populate("user", "username email")
      .populate("course", "_id title description price");

    return NextResponse.json({
      message: "Order created successfully.",
      order: populatedOrder,
    });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Internal Server Error.", error: error.message },
      { status: 500 }
    );
  }
}
