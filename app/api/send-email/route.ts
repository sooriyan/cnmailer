/**
 * Next.js API Route for Sending Order Emails via Nodemailer (Gmail SMTP) - TypeScript Version
 */

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EmailRequestBody {
  type: "confirmation" | "dispatch";
  email: string;
  consignment?: string;
  trackingUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequestBody = await request.json();
    const { type, email, consignment, trackingUrl } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Customer email is required" },
        { status: 400 }
      );
    }

    let subject: string, html: string;

    if (type === "confirmation") {
      subject = "Closet Notion - Order Confirmation";
      html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - Closet Notion</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 0;">
                <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                    <!-- Header with Logo -->
                    <tr>
                        <td style="padding: 20px; text-align: center; background-color: #ffffff;">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/red%20logo-vIkIFUKEv4RF3Optqq7OFCbnaGAbqL.png" alt="Closet Notion Logo" style="max-width: 200px; height: auto;">
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h1 style="color: #333333; font-size: 24px; margin: 0 0 20px 0; text-align: center;">Thank You for Your Order!</h1>
                            
                            <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
                                Dear Valued Customer,
                            </p>
                            
                            <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
                                We're excited to confirm that your order has been received and is being processed. Thank you for choosing Closet Notion for your purchase!
                            </p>
                            
                            <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
                                You'll receive another email with your tracking information once your order ships.
                            </p>
                            
                            <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
                                If you have any questions about your order, please don't hesitate to contact our instagram handle.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #f8f8f8; text-align: center;">
                            <p style="color: #999999; font-size: 14px; margin: 0 0 10px 0;">
                                Closet Notion.
                            </p>
                            <p style="color: #999999; font-size: 14px; margin: 0;">
                                © 2025 Closet Notion. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
    } else if (type === "dispatch" && consignment && trackingUrl) {
      subject = "Closet Notion - Order Dispatched";
      html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - Closet Notion</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 0;">
                <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                    <!-- Header with Logo -->
                    <tr>
                        <td style="padding: 20px; text-align: center; background-color: #ffffff;">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/red%20logo-vIkIFUKEv4RF3Optqq7OFCbnaGAbqL.png" alt="Closet Notion Logo" style="max-width: 200px; height: auto;">
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h1 style="color: #333333; font-size: 24px; margin: 0 0 20px 0; text-align: center;">Thank You for Your Order!</h1>
                            
                            <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
                                Dear Valued Customer,
                            </p>
                            
                            <p style="color:rgb(102,102,102);font-size:16px;line-height:1.5;margin:0px 0px 20px">Great news! Your order has been dispatched and is on its way to you. Below are your tracking details:</p>
                            <p style="line-height:1.5;margin:0px 0px 20px"><strong><font color="#666666"><span style="font-size:16px">Consignment Number:</span></font>&nbsp;${consignment}</strong></p>
                            <div style="text-align: center; margin: 40px 0;">
                                <a href="${trackingUrl}" style="background-color: #dc2626; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Track Your Order</a>
                            </div>
                            
                            <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
                                If you have any questions about your order, please don't hesitate to contact our customer service team.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #f8f8f8; text-align: center;">
                            <p style="color: #999999; font-size: 14px; margin: 0 0 10px 0;">
                                Closet Notion.
                            </p>
                            <p style="color: #999999; font-size: 14px; margin: 0;">
                                © 2025 Closet Notion. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
    } else {
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject,
      html,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Email sending failed" },
      { status: 500 }
    );
  }
}
