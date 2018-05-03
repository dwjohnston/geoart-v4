import Parameter from "../Parameter";

import Planet from "../algoComponents/Planet";
import LfoPlanet from "../algoComponents/LfoPlanet";
import Linker from "../algoComponents/Linker";

import {Color, Position, ClearAll} from 'blacksheep-react-canvas';

import AlgorithmInterface from "./AlgorithmInterface";

import BaseAlgorithm from "./BaseAlgorithm";

/***

Separation of concerns.

Parameter objects shouldn't have to worry about how they're being glued to the the DOM?

*/
class ThreePlanets extends BaseAlgorithm {
  constructor(onChangeCallback) {
    super(onChangeCallback);

    //min, max, step, init, label, lfoRange, lfoMinFreq, lfoMaxFreq, lfoFreqInit, lfoAmountInit phase=0

    //    constructor(speed, distance, color, centre, label) {


    this.planets = [

      new Planet(0.005, 0.3, new Color(255, 0, 0, 1), new Position(0.5, 0.5), "p1"),
      new Planet(0.0025, 0.15, new Color(255, 0, 255, 1), new Position(0.5, 0.5), "p2"),
      new LfoPlanet(0.0125, 0.1, new Color(33, 185, 11, 1), new Position(0.5, 0.5), "p3lfo"),


    ]

    this.name = "threeplanets";


    this.linkers = [

      new Linker(this.planets[0], this.planets[1]),
      new Linker(this.planets[1], this.planets[2]),
      new Linker(this.planets[2], this.planets[0]),
    ]

    this.tickables = this.planets;

    super.initPaintClearFunction();
    super.initRenderMap();



  }

  getParams() {
    return super.getParams().concat(this.planets);
  }


}

export default ThreePlanets;
