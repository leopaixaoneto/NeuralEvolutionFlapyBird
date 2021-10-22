const TOTAL = 500;
const IDEAL_FITNESS_CONST = 1.005;
const FITNESS_CONST = 1.005;

function startGeneration() {
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }

  savedBirds = [];
}

function nextGeneration() {
  calculateFitness();
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = pickOne();
  }
  console.log("Next Generation");
}


function pickOne(){
	var index = 0;
	var r = random(1);

	while(r>0){
		r = r - savedBirds[index].fitness;
		index++;
	}
  index--;
  
  
  let bird = savedBirds[index];
  let child = new Bird(bird.brain);
  child.mutate(0.1);
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let bird of savedBirds) {
    sum += pow(bird.score,FITNESS_CONST);
  }

  for (let bird of savedBirds) {
    bird.fitness = pow(bird.score,FITNESS_CONST) / sum;
  }
}
