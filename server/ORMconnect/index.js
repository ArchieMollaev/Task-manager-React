import Sequelize from 'sequelize';
import path from 'path';

const ORM = () => {
  const sequelize = new Sequelize('task-manager', 'postgres', 'admin', {
    dialect: 'postgres',
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: false,
    },
  });
  sequelize.sync();

  sequelize.import(path.resolve(__dirname, '../models/User'));
  sequelize.import(path.resolve(__dirname, '../models/Column'));
  sequelize.import(path.resolve(__dirname, '../models/Card'));

  const { User, Column, Card } = sequelize.models;

  User.hasMany(Column, { as: 'Columns', onDelete: 'CASCADE' });
  User.hasMany(Card);
  Column.hasMany(Card, { as: 'Cards', onDelete: 'CASCADE' });

  return sequelize;
};

export default ORM();

