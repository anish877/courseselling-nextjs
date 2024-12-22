import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CourseModel from "@/model/courseModel";

export async function POST(request: Request) {

  await dbConnect();

  try {
    const { title, description, price, thumbnail } = await request.json();

    if (!title || !description || !price || !thumbnail) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newCourse = await CourseModel.create({
      title,
      description,
      price,
      thumbnail,
      videos:[],
    });

    return NextResponse.json(
      { message: "Course created successfully", course: newCourse },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create course" },
      { status: 500 }
    );
  }
}
