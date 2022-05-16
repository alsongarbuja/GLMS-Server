const express = require('express');
const requestController = require('../../controllers/request.controller');
const requestValidation = require('../../validations/request.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .post(auth('addRequest'), validate(requestValidation.createRequest), requestController.createRequest)
    .get(auth('getRequets'), requestController.getRequests)
router
    .route('/:requestId')
    .get(auth('getRequest'), validate(requestValidation.singleRequest), requestController.getRequest)
    .patch(auth('manageRequest'), validate(requestValidation.updateRequest), requestController.updateRequest)
    .delete(auth('removeRequest'), validate(requestValidation.singleRequest), requestController.deleteRequest)

module.exports = router;
