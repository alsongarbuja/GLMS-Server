const express = require('express');
const router = express.Router();
// const validate = require('../../middlewares/validate');
// const adminValidation = require('../../validations/admin.validation');
const queueController = require('../../controllers/queue.controller');

router
    .route('/')
    .post(queueController.addQueue)
    .get(queueController.getQueues)

router
    .route('/:bookId/:userId')
    .get(queueController.getQueue)

module.exports = router;
