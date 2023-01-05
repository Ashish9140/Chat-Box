const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        return error;
    }
};