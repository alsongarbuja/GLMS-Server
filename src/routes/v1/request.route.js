const express = require('express');
const requestController = require('../../controllers/request.controller');
const requestValidation = require('../../validations/request.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .post(validate(requestValidation.createRequest), requestController.createRequest)
    .get(requestController.getRequests)
router
    .route('/:requestId')
    .get(validate(requestValidation.singleRequest), requestController.getRequest)
    .patch(auth('manageRequests'), validate(requestValidation.updateRequest), requestController.updateRequest)
    .delete(auth('manageRequests'), validate(requestValidation.singleRequest), requestController.deleteRequest)

module.exports = router;
