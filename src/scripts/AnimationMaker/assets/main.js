function Animator() {
  this.canvas = document.querySelector('#js-main-render');
  this.ctx = this.canvas.getContext('2d');
  this.cWidth = this.canvas.width;
  this.cHeight = this.canvas.height;

  this.selectedColour = '#beeeef';
  this.colourInput = document.querySelector('#color-picker');
  this.colourList = document.querySelector('#colour-list');
  this.colourInput.value = this.selectedColour;

  this.mouseX = 0, mouseY = 0;
  this.hoverX = -1, hoverY = -1;
  this.blockWidth = 0, blockHeight = 0;

  var self = this;

  this.data = [
    ['#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000'],
    ['#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000'],
    ['#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000'],
    ['#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000'],
    ['#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000'],
    ['#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000'],
    ['#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000'],
    ['#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000'],
  ];

  this.canvas.addEventListener('mousemove', function(evt) {
    var rect = this.canvas.getBoundingClientRect();

    this.mouseX = evt.clientX - rect.left;
    this.mouseY = evt.clientY - rect.top;

    this.hoverX = Math.floor(this.mouseX / this.blockWidth);
    this.hoverY = Math.floor(this.mouseY / this.blockHeight);

    this.reDraw();

    this.ctx.beginPath();
    this.ctx.moveTo(0, this.mouseY);
    this.ctx.lineTo(this.cHeight, this.mouseY);
    this.ctx.lineWidth = 2;

    // set line color
    this.ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(this.mouseX, 0);
    this.ctx.lineTo(this.mouseX, this.cWidth);
    this.ctx.lineWidth = 2;

    // set line color
    this.ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    this.ctx.stroke();

  }.bind(this));

  this.colourInput.addEventListener('change', function() {
    self.selectedColour = this.value;
  });

  this.canvas.addEventListener('click', function(e) {
    this.setColourOn(this.hoverX, this.hoverY, this.selectedColour);
  }.bind(this));

  this.canvas.addEventListener('contextmenu', function(e) {
    this.setColourOn(this.hoverX, this.hoverY, '#000000');

    e.preventDefault();
    return false;
  }.bind(this));

  this.colourList.addEventListener('click', function(event) {
    var target = event.target;
    if (target.classList.contains('colour')) {
      this.setSelectedColour(target.getAttribute('colour'));
    }
  }.bind(this));

  this.setColourOn = function(x, y, colour) {
    this.data[x][y] = colour;
    this.reDraw();

  }

  this.clear = function() {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        this.setColourOn(i, j, '#FFFFFF')
      }
    }
  };

  this.initiate = function() {
    var add = '<div class="colour" colour="ffbbbb"></div>';
    var colours = ['F00', '0F0', '00F', 'FF0', 'F0F', '0FF','f0f8ff',	'faebd7',	'ffefdb',	'eedfcc',	'cdc0b0',	'8b8378',	'7fffd4',	'76eec6',	'458b74',	'f0ffff',	'e0eeee',	'c1cdcd',	'838b8b',	'f5f5dc',	'ffe4c4',	'eed5b7',	'cdb79e',	'8b7d6b',	'000000',	'ffebcd',	'0000ff',	'0000ee',	'00008b',	'8a2be2',	'a52a2a',	'ff4040',	'ee3b3b',	'cd3333',	'8b2323',	'deb887',	'ffd39b',	'eec591',	'cdaa7d',	'8b7355',	'5f9ea0',	'98f5ff',	'8ee5ee',	'7ac5cd',	'53868b',	'7fff00',	'76ee00',	'66cd00',	'458b00',	'd2691e',	'ff7f24',	'ee7621',	'cd661d',	'ff7f50',	'ff7256',	'ee6a50',	'cd5b45',	'8b3e2f',	'6495ed',	'fff8dc',	'eee8cd',	'cdc8b1',	'8b8878',	'00ffff',	'00eeee',	'00cdcd',	'008b8b',	'b8860b',	'ffb90f',	'eead0e',	'cd950c',	'8b6508',	'006400',	'bdb76b',	'556b2f',	'caff70',	'bcee68',	'a2cd5a',	'6e8b3d',	'ff8c00',	'ff7f00',	'ee7600',	'cd6600',	'8b4500',	'9932cc',	'bf3eff',	'b23aee',	'9a32cd',	'68228b',	'e9967a',	'8fbc8f',	'c1ffc1',	'b4eeb4',	'9bcd9b',	'698b69',	'483d8b',	'2f4f4f',	'97ffff',	'8deeee',	'79cdcd',	'528b8b',	'00ced1',	'9400d3',	'ff1493',	'ee1289',	'cd1076',	'8b0a50',	'00bfff',	'00b2ee',	'009acd',	'00688b',	'696969',	'1e90ff',	'1c86ee',	'1874cd',	'104e8b',	'b22222',	'ff3030',	'ee2c2c',	'cd2626',	'8b1a1a',	'fffaf0',	'228b22',	'dcdcdc',	'f8f8ff',	'ffd700',	'eec900',	'cdad00',	'8b7500',	'daa520',	'ffc125',	'eeb422',	'cd9b1d',	'8b6914'];

    for (var i = 0, end = colours.length; i < end; i++) {
      var colourBlock = document.createElement('div');
      colourBlock.classList.add('colour');
      colourBlock.style.background = '#' + colours[i];
      colourBlock.setAttribute('colour', '#' + colours[i]);
      this.colourList.appendChild(colourBlock);
    }
  }.bind(this);

  this.setSelectedColour = function(colour) {
    this.selectedColour = colour;
    this.colourInput.value = colour;
  };

  this.reDraw = function () {
    this.ctx.fillStyle = 'rgb(255,255,255)';
    this.ctx.fillRect(0, 0, this.cWidth, this.cHeight);

    for (var i = 0, iE = this.data.length; i < iE; i++) {
      this.blockWidth = width = this.cWidth / iE;
      this.blockHeight = this.cHeight / this.data[i].length;

      for (var j = 0, jE = this.data[i].length; j < jE; j++) {
        this.ctx.fillStyle = this.data[i][j];
        this.ctx.fillRect(i * this.blockWidth, j * this.blockHeight, i*this.blockWidth+this.blockWidth, j*this.blockHeight+this.blockHeight);

        if (i == this.hoverX && j == this.hoverY) {
          this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
          this.ctx.fillRect(this.hoverX * this.blockWidth, this.hoverY * this.blockHeight, this.hoverX*this.blockWidth+this.blockWidth, this.hoverY*this.blockHeight+this.blockHeight);
        }
      }
    }

  }.bind(this);

  return this;
}

var animator = new Animator();
animator.initiate();
animator.reDraw();
