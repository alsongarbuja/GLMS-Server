const express = require('express');
const router = express.Router();
const validate = require('../../middlewares/validate');
const borrowValidation = require('../../validations/borrow.validation');
const borrowController = require('../../controllers/borrow.controller');

router
    .route('/')
    .get(borrowController.getBorrows)

router
    .route('/:borrowId/:userId')
    .get(validate(borrowValidation.singleBorrow), borrowController.getBorrow)
    .delete(validate(borrowValidation.singleBorrow), borrowController.deleteBorrow)

router
    .route('/:requestId')
    .post(validate(borrowValidation.createBorrow), borrowController.createBorrow)

module.exports = router;
