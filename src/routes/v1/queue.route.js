const express = require('express');
// const validate = require('../../middlewares/validate');
// const adminValidation = require('../../validations/admin.validation');
const queueController = require('../../controllers/queue.controller');
const auth = require('../../middlewares/auth')
const router = express.Router();

router
    .route('/')
    .post(auth('manageQueues'), queueController.addQueue)
    .get(auth('manageQueues'), queueController.getQueues)

router
    .route('/:bookId')
    .delete(auth('manageQueues'), queueController.deleteQueues)

router
  .route('/canVisit/:bookId/:userId')
  .get(auth('manageQueues'), queueController.updateVisit)

module.exports = router;
