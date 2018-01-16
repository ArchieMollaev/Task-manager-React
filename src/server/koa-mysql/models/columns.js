'use strict';
module.exports = (sequelize, DataTypes) => {
  var Columns = sequelize.define('Columns', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Columns.belongsTo(models.User, 
          { name: 'To Do'},
          { name: 'In progress'},
          { name: 'Done'}
        );
      }
    }
  });
  return Columns;
};