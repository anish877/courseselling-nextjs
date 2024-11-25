import { NextResponse } from "next/server";
import OrderModel from "@/model/orderModel";
import CourseModel from "@/model/courseModel";
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { User } from "next-auth";

export async function GET(req: Request) {
  // Step 1: Validate the user session
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!user || !user._id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Step 2: Fetch completed orders for the user
    const orders = await OrderModel.find({
      user: user._id,
      status: "completed",
    }).populate("course");

    if (!orders || orders.length === 0) {
      return NextResponse.json({ error: "No purchased courses found" }, { status: 404 });
    }

    // Step 3: Extract all course IDs from the user's orders
    const purchasedCourseIds = orders.flatMap((order) => order.course);

    // Step 4: Fetch all courses with videos using the course IDs
    const purchasedCourses = await CourseModel.find({
      _id: { $in: purchasedCourseIds },
    }).select("_id title description videos thumbnail");

    // Step 5: Format the response to return all videos with the course details
    const response = purchasedCourses.map((course) => ({
      _id: course._id,
      title: course.title,
      description: course.description,
      videos: course.videos,
      thumbnail: course.thumbnail
    }));

    return NextResponse.json({ success: true, courses: response }, { status: 200 });
  } catch (error) {
    console.error("Error fetching purchased courses:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
