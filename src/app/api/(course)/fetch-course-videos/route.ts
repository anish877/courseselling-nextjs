//DEPRECATED ROUTE
import { NextResponse } from "next/server";
import Course from "@/model/courseModel"; // Adjust the path based on your structure
import connectDB from "@/lib/dbConnect"; // Ensure DB connection

export async function GET(request: Request, { params }: { params: { username: string } }) {
  console.log("Course videos route hit");
  
  try {
    // Connect to database
    await connectDB();

    // Extract `courseId` from query parameters
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    // Find the course and retrieve its videos
    const course = await Course.findById(courseId).select("videos");

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ videos: course.videos }, { status: 200 });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}
