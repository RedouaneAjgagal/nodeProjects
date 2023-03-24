const nodemailer = require('nodemailer');


const sendEmail = async (req, res) => {
    await nodemailer.createTestAccount();
    const transport = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'kane.bernhard46@ethereal.email',
            pass: 'grBWJ3XaQTrRGqG7Ac'
        }
    });
    const info = await transport.sendMail({
        from: 'Sender Name <sender@example.com>',
        to: 'Recipient <recipient@example.com>',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to myself!</p>'
    })
    res.json(info)
}

module.exports = sendEmail;