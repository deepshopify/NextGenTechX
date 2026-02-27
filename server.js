const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

function buildPlainText(data) {
  return [
    "New website inquiry",
    "",
    `Name: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email || "Not provided"}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Subject: ${data.subject || "Not provided"}`,
    "",
    "Message:",
    data.message || "Not provided"
  ].join("\n");
}

function buildHtml(data) {
  const safe = (value) => String(value || "Not provided");
  return `
    <div style="font-family: Arial, sans-serif; color: #1f2937; background: #f8fafc; padding: 24px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #0f4c81; color: #ffffff; padding: 16px 24px;">
          <h2 style="margin: 0; font-size: 20px;">New Contact Inquiry</h2>
          <p style="margin: 4px 0 0; font-size: 14px;">NxGen Technology website</p>
        </div>
        <div style="padding: 20px 24px;">
          <p style="margin: 0 0 12px;">A new message was submitted from the contact form.</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; width: 140px;">Name</td>
              <td style="padding: 8px 0;">${safe(data.firstName)} ${safe(data.lastName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Email</td>
              <td style="padding: 8px 0;">${safe(data.email)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Phone</td>
              <td style="padding: 8px 0;">${safe(data.phone)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Subject</td>
              <td style="padding: 8px 0;">${safe(data.subject)}</td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 12px; background: #f3f4f6; border-radius: 8px;">
            <div style="font-size: 13px; color: #6b7280; margin-bottom: 6px;">Message</div>
            <div style="white-space: pre-wrap;">${safe(data.message)}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

app.post("/api/contact", async (req, res) => {
  const { firstName, lastName, email, phone, subject, message } = req.body || {};

  if (!firstName || !lastName || !phone) {
    return res.status(400).json({ ok: false, message: "Missing required fields." });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(500).json({ ok: false, message: "Email service not configured." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const toEmail = process.env.CONTACT_TO || process.env.SMTP_USER;
    const fromEmail = process.env.SMTP_USER;

    await transporter.sendMail({
      from: `"NxGen Technology" <${fromEmail}>`,
      to: toEmail,
      replyTo: email || undefined,
      subject: subject ? `NxGen Technology Website Contact Form: ${subject}` : "New inquiry from website",
      text: buildPlainText({ firstName, lastName, email, phone, subject, message }),
      html: buildHtml({ firstName, lastName, email, phone, subject, message })
    });

    return res.json({ ok: true, message: "Message sent." });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ ok: false, message: "Failed to send email." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
