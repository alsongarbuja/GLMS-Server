const express = require('express');
const bookController = require('../../controllers/book.controller');
const bookValidation = require('../../validations/book.validation');
const validate = require('../../middlewares/validate');
const router = express.Router();

router 
    .route('/')
    .post(validate(bookValidation.createBook), bookController.createBook)
    .get(bookController.getBooks)
router
    .route('/:bookId')
    .get(validate(bookValidation.singleBook), bookController.getBook)
    .patch(validate(bookValidation.updateBook), bookController.updateBook)
    .delete(validate(bookValidation.singleBook), bookController.deleteBook)

module.exports = router;