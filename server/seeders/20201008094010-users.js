const bcrypt = require('bcryptjs');
const users = require('./seedFiles/users');

module.exports = {
  up: async (queryInterface) => {
    const hashed = await Promise.resolve(Promise.all(users.map(async (user) => {
      const securityAnswer = await bcrypt.hashSync(user.security_answer, 10);
      const password = await bcrypt.hashSync(user.password, 10);
      return { password, securityAnswer };
    })));

    users.forEach(async (user, i) => {
      user.security_answer = hashed[i].securityAnswer;
      user.password = hashed[i].password;
    });
    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
