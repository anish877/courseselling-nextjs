import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/userModel";
import bcryptjs from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request:Request) {
    await dbConnect()

    try {
        const {username, email, phone, password} = await request.json()
        console.log("PHONE::::::::::::::::::::::::::::::::::::::::::", phone)
        const existingUser = await UserModel.findOne({
            username,
            isVerified: true
        })
        if(existingUser){
            return Response.json({
                success: false,
                message: "username is already taken"
            },
        {
            status:400
        }
        )
        }
       const existingUserEmail = await UserModel.findOne({email})
       const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

       if(existingUserEmail){
        if(existingUserEmail.isVerified){
            return  Response.json({
                success: false,
                message: "Email already exists"
            },
            {status:500}
        )
        }else{
            const hashedPassword = await bcryptjs.hash(password, 10)
            existingUserEmail.username = username;
            existingUserEmail.phone = phone;
            existingUserEmail.password = hashedPassword;
            existingUserEmail.verifyCode = verifyCode;
            existingUserEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
            await existingUserEmail.save()

        }
       }
       else{
       const hashedPassword = await bcryptjs.hash(password, 10)
       const expiryDate = new Date()
       expiryDate.setHours(expiryDate.getHours() + 1)

       const newUser = new UserModel({
        email,
        password: hashedPassword,
        username,
        phone,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        isAdmin:false,
        purchasedCourses:[],
        messages: []
       })
       await newUser.save()
       }
       //Send verification email
      const emailResponse = await sendVerificationEmail(email,username,verifyCode)
      console.log("Sign up route",emailResponse, verifyCode, username, email, password)

      if(!emailResponse.success){
        return Response.json({
            success: false,
            message: emailResponse.message
        },
        {status:500}
    )
}
return Response.json({
    success: true,
    message: "User registerd successfully, Please verify your email"
},
{status:200}
)
    } catch (error) {
        console.log(`Error registering user ${error}`)
        return Response.json({
            success: false,
            message: "Error registering user"
        },
    {
        status:500

    }
    )
    }
}