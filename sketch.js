var moonsize=160;
var moonPhase=0;
let prevPhase;
var x=0;
let moonTexture;
let arrowButton;
let star = [];
let numStars=5000;
let myFont;

//load texture, arrow images, and font for moon phase number display
function preload(){
	moonTexture = loadImage ('moontexture.jpeg');
	arrowButton = loadImage ('arrow.png');
	myFont=loadFont('SyrCOMAdiabene.otf')
}

function setup(){
	createCanvas(630,600,WEBGL);
	background(0);

//create and draw an array of star objects
	for (let i =0;i<numStars;i++){
     star.push(new stars());
     star[i].display();

     textFont(myFont);
	}

//draw input box and submit button using DOM library
	input = createInput();
  input.position(20, 35);

  button = createButton('submit');
  button.position(input.x + input.width, 35);

  //set phase every time a value is submitted via button
  button.mousePressed(phaseSet);
}

function draw(){
drawText();
textSize(18);
text("Input a number between 1 & 30 to see corresponding moon phase",-width/2+18,-height/2+18);
drawMoon(int(moonPhase));
drawButtons();
}

//set value from input box as moonPhase
function phaseSet(){
	moonPhase = int(input.value());
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
function drawMoon(phase){
	x=map((phase/10)+1.35,0,1,-1,1);
	push();
	ortho();
	ambientMaterial(250);
	lightFalloff(1.0, 1.0, 1.0)
		directionalLight(250, 250, 250, cos(x), 0, sin(x));
		ambientLight(10,10,0);
		noStroke();
		texture(moonTexture);
		sphere(moonsize);
		pop();
		prevPhase=phase;
}

//draw moon phase number and prompt and clear before writing new character
function drawText(){
	textSize(72);
		fill(255);
		text(int(moonPhase), -260, -100);
	if (prevPhase!=moonPhase){
		background(0);
		drawMoon(int(moonPhase));
		for (let i =0;i<numStars;i++){
     star[i].display();
 }
	}
}


function drawButtons(){
 image(arrowButton,-220, -220,50,50);
scale(1,-1);
image(arrowButton,-270, 170,50,50);
}


//class to draw ellipses at random x, y, z, and size values to resemble stars
class stars{
	constructor(){
		this.x = random(-width*2,width*2);
		this.y = random(-height*2,height*2);
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


