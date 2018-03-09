import Sequelize from 'sequelize';
import path from 'path';

const ORMconnect = () => {
  const ORM = new Sequelize('task-manager', 'root', 'admin', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
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
  ORM.import(path.resolve(__dirname, '../models/User'));
  ORM.import(path.resolve(__dirname, '../models/Column'));
  ORM.import(path.resolve(__dirname, '../models/Card'));

  const { User, Column, Card } = ORM.models;

  User.hasMany(Column, { as: 'Columns', onDelete: 'CASCADE' });
  Column.hasMany(Card, { as: 'Cards', onDelete: 'CASCADE' });

  ORM.sync();
  return ORM.models;
};

export default ORMconnect();

