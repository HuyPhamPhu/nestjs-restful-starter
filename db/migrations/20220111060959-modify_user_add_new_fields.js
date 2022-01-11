'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('user', 'refresh_token', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down(queryInterface) {
    return queryInterface.removeColumn('user', 'refresh_token');
  },
};
