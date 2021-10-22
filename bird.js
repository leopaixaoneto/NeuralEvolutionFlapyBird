function Bird(brain) {
  this.y = height / 2;
  this.x = 35;
  this.birdSize = 32;

  this.gravity = 1.0;
  this.velocity = 0;

  this.jumpVelocity = 6;

  this.score = 0;
  this.fitness = 0;

  if (brain) {
    this.brain = brain.copy();
  } else {
    //Inputs
    //Bird Y Pos
    //X of the nearest pipe
    //Y of the Top pipe
    //Y of the Bottom pipe
    //Bird Y velocity(To be implemented)
    this.brain = new NeuralNetwork(5, 8, 2);
  }

  this.show = () => {
    fill(255, 100);
    stroke(255);
    ellipse(this.x, this.y, this.birdSize, this.birdSize);
  };

  this.think = pipes => {
    //Closest pipe
    let closest = null;
    let closestD = Infinity;

    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x + pipes[i].w - this.x;

      if (d < closestD && d > 0) {
        closest = pipes[i];
        closestD = d;
      }
    }

    let inputs = [];

    inputs[0] = this.y / height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;

    inputs[3] = closest.x / width;

    inputs[4] = this.velocity / 10;

    let output = this.brain.predict(inputs);

    //console.log(output);

    if (output[0] > output[1]) {
      this.up();
    }
  };

  this.update = () => {
    this.score++;

    this.velocity += this.gravity;
    this.y += this.velocity;
  };

  this.checkHeight = () => {
    if (this.y > height - this.birdSize / 2) {
      // this.y = height - this.birdSize / 2;
      // this.velocity = 0;
      return true;
    }

    if (this.y < 0 + this.birdSize / 2) {
      // this.y = 0 + this.birdSize / 2;
      // this.velocity = 0;
      return true;
    }

    return false;
  };

  this.up = () => {
    if (this.velocity > 0) this.velocity = 0;
    this.velocity -= this.jumpVelocity;
  };

  this.mutate = rate => {
    this.brain.mutate(rate);
  };
}
