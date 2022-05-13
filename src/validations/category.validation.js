const Joi = require('joi');
const { objectId } = require('./custom.validation');

const categoryObject = {
    name: Joi.string().required(),
}

const createCategory = {
  body: Joi.object().keys(categoryObject),
};

const singleCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys(categoryObject)
    .min(1),
};

module.exports = {
  createCategory,
  singleCategory,
  updateCategory,
};
