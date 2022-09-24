const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { emailService, tokenService } = require('../services');

const sendMail = async (to, subject, text) => {
  await emailService.sendEmail(to, subject, text)
}

const sendResetPasswordEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  const token = await tokenService.generateResetPasswordToken(email);
  await emailService.sendResetPasswordEmail(email, token);
  res.status(httpStatus.OK).send();
});

module.exports = {
  sendMail,
  sendResetPasswordEmail,
}

// const Imap = require('imap');
// const mailConfig = {
//   imap: {
//     user: 'magar33alson@gmail.com',
//     password: 'eskwbvhabonnvtfg',
//     host: 'imap.gmail.com',
//     port: 993,
//     authTimeout: 10000,
//     tls: true,
//     tlsOptions: { rejectUnauthorized: false },
//   },
// };

// const imaps = require('imap-simple');
// const { convert } = require('html-to-text');

// const readMail = async () => {
//   try {
//     const connection = await imaps.connect(mailConfig);
//     console.log('CONNECTION SUCCESSFUL', new Date().toString());
//     const box = await connection.openBox('INBOX');
//     const searchCriteria = ['UNSEEN'];
//     const fetchOptions = {
//       bodies: ['HEADER', 'TEXT'],
//       markSeen: false,
//     };
//     const results = await connection.search(searchCriteria, fetchOptions);

//     connection.end();
//     return results
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getMails = catchAsync(async (req, res) => {
//   const test = await readMail()
//   const tt = test.forEach((res) => {
//     const text = res.parts.filter((part) => {
//       return part.which === 'TEXT';
//     });
//     let emailHTML = text[0].body;
//     let emailText = convert(emailHTML);
//     // console.log(emailText);
//     return emailText
//   });
//   console.log(tt);
//   res.status(httpStatus.OK).send({ mails: await readMail() })
// })
