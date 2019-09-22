import * as http from 'http';

import app from './app';
import { NODE_SETTING } from '@Lib/constants';

const normalizePort = (val: string): number => {
  const port: number = parseInt(val, 10);

  if (isNaN(port)) {
    return 0;
  }

  if (port >= 0) {
    return port;
  }

  return 0;
};

const httpServer: http.Server = http.createServer(app);
const port: number = normalizePort(NODE_SETTING.PORT.toString());

httpServer.listen(
  port,
  (): void => {
    console.log(`Server started on ${port}`);
  }
);
