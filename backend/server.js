const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

//Get the port value
const PORT = process.env.PORT || 1025;

//Get the route configuration
const route = require('./route');

// To get the node environnement
console.log(app.get('env'));

// To parse the encoming request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// To handle cors policy
app.use(cors({ origin: '*' }));

fs.readFile('./data.json', {encoding: 'utf-8'}, (err, data) => {
  if(!data) fs.writeFileSync('./data.json', JSON.stringify('[]'));
})

app.get('/', (req, res) => {
  res.send({ message: 'App running succssfully' });
});

app.use('/todo-api', route);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
