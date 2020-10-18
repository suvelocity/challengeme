'use strict';
<<<<<<< HEAD:server/seeders/20201014194013-add-lables.js
const labels  = require('./seedData/labels')
=======
const labels = require('./seedFiles/labels');

>>>>>>> refactor_client:server/seeders/20201017192034-lables.js
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('labels', labels, {});
  },

  down: async (queryInterface, Sequelize) => {
<<<<<<< HEAD:server/seeders/20201014194013-add-lables.js
    await queryInterface.bulkDelete('labels');
=======

    await queryInterface.bulkDelete('labels', null, {});
>>>>>>> refactor_client:server/seeders/20201017192034-lables.js
  }
}

