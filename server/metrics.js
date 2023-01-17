const prom = require('prom-client');
prom.collectDefaultMetrics({ prefix: 'supercow_' });

const roomsTotal = new prom.Gauge({
  name: 'rooms_total',
  help: 'Number of active rooms',
});

const usersTotal = new prom.Gauge({
  name: 'users_total',
  help: 'Number of users currently playing',
});


if (typeof module !== 'undefined') {
  module.exports = {
    register: prom.register,
    roomsTotal,
    usersTotal
  }
}