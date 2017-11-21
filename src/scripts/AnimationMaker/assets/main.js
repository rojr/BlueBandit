function Animator() {
  this.canvas = document.querySelector('#js-main-render');
  this.ctx = this.canvas.getContext('2d');
  this.cWidth = this.canvas.width;
  this.cHeight = this.canvas.height;
  this.selectedColour = 'beeeef';
  this.data = [
    ['#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','FF1141','FF1141','FF1141'],
    ['#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','FF1141','FF1141','FF1141'],
    ['#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','FF1141','FF1141','FF1141'],
    ['#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','FF1141','FF1141','FF1141'],
    ['#FF1141','#FF1141','#FFFFFF','#FF1141','#FF1141','FF1141','FF1141','FF1141'],
    ['#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','FF1141','FF1141','FF1141'],
    ['#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','FF1141','FF1141','FF1141'],
    ['#FF1141','#FF1141','#FF1141','#FF1141','#FF1141','FF1141','FF1141','FF1141'],
  ];


  this.reDraw = function () {
    this.ctx.fillStyle = 'rgb(255,255,255)';
    this.ctx.fillRect(0, 0, 500, 500);

    for (var i = 0, iE = this.data.length; i < iE; i++) {
      var width = this.cWidth / iE;
      for (var j = 0, jE = this.data[i].length; j < jE; j++) {
        var height = this.cHeight / jE;
        this.ctx.fillStyle = this.data[i][j];
        this.ctx.fillRect(i * width, j * height, i*width+width, j*height+height);
      }
    }
  };

  return this;
}

var animator = new Animator();
animator.reDraw();
