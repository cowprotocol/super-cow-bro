const express = require('express')
const app = express()
const port = process.env.PORT || 80

app.use(express.static('./public'));

const server = app.listen(port)

Array.prototype.remove = function (i) {
    this.splice(this.indexOf(i), 1);
    return this;
};

var App = require('./App.js');

var gameApp = new App(server);
gameApp.createServer();

console.log('Server started!');
