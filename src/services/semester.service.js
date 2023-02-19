const httpStatus = require('http-status');
const { Semester } = require('../models');
const ApiError = require('../utils/ApiError');

const getSemesterbyId = async (id) => {
    return Semester.findById(id).populate('level');
};

const createSemester = async (semesterBody) => {
    return Semester.create(semesterBody);
};
const getSemesters = async () => {
    const semesters = await Semester.find({}).populate('level').sort({ createdAt: -1 });
    return semesters;
};
const updateSemester = async(semesterId, updatedBody) => {
    const semester = await getSemesterbyId(semesterId);
    if(!semester){
        throw new ApiError(httpStatus.NOT_FOUND, 'Semester not found');
    }
    Object.assign(semester, updatedBody);
    await semester.save();
    return semester;
};
const deleteSemester = async (semesterId) => {
    const semester = await getSemesterbyId(semesterId);
    if(!semester) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Semester not found');
    }
    await semester.remove();
    return semester;
}

module.exports = {
  createSemester,
  getSemesters,
  updateSemester,
  deleteSemester,
  getSemesterbyId,
}
