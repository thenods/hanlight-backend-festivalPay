import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as Debug from 'debug';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import ErrorMiddleware from '@Middleware/error/errorMiddleware';
import CustomError from '@Middleware/error/customError';

dotenv.config();

const app: express.Application = express();
const debug = Debug('hanlight');

app.use(
  cors({
    origin: process.env.NODE_ENV === 'development' ? '*' : /hanlight\.kr/,
  })
);
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/* middlewares */

app.use((req, res, next) => {
  // err.status = 404;
  next(new CustomError({ name: 'Not_Found' }));
});

app.use(ErrorMiddleware)

process.on('uncaughtException', err => {
  console.error(err);
  debug('Caught exception: %j', err);
  process.exit(1);
});

export default app;
