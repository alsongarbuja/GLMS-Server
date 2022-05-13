const httpStatus = require('http-status');
const { Request, Book, User } = require('../models');
const ApiError = require('../utils/ApiError');

const getRequestbyId = async (id) => {
    return Request.findById(id);
}
const createRequest = async (requestBody) => {
    return Request.create(requestBody);
};

const getRequests = async () => {
    const requests = await Request.find({ status: { $ne: 'cancelled' } }).sort({ createdAt: -1 });
    return requests;
};

const updateRequest = async(requestId, updatedBody) => {
    const request = await getRequestbyId(requestId);
    if(!request){
        throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
    }
    Object.assign(request, updatedBody);
    await request.save();

    if(updatedBody.status==='cancelled'){
      const book = await Book.findById(updatedBody.book.bookId)
      if(!book){
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
      }
      const user = await User.findById(updatedBody.user.userId)
      if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
      }

      const indexOfCancelledUser = await book.in_queue.filter((iqq, i) => {
        if(iqq.userId==user._id){
          return i;
        }
      })

      if(indexOfCancelledUser[0]+1==book.in_queue.length){
        book.in_queue = await book.in_queue.filter(iq => {
          if(iq.userId!=user._id){
            return iq;
          }
          return;
        })
      }else{
        book.in_queue = await book.in_queue.filter(iq => {
          if(iq.userId!=user._id&&iq.queue_ticket_number!==0){
            iq.queue_ticket_number -= 1
            return iq;
          }
          if(iq.userId!=user._id&&iq.queue_ticket_number===0) return iq;

          return;
        })
      }


      await book.save();
    }
    return request;
};

const deleteRequest = async (requestId) => {
    const request = await getRequestbyId(requestId);
    if(!request) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
    }
    await request.remove();
    return request;
}

module.exports = {
    getRequestbyId,
    createRequest,
    getRequests,
    updateRequest,
    deleteRequest,
}
