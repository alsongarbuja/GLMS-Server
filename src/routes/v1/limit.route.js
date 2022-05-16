const express = require('express');
const limitController = require('../../controllers/limit.controller');
const limitValidation = require('../../validations/limit.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .post(auth('manageLimits'), validate(limitValidation.createLimit), limitController.createLimit)
    .get(auth('manageLimits'), limitController.getLimits)
router
    .route('/:limitId')
    .get(auth('manageLimits'), validate(limitValidation.singleLimit), limitController.getLimit)
    .patch(auth('manageLimits'), validate(limitValidation.updateLimit), limitController.updateLimit)
    .delete(auth('manageLimits'), validate(limitValidation.singleLimit), limitController.deleteLimit)

module.exports = router;
