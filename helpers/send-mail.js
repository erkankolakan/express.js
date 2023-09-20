//uygulama üzerinden mail gönderme

const nodemailer = require("nodemailer");
const config = require("../config");

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.email.username,
        pass: config.email.password
    }
});

module.exports = transporter;