const { Router } = require('express');
const fs = require('fs');
const path = require('path');

const route = Router();

const filePath = path.join(__dirname, 'data.json');

route.get('/', (req, res) => {
  // Using fs.readFile to read json file is unnecessary, I can just open with require
  // but i prefer practicing the fs module

  fs.readFile(filePath, { encoding: 'utf-8', flag: 'r' }, (err, data) => {
    if (err) return res.send({ ok: false, message: err.message });

    data = JSON.parse(data);
    return res.send({ data });
  });
});

route.post('/', (req, res) => {
  const oldData = require('./data.json');
  const { data } = req.body;

  fs.writeFile(
    filePath,
    JSON.stringify([...oldData, data]),
    { encoding: 'utf-8', flag: 'w' },
    (err) => {
      if (err) return res.send({ ok: false, message: err.message });
      return res.send({ ok: true, message: 'add succssfully', data: _data });
    }
  );
});

route.put('/:id', (req, res, next) => {
  const id = req.params.id;
  res.send({message: 'Put request '});
});

route.delete('/:id', (req, res) => {
  res.send({message: 'Delete request'});
});

route.use((req, res) => {
  const method = req.method === 'PUT' ? 'Put' : 'Delete'
  res.send({message: `${method} request invalid`});
});

module.exports = route;