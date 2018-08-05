import LfoParam from '../LfoParam';
import Planet from './Planet';

import MathJs from 'mathjs';


import BasePhaser from "./modules/phasers/BasePhaser";
import StagePhaser from "./modules/phasers/StagePhaser";
import GoldenRectanglePositioner from "./modules/positioners/GoldenRectanglePositioner"
import GoldenSpiralPositioner from "./modules/positioners/GoldenSpiralPositioner"

import {Circle, Position, Color, Line, pointOnCircle, foo} from 'blacksheep-react-canvas';


class GoldenRectangleSpiral extends Planet{
	constructor(speed, distance, color, center, label,  baseSpeed) {


		//speed, distance, color, center, label, phase =0
		super(speed, distance, color, center, label,  baseSpeed);


		this.stagePhaser = new StagePhaser(4, new BasePhaser(this.speed, 0, this.baseSpeed));

		this.goldenRectanglePositioner = new GoldenRectanglePositioner(this.speed, this.distance, this.center, this.stagePhaser);
		this.goldenSpiralPositioner = new GoldenSpiralPositioner(this.goldenRectanglePositioner);

		//(min, max, step, init, label, lfoRange, lfoMinFreq, lfoMaxFreq, lfoFreqInit, lfoAmountInit phase=0



		this.resetPhase();

		this.drawPool=[];


	}

	resetPhase() {

		super.resetPhase();

		this.goldenSpiralPositioner.reset();


		this.previousPositionStartCorner = null; //The corner for stage changes
		this.currentSize = this.distance.getValue();

		this.currentCurvePoint = null;




		this.currentCurvePosition = null;
		this.previousCurvePosition = null;


		this.drawPool = [];





		let position = this.goldenRectanglePositioner.getPosition();

		this.position.updateFromPosition(position);
		this.previousPosition.updateFromPosition(position);

		this.curvePointQueue = [this.position.copy()];

	}


	init() {
	}


	tick() {
		this.goldenSpiralPositioner.tick();
	}


	getOrbitPreview(){
		return null;
	}

	getPreview() {

	}

	getPaint() {



		//TODO extract these into a generic toolbox
		function lineTranslateX(line, amount) {

			return new Line(
				new Position(line.p1.x + amount, line.p1.y),
				new Position(line.p2.x + amount, line.p2.y),
				new Color(250, 0, 0, 1),
				1
			);
		}

		function lineTranslateY(line, amount) {
			return new Line(
				new Position(line.p1.x, line.p1.y  + amount),
				new Position(line.p2.x, line.p2.y  + amount),
				new Color(250, 0, 0, 1),
				1
			);
		}

		let  genericTranslate = (line, previousStage=false) => {

			let newLine;

			let divisor = this.goldenRectanglePositioner.getMyPhi();
			let stage = this.stagePhaser.getStage();
			if (previousStage){
				divisor = divisor * divisor;
				stage =this.stagePhaser.getPreviousStage();
			}

			switch (stage) {
				case 0: newLine = lineTranslateX(line, -1 * this.goldenRectanglePositioner.currentSize /divisor);

				break;
				case 1: newLine = lineTranslateY(line, -1 * ( this.goldenRectanglePositioner.currentSize / divisor)); break;
				case 2: newLine = lineTranslateX(line,  1 * this.goldenRectanglePositioner.currentSize/divisor); break;
				case 3: newLine = lineTranslateY(line,  1 *  this.goldenRectanglePositioner.currentSize /divisor); break;
			}

			return newLine;

		}




		/***
			The rectangles
		*/
		let thisLine = new Line(this.goldenRectanglePositioner.getPreviousPosition(), this.goldenRectanglePositioner.getPosition(), this.color, 3);
		let otherLine = genericTranslate(thisLine);


		let lines = [];


		if (this.stagePhaser.isOnCorner()) {

			let thisStartCorner =  new Line(this.goldenRectanglePositioner.getStartCorner(), this.goldenRectanglePositioner.getPreviousPosition(), this.color, 3);
			let otherStartCorner =  genericTranslate(thisStartCorner, true);
			this.previousPositionStartCorner = null;
			lines = [
				thisLine,
				otherLine,
				thisStartCorner,
				otherStartCorner
			];

		}

		else {
			lines = [
				thisLine,
				otherLine
			];
		}



		if (this.goldenSpiralPositioner.getPosition() && this.goldenSpiralPositioner.getPreviousPosition()){

			let spiralLine = new Line (this.goldenSpiralPositioner.getPosition(), this.goldenSpiralPositioner.getPreviousPosition(), new Color(255,0, 255, 1), 2) ;
			lines.push(spiralLine);

		}


		lines =lines.concat(this.drawPool);
		this.drawPool = [];
		return lines;



	}

}

export default GoldenRectangleSpiral;
