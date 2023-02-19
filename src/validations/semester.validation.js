const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSemester = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    level: Joi.string().required().custom(objectId),
  }),
};

const deleteSemester = {
  params: Joi.object().keys({
    semesterId: Joi.string().custom(objectId),
  }),
};

const updateSemester = {
  params: Joi.object().keys({
    semesterId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      level: Joi.string().optional().custom(objectId),
    })
    .min(1),
};

module.exports = {
  createSemester,
  deleteSemester,
  updateSemester,
};
