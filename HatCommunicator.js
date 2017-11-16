var spawn = require('child_process').spawn;
var fs = require('fs');

function HatCommunicator(pin) {
  this.process;
  this.dataString = '';
  this.pin = pin

  var self = this;

  this.createProcess = function() {
    if (!this.process) {
      this.process = spawn('python', ['./python/HAT.py']);

      this.process.stdout.on('data', function(data){
        self.dataString += data.toString();

        console.log('Sum of numbers=',data.toString());
      });
      this.process.stdout.on('end', function(){
        console.log('Sum of numbers=',self.dataString);
        self.dataString = '';
      });
    }
  };

  this.i = 0;
  this.calculateTotals = function() {
    var data = [];
    for (var i = 0; i < 8; i++) {
      var jArray = [];
      for (var j = 0; j < 8; j++) {
        if (j == self.i % 8) {
          jArray.push(Math.round(Math.random() * 255));
        } else {
          jArray.push(0);
        }
      }
      data.push(jArray);
    }
    self.i++;

    fs.appendFile('testFile', JSON.stringify(data) + "\n", function (err) {
    if (err) throw err;
    });
  };

  return this;

};

module.exports = HatCommunicator;
