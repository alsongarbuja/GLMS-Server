
const express = require('express')
const auth = require('../../middlewares/auth')
const mailController = require('../../controllers/mail.controller')

const router = express.Router()

router
  .route('/').get((req, res) => res.status(200).send({ message: 'Mail route' }))

router.route('/sendResetLink').post(mailController.sendResetPasswordEmail);

module.exports = router
