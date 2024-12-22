import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/userModel";

export async function POST(request:Request) {
    await dbConnect()
    try {
        const {username, code} = await request.json()
      const decodedUsername =   decodeURIComponent(username)

      const user = await UserModel.findOne({
        username: decodedUsername
      })
      if(!user){
        return Response.json({
            success: false,
            message: "user not found"
        },
     {
        status: 400
     }
    )
      }

      const isCodeValid = user.verifyCode === code
      const isCodeNotExpired = user.verifyCodeExpiry
  ? new Date(user.verifyCodeExpiry) > new Date()
  : false;


      if(isCodeValid && isCodeNotExpired){
        user.isVerified = true
        // user.verifyCode = undefined
        // user.verifyCodeExpiry = undefined
        
        await user.save()
        return Response.json({
            success: true,
            message: "Account/user verified successfully"
        },
     {
        status: 200
     }
    )

      }else if(!isCodeNotExpired){
        return Response.json({
            success: false,
            message: "Verification code has expired, please signup again to get a new code"
        },
     {
        status: 400
     }
    )
      }
      else{
        return Response.json({
            success: false,
            message: "Incorrect verification code"
        },
     {
        status: 400
     }
    )
      }

    } catch (error) {
        console.error('Error verifying the user:', error);
    return Response.json(
      {
        success: false,
        message: 'Error verifying the user',
      },
      { status: 500 }
    );
    }
}