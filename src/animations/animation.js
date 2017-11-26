var fs = require('fs');

function Animation(manager, name) {
  var file = fs.readFileSync(__dir + '/../../assets/animations/' + name, 'utf8');
  this.frames = JSON.parse(file);
  this.numberOfFrames = this.frames.length;

  var startTime = new Date();

  this.getCurrentFrame = function() {
    return frames
  }

  return this;
};

module.exports = Animation;
