#!/usr/bin/env node
var HatCommunicator = require('./bridges/HAT/HatCommunicator.js');
var aniMan = require('./animations/AnimationManager.js');

var hat = new HatCommunicator(2);

var layer = 0;
function load() {
  hat.spawn();
  setInterval(loop, 30);
}

var data = [];
var incc = 0;

function loop() {
  var data = [];
     for (var i = 0; i < 16; i++) {
       var jArray = [];
       for (var j = 0; j < 16; j++) {
         if (j == incc % 16) {
           jArray.push([255,0,0]);
         } else {
           jArray.push([0,0,0]);
         }
       }
       data.push(jArray);
    }
    incc++;
  hat.write(data);
  layer++;
};

load();
