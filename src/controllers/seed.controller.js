const catchAsync = require('../utils/catchAsync');
const { Category, Fine, Limit } = require('../models');

const { semesterSeed, fineSeed, limitSeed } = require('../utils/seeds');

const seedSemesters = catchAsync(async (req, res) => {
  await Category.insertMany(semesterSeed);

  res.status(201).json({
    status: 'success',
    message: 'Semesters seeded successfully',
  });
});

const seedFine = catchAsync(async (req, res) => {
  await Fine.insertMany(fineSeed);

  res.status(201).json({
    status: 'success',
    message: 'Fine seeded successfully',
  });
});

const seedLimits = catchAsync(async (req, res) => {
  await Limit.insertMany(limitSeed);

  res.status(201).json({
    status: 'success',
    message: 'Limits seeded successfully',
  });
});

module.exports = {
  seedSemesters,
  seedFine,
  seedLimits,
};
