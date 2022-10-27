const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuid4 } = require('uuid');

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
  //console.log(oldData);
  const { data } = req.body;
  const todo = { todo: data, id: uuid4(), isDone: false };

  fs.writeFile(
    filePath,
    JSON.stringify([...oldData, todo]),
    { encoding: 'utf-8', flag: 'w' },
    (err) => {
      if (err) return res.send({ ok: false, message: err.message });
      return res.send({ ok: true, message: 'add succssfully', data: todo });
    }
  );
});

route.post('/set-element/:id', (req, res) => {
  const id = req.params.id;
  const oldData = require('./data.json');
  //console.log(oldData);

  const newData = oldData.map((data) => {
    return data.id === id ? { ...data, todo: req.body.newTodo } : data;
  });

  fs.writeFile(
    filePath,
    JSON.stringify([...newData]),
    { encoding: 'utf-8', flag: 'w' },
    (err) => {
      if (err) return res.send({ ok: false, message: err.message });
      return res.send({ ok: true, message: 'change succssfully' });
    }
  );

  res.send({ id, newData });
});

route.put('/check/:id', (req, res) => {
  const id = req.params.id;
  const oldData = require('./data.json');
  //console.log(oldData);

  const newData = oldData.map((data) => {
    return data.id === id ? { ...data, isDone: !data.isDone } : data;
  });

  fs.writeFile(
    filePath,
    JSON.stringify([...newData]),
    { encoding: 'utf-8', flag: 'w' },
    (err) => {
      if (err) return res.send({ ok: false, message: err.message });
      return res.send({ ok: true, message: 'change succssfully' });
    }
  );
});

route.delete('/del/:id', (req, res) => {
  const id = req.params.id;
  const oldData = require('./data.json');
  //console.log(oldData);

  const newData = oldData.filter((data) => data.id !== id);

  fs.writeFile(
    filePath,
    JSON.stringify([...newData]),
    { encoding: 'utf-8', flag: 'w' },
    (err) => {
      if (err) return res.send({ ok: false, message: err.message });
      return res.send({ ok: true, message: 'change succssfully' });
    }
  );
});

route.use((req, res) => {
  //console.log(req.params);
  const method = req.method === 'PUT' ? 'Put' : 'Delete';
  res.send({ message: `${method} request invalid` });
});

module.exports = route;
