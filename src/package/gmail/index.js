import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "app980725@gmail.com",
    pass: "royrichvxfeoomjl"
  }
})

export default transporter