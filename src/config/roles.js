const allRoles = {
  USER: [
    'getUser', 'manageUser', 'addRequest',
    'getQueue', 'getBorrow', 'removeRequest', 'addQueue',
    'getFine',
  ],
  SYSTEM_ADMIN: [
    'canSeed', 'adminRequests', 'getUser',
    'manageUsers', 'manageBooks', 'manageSemesters', 'manageLevels',
    'manageRequests', 'manageQueues', 'manageBorrows',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
