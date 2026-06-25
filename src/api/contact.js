import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { email, phone, description } = req.body;

  if (!email || !description) {
    return res.status(400).json({
      message: "Email and description are required",
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Website Enquiry <onboarding@resend.dev>",
      to: ["wahidrahimi45@gmail.com"],
      replyTo: email,
      subject: "New quote/enquiry from website",
      text: `
New enquiry received:

Email: ${email}
Phone: ${phone || "Not provided"}

Description:
${description}
      `,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json({
      message: "Enquiry sent successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}