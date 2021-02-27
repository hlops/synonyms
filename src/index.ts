import { GlobalSettings } from './globalSettings';
import { startServer } from './server';

startServer(GlobalSettings.localHost, GlobalSettings.localPort);
