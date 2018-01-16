// import { request } from 'http';

import Koa from 'koa'
import Sequelize from 'sequelize'
import path from 'path'
// import Users from './models/user'
// import { models } from './models'

// const modelsData = Object.values(models);

// console.log(models.Users)
const connectDB = new Sequelize('task_manager', 'root', 'root', {
  host: '192.168.99.100',
  port: 3306,
  dialect: 'mysql',
  // modelPaths: [
  //   path.normalize(__dirname + '/models')
  // ],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

console.log(path.normalize(__dirname + '/models'))
connectDB.sync({force: true})
  // .then(() => (
  //   Users.create({
  //     login: 'John',
  //     email: 'John@mail',
  //     password: 'qwerty'
  //   })
  // ))

// for (let i in models) {
//   models[i](connectDB, Sequelize).sync({force: true})
//     .then(() => {
//       i === 'Users' &&
//       models[i](connectDB, Sequelize).create({
//         login: 'John',
//         email: 'John@mail',
//         password: 'qwerty'
//       })
//     })
// };

// models.Users(connectDB, Sequelize).create({
//   login: 'John',
//   email: 'John@mail',
//   password: 'qwerty'
// })





const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello Koa';
});
 
app.listen(3001);