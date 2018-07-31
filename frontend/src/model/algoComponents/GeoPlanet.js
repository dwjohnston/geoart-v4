import Parameter from '../Parameter';

import Planet from "./Planet";
import {Circle, Polygon,  Position, Color, Line, GeoUtil,AbstractPolygon} from 'blacksheep-react-canvas';


import BasePhaser from "./modules/phasers/BasePhaser"; 



class GeoPlanet extends Planet{
	constructor(speed, distance, color, center, label,baseSpeed, nSides=3 , rotateSpeed  = 0.03) {


		super(speed, distance, color, center, label, baseSpeed);

		this.speed = new Parameter(-10, 10, 1, speed, "speed");
		this.nSides = 	 new Parameter(1, 10, 1, nSides, "num sides");

		this.rotateSpeed = new Parameter(-10, 10, 1, rotateSpeed, "rotate speed");

		this.rotatePhase = this.phase;

		this.planetPhaser = new BasePhaser(this.speed, 0, this.baseSpeed); 
		this.rotatePhaser = new BasePhaser(this.rotateSpeed, 0, this.baseSpeed); 


	}

	getParams() {
		return [this.speed,this.rotateSpeed, this.distance,this.nSides, this.color, ];
	}

	tick() {
		super.tick();
		this.rotatePhaser.tick();
		this.planetPhaser.tick();
	}


	getCurrentOrbit() {
		return new AbstractPolygon(
			this.nSides.getValue(),
			this.distance.getValue(),
			this.rotatePhaser.getPhase(),
			this.center);
	}

	resetPhase() {
		super.resetPhase();
		this.rotatePhaser.reset();
		this.planetPhaser.reset();
		//this.rotatePhase  = this.initPhase; 
	}

	calcPosition(){




		//hack because of super calling this calcPosition
		if (this.nSides !== undefined) {
			let nSides = this.nSides.getValue();
			this.previousPosition.update(this.position.x, this.position.y);
			// let poly = new Polygon(this.distance.getValue(), this.color, this.center, nSides, this.rotatePhase, false);

			let poly = this.getCurrentOrbit();

			let position = poly.getPoint(this.planetPhaser.getPhase());

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
		let polygon = new Polygon(new AbstractPolygon(
			this.nSides.getValue(),
			this.distance.getValue(),
			this.rotatePhaser.getPhase(),
			this.center),  this.color, false);

		return [circle, polygon];
	}



}

export default GeoPlanet;
