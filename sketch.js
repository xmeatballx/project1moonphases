var moonsize=160;
var moonPhase=0;
var x=0;
let moonTexture;

function preload(){
	moonTexture = loadImage ('moontexture.jpeg');
}

function setup(){
	createCanvas(630,600,WEBGL);
	background(0);
	input = createInput();
  input.position(20, 35);

  button = createButton('submit');
  button.position(input.x + input.width, 35);
  button.mousePressed(phaseSet);
	//noLoop();

}

function draw(){
  drawMoon(moonPhase);
		
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
		directionalLight(250, 250, 200, cos(x), 0, sin(x));
		ambientLight(40,40,0);
		noStroke();
		texture(moonTexture);
		sphere(moonsize);
		pop();
}


