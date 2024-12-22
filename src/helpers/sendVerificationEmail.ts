import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
): Promise<ApiResponse> {
 
    try {
        
await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verification code',
    react: VerificationEmail({username,otp:verifyCode}),
  });
        return {success: true, message: "sent verification email"}
    } catch (error) {
        console.error(`Error in sending verification email ${error}`)
        return {success: false, message: "Failed to send verification email"}
    }
    
}