const express = require('express');
const levelController = require('../../controllers/level.controller');
const levelValidation = require('../../validations/level.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .post(auth('manageLevels'), validate(levelValidation.createLevel), levelController.createLevel)
    .get(levelController.getLevels)
router
    .route('/:levelId')
    .get(validate(levelValidation.deleteLevel), levelController.getLevel)
    .patch(auth('manageLevels'), validate(levelValidation.updateLevel), levelController.updateLevel)
    .delete(auth('manageLevels'), validate(levelValidation.deleteLevel), levelController.deleteLevel)

module.exports = router;
