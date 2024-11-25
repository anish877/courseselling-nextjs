import dbConnect from '@/lib/dbConnect';
import CourseModel from '@/model/courseModel';

export async function GET() {
  await dbConnect();

  try {
    const courses = await CourseModel.aggregate([
      { $sort: { createdAt: -1 } }, // Sort by created date
      {
        $project: {
          title: 1,
          description: 1,
          price: 1,
          thumbnail: 1,
          createdAt: 1,
        },
      }, // Project only required fields
    ]).exec();

    if (!courses || courses.length === 0) {
      return new Response(
        JSON.stringify({
          message: 'No courses found',
          success: false,
        }),
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message:"all courses fetched",
      courses
    })
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        success: false,
      }),
      { status: 500 }
    );
  }
}
