const express = require('express');
const categoryController = require('../../controllers/category.controller');
const categoryValidation = require('../../validations/category.validation');
const validate = require('../../middlewares/validate');
const router = express.Router();

router 
    .route('/')
    .post(validate(categoryValidation.createCategory), categoryController.createCategory)
    .get(categoryController.getCategories)
router
    .route('/:categoryId')
    .get(validate(categoryValidation.singleCategory), categoryController.getCategory)
    .patch(validate(categoryValidation.updateCategory), categoryController.updateCategory)
    .delete(validate(categoryValidation.singleCategory), categoryController.deleteCategory)

module.exports = router;