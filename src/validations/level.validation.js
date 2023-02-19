const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLevel = {
  body: Joi.object().keys({
    level: Joi.string().required(),
    limit: Joi.array().items(Joi.object({
      quantity: Joi.number().required(),
      type: Joi.string().required(),
    })).required(),
    fine: Joi.number().required(),
    isFineActive: Joi.boolean().default(true),
    turnedOffDate: Joi.date().default(new Date()),
  }),
};

const updateLevel = {
  params: Joi.object().keys({
    levelId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    level: Joi.string(),
    limit: Joi.array().items(Joi.object({
      quantity: Joi.number(),
      type: Joi.string(),
    })),
    fine: Joi.number(),
    isFineActive: Joi.boolean(),
    turnedOffDate: Joi.date(),
  }),
};

const deleteLevel = {
  params: Joi.object().keys({
    levelId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createLevel,
  updateLevel,
  deleteLevel,
};
