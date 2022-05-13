const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { limitService } = require('../services');

const createLimit = catchAsync(async (req, res) => {
    const limit = await limitService.createLimit(req.body);
    res.status(httpStatus.CREATED).send(limit);
});

const getLimits = catchAsync(async (req, res) => {
    const limits = await limitService.getLimits();
    res.status(200).send(limits);
});

const updateLimit = catchAsync(async (req, res) => {
    const updatedLimit = await limitService.updateLimit(req.params.limitId, req.body);
    res.status(200).send(updatedLimit);
});

const deleteLimit = catchAsync(async (req, res) => {
    await limitService.deleteLimit(req.params.limitId)
    res.status(httpStatus.OK).send({message:'Limit deleted'});
});

const getLimit = catchAsync(async (req, res) => {
    const limit = await limitService.getLimitbyId(req.params.limitId);
    if(!limit){
        throw new ApiError(httpStatus.NOT_FOUND, 'Limit not found');
    }
    res.status(httpStatus.OK).send(limit);
})

module.exports = {
    createLimit,
    getLimits,
    updateLimit,
    deleteLimit,
    getLimit,
}