const express = require('express');
const borrowValidation = require('../../validations/borrow.validation');
const borrowController = require('../../controllers/borrow.controller');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .get(auth('getBorrows'), borrowController.getBorrows)
    .post(auth('addBorrow'), borrowController.createNewBorrow)

router
    .route('/:borrowId/:userId')
    .get(auth('getBorrow'), validate(borrowValidation.singleBorrow), borrowController.getBorrow)
    .delete(auth('removeBorrow'), validate(borrowValidation.singleBorrow), borrowController.deleteBorrow)
    // .path(auth('manageBorrow'), validation(), borrowController.extendBorrow),

router
    .route('/:requestId')
    .post(auth('addBorrow'), validate(borrowValidation.createBorrow), borrowController.createBorrow)

module.exports = router;
