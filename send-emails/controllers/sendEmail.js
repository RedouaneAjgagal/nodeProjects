const nodemailer = require('nodemailer');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;


// Send test emails using nodemailer and ethereal
const sendTestEmail = async (req, res) => {
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

// send emails using nodemailer and Sendinblue
const sendEmails = async (req, res) => {
    const transport = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
            user: 'test@mail.co',
            pass: process.env.SIB_PASSWORD
        }
    });
    const info = await transport.sendMail({
        from: 'Sender Name <test@mail.co>',
        to: 'Recipient <tomail@mail.co>',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to myself!</p>'
    })
    res.json(info)
}

// send emails using only Sendinblue
const sendEmail = async (req, res) => {
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SIB_API_KEY;
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail = {
        to: [{
            email: 'test@mail.co',
            name: 'Jhon Doe'
        }],
        templateId: 4,
        params: {
            name: 'Jhon',
            surname: 'Doe'
        },
        headers: {
            'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
        }
    };
    const info = await apiInstance.sendTransacEmail(sendSmtpEmail)
    res.json(info)

}

module.exports = sendEmail;