import Parameter from "../Parameter";


import GeoPlanet from "../algoComponents/GeoPlanet";

import FunkyGeoPlanet from "../algoComponents/FunkyGeoPlanet";
import Linker from "../algoComponents/Linker";

import {Color, Position, ClearAll} from 'blacksheep-react-canvas';

import AlgorithmInterface from "./AlgorithmInterface";
import BaseAlgorithm from "./BaseAlgorithm";



/***

  Separation of concerns.

  Parameter objects shouldn't have to worry about how they're being glued to the the DOM?

*/
class NestedPolygons extends BaseAlgorithm{
  constructor(onChangeCallback) {
    super(onChangeCallback);

    let basePlanet =   new GeoPlanet(
      5,
      0.5,
      new Color(255, 0, 0, 0.2),
      new Position(0.5, 0.5),
      "p1",
      this.baseSpeed,
      5,
      1);

    this.planets = [

      basePlanet,
      new FunkyGeoPlanet(basePlanet)

    ]


    this.linkers = [
      new Linker(this.planets[0], this.planets[1])
    ]

      this.name = "nestedpolygons";

      this.tickables = this.planets;


      super.initPaintClearFunction();
      super.initRenderMap();
  }

  getParams() {
    return super.getParams().concat(this.planets);
  }

}

export default NestedPolygons;
