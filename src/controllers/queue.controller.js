const httpStatus = require('http-status');
const { Book, User } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const getQueues = catchAsync(async (req, res) => {
  const books = await Book.find({})
  const queueBooks = await books.filter(b => b.in_queue.length>0)

  const queues = []

  queueBooks.forEach(qb => {
    queues.push({ book: qb })
  })

  res.status(httpStatus.OK).send(queues);
});

const deleteQueues = catchAsync(async (req, res) => {
  const { bookId } = req.params

  const book = await Book.findById(bookId)

  if(!book){
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
  }

  book.in_queue.forEach(async (iq) => {
    const user = await User.findById(iq.userId)
    if(!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    user.in_queue = []
    await user.save();
  })

  book.in_queue = [];
  await book.save();

  res.status(200).send({ queues: 'Queues deleted' });
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
