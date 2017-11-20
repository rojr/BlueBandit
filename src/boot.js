#!/usr/bin/env node
var HatCommunicator = require('./bridges/HatCommunicator');

var hat = new HatCommunicator(2);
hat.spawn();

function load() {
  setInterval(loop, 45);
}

function loop() {
};

load();
