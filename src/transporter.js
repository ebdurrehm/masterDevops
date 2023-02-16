const nodemailer = require('nodemailer');
const ck = require('ckey');

const transporter = nodemailer.createTransport({
    host: 'mail.ursdanismanlik.com',
    port: '465',
    auth: {
        user: 'backend@ursdanismanlik.com',
        pass: ck.EMAIL_PASSWRD,
    }
})

function mailTransporter(data) {
    transporter.sendMail({
        from: 'backend@ursdanismanlik.com',
        to: [ 'ebdurrehim5@gmail.com', 'mammadovramin02@gmail.com' ],
        subject: data.subject,
        html: data.html,
    }, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(`Email sent: ${info.response}`)
        }
    })
}

module.exports = mailTransporter;