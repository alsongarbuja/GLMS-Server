const httpStatus = require('http-status');
const { Book, User, Limit, Category, Fine } = require('../models');
const { getBorrows } = require('../services/borrow.service');
const catchAsync = require('../utils/catchAsync');

const getDashInfo = catchAsync(async (req, res) => {
  const totalBooks = await Book.countDocuments()
  const totalBorrows = await getBorrows()
  const totalStudents = await User.countDocuments({ role: { $ne: 'SYSTEM_ADMIN' } })

  const limits = await Limit.find({})
  const semesters = await Category.find({})
  const fine = await Fine.find({})

  const dashInfo = {
    totalBooks,
    totalBorrows: totalBorrows.length,
    totalStudents,
    hasFine: fine.length > 0,
    hasSemesters: semesters.length > 0,
    hasLimits: limits.length > 0,
  }
  res.status(200).send(dashInfo);
});

const getSettings = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).send({ settings: 'OK' });
})

module.exports = {
    getDashInfo,
    getSettings,
}
