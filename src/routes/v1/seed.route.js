const express = require('express')
const auth = require('../../middlewares/auth')

const seedController = require('../../controllers/seed.controller')

const router = express.Router()

router.route('/semesters').get(auth('canSeed'), seedController.seedSemesters)
router.route('/fine').get(auth('canSeed'), seedController.seedFine)
router.route('/limits').get(auth('canSeed'), seedController.seedLimits)

module.exports = router
