import dbConnect from '@/lib/dbConnect';
import CourseModel from '@/model/courseModel';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { title, description, price, thumbnail } = await request.json();

    if (!title || !description || !price || !thumbnail) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'All fields are required.',
        }),
        { status: 400 }
      );
    }

    const newCourse = new CourseModel({
      title,
      description,
      price,
      thumbnail,
      videos:[],
    });
    
    await newCourse.save();

    return Response.json(
          {
        success: true,
        message: 'Course published successfully.',
        course: newCourse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('An error occurred while publishing the course:', error);
    return Response.json(
      {
        success: false,
        message: 'Internal server error.',
      },
      { status: 500 }
    );
  }
}
