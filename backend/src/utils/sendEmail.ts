// /src/utils/sendEmail.ts
import { Resend } from "resend";

interface EmailOptions {
  email: string;
  name: string;
  subject: string;
  resetURL: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "اللعبة <onboarding@resend.dev>",
    to: options.email,
    subject: options.subject,
    html: buildResetEmailHTML(options.name, options.resetURL),
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
};

const buildResetEmailHTML = (name: string, resetURL: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #fafafa; color: #111111; margin: 0; padding: 40px 20px; }
    .container { max-width: 500px; background: #ffffff; padding: 40px; border: 1px solid #e5e5e5; border-radius: 8px; margin: 0 auto; }
    h2 { font-size: 20px; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 24px; color: #000; }
    p { font-size: 14px; line-height: 1.6; color: #666666; margin-bottom: 32px; }
    .btn { display: inline-block; background-color: #111111; color: #ffffff !important; text-decoration: none; padding: 12px 24px; font-size: 14px; font-weight: 500; border-radius: 6px; }
    .footer { margin-top: 40px; font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Password Reset Request</h2>
    <p>Hello ${name},<br>We received a request to reset your password. This link is valid for 10 minutes only.</p>
    <a href="${resetURL}" class="btn">Reset Password</a>
    <p style="margin-top: 32px; font-size: 12px; color: #999999;">If you didn't request this, ignore this email.</p>
    <div class="footer">اللعبة — Al-Le3ba</div>
  </div>
</body>
</html>
`;
