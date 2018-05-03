import Parameter from "../Parameter";

import GoldenRectangleSpiral from "../algoComponents/GoldenRectangleSpiral";


import {Color, Position, ClearAll} from 'blacksheep-react-canvas';

import AlgorithmInterface from "./AlgorithmInterface";

import BaseAlgorithm from "./BaseAlgorithm";



class GoldenRectangle extends BaseAlgorithm {
  constructor(onChangeCallback) {
    super(onChangeCallback);

    this.planets = [

      new GoldenRectangleSpiral(0.01625, 0.0025, new Color(255, 255, 255, 0.4), new Position(0.5, 0.5), "golden-rectangle"),

    ]

    this.name = "golden-rectangle";

    this.tickables = this.planets;

    super.initPaintClearFunction();
    super.initRenderMap();



  }


  reset() {
    this.planets[0].resetPhase();
  }

  getParams() {
    return super.getParams().concat(this.planets);
  }


}

export default GoldenRectangle;
