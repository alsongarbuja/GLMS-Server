const httpStatus = require('http-status');
const { Level } = require('../models');
const ApiError = require('../utils/ApiError');

const getLevelbyId = async (id) => {
    return Level.findById(id);
}

const createLevel = async (levelBody) => {
    return Level.create(levelBody);
};
const getLevels = async () => {
    const levels = await Level.find({}).sort({ createdAt: -1 });
    return levels;
};
const updateLevel = async(levelId, updatedBody) => {
    const level = await getLevelbyId(levelId);
    if(!level){
        throw new ApiError(httpStatus.NOT_FOUND, 'Level not found');
    }
    Object.assign(level, updatedBody);
    await level.save();
    return level;
};
const deleteLevel = async (levelId) => {
    const level = await getLevelbyId(levelId);
    if(!level) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Level not found');
    }
    await level.remove();
    return level;
}

module.exports = {
  createLevel,
  getLevels,
  updateLevel,
  deleteLevel,
  getLevelbyId,
}
