#!/usr/bin/env node
require('./bridges/HAT/HatCommunicator');
require('./animations/AnimationManager.js');

var hat = new HatCommunicator(2);

var layer = 0;
function load() {
  hat.spawn();
  setInterval(loop, 30);
}

function loop() {
  hat.write(data[layer%data.length]);
  layer++;
};

load();
