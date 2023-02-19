const Joi = require('joi');
const { objectId } = require('./custom.validation');

const bookObject = {
    title: Joi.string().required(),
    ISBN_number: Joi.string().optional(),
    Barcode_number: Joi.string().optional(),
    quantity: Joi.number().required(),
    author: Joi.string().required(),
    publisher: Joi.string().optional(),
    edition: Joi.string().optional(),
    year: Joi.number().required(),
    secondary_title: Joi.string().optional(),
    book_copies: Joi.array().required(),
    semester: Joi.string().optional(),
    type: Joi.string().optional().valid('reference','text-book','others'),
}

const createBook = {
  body: Joi.object().keys(bookObject),
};

const singleBook = {
  params: Joi.object().keys({
    bookId: Joi.string().custom(objectId),
  }),
};

const updateBook = {
  params: Joi.object().keys({
    bookId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().optional(),
      ISBN_number: Joi.string().optional(),
      Barcode_number: Joi.string().optional(),
      quantity: Joi.number().optional(),
      author: Joi.string().optional(),
      publisher: Joi.string().optional(),
      edition: Joi.string().optional(),
      year: Joi.number().optional(),
      secondary_title: Joi.string().optional(),
      book_copies: Joi.array().optional(),
      semester: Joi.string().optional(),
      type: Joi.string().optional().valid('reference','text-book', 'others'),
    })
    .min(1),
};

module.exports = {
  createBook,
  singleBook,
  updateBook,
};
