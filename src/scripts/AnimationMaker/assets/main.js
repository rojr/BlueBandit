function Layer (id) {
  this.id = id;
  this.canvas = null;

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

  return this;
};

function Animator() {
  this.canvas = document.querySelector('#js-main-render');
  this.ctx = this.canvas.getContext('2d');
  this.cWidth = this.canvas.width;
  this.cHeight = this.canvas.height;

  this.selectedColour = '#beeeef';
  this.colourInput = document.querySelector('#color-picker');
  this.colourList = document.querySelector('#colour-list');
  this.layerList = document.querySelector('#layer-list');
  this.addNewLayerButton = document.querySelector('#add-new-button');
  this.saveButton = document.querySelector('#save');

  this.colourInput.value = this.selectedColour;

  this.mouseX = 0, mouseY = 0;
  this.hoverX = -1, hoverY = -1;
  this.blockWidth = 0, blockHeight = 0;

  this.layers = [];
  this.currentLayer = null;

  var self = this;

  this.addLayer = function() {
    var layer = new Layer(this.layers.length);
    this.layers.push(layer);

    layer.canvas = document.createElement('canvas');
    layer.canvas.setAttribute('width', 64);
    layer.canvas.setAttribute('height', 64);
    layer.canvas.addEventListener('click', function() {
      this.selectLayer(layer);
    }.bind(this));
    this.layerList.appendChild(layer.canvas);

    this.reDrawThumbnail(layer);

    return layer;
  }

  this.selectLayer = function(layer) {
    if (this.currentLayer) {
      this.currentLayer.canvas.classList.remove('selected');
    }

    this.currentLayer = layer;
    this.currentLayer.canvas.classList.add('selected');
    this.reDraw(layer);
  }

  this.reDrawThumbnail = function(layer) {
    var c = layer.canvas.getContext('2d');;

    this.updateBoard(c, 8, layer.data);
  }

  this.canvas.addEventListener('mousemove', function(evt) {
    var rect = this.canvas.getBoundingClientRect();

    this.mouseX = evt.clientX - rect.left;
    this.mouseY = evt.clientY - rect.top;

    this.hoverX = Math.floor(this.mouseX / 64);
    this.hoverY = Math.floor(this.mouseY / 64);

    this.reDraw(this.currentLayer);

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
    this.currentLayer.data[x][y] = colour;
    this.reDraw(this.currentLayer);
    this.reDrawThumbnail(this.currentLayer);
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

    this.selectLayer(this.addLayer());

    this.addNewLayerButton.addEventListener('click', function() {
      this.selectLayer(this.addLayer());
    }.bind(this));

    this.saveButton.addEventListener('click', function() {
      var dataString = document.querySelector('#data-string');
      var cleanData = [];
      for (var l = 0, lE = this.layers.length; l < lE; l++) {
        for (var i = 0, iE = this.layers[l].data.length; i < iE; i++) {
          for (var j = 0, jE = this.layers[l].data[i].length; j < jE; j++) {
            var colour = hexToRgb(this.layers[l].data[i][j]);
            if (!cleanData[l]) {
              cleanData[l] = [];
            }

            if (!cleanData[l][i]) {
              cleanData[l][i] = [];
            }

            cleanData[l][i][j] = [colour.r, colour.g, colour.b];
          }
        }
      }
      console.log(JSON.stringify(cleanData));
      dataString.select();
      document.execCommand('Copy');
    }.bind(this));
  }.bind(this);

  this.setSelectedColour = function(colour) {
    this.selectedColour = colour;
    this.colourInput.value = colour;
  };

  this.reDraw = function (layer) {
    var bHei = layer.canvas.height,
      bWid = layer.canvas.width;

    this.ctx.fillStyle = 'rgb(255,255,255)';
    this.ctx.fillRect(0, 0, bWid, bHei);

    this.updateBoard(this.ctx, 64, layer.data);

  }.bind(this);

  this.updateBoard = function(ctx, blockSize, data) {
    for (var i = 0, iE = data.length; i < iE; i++) {
      for (var j = 0, jE = data[i].length; j < jE; j++) {
        ctx.fillStyle = data[i][j];
        ctx.fillRect(i * blockSize, j * blockSize, (i+1)*blockSize, (j+1)*blockSize);

        if (i == this.hoverX && j == this.hoverY) {
          ctx.fillStyle = 'rgba(255,255,255,0.3)';
          ctx.fillRect(i * blockSize, j * blockSize, (i+1)*blockSize, (j+1)*blockSize);
        }
      }
    }
  }

  return this;
}

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

var animator = new Animator();
animator.initiate();
animator.reDraw(animator.currentLayer);
