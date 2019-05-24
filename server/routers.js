const express = require('express');
const trace = require('debug')('cf:trace');


class Routers {
    constructor() {
        this.router = express.Router();
        this.apiRouter = express.Router();
        this.trace = trace;

        const myLogger = (req, res, next) => {
            trace('Making a API Rest call to : ', req.method, req.originalUrl);
            next();
        };
        this.apiRouter.use(myLogger);
    }
}

module.exports = Routers;
