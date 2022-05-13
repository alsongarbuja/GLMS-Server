const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBorrow = {
    params: Joi.object().keys({
      requestId: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
        bookId: Joi.string().required(),
        bookName: Joi.string().required(),
        bookType: Joi.string().required(),
        authorName: Joi.string().required(),
        uniqueId: Joi.string().required(),
    }),
};

const singleBorrow = {
  params: Joi.object().keys({
    requestId: Joi.string().custom(objectId),
    borrowId: Joi.string().custom(objectId),
    userId: Joi.string().custom(objectId).optional(),
  }),
};

module.exports = {
  createBorrow,
  singleBorrow,
};
