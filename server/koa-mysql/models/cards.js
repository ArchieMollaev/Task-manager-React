'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cards = sequelize.define('Cards', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    colID: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Cards;
};