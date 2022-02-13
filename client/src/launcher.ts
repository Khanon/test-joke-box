import { WebServer } from './classes/web-server';
import { Logger } from './classes/logger';

Logger.info("Launching Web Server...");

const webServer = new WebServer();
webServer.listen();
