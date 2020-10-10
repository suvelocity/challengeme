'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkUpdate(
        'challenges',//tableName: string
        {category:'Express'},//values: object
        {name:'JWT - Node.js'}// identifier: object
      )
      await queryInterface.bulkUpdate(
      'challenges',//tableName: string
        {category:'React'},//values: object
        {name:'React - Calculator'}// identifier: object
      ) 
      await queryInterface.bulkUpdate(
      'challenges',//tableName: string
        {category:'JavaScript'},//values: object
        {name:'Js - Drag N Scale'}// identifier: object
      )
    },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkUpdate(
      'challenges',//tableName: string
      {category:null},//values: object
      {name:'JWT - Node.js'}// identifier: object
    )
    await queryInterface.bulkUpdate(
     'challenges',//tableName: string
      {category:null},//values: object
      {name:'React - Calculator'}// identifier: object
    ) 
    await queryInterface.bulkUpdate(
     'challenges',//tableName: string
      {category:null},//values: object
      {name:'Js - Drag N Scale'}// identifier: object
    )
  }
};
