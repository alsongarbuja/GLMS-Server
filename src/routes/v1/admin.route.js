const express = require('express');
const router = express.Router();
// const validate = require('../../middlewares/validate');
// const adminValidation = require('../../validations/admin.validation');
const adminController = require('../../controllers/admin.controller');

router
    .route('/dashboard')
    .get(adminController.getDashInfo)

router
    .route('/settings')
    .get(adminController.getSettings)

module.exports = router;
