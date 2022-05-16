const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const adminController = require('../../controllers/admin.controller');

router
    .route('/dashboard')
    .get(auth('adminRequests'), adminController.getDashInfo)

router
    .route('/settings')
    .get(auth('adminRequests'), adminController.getSettings)

module.exports = router;
