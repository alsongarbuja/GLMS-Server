const express = require('express');
const categoryController = require('../../controllers/category.controller');
const categoryValidation = require('../../validations/category.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .post(auth('manageCategories'), validate(categoryValidation.createCategory), categoryController.createCategory)
    .get(categoryController.getCategories)
router
    .route('/:categoryId')
    .get(auth('manageCategories'), validate(categoryValidation.singleCategory), categoryController.getCategory)
    .patch(auth('manageCategories'), validate(categoryValidation.updateCategory), categoryController.updateCategory)
    .delete(auth('manageCategories'), validate(categoryValidation.singleCategory), categoryController.deleteCategory)

module.exports = router;
