'use strict';
const users = require('./seedFiles/users');
const newUsers = require('../_tests_/mocks/newUsersForAuth');
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
      const hashed = await Promise.resolve(Promise.all(newUsers.map( async user => {
        const securityAnswer = await bcrypt.hash(user.security_answer, 10);
        const password = await bcrypt.hash(user.password, 10);
        return {password, securityAnswer};
      })))
      const updatedUsers = newUsers.map((user,i)=>{
        user.securityAnswer = hashed[i].securityAnswer,
        user.password=hashed[i].password
      return user
      })
      
      // users.forEach( async (user, i ) => {
      //   user.security_answer = hashed[i].securityAnswer;
      //   user.password = hashed[i].password;
      // })
    await queryInterface.bulkDelete('users',users,null);
    await queryInterface.bulkInsert('users', newUsers);
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users',null);
    await queryInterface.bulkInsert('users', users);
  }
};