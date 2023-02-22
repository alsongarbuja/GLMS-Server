const httpStatus = require('http-status');
const { User, Queue } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const getQueues = catchAsync(async (req, res) => {
  const queues = await Queue.find({})
  res.status(httpStatus.OK).send(queues);
});

const deleteQueues = catchAsync(async (req, res) => {
  const { bookId } = req.params

  const queues = await Queue.find({ bookId: bookId })

  if(!queues){
    throw new ApiError(httpStatus.NOT_FOUND, 'Queue with given BookId not found')
  }

  queues.forEach(async (queue) => {
    await queue.remove();
  })

  res.status(200).send({ queues: 'Queues deleted' });
})

const addQueue = catchAsync(async (req, res) => {
  const { body } = req
  const queue = await Queue.create(body)

  res.status(httpStatus.OK).send({ queue: 'queue added' })
})

const updateVisit = catchAsync(async (req, res) => {
  const { params } = req
  const user = await User.findById(params.userId)

  if(!user){
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const book = await Book.findById(params.bookId)

  if(!book){
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
  }

  const ticketNumber = await user.in_queue.filter(iqq => iqq.bookId==book._id)[0].ticketNumber

  user.in_queue = await user.in_queue.map(iqq => {
    if(iqq.bookId==book._id){
      iqq.canVisit = true;
    }
    return iqq;
  })
  user.save();

  book.in_queue = await book.in_queue.map(iq => {
    if(iq.queue_ticket_number===ticketNumber){
      iq.canVisit = true;
    }
    return iq;
  })
  book.save();

  res.status(httpStatus.OK).send({ queue: 'queue updated' })
})

module.exports = {
  getQueues,
  deleteQueues,
  addQueue,
  updateVisit,
}
