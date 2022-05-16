const express = require('express');
// const validate = require('../../middlewares/validate');
// const adminValidation = require('../../validations/admin.validation');
const queueController = require('../../controllers/queue.controller');
const auth = require('../../middlewares/auth')
const router = express.Router();

router
    .route('/')
    .post(auth('addQueue'), queueController.addQueue)
    .get(auth('getQueues'), queueController.getQueues)

router
    .route('/:bookId')
    .delete(auth('removeQueue'), queueController.deleteQueues)

router
  .route('/canVisit/:bookId/:userId')
  .get(auth('manageQueues'), queueController.updateVisit)

module.exports = router;
