//In use

import dbConnect from "@/lib/dbConnect";
import CourseModel from "@/model/courseModel";
import { isValidObjectId } from "mongoose";

export async function POST(request:Request) {
    await dbConnect();
    const {courseId} = await request.json()

    if(!isValidObjectId(courseId)){
       return Response.json({
        success:false,
        message: "Invalid Course Id"
       },{status:401})
    }

    try {
      const course =  await CourseModel.findById(courseId).select("_id title description price thumbnail videos")
      if(!course){
        return Response.json({
            success: false,
            message: "Course does not exist"
        },{status:400})
      }
      return Response.json({
        success: true,
        message:"Course fetched successfully",
        course: {
            _id:course._id,
            title: course.title,
            description: course.description,
            price: course.price,
            thumbnail: course.thumbnail,
            previewVideo: course?.videos[0]?.url
        }
      })

    } catch (error) {
        return Response.json({
            success:false,
            error: error || "Failed to fetch course details",
        },{status:401})
    }
}