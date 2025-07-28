/* eslint-disable */
const { text } = require('express');
const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlTotext = require('html-to-text');

// new Email(user, url).sendWelcome();

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Jonas Schmedtmann <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        // if (process.env.NODE_ENV === 'production') {
        //     // sendgrid
        //     return nodemailer.createTransport({
        //         service: 'SendGrid',
        //         auth: {
        //             user: process.env.SENDGRID_USERNAME,
        //             pass:process.env.SENDGRID_PASSWORD
        //         }
        //     })
        // }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async send(template, subject) {
        // send the actual email
        //1) Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        })

        // 2) Define the email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlTotext.convert(html)
            // html: 
        }

        // 3) Create a transport and send email 
        await this.newTransport().sendMail(mailOptions);


    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Natours Family !')
    }

    async sendPasswordReset(){
        await this.send('passwordReset','Your password reset token valid for 10 minutes')
    }
}



/////// CHAT GPT //////// 


// /* eslint-disable */
// const nodemailer = require('nodemailer');
// const pug = require('pug');
// const { convert } = require('html-to-text');  // Correct import

// module.exports = class Email {
//     constructor(user, url) {
//         this.to = user.email;
//         this.firstName = user.name.split(' ')[0];
//         this.url = url;
//         this.from = `Jonas Schmedtmann <${process.env.EMAIL_FROM}>`;
//     }

//     newTransport() {
//         // For now: always use Mailtrap for testing
//         return nodemailer.createTransport({
//             host: process.env.EMAIL_HOST,
//             port: process.env.EMAIL_PORT,
//             auth: {
//                 user: process.env.EMAIL_USERNAME,
//                 pass: process.env.EMAIL_PASSWORD
//             }
//         });
//     }

//     async send(template, subject) {
//         // 1) Render HTML with Pug
//         const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
//             firstName: this.firstName,
//             url: this.url,
//             subject
//         });

//         // 2) Define email options
//         const mailOptions = {
//             from: this.from,
//             to: this.to,
//             subject,
//             html,
//             text: convert(html)
//         };

//         // 3) Send email
//         try {
//             const info = await this.newTransport().sendMail(mailOptions);
//             console.log('Email sent successfully:', info);
//         } catch (err) {
//             console.error('Email sending failed:', err);
//         }
//     }

//     async sendWelcome() {
//         await this.send('welcome', 'Welcome to the Natours Family!');
//     }
// };



// const sendEmail = async options => {
//     // 1) create a transporter
//     // const transporter = nodemailer.createTransport({
//     //     host: process.env.EMAIL_HOST,
//     //     port: process.env.EMAIL_PORT,
//     //     auth: {
//     //         user: process.env.EMAIL_USERNAME,
//     //         pass: process.env.EMAIL_PASSWORD
//     //     }
//     // });


//     // 2) Define the email options

//     // 3) Actually send the email
//     await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;