var moonsize=160;
var moonPhase=0;
var liteAngle=0;
let orbitAngle=0;
let moonTexture;
let arrowButton;
let star = [];
let numStars=5000;
let myFont;
let moonButt=false;

//load texture, arrow images, and font for moon phase number display
function preload(){
	moonTexture = loadImage ('moontexture.jpeg');
	arrowButton = loadImage ('arrow.png');
	myFont=loadFont('SyrCOMAdiabene.otf')
}

function setup(){
	createCanvas(730,650,WEBGL);
	textFont(myFont);
	background(0);

//create an array of star objects
	for (let i =0;i<numStars;i++){
		star.push(new stars());
	}

//draw input box and submit button using DOM library
	input = createInput();
  	input.position(20, 35);

  	button = createButton('submit');
  	button.position(input.x + input.width, 35);

  //set phase every time a value is submitted via button
 	 button.mousePressed(phaseSet);
  	print(moonButt);
}

function draw(){
	background(0);
	checkKeyDown();
	drawMooon();
	drawText();
	drawButtons();
	drawStars();
}

//set value from input box as moonPhase
function phaseSet(){
	if (input.value()<=30){
		moonPhase = int(input.value());
	}	
	if (input.value()=="moon butt"){
		moonButt=true;
	} else {
		moonButt=false;
	}
}

//detect arrow button presses
function mousePressed(){
	if (mouseX>90 && mouseX<150 && mouseY>80 && mouseY<130 && moonPhase<30){
		moonPhase++;
	}

	 if (mouseX>45 && mouseX<90 && mouseY>80 && mouseY<130 && moonPhase>0){
	    	moonPhase--;
	}
}

//draw moon and move lights to convey different moon phases
function drawMoon(phase,sphereX,sphereY){
	liteAngle=map((phase/10)+1.35,0,1,-1,1);
	push();
	translate(sphereX,sphereY);
	ortho();
	ambientMaterial(250);
	lightFalloff(1.0, 1.0, 1.0)
	directionalLight(250, 250, 250, cos(liteAngle), sin(orbitAngle), sin(liteAngle));
	ambientLight(10,10,0);
	noStroke();
	texture(moonTexture);
	sphere(moonsize);
	pop();
}

function drawMooon(){
		if (moonButt==false){
		drawMoon(int(moonPhase),0,0);
	} else {
		drawMoon(int(moonPhase),-50,0);
		drawMoon(int(moonPhase),150,0);
}
}

//draw moon phase number and prompt and clear before writing new character
function drawText(){
	push();
	textSize(72);
	fill(255);
	text(int(moonPhase), -310, -140);
	textSize(21);
	text("Input a number between 1 & 30 to see corresponding moon phase",-width/2+18,-height/2+18);
	textSize(23);
	text("Use arrow keys to change angle of orbit",-width/2+250,-height/2+50);
	pop();
}


function drawButtons(){
	push();
	image(arrowButton,-width/2+95, -245,50,50);
	scale(1,-1);
	image(arrowButton,-width/2+45, 195,50,50);
	pop();
}

function drawStars(){
	for (let i =0;i<numStars;i++){
     		star[i].display();
	}
}

//change simulated orbit angle
function checkKeyDown(){
	if (keyIsDown(UP_ARROW)){
		orbitAngle+=.05;
  	} else if (keyIsDown(DOWN_ARROW)){
  		orbitAngle-=.05;
 	}
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		orbitAngle+=.05;
  	} else if (keyCode === DOWN_ARROW) {
	  	orbitAngle-=.05;
	}
}


//class to draw ellipses at random x, y, z, and size values to resemble stars
class stars{
	constructor(){
		this.x = random(-width*4,width*4);
		this.y = random(-height*4,height*4);
		this.z = random(-30,-50);
		this.diameter = random(10);
	}

	display(){
		fill(255,255,255);
		noStroke();
		translate(0,0,this.z);
		ellipse(this.x,this.y,this.diameter,this.diameter);
	}
}


