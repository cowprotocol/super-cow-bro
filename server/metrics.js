const prom = require('prom-client');
prom.collectDefaultMetrics({ prefix: 'supercow_' });

const activeRooms = new prom.Gauge({
  name: 'active_rooms',
  help: 'Number of active rooms',
});

const activeUsers = new prom.Gauge({
  name: 'active_users',
  help: 'Number of users currently playing',
});

const usersTotal = new prom.Counter({
  name: 'users_total',
  help: 'Number of users currently playing',
});


if (typeof module !== 'undefined') {
  module.exports = {
    register: prom.register,
    activeRooms,
    activeUsers,
    usersTotal
  }
}