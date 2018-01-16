'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        login: 'Bob',
        email: 'bob@mail',
        password: 'qwerty'
      },
      {
        login: 'John',
        email: 'john@mail',
        password: 'john'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
