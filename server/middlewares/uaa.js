const express = require('express');
const trace = require('debug')('uaa:trace');
const error = require('debug')('uaa:error');
const session = require('express-session');
const Customers = require('../db/customers');
const User = require('../utils/user');

class Uaa {
    constructor(options) {
        this.authRouter = express.Router(); //eslint-disable-line new-cap
        this.config = Object.assign({
            // cookieName: 'session-managment',
            defaultRedirectUrl: '/',
            sessionSecret: 'some secret',
        }, options);;
        trace('authentication options', this.config);
        this._initAuthRouter();
    }

    _initAuthRouter() {
        this.authRouter.use(session({ secret: this.config.sessionSecret, cookie: { maxAge: 60000 }}), (req, res, next) => {
            req.isAuthenticated = () => {
                return req.session && req.session.authenticated;
            };
            next();
        });

         //We use post to prevent from passing the use name/password in the query string
        this.authRouter.post('/api/login', express.json(), (req, res) => {
            Customers.findOne({ name: { $regex : new RegExp(req.body.username, "i") }}, (err, customer) => {
                if (err) {
                    error(err);
                    res.status(400).send({ success: false, err });
                } else if (customer === null) {
                    res.json({ success: false, err: 'Incorrect username or password' });
                } else {
                    req.session.authenticated = true;
                    req.session.customer = customer;
                    res.json({success: true, user: this.getCurrentUserInfo(req)});
                }
            });
        });
        this.authRouter.get('/api/logout', (req, res) => {
            req.session.authenticated = false;
            res.json({success: true});
        });
        this.authRouter.get('/api/userInfo', (req, res) => {
            const user = this.getCurrentUserInfo(req);
            res.json({success: !!user, user});
        });

        // this.authRouter.get('/forgot_password', (req, res) => {});
        // this.authRouter.get('/refresh_token', (req, res) => {});
    }

    getCurrentUser(req) {
        if (!req.session.customer) {
            return null;
        }
        return new User(req.session.customer);
    }

    getCurrentUserInfo(req) {
        const user = this.getCurrentUser(req);
        if (!user) {
            return null;
        }
        return {
            username: user.username,
            isAdmin: user.isAdmin
        };
    }
}
//This will remain singleton as long as we make sure we don't break the node cached object.
//ex: Make sure the reference allways with case sensitivity
const uaa = new Uaa(); 

module.exports = uaa;