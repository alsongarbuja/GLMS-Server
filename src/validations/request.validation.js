const Joi = require('joi');
const { objectId } = require('./custom.validation');

const requestObject = {
  book: Joi.string().required().custom(objectId),
  user: Joi.string().required().custom(objectId),
  request_type: Joi.string().valid('new request', 'renew request').required(),
}

const createRequest = {
  body: Joi.object().keys(requestObject),
};

const singleRequest = {
  params: Joi.object().keys({
    requestId: Joi.string().custom(objectId),
  }),
};

const updateRequest = {
  params: Joi.object().keys({
    requestId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      book: Joi.string().optional().custom(objectId),
      user: Joi.string().optional().custom(objectId),
      request_type: Joi.string().valid('new request', 'renew request').optional(),
      status: Joi.string().valid('open', 'verified','cancelled').optional(),
      cancelled_reason: Joi.string().optional(),
    })
    .min(1),
};

module.exports = {
  createRequest,
  singleRequest,
  updateRequest,
};
