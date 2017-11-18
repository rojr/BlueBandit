#!/usr/bin/env node
var HatCommunicator = require('./bridges/HatCommunicator');

setInterval(loop, 15);

var hat = new HatCommunicator(2);
hat.spawn();

function loop() {
  hat.write([[0,0,0,0,0,255,255,255]]);
};
