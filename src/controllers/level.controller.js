const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { levelService } = require('../services');

const createLevel = catchAsync(async (req, res) => {
    const level = await levelService.createLevel(req.body);
    res.status(httpStatus.CREATED).send(level);
});
const getLevel = catchAsync(async (req, res) => {
  const level = await levelService.getLevelbyId(req.params.levelId);
  if (!level) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Level not found');
  }
  res.status(httpStatus.OK).send(level);
})
const getLevels = catchAsync(async (req, res) => {
    const levels = await levelService.getLevels();
    res.status(200).send(levels);
});
const updateLevel = catchAsync(async (req, res) => {
    const updatedLevel = await levelService.updateLevel(req.params.levelId, req.body);
    res.status(200).send(updatedLevel);
});
const deleteLevel = catchAsync(async (req, res) => {
    await levelService.deleteLevel(req.params.levelId)
    res.status(httpStatus.OK).send({message:'Level deleted'});
});

module.exports = {
  createLevel,
  getLevels,
  updateLevel,
  deleteLevel,
  getLevel,
}
