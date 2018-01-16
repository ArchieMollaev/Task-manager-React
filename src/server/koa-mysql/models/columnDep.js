'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserColumn = sequelize.define('ColumnDep', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userID: {
      type: Sequelize.INTEGER
    },
    columnID: {
      type: Sequelize.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserColumn;
};