const nodemailer = require("nodemailer");

myCon = {
    service: 'gmail',
    auth: {
        user: 'suvelocity@gmail.com',
        pass: 'yozwryyfgcrsneor'
    }
}

class Communicator {
    constructor(connection) {
        this.connection = nodemailer.createTransport(connection)
        this.user = connection.auth.user
    }
    sendTextMail(reciver, subject, text, cb) {
        const mailOptions = {
            from: this.user,
            to: reciver,
            subject,
            text
        };
        if (cb) {
            this.connection.sendMail(mailOptions, cb)
        }
        else {
            this.connection.sendMail(mailOptions, cb)
        }
    }
    sendHTMLMail(reciver, subject, html, cb) {
        const mailOptions = {
            from: this.user,
            to: reciver,
            subject,
            html
        };
        if (cb) {
            this.connection.sendMail(mailOptions, cb)
        }
        else {
            this.connection.sendMail(mailOptions, cb)
        }
    }
}

module.exports = new Communicator(myCon)