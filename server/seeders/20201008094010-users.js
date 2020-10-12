'use strict';
const users = require('./seedFiles/users');
// const bcrypt = require("bcrypt");
 
users.forEach( async user => {
    user.password = '$2b$10$ex.YGM5a5/BqvlYEulf0hO7mCuM0tFgB8AqJDF0A8G6Dlra1LQ0Dq'
    user.security_answer = '$2b$10$1aOEp802.PGhWtsBPWeSj.US5s5/5TjBEh6tBYzm74Gri/NtARIjS'
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
     
    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users');
  }
};
