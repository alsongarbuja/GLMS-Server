const express = require('express');
const bookController = require('../../controllers/book.controller');
const bookValidation = require('../../validations/book.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .post(auth('manageBooks'), validate(bookValidation.createBook), bookController.createBook)
    .get(bookController.getBooks)
router
    .route('/:bookId')
    .get(validate(bookValidation.singleBook), bookController.getBook)
    .patch(auth('manageBooks'), validate(bookValidation.updateBook), bookController.updateBook)
    .delete(auth('manageBooks'), validate(bookValidation.singleBook), bookController.deleteBook)
router
  .route('/check/:bookId/:userId')
  .get(auth(), bookController.checkBook)

module.exports = router;
