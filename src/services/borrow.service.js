const httpStatus = require('http-status');
const { User, Request, Book } = require('../models');
const ApiError = require('../utils/ApiError');
const { createRequest } = require('./request.service');

const getBorrowbyId = async (params) => {
    const { userId, borrowId } = params;
    const user = await User.findById(userId)
    if(!user)
    {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const borrow = user.borrowed_books.filter( borrowedBook => borrowedBook._id == borrowId)
    if(borrow.length === 0)
    {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Borrow detail not found');
    }
    return borrow;
}
const createBorrow = async (borrowRequest) => {
    const { params, body } = borrowRequest;
    const request = await Request.findById(params.requestId)
    if(!request)
    {
        throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
    }

    const user = await User.findById(request.user.userId)

    if(!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    // TO DO : Check for Limits
    if(user.borrowed_books.length >= 6)
    {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User limit crossed');
    }
    const borrow = {
        bookId: body.bookId,
        bookName: body.bookName,
        bookType: body.bookType,
        authorName: body.authorName,
        uniqueId: body.uniqueId,
        issuedDate: new Date(),
        dueDate: new Date().setDate(new Date().getDate() + 30),
    }
    user.borrowed_books = [...user.borrowed_books, borrow];
    user.save();

    const book = await Book.findById(body.bookId)

    if(!book){
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }

    book.in_queue.forEach(async (iq) => {
      const inQueueUser = await User.findById(iq.userId)

      if(iq.queue_ticket_number===1){
        inQueueUser.in_queue = await inQueueUser.in_queue.filter(iqq => iqq.bookId!=body.bookId)
      }else{
        inQueueUser.in_queue = await inQueueUser.in_queue.map(iqq => {
          if(iqq.bookId==body.bookId){
            iqq.ticketNumber -= 1;
          }
          return iqq;
        })
      }
      await inQueueUser.save()
    })

    book.borrowed_quantity += 1;

    const queueBook = book.in_queue.filter(iq => iq.queue_ticket_number===1)

    if(queueBook.length>0){
      await createRequest({
        book: {
          bookId: book._id,
          name: book.title,
          authorName: book.author,
          bookType: book.type,
        },
        user: {
          userId: queueBook[0].userId.toString(),
          name: queueBook[0].name,
          level: queueBook[0].level,
        },
        request_type: 'new request',
        status: 'verified',
      })
    }

    book.in_queue = await book.in_queue.filter(iq => {
      if(iq.queue_ticket_number!==1){
        iq.queue_ticket_number -= 1;
        return iq
      }
      return;
    })

    book.save();

    await request.remove()
    return user;
};

const getBorrows = async () => {
    const users = await User.find({})
    const borrows = [];
    users.forEach(user => {
      user.borrowed_books.forEach(bb => {
        borrows.push({
          _id: bb._id,
          bookName: bb.bookName,
          issueDate: bb.issueDate,
          dueDate: bb.dueDate,
          uniqueId: bb.uniqueId,
          authorName: bb.authorName,
          bookType: bb.bookType,
          userName: user.name,
          userId: user._id,
          level: user.semester,
          bookId: bb.bookId,
        })
      })
    })

    borrows.reverse();
    return borrows;
};

const deleteBorrow = async (params) => {
   const { userId, borrowId } = params;
   const user = await User.findById(userId)
   if(!user)
   {
       throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
   }
   await getBorrowbyId(params)
   const bookId = await user.borrowed_books.filter(bb => bb._id==borrowId)[0].bookId
   user.borrowed_books = await user.borrowed_books.filter(borrowedBook => borrowedBook._id != borrowId)
   await user.save();

   const book = await Book.findById(bookId)

    if(!book){
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }

    book.in_queue.forEach(async (iq) => {
      const inQueueUser = await User.findById(iq.userId)

      if(iq.queue_ticket_number===1){
        inQueueUser.in_queue = await inQueueUser.in_queue.filter(iqq => iqq.bookId!=bookId)
      }else{
        inQueueUser.in_queue = await inQueueUser.in_queue.map(iqq => {
          if(iqq.bookId==bookId){
            iqq.ticketNumber -= 1;
          }
          return iqq;
        })
      }
      await inQueueUser.save()
    })

    book.borrowed_quantity -= 1;

    const queueBook = book.in_queue.filter(iq => iq.queue_ticket_number===1)

    if(queueBook.length>0){
      await createRequest({
        book: {
          bookId: book._id,
          name: book.title,
          authorName: book.author,
          bookType: book.type,
        },
        user: {
          userId: queueBook[0].userId.toString(),
          name: queueBook[0].name,
          level: queueBook[0].level,
        },
        request_type: 'new request',
        status: 'verified',
      })
    }

    book.in_queue = await book.in_queue.map(iq => {
      iq.queue_ticket_number -= 1;
      return iq;
    })

    await book.save();
}

module.exports = {
    getBorrowbyId,
    createBorrow,
    getBorrows,
    deleteBorrow,
}
