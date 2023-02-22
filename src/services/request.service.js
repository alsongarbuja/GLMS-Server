const httpStatus = require('http-status');
const { Request } = require('../models');
const ApiError = require('../utils/ApiError');

const getRequestbyId = async (id) => {
    return Request.findById(id).populate(['bookId', 'userId']);
}
const createRequest = async (requestBody) => {
    return Request.create(requestBody);
};

const getRequests = async () => {
    const requests = await Request.find({ status: { $ne: 'cancelled' } }).populate(['bookId', 'userId']).sort({ createdAt: -1 });
    return requests;
};

const updateRequest = async(requestId, updatedBody) => {
    const request = await getRequestbyId(requestId);
    if(!request){
        throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
    }
    Object.assign(request, updatedBody);
    await request.save();

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
