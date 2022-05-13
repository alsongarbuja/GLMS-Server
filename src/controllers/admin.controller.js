const httpStatus = require('http-status');
const { Book, User } = require('../models');
const { getBorrows } = require('../services/borrow.service');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const getDashInfo = catchAsync(async (req, res) => {
  const totalBooks = await Book.countDocuments()
  const totalBorrows = await getBorrows()
  const totalStudents = await User.countDocuments({ role: { $ne: 'SYSTEM_ADMIN' } })

  const dashInfo = {
    totalBooks,
    totalBorrows: totalBorrows.length,
    totalStudents,
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
