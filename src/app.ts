import express, { Application } from 'express';
import route from './routes/index.js';

const app: Application = express();
const port: number = 3000;

app.use('/', route);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
