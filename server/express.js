const Express = require('express');
const http = require('http');
const debug = require('debug')('server:debug');
const error = require('debug')('server:error');
const requireDir = require('require-dir');
const cookieParser = require('cookie-parser');
const uaa = require('./middlewares/uaa');
const security = require('./middlewares/security');

class Server {
    get hostname() {
        return process.env.HOSTNAME || `http://localhost:${this.port}`;
    }

    constructor(expressApp, port, publicPath, staticFilesFolder) {
        this.app = expressApp;
        this.port = port;
        this.publicPath = publicPath;
        this.staticFilesFolder = staticFilesFolder;

        // initialize authentication & middleware first so they run on all requests
        this._initAuthentication();
        this._initMiddlewares();
        this._initVariables();

        this._initViewEngine();
        this._initRoutes();
    }

    _initAuthentication() {
        this.uaa = uaa;
        this.app.use(this.uaa.authRouter);
        //The express server only serve api request so we will block all request and make sure the user is authenticated
        this.app.use(security.allowOnlyAuthenticated); 
    }

    _initMiddlewares() {
        this.app.use(cookieParser());
        this.app.use(Express.json());
    }

    _initVariables() {
    }

    _initViewEngine() {
        // this.app.set('view engine', 'hbs');
        // this.app.set('views', `${__dirname}/views`);
    }

    _initRoutes() {
        const routes = requireDir('./routes');
        Object.keys(routes).forEach((routeName) => {
            const routeController = new routes[routeName]();
            this.app.use(`/${routeName}`, routeController.router);
            this.app.use(`/api/${routeName}`, routeController.apiRouter);
        });
    }

    initStaticFiles() {
        this.app.use(this.publicPath || '/', Express.static(this.staticFilesFolder, {
            setHeaders: (res) => {
                res.setHeader('Cache-Control', 'public');
            },
        }));
    }

    addMiddleware(middleware) {
        this.app.use(middleware);
    }

    startServer() {
        this.app.set('port', this.port);
        // Create HTTP server.
        this.server = http.createServer(this.app);

        // Listen on provided port, on all network interfaces.
        this.server.listen(this.port);
        this.server.on('error', this._onError.bind(this));
        this.server.on('listening', this._onListening.bind(this));
    }

    closeServer() {
        this.server.close();
    }

    _onError(err) {
        if (err.syscall !== 'listen') {
            throw err;
        }

        const bind = typeof this.port === 'string' ? `Pipe ${this.port}` : `Port ${this.port}`;

        // handle specific listen errors with friendly messages
        switch (err.code) {
            case 'EACCES':
                error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw err;
        }
    }

    _onListening() {
        const address = this.server.address();
        const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;
        debug(`Listening on ${bind}`);
    }
}

module.exports = Server;
