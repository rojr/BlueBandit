function Animator() {
  this.canvas = document.querySelector('#js-main-render');
  this.ctx = this.canvas.getContext('2d');
  this.cWidth = this.canvas.width;
  this.cHeight = this.canvas.height;

  this.selectedColour = '#123456';

  this.mouseX = 0, mouseY = 0;
  this.hoverX = -1, hoverY = -1;
  this.blockWidth = 0, blockHeight = 0;

  this.data = [
    ['#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141'],
    ['#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141'],
    ['#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141'],
    ['#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141'],
    ['#FF1141','#FF1141','#FFFFFF','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141'],
    ['#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141'],
    ['#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FFFFFF','#FF1141'],
    ['#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','#FF1141'],
  ];

  this.canvas.addEventListener('mousemove', function(evt) {
    var rect = this.canvas.getBoundingClientRect();

    this.mouseX = evt.clientX - rect.left;
    this.mouseY = evt.clientY - rect.top;

    this.hoverX = Math.floor(this.mouseX / this.blockWidth);
    this.hoverY = Math.floor(this.mouseY / this.blockHeight);

    this.reDraw();
  }.bind(this));

  this.canvas.addEventListener('click', function(e) {
    this.setColourOn(this.hoverX, this.hoverY, this.selectedColour);
  }.bind(this));

  this.canvas.addEventListener('contextmenu', function(e) {
    this.setColourOn(this.hoverX, this.hoverY, '#FFFFFF');

    e.preventDefault();
    return false;
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
          this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
          this.ctx.fillRect(this.hoverX * this.blockWidth, this.hoverY * this.blockHeight, this.hoverX*this.blockWidth+this.blockWidth, this.hoverY*this.blockHeight+this.blockHeight);
        }
      }
    }

  }.bind(this);

  return this;
}

var animator = new Animator();
animator.reDraw();
