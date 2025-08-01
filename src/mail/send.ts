import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5a070e832381bf",
    pass: "705ef3d1f7a2b6"
  }
});


export const sendMail = async ({ email, subject, html }: { email: string, subject: string, html: string }) => {
    const data = await transport.sendMail({
      from: '"Jobs" <jobs@osmarperera.com>',
      to: email,
      subject,
      html
    });

    return data;
};

