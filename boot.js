#!/usr/bin/env node
var HatCommunicator = require('./HatCommunicator');

setInterval(loop, 250);

var boii = new HatCommunicator(2);
boii.createProcess();

function loop() {
  boii.calculateTotals();
};
