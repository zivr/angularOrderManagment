// process.env.NODE_ENV = 'production';
process.env.DEBUG = '*';

const path = require('path');
const Express = require('express');
const connectHistoryApiFallback = require('connect-history-api-fallback');
const debug = require('debug');
const debugLog = require('debug')('server:debug');
const errorLog = require('debug')('server:error');
const config = require('./config');
const Server = require('./express');
const mongoose = require('mongoose');

debug.enable(process.env.DEBUG);

mongoose.Promise = global.Promise;
mongoose.connect(config.dbPath, { useNewUrlParser: true }).then(
    () => {debugLog('Database is connected') },
    err => { errorLog('Can not connect to the database'+ err)}
);

const app = new Express();
const server = new Server(app, config.port, config.publicPath, config.staticFolder);
// handle fallback for HTML5 history API
server.addMiddleware(connectHistoryApiFallback());
// server.app.use('/', Express.static(config.staticFolder, {
//     setHeaders: (res) => {
//         res.setHeader('Cache-Control', 'public');
//     },
// }));

server.initStaticFiles();
server.startServer();
