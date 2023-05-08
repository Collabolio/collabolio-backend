import express, { Application, Request, Response } from 'express';
import route from './routers/index.js';

const app: Application = express();
const port: number = 3000;

app.use('/', route);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
