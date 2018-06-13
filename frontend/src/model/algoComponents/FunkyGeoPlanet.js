import Parameter from '../Parameter';

import Planet from "./Planet";
import { Circle, Polygon, Position, Color, Line, GeoUtil, AbstractPolygon, NestedPolygon } from 'blacksheep-react-canvas';
import BasePhaser from './modules/phasers/BasePhaser';


//Doesn't have a distance
//Doesn't have a center
//Has a boundry (which is another planet's orbit)
//Doesn't have a rotate speed


//Should extend BoundedPlanet or something
class FunkyGeoPlanet extends Planet {
	constructor(
		boundry,
		speed = 2,
		color = new Color(255, 255, 255, 0.1),
		label = "funky geo planet",
		nSides = new Parameter(3, 10, 1, 4, "nSides"),
		initialPhase = 0,
		baseSpeed,
	) {


		super(speed,
			boundry.distance.getValue(),
			color,
			boundry.center,
			label,
			boundry.baseSpeed,
		);

		this.baseSpeed = boundry.baseSpeed;

		this.speed = new Parameter(-10, 10, 1, speed, "speed");
		this.rotateSpeed = new Parameter(-10, 10, 1, 1, "rotate-speed");


		this.nSides = nSides;
		this.boundry = boundry;


		this.rotatePhaser = new BasePhaser(
			this.rotateSpeed,
			0,
			this.baseSpeed);

		this.planetPhaser = new BasePhaser(
			this.speed,
			0,
			this.baseSpeed);

	}

	getParams() {
		return [this.speed, this.rotateSpeed, this.nSides, this.color,];
	}

	tick() {

		super.tick();
		this.rotatePhaser.tick();
		this.planetPhaser.tick();

	}

	reset() {
		super.reset();
		this.rotatePhaser.reset();
		this.planetPhaser.reset();
	}

	calcPosition() {




		//hack because of super calling this calcPosition
		if (this.nSides !== undefined) {

			let nSides = this.nSides.getValue();
			this.previousPosition.update(this.position.x, this.position.y);
			// let poly = new Polygon(this.distance.getValue(), this.color, this.center, nSides, this.rotatePhase, false);



			let poly = new NestedPolygon(
				this.boundry.getCurrentOrbit(),
				nSides,
				this.rotatePhaser.getPhase());

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
		// let circle =super.getOrbitPreview();
		//
		//
		// let polygon = new Polygon(this.distance.getValue(), this.color, this.center, this.nSides.getValue(), this.rotatePhase, false);
		let polygon = new Polygon(new NestedPolygon(
			this.boundry.getCurrentOrbit(),
			this.nSides.getValue(),
			this.rotatePhaser.getPhase()), this.color, false);

		return [polygon];
	}



}

export default FunkyGeoPlanet;
