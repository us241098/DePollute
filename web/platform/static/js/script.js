var canvas = document.getElementById("myCanvas");
var c = canvas.getContext('2d');

var timer;
var mouseX;
var mouseY;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var maxRadius = 35;

//canvas.onmousemove = function(e) {
	//mouseX = e.clientX;
	//mouseY = e.clientY;
//}

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function Circle(xCoordinate, yCoordinate, radius) {
	var randomNumber = Math.floor((Math.random() * 4));
	var randomTrueOrFalse = Math.floor(Math.random() * 2);
	var randomTrueOrFalseTwo = Math.floor(Math.random() * 2);

	this.xCoordinate = xCoordinate;
	this.yCoordinate = yCoordinate;
	this.radius = radius;
	this.color = colorArray[randomNumber];

	if (randomTrueOrFalse == 1) {
		this.xVelocity = -Math.random() * 1;
	} else {
		this.xVelocity = Math.random() * 1;
	}

	if (randomTrueOrFalse == 1) {
		this.yVelocity = -Math.random() * 1;
	} else {
		this.yVelocity = Math.random() * 1;
	}

// As distance gets closer to 0, increase radius

	this.update = function() {
		this.xCoordinate += this.xVelocity;
		var xDistance = mouseX - this.xCoordinate;
		var yDistance = mouseY - this.yCoordinate;
		var originalRadius = radius;
		this.yCoordinate += this.yVelocity;

		// Movement Functions
		if (this.xCoordinate + this.radius > canvasWidth || this.xCoordinate - this.radius < 0) {
			this.xVelocity = -this.xVelocity;
		};	
		if (this.yCoordinate + this.radius > canvasHeight || this.yCoordinate - this.radius < 0) {
			this.yVelocity = - this.yVelocity;	
		};

		// Radius Decrease Functions
			// When distance between circle center and mouse on horizontal axis is less than 50, increase radius until it is equal to 35
		if (xDistance < 50 && xDistance > -50 && this.radius < maxRadius && yDistance < 50 && yDistance > -50) {
			this.radius += 2;
		}
		else if ((xDistance >= 50 && originalRadius < this.radius) || (xDistance <= -50 && originalRadius < this.radius) || (yDistance >= 50 && originalRadius < this.radius) || (yDistance <= -50 && originalRadius < this.radius)) {
			this.radius -= 2; 
		};

		this.draw();

	}

	this.draw = function() {
		c.beginPath();
		c.arc(this.xCoordinate, this.yCoordinate, Math.abs(this.radius), 0, Math.PI * 2)
		c.fillStyle = this.color;
		c.fill();
	}
}

var colorArray = ['#272F32', '#9DBDC6', '#FF3D2E', '#DAEAEF'];
var myCircle = new Circle(30,80,10);
var circleArray = [];

for (var i = 0; i < 800; i++) {
	var randomXCoordinate = Math.random() * canvasWidth;
	var randomYCoordinate = Math.random() * canvasHeight;
	var randomRadius = Math.random() * 5;
    circleArray.push(new Circle(randomXCoordinate,randomYCoordinate ,randomRadius))
}



function updateAll() {
	c.clearRect(0,0, canvasWidth, canvasHeight);
	myCircle.update();
	for (var i = 0; i < circleArray.length; i++) {
			circleArray[i].update();
		}
	window.requestAnimationFrame(updateAll);
}

updateAll();
