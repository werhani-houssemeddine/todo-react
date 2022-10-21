const express = require('express');
const fs = require('fs');

const app = express();

//Get the port value
const PORT = process.env.PORT || 1025;

app.get('/', (req, res) => {
  res.send({ message: 'App running succssfully' });
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));