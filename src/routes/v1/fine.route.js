const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const fineValidation = require('../../validations/fine.validation')
const fineController = require('../../controllers/fine.controller')

const router = express.Router()

router
  .route('/')
  .get(auth('manageFines'), fineController.getFines)
  .post(auth('manageFines'), validate(fineValidation.createFine), fineController.createFine)

router
  .route('/:fineId')
  .get(auth('manageFines'), validate(fineValidation.singleFine), fineController.getFine)
  .patch(auth('manageFines'), validate(fineValidation.updateFine), fineController.updateFine)
  .delete(auth('manageFines'), validate(fineValidation.singleFine), fineController.removeFine)

module.exports = router
