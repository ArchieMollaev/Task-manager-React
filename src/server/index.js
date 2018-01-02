const Koa = require('koa');
const mysql = require('mysql');
var db_config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_name'
 }
const db_connect = mysql.createConnection(db_config);
const app = new Koa();

// response 
app.use(ctx => {
  ctx.body = 'Hello Koa';
});
 
app.listen(3001);