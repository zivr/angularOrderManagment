const path = require('path');

const publicPath = '/public';
const dbHost=process.env.DB_HOST || 'localhost';

module.exports = {
    port: process.env.PORT || '4000',
    publicPath,
    staticFolder: path.join(__dirname, '..', process.env.NODE_ENV === 'development' ? publicPath : 'dist'),
    dbPath: `mongodb://${dbHost}:27017/orderManagment`
};
