import Parameter from "../Parameter";
import ParameterContainer from "../ParameterContainer";

import Planet from "../algoComponents/Planet";
import LfoPlanet from "../algoComponents/LfoPlanet";
import Linker from "../algoComponents/Linker";

import {ClearAll, Color, Position} from 'blacksheep-react-canvas';


import BaseAlgorithm from "./BaseAlgorithm";



/***

Separation of concerns.

Parameter objects shouldn't have to worry about how they're being glued to the the DOM?

*/
class BasicOrbits extends BaseAlgorithm {
  constructor(onChangeCallback) {

    super(onChangeCallback);


    //min, max, step, init, label, lfoRange, lfoMinFreq, lfoMaxFreq, lfoFreqInit, lfoAmountInit phase=0

    //    constructor(speed, distance, color, centre, label) {

    let center = new Position (0.5, 0.5);
    let p1 = new Planet(0.004, 0.3, new Color(255,0,0,0.3), center, "p1");
    let o1 = new Planet (-0.04, 0.25, new Color(255,100,100,0.3), p1.position, "o1");

    let p2 = new Planet (-0.005, 0.4, new Color(0,0,255,1), center, "p2");
    let o2 = new Planet (0.003, 0.06, new Color(100,100,255,1), p2.position, "o2");


    for (let o of [o1,o2]){
      o.speed.setMax(0.1);
      o.speed.setMin(-0.1);
    }

    this.planets = [p1,p2,o1,o2];

    this.linkers = [
       new Linker(p1,o1, 3),
      // new Linker(o1,o2),
       new Linker(p2,o2, 3),
    ];


    this.moreParams = [
      new ParameterContainer([p1.speed, p1.distance], "p1"),
      new ParameterContainer([o1.speed, o1.distance], "o1"),
      new ParameterContainer([p2.speed, p2.distance], "p2"),
      new ParameterContainer([o2.speed, o2.distance], "o2")
    ];




    this.name = "basic-orbits";


    this.tickables = this.tickables.concat(this.planets);

    super.initPaintClearFunction();

    super.initRenderMap();

  }

  getParams() {
    return super.getParams().concat(this.moreParams);
  }

}

export default BasicOrbits;
