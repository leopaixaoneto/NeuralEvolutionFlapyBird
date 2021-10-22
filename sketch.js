var birds = [];

let savedBirds = [];

var pipes = [];

var rateConst = 150;

var rate = 150;

var fr = Infinity; //FRAME RATE

var scoreCount = 0;

var counter = 0;

//Elementos da interface
let speedSlider;
let speedSpan;
let score;

const HOW_MANY_BIRDS_iN_SCREEN = 50;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("canvascontainer");
  frameRate(fr);

  speedSlider = select("#speedSlider");
  speedSpan = select("#speed");
  score = select("#score");

  startGeneration();
}

function draw() {
  let vel = speedSlider.value();
  speedSpan.html(vel);

  for (let n = 0; n < vel; n++) {
    if (counter % this.rate == 0) {
      auxPipe = new Pipe();
      auxPipe.construct();
      pipes.push(auxPipe);
      counter = 0;
    }

    var pipeToDelete = -1;

    for (let i = 0; i < pipes.length; i++) {
      pipes[i].update();

      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0]);
        } else if (birds[j].checkHeight()) {
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }

      // if(pipes[i].hits(bird)){
      //     console.log("HIT");
      //     scoreCount = 0;
      // }

      if (pipes[i].offScreen()) {
        pipeToDelete = i;
        scoreCount++;
      }
    }

    if (pipeToDelete > -1) {
      pipes.splice(pipeToDelete, 1);
    }

    for (let bird of birds) {
      bird.think(pipes);
      bird.update();
      bird.show();
    }

    if (birds.length === 0) {
      counter = 0;
      nextGeneration();
      pipes = [];
      pipes.push(new Pipe().construct());
      this.scoreCount = 0;
      this.rate = this.rateConst;
    }

    counter++;

    if (this.scoreCount > 150 && this.scoreCount < 300) {
      this.rate = int(this.rateConst / (this.scoreCount / this.rateConst));
    }
  }

  background(0);

  let birdCounter = 0;

  birds.every(function(element, index) {
    if (birdCounter >= HOW_MANY_BIRDS_iN_SCREEN) {
      return false;
    }
    element.show();

    birdCounter++;
    return true;
  });

  for (let pipe of pipes) {
    pipe.show();
  }

  drawScore();
  //console.log(pipes.length);
}

function drawScore() {
  score.html(scoreCount);
}

// function keyPressed() {
//     if (key == ' '){
//         bird.up();
//     }
// }
