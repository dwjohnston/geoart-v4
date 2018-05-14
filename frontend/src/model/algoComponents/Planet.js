import Parameter from '../Parameter';

import {Circle, Position, Color, Line} from 'blacksheep-react-canvas';


class Planet {
	constructor(speed, distance, color, center, label,baseSpeed = new Parameter(1, 1, 0, 1, "base-speed"), phase =0 ) {

		//min, max, step, init, label
		this.baseSpeed = baseSpeed;
		this.speed = new Parameter(-24, 24, 1, speed, "speed");
		this.distance = new Parameter(0.01, .5, 0.01, distance, "distance");

		//Fixed variables
		this.color = color;
		this.color.label = "color";
		this.center = center;
		this.label = label;

		//hardcode these for now

		this.initPhase = phase;
		this.phase = phase;
		this.radius = 0.003;




		this.enabled = true;

		this.previousPosition = new Position();
		this.position = new Position();

		this.hasChanged = false;

		this.init();
	}



	init() {

		console.log("planet init");

		this.calcPosition();
		this.calcPosition();

	}

	/**
		This is a particuarly nasty method, and should be replaced with a call back.
	*/
	getHasChanged() {

		let hasChanged = false;

		this.getParams().forEach((v) => {
			hasChanged = hasChanged || !!(v.hasChanged);
			v.hasChanged = false;
		});

		return hasChanged;
	}

	getParams() {
		return [this.speed, this.distance, this.color];
	}

	getColor() {
		return this.color;
	}

	getPosition() {
		return this.position;
	}

	resetPhase() {
		this.phase = this.initPhase;
	}

	calcPosition(){

		let x, y;

		x = this.center.x;
		y = this.center.y;




		this.previousPosition.update(this.position.x, this.position.y);

		this.position.update(x + (Math.cos(this.phase) * this.distance.getValue()),
		y +(Math.sin(this.phase) * this.distance.getValue()));


		return this.position;


	}


	tick(){

		let realSpeed = this.speed.getValue() / this.baseSpeed.getValue();
		this.phase +=  ((realSpeed/1000) * Math.PI) ;
		this.phase = this.phase % (2*Math.PI);



		this.calcPosition();


	}

	getPaint() {
		//return new Circle(this.radius, this.color, this.position);

		return new Line(this.previousPosition, this.position, this.color, 3);

	}

	getPreview() {
		return new Circle(this.radius*4, this.color.shift(50,0.5), this.position, false, 2);

		//return new Line(this.previousPosition, this.position, this.color, 1);
	}

	getOrbitPreview() {
		return new Circle(this.distance.getValue(), new Color(255,255,255,0.2), this.center, false);
	}

}

export default Planet;