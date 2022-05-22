const httpStatus = require("http-status")
const catchAsync = require('../utils/catchAsync')
const { Fine } = require("../models")
const ApiError = require("../utils/ApiError")

const getFines = catchAsync(async (req, res) => {
  const fines = await Fine.find({})

  res.status(httpStatus.OK).send(fines)
})

const getFine = catchAsync(async (req, res) => {
  const fine = await Fine.findById(req.params.fineId)
  if(!fine){
    throw new ApiError(httpStatus.NOT_FOUND, 'Fine not found')
  }
  res.status(httpStatus.OK).send(fine)
})

const createFine = catchAsync(async (req, res) => {
  const fine = await Fine.create(req.body)

  res.status(httpStatus.CREATED).send(fine)
})

const updateFine = catchAsync(async (req, res) => {
  const fine = await Fine.findByIdAndUpdate(req.params.fineId, req.body)

  if(!fine){
    throw new ApiError(httpStatus.NOT_FOUND, 'Fine not found');
  }

  res.status(httpStatus.OK).send(fine)
})

const removeFine = catchAsync(async (req, res) => {
  const fine = await Fine.findById(req.params.fineId)
  if(!fine){
    throw new ApiError(httpStatus.NOT_FOUND, 'Fine not found');
  }
  await fine.remove()
  res.status(httpStatus.OK).send({ message: 'fine deleted' })
})

const toggleFine = catchAsync(async (req, res) => {
  const fine = await Fine.find({})

  fine[0].isActive = req.body.isActive
  if(!req.body.isActive){
    fine[0].turnedOffDate = new Date()
  }
  await fine[0].save();
  res.status(httpStatus.OK).send({ message: 'fine toggled' })
})

module.exports = {
  getFines,
  createFine,
  getFine,
  removeFine,
  updateFine,
  toggleFine,
}
