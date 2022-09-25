const allRoles = {
  USER: [
    'getUser', 'manageUser', 'addRequest',
    'getQueue', 'getBorrow', 'removeRequest', 'addQueue',
    'getFine',
  ],
  SYSTEM_ADMIN: [
    'adminRequests', 'canSeed',
    'addUser', 'getUser', 'manageUser', 'removeUser', 'getUsers',
    'manageBook', 'addBook', 'removeBook',
    'manageLimits',
    'manageCategories',
    'manageFines',
    'addRequest', 'removeRequest', 'getRequets', 'manageRequest', 'getRequest',
    'getQueue', 'addQueue', 'removeQueue', 'getQueues', 'manageQueues',
    'getBorrow', 'getBorrows', 'manageBorrow', 'addBorrow', 'removeBorrow'
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
