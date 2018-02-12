import jsonServer from 'json-server';
import path from 'path';
import fs from 'fs';
import db from './tasks.json';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'tasks.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const wrtiteToDb = (res) => {
  // fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(db, null, 4), 'utf8', (err) => {
  //   if (err) {
  //     res.status(500).jsonp({ error: 'Failed to write file' });
  //   }
  //   res.end('write success');
  // });
  router.db.assign(db).write();
  res.end('write success');
};

server.post('/', (req, res) => {
  let newEntry = req.body.name;
  Object.keys(db).forEach((x) => { if (x === newEntry) newEntry += '(duplicate)'; });
  db[newEntry] = [];
  wrtiteToDb(res);
});

server.post('/rename_column', (req, res) => {
  const {
    currentName,
    newName,
  } = req.body;
  db[newName] = db[currentName];
  delete db[currentName];
  wrtiteToDb(res);
});

server.post('/delete', (req, res) => {
  delete db[req.body.name];
  wrtiteToDb(res);
});

server.post('/update', (req, res) => {
  const {
    currentStatus,
    newStatus,
    data,
    position,
  } = req.body;
  db[currentStatus] = db[currentStatus].filter(item => item.id !== data.id);
  if (currentStatus === newStatus) {
    db[currentStatus].splice(position, 0, data);
  } else db[newStatus].splice(position, 0, data);
  wrtiteToDb(res);
});

server.use(router);
server.listen(4000, () => {
  console.log('JSON Server is running');
});
