import { NextResponse } from "next/server";
import mongoose from "mongoose";
import OrderModel from "@/model/orderModel";
import CourseModel from "@/model/courseModel";
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { User } from "next-auth";

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { courseId } = await params;

    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      return NextResponse.json({ error: "Invalid course ID." }, { status: 400 });
    }

    // Step 1: Validate the user session
    const session = await getServerSession(authOptions);
    const _user: User = session?.user as User;

    // if (!_user || !_user._id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const userId = _user?._id;

    // Step 2: Verify if the user has purchased the course
    const orderExists = await OrderModel.findOne({
      user: userId,
      course: courseId, // Check if the courseId exists in the course array
      status: "completed",
    });
    

    if (!orderExists) {
      console.log("ORDER DOES NOR EXIST")
      const course = await CourseModel.findById(courseId).select("title price description videos thumbnail");

      if (!course) {
        return NextResponse.json({ error: "Course not found." }, { status: 404 });
      }

      return NextResponse.json({
        success: false,
        message: "Course not purchased",
        id: course._id,
        price: course.price,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        videos: course.videos,
        userId: userId,
      });
    }

    // Step 3: Fetch course details and videos
    const course = await CourseModel.findById(courseId).select("title price description videos thumbnail");

    if (!course) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    // Step 4: Respond with the course and video details
    return NextResponse.json({
      success: true,
      id: course._id,
      title: course.title,
      description: course.description,
      price: course.price,
      videos: course.videos,
      thumbnail: course.thumbnail,
      userId: userId,
    });
  } catch (error) {
    console.error("Error fetching course videos:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching course videos." },
      { status: 500 }
    );
  }
}
