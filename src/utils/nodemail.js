import nodemailer from 'nodemailer';

export default async function sendEmail(subject, to, content) {
  let transporter = nodemailer.createTransport({
    host: "pi4b",
    port: 465,
    secure: true, // true for 465, false for other ports
    tls: {
      servername: "paridax.xyz",
    },
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `Nitrogen <${process.env.EMAIL_SENDER}>`, // sender address
    to: to.join(', '), // list of receivers
    subject: subject, // Subject line
    // text: "Hello world?", // plain text body
    html: content, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}