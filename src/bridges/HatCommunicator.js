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
      var procPath = __dirname + './python/HAT.py ' + self.commFile;
      console.log(procPath);
      self.process = spawn('python', [__dirname + '/../python/HAT.py ' + self.commFile]);
      self.process.on('exit', function(response) {
        console.log('Process died... ' + response);
        self.process = null;
      });

      self.process.stdout.on('data', function(data) {
        console.log(data);
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

    fs.appendFile(self.commFile, JSON.stringify(obj) + "\n");
  }

  return this;
};

module.exports = HatCommunicator;
