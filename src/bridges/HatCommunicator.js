var spawn = require('child_process').spawn;
var shell = require('shelljs');
var fs = require('fs');

const COMM_FILES = '/tmp/bandit/hat/';

function HatCommunicator(pin) {
  this.process;
  this.dataString = '';
  this.pin = pin;
  this.commFile = COMM_FILES + Math.floor(Math.random() * 432);

  var self = this;

  function createProcess() {
    if (!self.process) {
      self.process = spawn('python', [__dirname + './python/HAT.py']);
      self.process.on('exit', function() {
        self.process = null;
      });
    }
  };

  this.spawn = function() {
    createProcess();

    if (!fs.existsSync(COMM_FILES)) {
      shell.mkdir('-p', COMM_FILES);
    }

    console.log('Spawned new process with file: ' + self.commFile);
  };

  this.write = function(obj) {
    if (!self.process) createProcess();
    fs.appendFile(this.commFile, JSON.stringify(obj));
  }

  return this;
};

module.exports = HatCommunicator;
