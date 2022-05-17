const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFine = {
  body: Joi.object().keys({
    fine: Joi.number().required()
  })
}

const singleFine = {
  params: Joi.object().keys({
    fineId: Joi.required().custom(objectId)
  })
}

const updateFine = {
  params: Joi.object().keys({
    fineId: Joi.required().custom(objectId)
  }),
  body: Joi.object().keys({
    fine: Joi.number().required()
  })
}

module.exports = {
  createFine,
  updateFine,
  singleFine,
}
