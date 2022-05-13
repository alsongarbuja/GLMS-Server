const httpStatus = require('http-status');
const { Book, User } = require('../models');
const { getBorrows } = require('../services/borrow.service');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const getQueues = catchAsync(async (req, res) => {

  res.status(200).send({ queues: 'OK' });
});

const getQueue = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).send({ settings: 'OK' });
})

const addQueue = catchAsync(async (req, res) => {
  const { body } = req
  const book = await Book.findById(body.bookId)

  if(!book){
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
  }

  const user = await User.findById(body.userId)

  if(!user){
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  user.in_queue.push({
    bookId: body.bookId,
    bookName: body.bookName,
    ticketNumber: book.in_queue.length+1,
  })
  await user.save()

  book.in_queue.push({
    userId: user._id,
    name: body.name,
    level: body.level,
    queue_ticket_number: book.in_queue.length+1,
  })
  await book.save()

  res.status(httpStatus.OK).send({ queue: 'queue added' })
})

module.exports = {
  getQueues,
  getQueue,
  addQueue,
}
