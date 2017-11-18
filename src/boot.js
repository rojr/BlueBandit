#!/usr/bin/env node
var HatCommunicator = require('./bridges/HatCommunicator');

setInterval(loop, 15);

var hat = new HatCommunicator(2);
hat.spawn();

var incc = 0;
var colour = 0;
function loop() {
  var data = [];
     for (var i = 0; i < 8; i++) {
       var jArray = [];
       for (var j = 0; j < 8; j++) {
         if (j == incc % 8) {
           jArray.push([Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]);
         } else {
           jArray.push([0,0,0]);
         }
       }
       data.push(jArray);
    }
    incc++;
  hat.write(data);
};
