function Pipe() {
  //top Pipe Y
  this.top = 0;

  //bottom Pipe Y
  this.bottom = 0;

  //Mutual X
  this.x = width;

  //Width
  this.w = 40;

  this.gap = 200;

  this.speed = 2;

  this.show = () => {
    fill(255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, height);
  };

  this.construct = () => {
    var aux = 0;
    //this.gap = int(random(100, 160));

    while (aux <= 10 || aux >= height - (10 + this.gap)) {
      aux = random(height);
    }

    this.top = 0 + aux;
    this.bottom = 0 + aux + this.gap;

    return this;
  };

  this.update = () => {
    this.x -= this.speed;
  };

  this.offScreen = () => {
    return this.x + this.w < 0;
  };

  this.hits = function(bird) {
    if (
      bird.x + bird.birdSize / 2 > this.x &&
      bird.x - bird.birdSize / 2 < this.x + this.w
    ) {
      if (bird.y - bird.birdSize / 2 < this.top) {
        return true;
      } else if (bird.y + bird.birdSize / 2 > this.bottom) {
        return true;
      }
    }
    return false;
  };
}
