import dbConnect from "@/lib/dbConnect";
import CourseModel from "@/model/courseModel";

export async function PATCH(req: Request) {
  await dbConnect();

  const { courseId, videos } = await req.json();

  if (!courseId || !videos || !Array.isArray(videos)) {
    return new Response(JSON.stringify({ message: "Invalid request data" }), { status: 400 });
  }

  try {
    const update = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        $addToSet: {
          videos: { $each: videos }, // Ensures no duplicate videos are added
        },
      },
      { new: true } 
    );

    if (!update) {
      return new Response(JSON.stringify({ message: "Course not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Videos added successfully", course: update }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to add videos" }), { status: 500 });
  }
}
