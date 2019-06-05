const uaa = require('./uaa');

module.exports.allowAdminOnly = (req, res, next) => {
    const user = uaa.getCurrentUser(req);
    if (user && user.isAdmin) {
        next();
        return;
    }
    res.status(401).send({ success: false, message: 'only admin user are allowed' });
}

module.exports.allowOnlyAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
        return;
    }
    res.status(401).send({ success: false, message: 'only authenticated user are allowed' });
}