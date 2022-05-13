const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { borrowService } = require('../services');

const createBorrow = catchAsync(async (req, res) => {
    const user = await borrowService.createBorrow(req);
    res.status(httpStatus.CREATED).send(user);
});

const getBorrows = catchAsync(async (req, res) => {
    const borrows = await borrowService.getBorrows();
    res.status(200).send(borrows);
});

const deleteBorrow = catchAsync(async (req, res) => {
    await borrowService.deleteBorrow(req.params)
    res.status(httpStatus.OK).send({message:'Book checked in'});
});

const getBorrow = catchAsync(async (req, res) => {
    const borrow = await borrowService.getBorrowbyId(req.params);
    res.status(httpStatus.OK).send(borrow);
})

module.exports = {
    createBorrow,
    getBorrows,
    deleteBorrow,
    getBorrow,
}