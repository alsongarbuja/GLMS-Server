const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

const getCategorybyId = async (id) => {
    return Category.findById(id);
}
const createCategory = async (categoryBody) => {
    return Category.create(categoryBody);
};

const getCategories = async () => {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return categories;
};

const updateCategory = async(categoryId, updatedBody) => {
    const category = await getCategorybyId(categoryId);
    if(!category){
        throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
    }
    Object.assign(category, updatedBody);
    await category.save();
    return category;
};

const deleteCategory = async (categoryId) => {
    const category = await getCategorybyId(categoryId);
    if(!category) {
        throw new ApiError(httpStatus.NOT_FOUND, 'category not found');
    }
    await category.remove();
    return category;
}

module.exports = {
    getCategorybyId,
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
}