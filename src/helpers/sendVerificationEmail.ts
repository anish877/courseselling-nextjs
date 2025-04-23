import nodemailer from 'nodemailer';
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        console.log(email, username, verifyCode);
        
        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'anishsuman2305@gmail.com',
                pass: 'krcq wwum uyuc jhdu' // Use environment variable for security
            }
        });

        // Convert React component to HTML string
        const emailHtml = verifyCode.toString()

        // Send mail with defined transport object
        await transporter.sendMail({
            from: 'anishsuman2305@gmail.com',
            to: `sumananish40@gmail.com`,
            subject: 'Verification code',
            html: emailHtml
        });

        return { success: true, message: "Sent verification email" };
    } catch (error) {
        console.error(`Error in sending verification email: ${error}`);
        return { success: false, message: "Failed to send verification email" };
    }
}
