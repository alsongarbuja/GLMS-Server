const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { User, Request, Book, Limit, Fine } = require('../models');
const { sendMail } = require('../controllers/mail.controller');

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
const createNewBorrow = async (borrowRequest) => {
  const { body } = borrowRequest;

  const user = await User.findById(body.userId)

    if(!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const userBorrows = await user.borrowed_books.filter(bb => bb.bookType===body.bookType)
    let level = 'Bachelors'
    if(user.semester==='Masters')
      level = 'Masters'

    const limit = await Limit.find({ level })

    if(!limit){
      throw new ApiError(httpStatus.NOT_FOUND, 'Limit not found')
    }
    const checkLimit = limit[0].sub_quantity.filter(sq => sq.type===body.bookType)[0]

    if(userBorrows.length >= checkLimit.quantity)
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
        dueDate: new Date().setDate(new Date().getDate() + 29),
    }
    user.borrowed_books = [...user.borrowed_books, borrow];
    user.save();

    const ticketNumber = await user.in_queue.filter(iqq => iqq.bookId==body.bookId)[0].ticketNumber

    await queueHandler(body.bookId, 1, true, ticketNumber)
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

    const userBorrows = await user.borrowed_books.filter(bb => bb.bookType===body.bookType)
    let level = 'Bachelors'
    if(user.semester==='Masters')
      level = 'Masters'

    const limit = await Limit.find({ level })

    if(!limit){
      throw new ApiError(httpStatus.NOT_FOUND, 'Limit not found')
    }
    const checkLimit = limit[0].sub_quantity.filter(sq => sq.type===body.bookType)[0]

    if(userBorrows.length >= checkLimit.quantity)
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
        dueDate: new Date().setDate(new Date().getDate() + 29),
    }
    user.borrowed_books = [...user.borrowed_books, borrow];
    user.save();

    await queueHandler(body.bookId, 1)

    await request.remove()
    return user;
};

const queueHandler = async (bookId, type, isFromQueue=false, ticketNumber=1) => {
    const book = await Book.findById(bookId)

    if(!book){
      throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }

    book.borrowed_quantity += type;
    const remainingBook = book.quantity-book.borrowed_quantity

    book.in_queue.forEach(async (iq, i) => {
      const inQueueUser = await User.findById(iq.userId)

      if(isFromQueue){
        inQueueUser.in_queue = await inQueueUser.in_queue.filter(iqq => !((iqq.bookId==bookId)&&iqq.ticketNumber===ticketNumber))
      }
      if(remainingBook>=(i+1)){
        let borrowedBook = '';
        let canVisit = false;

        inQueueUser.in_queue = await inQueueUser.in_queue.map(iqq => {
          if(iqq.bookId==bookId){
            borrowedBook = iqq.bookName;
            iqq.canVisit = true;
            canVisit = true;
            if(isFromQueue&&iqq.ticketNumber!==-1&&ticketNumber<iqq.ticketNumber){
                iqq.ticketNumber -= 1;
            }
          }
          return iqq;
        })

        if(canVisit){
          const message = `
            Hello ${inQueueUser.name},

            The book ${borrowedBook} you had in queue is now available in library. Please visit the library to borrow the book.
            Please visit soon or else someone will get the chance to borrow the book.
          `;

          sendMail(inQueueUser.email, 'Book in queue now available in library', message);
        }
      }else{
        inQueueUser.in_queue = await inQueueUser.in_queue.map(iqq => {
          if(iqq.bookId==bookId){
            iqq.canVisit = false;
            if(isFromQueue&&iqq.ticketNumber!==-1&&ticketNumber<iqq.ticketNumber){
              iqq.ticketNumber -= 1;
            }
          }
          return iqq;
        })
      }
      await inQueueUser.save()
    })

    if(isFromQueue){
      if(ticketNumber!==1&&(ticketNumber===book.in_queue.length)){
        book.in_queue = await book.in_queue.filter(iqq => iqq.queue_ticket_number!==ticketNumber)
      }else{
        book.in_queue = await book.in_queue.filter(iqq => iqq.queue_ticket_number!==ticketNumber).map(iq => {
            if(iq.queue_ticket_number!==1&&iq.queue_ticket_number>ticketNumber){
              iq.queue_ticket_number -= 1;
            }
            return iq;
        })
      }
    }
    book.in_queue = await book.in_queue.map((iq, i) => {
      if(remainingBook>=(i+1)){
        iq.canVisit = true;
      }else{
        iq.canVisit = false;
      }
      return iq;
    })

    book.save();
}

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
   const borrowedBook = await user.borrowed_books.filter(bb => bb._id==borrowId)[0]
   user.borrowed_books = await user.borrowed_books.filter(borrowedBook => borrowedBook._id != borrowId)

   const fine = await Fine.find({})

   let dateToday = new Date()

   if(!fine[0].isActive){
     dateToday = fine[0].turnedOffDate;
   }

   const days = (dateToday.getTime()-borrowedBook.dueDate.getTime())/(1000*3600*24)

   if(days>0){
     user.totalFine += fine[0].fine*Math.floor(Math.abs(days))
   }
   await user.save();

   await queueHandler(borrowedBook.bookId, -1)
}

const extendBorrow = async (params) => {
  const { userId, borrowId } = params
  const user = await User.findById(userId)

  if(!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  user.borrowed_books = await user.borrowed_books.filter(borrowedBook => {
    if(borrowedBook._id == borrowId){
      borrowedBook.dueDate = new Date().setDate(new Date().getDate() + 29)
    }
    return borrowedBook;
  })

  await user.save();
}

module.exports = {
    getBorrowbyId,
    createBorrow,
    getBorrows,
    deleteBorrow,
    createNewBorrow,
    extendBorrow,
}
