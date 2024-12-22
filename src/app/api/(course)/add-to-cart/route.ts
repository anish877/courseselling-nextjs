import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/userModel';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Not authenticated.',
      }),
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const { courseId } = await request.json();

    if (!courseId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Course ID is required.',
        }),
        { status: 400 }
      );
    }

    // Check if the course is already in the user's cart
    const existingUser = await UserModel.findOne({
      _id: userId,
      "cart.course": courseId,
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Course is already in the cart.',
        }),
        { status: 400 }
      );
    }

    // Add the course to the user's cart
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { cart: { course: courseId } },
      },
      { new: true } // Return the updated document
    ).populate("cart.course"); // Populate course details if needed

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Course added to cart successfully.',
        cart: updatedUser?.cart,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding course to cart:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error.',
      }),
      { status: 500 }
    );
  }
}
