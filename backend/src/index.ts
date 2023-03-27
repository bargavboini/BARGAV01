import express, { Express, Request, Response } from 'express';
import cors from 'cors'
import helmet from 'helmet'
import * as bodyParser from 'body-parser'

import { APP_CONFIG } from './config';
import Database from './database'
import productRoutes from './routes/api/v1/product';

const app: Express = express();
app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1/products', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome');
});
const db = new Database()
db.connect()

app.listen(APP_CONFIG.PORT, () => {
  console.log(`Server is running at http://localhost:${APP_CONFIG.PORT}`);
});