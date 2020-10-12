'use strict';
const users = require('./seedFiles/users');
const newUsers = require('../_tests_/mocks/newUsersForAuth');

module.exports = {
  up: async (queryInterface, Sequelize) => {
      const updatedUsers = newUsers.map((user,i)=>{
        user.security_answer = '$2b$10$1aOEp802.PGhWtsBPWeSj.US5s5/5TjBEh6tBYzm74Gri/NtARIjS'
        user.password='$2b$10$ex.YGM5a5/BqvlYEulf0hO7mCuM0tFgB8AqJDF0A8G6Dlra1LQ0Dq'
      return user
      })
    await queryInterface.bulkDelete('users',null);
    await queryInterface.bulkInsert('users', updatedUsers);
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users',null);
    await queryInterface.bulkInsert('users', users);
  }
};