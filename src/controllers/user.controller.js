const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { Request, User } = require('../models');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getMyBooks = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId)

  const requests = await Request.find({})
  const requestedBook = await requests.filter(r => r.user.userId==user._id)

  const books = {
    borrowed: user.borrowed_books,
    requested: requestedBook,
    queues: user.in_queue,
  }

  res.status(httpStatus.OK).send(books)
})

const updateUserSem = catchAsync(async (req, res) => {
  const users = await User.find({})

  users.forEach(async user => {
    if(user.semester){
      if(user.semester==='8th Semester'){
        const request = await Request.find({
          user: {
            userId: user._id.toString(),
            name: user.name,
            level: user.semester,
          }
        })

        request.forEach(async r => await r.remove())

        user.remove()
      }else{
        user.semester = getNextSem(user.semester)
        user.save()
      }
    }
  })

  res.status(httpStatus.OK).send({ message: 'Semester updated' })
})

const getNextSem = (sem) => {
  switch (sem) {
    case '1st Semester':
      return '2nd Semester'
    case '2nd Semester':
      return '3rd Semester'
    case '3rd Semester':
      return '4th Semester'
    case '4th Semester':
      return '5th Semester'
    case '5th Semester':
      return '6th Semester'
    case '6th Semester':
      return '7th Semester'
    case '7th Semester':
      return '8th Semester'
    default:
      return 'Masters';
  }
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMyBooks,
  updateUserSem,
};
