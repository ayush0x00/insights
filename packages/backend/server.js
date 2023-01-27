const express = require('express');

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello world');
});

app.listen(1234, () => console.log('Dummy app is listening on port 3000.'));
