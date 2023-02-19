const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { semesterService } = require('../services');

const createSemester = catchAsync(async (req, res) => {
    const semester = await semesterService.createSemester(req.body);
    res.status(httpStatus.CREATED).send(semester);
});
const getSemesters = catchAsync(async (req, res) => {
    const semesters = await semesterService.getSemesters();
    res.status(200).send(semesters);
});
const updateSemester = catchAsync(async (req, res) => {
    const updatedSemester = await semesterService.updateSemester(req.params.semesterId, req.body);
    res.status(200).send(updatedSemester);
});
const deleteSemester = catchAsync(async (req, res) => {
    await semesterService.deleteSemester(req.params.semesterId)
    res.status(httpStatus.OK).send({message:'Semester deleted'});
});

const getSemester = catchAsync(async (req, res) => {
    const semester = await semesterService.getSemesterbyId(req.params.semesterId);
    if(!semester){
        throw new ApiError(httpStatus.NOT_FOUND, 'Semester not found');
    }
    res.status(httpStatus.OK).send(semester);
})

module.exports = {
  createSemester,
  updateSemester,
  deleteSemester,
  getSemesters,
  getSemester,
}

