const nodemailer = require('nodemailer');
const config = require('../config/config')

const transporter = nodemailer.createTransport(config.email.smtp);

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
export const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transporter.sendMail(msg);
};

