import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function DELETE(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return new Response(
      JSON.stringify({ success: false, message: "Not authenticated." }),
      { status: 401 } // Unauthorized
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id); // Convert to ObjectId

  // Parse the query parameter from the URL
  const url = new URL(req.url);
  const query = url.searchParams.get("query");
  const courseId = url.searchParams.get("courseId");

  try {
    // Handle delete-all scenario
    if (query === "delete-all") {
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $set: { cart: [] } }, // Clear the entire cart
        { new: true } // Return updated user
      ).populate("cart.course"); // Optional: Populate course details

      return new Response(
        JSON.stringify({
          success: true,
          message: "All items removed from cart successfully.",
          cart: updatedUser?.cart || [],
        }),
        { status: 200 } // Success
      );
    }

    // Handle single item removal
    if (!courseId) {
      return new Response(
        JSON.stringify({ success: false, message: "Course ID is required." }),
        { status: 400 } // Bad request
      );
    }

    // Find the user and pull the course from their cart
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId, "cart.course": courseId },
      { $pull: { cart: { course: courseId } } }, // Remove course from cart
      { new: true } // Return updated user
    ).populate("cart.course"); // Optional: Populate course details

    if (!updatedUser) {
      return new Response(
        JSON.stringify({ success: false, message: "Course not found in cart." }),
        { status: 404 } // Not found
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Item removed from cart successfully.",
        cart: updatedUser.cart,
      }),
      { status: 200 } // Success
    );
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error." }),
      { status: 500 } // Server error
    );
  }
}
