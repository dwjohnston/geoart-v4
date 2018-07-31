import Parameter from "../Parameter";

import Planet from "../algoComponents/Planet";
import LfoPlanet from "../algoComponents/LfoPlanet";
import Linker from "../algoComponents/Linker";

import {Color, Position, ClearAll} from 'blacksheep-react-canvas';

import AlgorithmInterface from "./AlgorithmInterface";

import BaseAlgorithm from "./BaseAlgorithm";



class EarthVenus extends BaseAlgorithm {
  constructor(onChangeCallback) {
    super(onChangeCallback);

    this.planets = [

      //It should actually be 16.25
      new Planet(13, 0.2, new Color(255, 255, 255, 0.4), new Position(0.5, 0.5), "venus", this.baseSpeed),
      new Planet(8, 0.3, new Color(255, 255, 255, 0.4), new Position(0.5, 0.5), "earth", this.baseSpeed),
    ]

    this.name = "original-earth-venus";


    this.linkers = [

      new Linker(this.planets[0], this.planets[1], 3),
    ]

    this.tickables = this.planets;

    super.initPaintClearFunction();
    super.initRenderMap();



  }

  getParams() {
    return super.getParams().concat(this.planets);
  }


}

export default EarthVenus;
