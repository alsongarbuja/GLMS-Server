const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const bookRoute = require('./book.route');
const semesterRoute = require('./semester.route');
const requestRoute = require('./request.route');
const borrowRoute = require('./borrow.route');
const adminRoute = require('./admin.route');
const queueRoute = require('./queue.route');
const seedRoute = require('./seed.route');
const levelRoute = require('./level.route');

const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/books',
    route: bookRoute,
  },
  {
    path: '/semesters',
    route: semesterRoute,
  },
  {
    path: '/requests',
    route: requestRoute,
  },
  {
    path: '/borrow',
    route: borrowRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/queue',
    route: queueRoute,
  },
  {
    path: '/levels',
    route: levelRoute,
  },
  {
    path: '/seeds',
    route: seedRoute,
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
