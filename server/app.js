require('dotenv').config({ path: 'server/.env' });

const path = require('path');
const Express = require('express');
const connectHistoryApiFallback = require('connect-history-api-fallback');
const debug = require('debug');
const debugLog = require('debug')('server:debug');
const errorLog = require('debug')('server:error');
const config = require('./config');
const Server = require('./express');
const mongoose = require('mongoose');
const Customers = require('./db/customers');

const initializeDbData = () => {
    Customers.findOne({type: 0}, (err, result) => {
        if (err) {
            errorLog(`can't connect to db ${err}`);
            return;
        }
        if (result === null) {
            const admin = new Customers({ name: 'Admin', type: 0});
            admin.save().then(customers => {
                debugLog('Default admin was created');
            }).catch(err => {
                errorLog(`can't create default adfmin ${err}`);
            });
        }
    })
};

debug.enable(process.env.DEBUG);

mongoose.Promise = global.Promise;
mongoose.connect(config.dbPath, { useNewUrlParser: true }).then(
    () => {
        debugLog('Database is connected');
        initializeDbData();
    },
    err => { errorLog(`can't connect to db ${err}`)}
);

const app = new Express();
const server = new Server(app, config.port, config.publicPath, config.staticFolder);
server.addMiddleware(connectHistoryApiFallback());// handle fallback for HTML5 history API

server.initStaticFiles();
server.startServer();
