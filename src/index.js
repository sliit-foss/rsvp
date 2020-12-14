import http from 'http';
import app from './app';
import * as config from './config';
import logger from './utils/logger';

const server = http.createServer(app);
server.listen(config.PORT, () => logger.info('Server listening on ' + config.PORT));