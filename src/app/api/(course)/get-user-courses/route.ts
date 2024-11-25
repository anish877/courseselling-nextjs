// import dbConnect from '@/lib/dbConnect';
// import CourseModel from '@/model/courseModel';
// import mongoose from 'mongoose';
// import { User } from 'next-auth';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../../auth/[...nextauth]/options';

// export async function GET(request: Request) {
//   await dbConnect();

//   const session = await getServerSession(authOptions);
//   const _user: User = session?.user as User;

//   if (!session || !_user) {
//     return Response.json({
//         success: false,
//         message: 'Not authenticated',
//       },
//       { status: 401 }
//     );
//   }

//   const userId = new mongoose.Types.ObjectId(_user._id);

//   try {
//     const courses = await CourseModel.aggregate([
//       { $match: { purchasedBy: userId } }, // Match courses purchased by the user
//       { $sort: { createdAt: -1 } }, // Sort by created date
//       {
//         $project: {
//           title: 1,
//           description: 1,
//           price: 1,
//           thumbnail: 1,
//           createdAt: 1,
//         },
//       }, // Project only the required fields
//     ]).exec();

//     if (!courses || courses.length === 0) {
//       return Response.json(
//        {
//           message: 'No purchased courses found',
//           success: false,
//         },
//         { status: 404 }
//       );
//     }

//     return Response.json(
//      {
//         success: true,
//         courses,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('An unexpected error occurred:', error);
//     return Response.json(
//      {
//         message: 'Internal server error',
//         success: false,
//       },
//       { status: 500 }
//     );
//   }
// }
