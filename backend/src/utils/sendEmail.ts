// src/utils/sendEmail.ts
import { Resend } from "resend";
import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  name: string;
  subject: string;
  resetURL: string;
}

const buildEmailHTML = (name: string, resetURL: string): string => `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body { 
      font-family: 'Segoe UI', Tahoma, Arial, sans-serif; 
      background-color: #0f0f1a; 
      color: #ffffff; 
      padding: 40px 20px;
      direction: rtl;
    }
    
    .wrapper {
      max-width: 520px;
      margin: 0 auto;
    }

    .header {
      text-align: center;
      padding: 32px 0 24px;
    }

    .logo {
      font-size: 32px;
      font-weight: 800;
      color: #FFD23F;
      letter-spacing: -1px;
    }

    .logo span {
      color: #5B5FEF;
    }

    .tagline {
      font-size: 13px;
      color: #888;
      margin-top: 4px;
    }

    .card {
      background: #1a1a2e;
      border: 1px solid #2a2a4a;
      border-radius: 16px;
      padding: 40px 36px;
      margin-top: 8px;
    }

    .icon {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #5B5FEF, #8B5CF6);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      font-size: 26px;
      text-align: center;
      line-height: 56px;
    }

    .title {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      text-align: center;
      margin-bottom: 12px;
    }

    .greeting {
      font-size: 15px;
      color: #aaaacc;
      text-align: center;
      line-height: 1.7;
      margin-bottom: 32px;
    }

    .greeting strong {
      color: #FFD23F;
    }

    .divider {
      height: 1px;
      background: #2a2a4a;
      margin: 28px 0;
    }

    .btn-wrapper {
      text-align: center;
      margin: 28px 0;
    }

    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #5B5FEF, #7C3AED);
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 40px;
      font-size: 15px;
      font-weight: 600;
      border-radius: 10px;
      letter-spacing: 0.3px;
      box-shadow: 0 4px 20px rgba(91, 95, 239, 0.4);
    }

    .warning {
      background: rgba(255, 210, 63, 0.08);
      border: 1px solid rgba(255, 210, 63, 0.2);
      border-radius: 10px;
      padding: 14px 18px;
      font-size: 13px;
      color: #FFD23F;
      text-align: center;
      margin-top: 24px;
      line-height: 1.6;
    }

    .ignore {
      font-size: 12px;
      color: #555577;
      text-align: center;
      margin-top: 20px;
      line-height: 1.6;
    }

    .footer {
      text-align: center;
      margin-top: 32px;
      padding-bottom: 16px;
    }

    .footer-logo {
      font-size: 18px;
      font-weight: 700;
      color: #FFD23F;
    }

    .footer-text {
      font-size: 11px;
      color: #444466;
      margin-top: 6px;
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Header -->
    <div class="header">
      <div class="logo">🎮 اللعبة</div>
      <div class="tagline">منصة المسابقات الجامعية</div>
    </div>

    <!-- Card -->
    <div class="card">
      <div class="icon">🔐</div>

      <div class="title">إعادة تعيين كلمة المرور</div>

      <div class="greeting">
        أهلاً <strong>${name}</strong>،<br>
        وصلنا طلب لإعادة تعيين كلمة المرور الخاصة بحسابك.
        اضغط على الزر أدناه لإعادة التعيين.
      </div>

      <div class="divider"></div>

      <div class="btn-wrapper">
        <a href="${resetURL}" class="btn">
          إعادة تعيين كلمة المرور
        </a>
      </div>

      <div class="warning">
        ⏱️ هذا الرابط صالح لمدة <strong>10 دقائق</strong> فقط
      </div>

      <div class="ignore">
        إذا لم تطلب إعادة التعيين، يمكنك تجاهل هذا البريد بأمان.<br>
        لن يتم تغيير أي شيء في حسابك.
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-logo">🎮 اللعبة</div>
      <div class="footer-text">
        جامعة برج العرب التكنولوجية — BATU<br>
        الإسكندرية، مصر
      </div>
    </div>

  </div>
</body>
</html>
`;

// ── Production: Resend ─────────────────────────────────────
const sendViaResend = async (options: EmailOptions): Promise<void> => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "اللعبة <noreply@yourdomain.com>",
    to: options.email,
    subject: options.subject,
    html: buildEmailHTML(options.name, options.resetURL),
  });

  if (error) throw new Error(`Resend error: ${error.message}`);
};

// ── Development: Mailtrap ──────────────────────────────────
const sendViaMailtrap = async (options: EmailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: Number(process.env.MAILTRAP_PORT),
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  await transporter.sendMail({
    from: '"اللعبة" <noreply@allu3ba.com>',
    to: options.email,
    subject: options.subject,
    html: buildEmailHTML(options.name, options.resetURL),
  });
};

// ── Main export ────────────────────────────────────────────
export const sendEmail = async (options: EmailOptions): Promise<void> => {
  if (process.env.NODE_ENV === "production") {
    await sendViaResend(options);
  } else {
    await sendViaMailtrap(options);
  }
};
