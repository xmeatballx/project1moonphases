var moonsize=160;
var moonPhase=0;
var x=0;
let moonTexture;
let star = [];
let numStars=100;

function preload(){
	moonTexture = loadImage ('moontexture.jpeg');
}

function setup(){
	createCanvas(630,600,WEBGL);
	background(0);

	for (let i =0;i<numStars;i++){
     star.push(new stars());
	}

	input = createInput();
  input.position(20, 35);

  button = createButton('submit');
  button.position(input.x + input.width, 35);
  button.mousePressed(phaseSet);
	//noLoop();

}

function draw(){
  drawMoon(moonPhase);
  for (let i =0;i<numStars;i++){
  star[i].display();
  }
}

function phaseSet(){
	moonPhase = int(input.value());
}

function drawMoon(phase){
	x=map((phase/10)+1.5,0,1,-1,1);
	push();
	ortho();
	ambientMaterial(250);
	lightFalloff(1.0, 1.0, 1.0)
		directionalLight(250, 250, 250, cos(x), 0, sin(x));
		ambientLight(20,20,0);
		noStroke();
		texture(moonTexture);
		sphere(moonsize);
		pop();
}

class stars{
	constructor(){
		this.x = random(width);
		this.y = random(height);
		this.z = random(-30,-100);
		this.diameter = random(10);
	}

	display(){
		fill(255,255,255);
		translate(0,0,this.z);
		ellipse(this.x,this.y,this.diameter,this.diameter);
	}
}


