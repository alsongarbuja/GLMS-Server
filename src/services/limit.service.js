const httpStatus = require('http-status');
const { Limit } = require('../models');
const ApiError = require('../utils/ApiError');

const getLimitbyId = async (id) => {
    return Limit.findById(id);
}
const createLimit = async (limitBody) => {
    return Limit.create(limitBody);
};

const getLimits = async () => {
    const limits = await Limit.find({}).sort({ createdAt: -1 });
    return limits;
};

const updateLimit = async(limitId, updatedBody) => {
    const limit = await getLimitbyId(limitId);
    if(!limit){
        throw new ApiError(httpStatus.NOT_FOUND, 'Limit not found');
    }
    Object.assign(limit, updatedBody);
    await limit.save();
    return limit;
};

const deleteLimit = async (limitId) => {
    const limit = await getLimitbyId(limitId);
    if(!limit) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Limit not found');
    }
    await limit.remove();
    return limit;
}

module.exports = {
    getLimitbyId,
    createLimit,
    getLimits,
    updateLimit,
    deleteLimit,
}