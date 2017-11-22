#!/usr/bin/env node
var HatCommunicator = require('./bridges/HatCommunicator');

var hat = new HatCommunicator(2);

var data = [["#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],["#beeeef","#beeeef","#beeeef","#beeeef","#beeeef","#beeeef","#beeeef","#beeeef"],["#beeeef","#000000","#000000","#beeeef","#beeeef","#000000","#000000","#000000"],["#beeeef","#000000","#000000","#beeeef","#000000","#beeeef","#000000","#000000"],["#beeeef","#000000","#000000","#beeeef","#000000","#000000","#beeeef","#000000"],["#beeeef","#beeeef","#beeeef","#beeeef","#000000","#000000","#000000","#beeeef"],["#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],["#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"]];

for (var i = 0; i < 8; i++) {
  for (var j = 0; j < 8; j++) {
    var rgb = hexToRgb(data[i][j]);
    data[i][j] = [rgb.r, rgb.b, rgb.g];
  }
}

function load() {

  hat.spawn();
  setInterval(loop, 45);
}

function loop() {
  hat.write(data);
};

load();

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
