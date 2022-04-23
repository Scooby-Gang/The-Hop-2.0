import regeneratorRuntime from 'regenerator-runtime';

module.exports = () => {
    global.testServer = require('./src/server/server.js');
}