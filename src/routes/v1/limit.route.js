const express = require('express');
const limitController = require('../../controllers/limit.controller');
const limitValidation = require('../../validations/limit.validation');
const validate = require('../../middlewares/validate');
const router = express.Router();

router 
    .route('/')
    .post(validate(limitValidation.createLimit), limitController.createLimit)
    .get(limitController.getLimits)
router
    .route('/:limitId')
    .get(validate(limitValidation.singleLimit), limitController.getLimit)
    .patch(validate(limitValidation.updateLimit), limitController.updateLimit)
    .delete(validate(limitValidation.singleLimit), limitController.deleteLimit)

module.exports = router;