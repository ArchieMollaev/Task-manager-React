const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');
const db = require('./tasks.json');
const bodyParser = require('body-parser');

// import jsonServer from 'json-server';
// import path from 'path';
// import fs from 'fs';
// import db from './tasks.json';
// import bodyParser from 'body-parser';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'tasks.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.post('/', (req, res) => {
  let newEntry = req.body.name;
  Object.keys(db).forEach((x) => { if (x === newEntry) newEntry += '(duplicate)'; });
  db[newEntry] = [];
  fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(db, null, 4), 'utf8', (err) => {
    if (err) {
      res.status(500).jsonp({ error: 'Failed to write file' });
    }
    res.end('write success');
  });
});

server.post('/delete', (req, res) => {
  delete db[req.body.name];
  fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(db, null, 4), 'utf8', (err) => {
    if (err) {
      res.status(500).jsonp({ error: 'Failed to write file' });
    }
    res.end('write success');
  });
});

server.post('/update', (req, res) => {
  const currentStatus = req.body.currentStatus;
  const newStatus = req.body.newStatus;
  const data = req.body.data;
  const position = req.body.position;

  db[currentStatus] = db[currentStatus].filter(item => item.id !== data.id);
  if (currentStatus === newStatus) {
    db[currentStatus].splice(position, 0, data);
  } else db[newStatus].splice(position, 0, data);

  fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(db, null, 4), 'utf8', (err) => {
    if (err) {
      res.status(500).jsonp({ error: 'Failed to write file' });
    }
    res.end('write success');
  });
});

server.use(router);
server.listen(4000, () => {
  console.log('JSON Server is running');
});
