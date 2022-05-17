const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bookService } = require('../services');
const { User, Request, Limit } = require('../models');

const createBook = catchAsync(async (req, res) => {
    const book = await bookService.createBook(req.body);
    res.status(httpStatus.CREATED).send(book);
});

const getBooks = catchAsync(async (req, res) => {
    const books = await bookService.getBooks();
    res.status(200).send(books);
});

const updateBook = catchAsync(async (req, res) => {
    const updatedBook = await bookService.updateBook(req.params.bookId, req.body);
    res.status(200).send(updatedBook);
});

const deleteBook = catchAsync(async (req, res) => {
    await bookService.deleteBook(req.params.bookId)
    res.status(httpStatus.OK).send({message:'Book deleted'});
});

const getBook = catchAsync(async (req, res) => {
    const book = await bookService.getBookbyId(req.params.bookId);
    if(!book){
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }
    res.status(httpStatus.OK).send(book);
})

const checkBook = catchAsync(async (req, res) => {
  const book = await bookService.getBookbyId(req.params.bookId);
  if(!book){
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  const user = await User.findById(req.params.userId);
  if(!user){
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  let canRequestOrQueue = {
    check: true,
    message: '',
  }

  const userBorrowed = await user.borrowed_books.filter(bb => bb.bookId==book._id)

  if(userBorrowed.length>0){
    canRequestOrQueue = {
      check: false,
      message: 'You already have the book borrowed',
    }
  }

  const userQueue = await user.in_queue.filter(iq => iq.bookId==book._id)
  if(userQueue.length>0){
    canRequestOrQueue = {
      check: false,
      message: 'You are currently waiting on queue for this book',
    }
  }

  let userRequest = await Request.find({})
  userRequest = userRequest.filter(r => (r.book.bookId==book._id)&&(r.user.userId==user._id))
  if(userRequest.length>0){
    canRequestOrQueue = {
      check: false,
      message: 'You have send request for this book',
    }
  }

  let level = 'Bachelors'
  if(user.semester==='Masters')
    level = 'Masters'

  const limit = await Limit.find({ level })

  if(!limit){
    throw new ApiError(httpStatus.NOT_FOUND, 'Limit not found')
  }

  const userBorrowedType = user.borrowed_books.filter(bb => bb.bookType===book.type)
  const checkLimit = limit[0].sub_quantity.filter(sq => sq.type===book.type)[0]

  if(checkLimit.quantity<=userBorrowedType.length){
    canRequestOrQueue = {
      check: false,
      message: `You have already borrowed books within limit`,
    }
  }

  res.status(httpStatus.OK).send({ book, canRequestOrQueue })
})

module.exports = {
    createBook,
    getBooks,
    updateBook,
    deleteBook,
    getBook,
    checkBook,
}
