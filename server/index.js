var metrics = require("./metrics.js");
const Prometheus = require('prom-client')

const express = require('express')
const app = express()
const port = process.env.PORT || 8080

app.use(express.static('./public'));

app.get('/metrics', async function (req, res) {
  res.set('Content-Type', metrics.register.contentType);
  let metricsResult = await metrics.register.metrics()
  res.send(metricsResult);

  // res.set('Content-Type', Prometheus.register.contentType)
  // console.log(Prometheus.register.metrics())
  // res.send(Prometheus.register.metrics())
});

const server = app.listen(port)

Array.prototype.remove = function (i) {
    this.splice(this.indexOf(i), 1);
    return this;
};

var App = require('./App.js');

var gameApp = new App(server);
gameApp.createServer();

console.log('Server started at http://localhost' + ( port!=80 ? ':' + port : ''));
