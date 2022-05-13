const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { requestService } = require('../services');

const createRequest = catchAsync(async (req, res) => {
    const request = await requestService.createRequest(req.body);
    res.status(httpStatus.CREATED).send(request);
});

const getRequests = catchAsync(async (req, res) => {
    const requests = await requestService.getRequests();
    res.status(200).send(requests);
});

const updateRequest = catchAsync(async (req, res) => {
    const updatedRequest = await requestService.updateRequest(req.params.requestId, req.body);
    res.status(200).send(updatedRequest);
});

const deleteRequest = catchAsync(async (req, res) => {
    await requestService.deleteRequest(req.params.requestId)
    res.status(httpStatus.OK).send({message:'Request deleted'});
});

const getRequest = catchAsync(async (req, res) => {
    const request = await requestService.getRequestbyId(req.params.requestId);
    if(!request){
        throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
    }
    res.status(httpStatus.OK).send(request);
})

module.exports = {
    createRequest,
    getRequests,
    updateRequest,
    deleteRequest,
    getRequest,
}