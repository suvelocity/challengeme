'use strict';
const users = require('../_tests_/mocks/users');
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
      const hashed = await Promise.resolve(Promise.all(users.map( async user => {
        const securityAnswer = await bcrypt.hash(user.security_answer, 10);
        const password = await bcrypt.hash(user.password, 10);
        return {password, securityAnswer};
      })))
      
      users.forEach( async (user, i ) => {
        user.security_answer = hashed[i].securityAnswer;
        user.password = hashed[i].password;
      })
    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users');
  }
};