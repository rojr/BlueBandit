#!/usr/bin/env node
var HatCommunicator = require('./HatCommunicator');

setInterval(loop, 15);

var hat = new HatCommunicator(2);
hat.createProcess();

function loop() {
  hat.calculateTotals();
};
