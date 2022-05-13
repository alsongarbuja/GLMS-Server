const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
    const category = await categoryService.createCategory(req.body);
    res.status(httpStatus.CREATED).send(category);
});

const getCategories = catchAsync(async (req, res) => {
    const categories = await categoryService.getCategories();
    res.status(200).send(categories);
});

const updateCategory = catchAsync(async (req, res) => {
    const updatedCategory = await categoryService.updateCategory(req.params.categoryId, req.body);
    res.status(200).send(updatedCategory);
});

const deleteCategory = catchAsync(async (req, res) => {
    await categoryService.deleteCategory(req.params.categoryId)
    res.status(httpStatus.OK).send({message:'Category deleted'});
});

const getCategory = catchAsync(async (req, res) => {
    const category = await categoryService.getCategorybyId(req.params.categoryId);
    if(!category){
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }
    res.status(httpStatus.OK).send(category);
})

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    getCategory,
}

