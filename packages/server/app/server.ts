// IMPORTS -
import express from 'express';
const app = express();
const port = 8000;

app.get('/', (_res, res) => {
  res.json({
    foo: 'bar',
  });
});

app.listen(port, () => {
  console.log('Server is running on port:', port);
});
