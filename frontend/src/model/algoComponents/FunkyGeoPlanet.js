import Parameter from '../Parameter';

import Planet from "./Planet";
import {Circle, Polygon,  Position, Color, Line, GeoUtil,AbstractPolygon, NestedPolygon} from 'blacksheep-react-canvas';


//Doesn't have a distance
//Doesn't have a center
//Has a boundry (which is another planet's orbit)
//Doesn't have a rotate speed


//Should extend BoundedPlanet or something
class FunkyGeoPlanet extends Planet {
	constructor(
		boundry,
		speed = 2,
		color = new Color(255,255, 255, 0.1),
		label = "funky geo planet",
		nSides= new Parameter(3, 10, 1, 4, "nSides"),
		initialPhase = 0
	) {


		super(speed, boundry.distance.getValue(), color, boundry.center, label);

		this.speed = new Parameter(1, 10, 1, speed, "speed");

		this.nSides = 	 nSides;
		this.boundry = boundry;

		this.phase = initialPhase;


	}

	getParams() {
		return [this.speed, this.color, this.nSides];
	}

	tick() {

		super.tick();

	}

	calcPosition(){




		//hack because of super calling this calcPosition
		if (this.nSides !== undefined) {

			let nSides = this.nSides.getValue();
			this.previousPosition.update(this.position.x, this.position.y);
			// let poly = new Polygon(this.distance.getValue(), this.color, this.center, nSides, this.rotatePhase, false);



			let poly = new NestedPolygon(this.boundry.getCurrentOrbit(), nSides, 0);

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
		// let circle =super.getOrbitPreview();
		//
		//
		// let polygon = new Polygon(this.distance.getValue(), this.color, this.center, this.nSides.getValue(), this.rotatePhase, false);
		let polygon = new Polygon(new NestedPolygon(this.boundry.getCurrentOrbit(), this.nSides.getValue(), 0 ), this.color, false);

		return [polygon];
	}



}

export default FunkyGeoPlanet;
