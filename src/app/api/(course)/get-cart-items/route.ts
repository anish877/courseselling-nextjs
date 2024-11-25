import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/userModel';
import CourseModel from '@/model/courseModel'; // Import CourseModel
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function GET(request: Request) {
  try {
    await dbConnect();
    console.log("Connected to DB");

    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session || !user) {
      return new Response(
        JSON.stringify({ success: false, message: 'Not authenticated.' }),
        { status: 401 }
      );
    }

    const userId = user._id;
    console.log("User ID:", userId);

    // Fetch user with cart and populate courses
    const userWithCart = await UserModel.findById(userId)
      .select('cart')
      .populate({
        path: 'cart.course',
        model: CourseModel, // Explicitly specify the model to use
        select: '_id title price description thumbnail',
      })
      .lean();

    // console.log(userWithCart);

    if (!userWithCart || !userWithCart.cart.length) {
      return new Response(
        JSON.stringify({ success: true, message: 'No items in the cart.', cart: [] }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Cart items retrieved successfully.',
        cart: userWithCart.cart,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error.' }),
      { status: 500 }
    );
  }
}
