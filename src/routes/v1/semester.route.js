const express = require('express');
const semesterController = require('../../controllers/semester.controller');
const semesterValidation = require('../../validations/semester.validation');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const router = express.Router();

router
    .route('/')
    .post(auth('manageSemesters'), validate(semesterValidation.createSemester), semesterController.createSemester)
    .get(semesterController.getSemesters)
router
    .route('/:semesterId')
    .get(validate(semesterValidation.singleSemester), semesterController.getSemester)
    .patch(auth('manageSemesters'), validate(semesterValidation.updateSemester), semesterController.updateSemester)
    .delete(auth('manageSemesters'), validate(semesterValidation.singleSemester), semesterController.deleteSemester)

module.exports = router;
