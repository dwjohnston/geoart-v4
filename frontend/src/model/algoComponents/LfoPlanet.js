import Parameter from '../Parameter';
import Planet from './Planet';


import {Circle, Position, Color, Line} from 'blacksheep-react-canvas';


class GoldenRectangle extends Planet{
	constructor(speed, distance, color, center, label) {


		//speed, distance, color, center, label, phase =0
		super(speed, distance, color, center, label);


	}


	tick(){



	}

}

export default GoldenRectangle;
