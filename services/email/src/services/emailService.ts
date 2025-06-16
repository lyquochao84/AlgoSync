// SendGrid + Business Logic
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const EMAIL_FROM = process.env.EMAIL_FROM!;

export const sendOTPEmail = async (email: string, code: string) => {
  const msg = {
    to: email,
    from: {
      email: EMAIL_FROM,
      name: "AlgoSync Team",
    },
    subject: "Your OTP Code from AlgoSync",
    html: `
      <div style="font-family: Arial; max-width: 500px; margin: auto; padding: 20px;">
        <h2>Hi,</h2>
        <p>Your one-time password (OTP) is:</p>
        <div style="font-size: 26px; font-weight: bold; background-color: #f0f0f0; padding: 16px; text-align: center; border-radius: 6px; letter-spacing: 5px;">
          ${code}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>Thanks,<br>The AlgoSync Team</p>
      </div>
    `,
  };

  await sgMail.send(msg);
};
