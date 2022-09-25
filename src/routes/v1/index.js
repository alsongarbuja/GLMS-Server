const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const bookRoute = require('./book.route');
const categoryRoute = require('./category.route');
const limitRoute = require('./limit.route');
const requestRoute = require('./request.route');
const borrowRoute = require('./borrow.route');
const adminRoute = require('./admin.route');
const queueRoute = require('./queue.route');
const fineRoute = require('./fine.route');
const seedRoute = require('./seed.route');

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
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/limit',
    route: limitRoute,
  },
  {
    path: '/request',
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
    path: '/fine',
    route: fineRoute,
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
