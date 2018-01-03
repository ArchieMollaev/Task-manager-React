// import { request } from 'http';

const Koa = require('koa');
const sequelize = require('sequelize');
const db = require('./models');
// const Users = sequelize.import(__dirname + "/models/user");
// const db_connetion = new Sequelize('task_manager', 'root', 'root', {
//   host: '192.168.99.100',
//   dialect: 'mysql',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   // SQLite only
//   // storage: 'path/to/database.sqlite'
// });
console.log(db.User.findAll());
// db_connetion
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
const app = new Koa();



// const Users = db_connetion.define('User', {
//   id: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: Sequelize.INTEGER
//   },
//   login: {
//     type: Sequelize.STRING
//   },
//   password: {
//     type: Sequelize.STRING
//   },
//   email: {
//     type: Sequelize.STRING
//   }
// }, { timestamps: false });


// Users.findAll().then(users => {
//   console.log(users)
// })
// console.log(Users);
app.use(ctx => {
  ctx.body = 'Hello Koa';
});
 
app.listen(3001);