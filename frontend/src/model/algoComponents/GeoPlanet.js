import Parameter from '../Parameter';

import Planet from "./Planet";
import {Circle, Polygon,  Position, Color, Line, GeoUtil,AbstractPolygon} from 'blacksheep-react-canvas';




class GeoPlanet extends Planet{
	constructor(speed, distance, color, center, label, nSides=3, rotateSpeed  = 0.03) {

		super(speed, distance, color, center, label);

		this.speed = new Parameter(1, 10, 1, speed, "speed");
		this.nSides = 	 new Parameter(3, 10, 1, nSides, "num sides");

		this.rotateSpeed = new Parameter(-0.005, 0.005, 0.0001, rotateSpeed, "rotate speed");

		this.rotatePhase = this.phase;


	}

	getParams() {
		return [this.speed, this.distance, this.color, this.nSides,this.rotateSpeed];
	}

	tick() {
		super.tick();

		this.rotatePhase +=  (this.rotateSpeed.getValue() * Math.PI) ;
		this.rotatePhase = this.rotatePhase % (2*Math.PI);
	}


	getCurrentOrbit() {
		return new AbstractPolygon(this.nSides.getValue(), this.distance.getValue(), this.rotatePhase, this.center);
	}

	resetPhase() {
		super.resetPhase();
		this.rotatePhase  = this.initPhase; 
	}

	calcPosition(){




		//hack because of super calling this calcPosition
		if (this.nSides !== undefined) {
			let nSides = this.nSides.getValue();
			this.previousPosition.update(this.position.x, this.position.y);
			// let poly = new Polygon(this.distance.getValue(), this.color, this.center, nSides, this.rotatePhase, false);

			let poly = this.getCurrentOrbit();

			let position = poly.getPoint(this.phase);

			this.position.update(
				position.x, position.y
			);

			return this.position;
		}

		else {
			super.calcPosition();
		}


	}

	getOrbitPreview() {
		let circle =super.getOrbitPreview();



		//  constructor(nsides=3, size=1, phase=0, position = new Position(0,0)) {
		let polygon = new Polygon(new AbstractPolygon(this.nSides.getValue(),this.distance.getValue(), this.rotatePhase, this.center),  this.color, false);

		return [circle, polygon];
	}



}

export default GeoPlanet;
