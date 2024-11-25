// import dbConnect from '@/lib/dbConnect';
// import CourseModel from '@/model/courseModel';
// import OrderModel from '@/model/orderModel';
// import UserModel from '@/model/userModel';
// import mongoose from 'mongoose';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../../auth/[...nextauth]/options';

// export async function POST(request: Request) {
//   await dbConnect();
//   const session = await getServerSession(authOptions);
//   const user = session?.user;

//   if (!session || !user) {
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: 'Not authenticated.',
//       }),
//       { status: 401 }
//     );
//   }

//   const userId = new mongoose.Types.ObjectId(user._id);

//   try {
//     const { courseId, paymentMethod = "manual" } = await request.json();

//     if (!courseId) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           message: 'Course ID is required.',
//         }),
//         { status: 400 }
//       );
//     }

//     // Check if the course exists
//     const course = await CourseModel.findById(courseId);
//     if (!course) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           message: 'Course not found.',
//         }),
//         { status: 404 }
//       );
//     }

//     // Check if the user has already purchased the course
//     const existingOrder = await OrderModel.findOne({
//       user: userId,
//       course: courseId,
//       status: "completed",
//     });
//     if (existingOrder) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           message: 'You have already purchased this course.',
//         }),
//         { status: 400 }
//       );
//     }

//     // Create a pending order
//     const newOrder = new OrderModel({
//       user: userId,
//       course: courseId,
//       amount: course.price,
//       status: "pending", // Change to "completed" when payment is processed
//       paymentMethod, // Future payment method (e.g., Stripe, PayPal)
//     });
//     await newOrder.save();

//     // Simulate payment success (for now)
//     newOrder.status = "completed";
//     await newOrder.save();

//     // Add course to user's purchased courses
//     await UserModel.findByIdAndUpdate(userId, {
//       $addToSet: { purchasedCourses: courseId },
//     });

//     // Add user to course's purchasedBy field
//     await CourseModel.findByIdAndUpdate(courseId, {
//       $addToSet: { purchasedBy: userId },
//     });

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: 'Course purchased successfully.',
//         order: newOrder,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('An error occurred during purchase:', error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: 'Internal server error.',
//       }),
//       { status: 500 }
//     );
//   }
// }
