import Planet from "../algoComponents/Planet";
import LfoPlanet from "../algoComponents/LfoPlanet";
import Linker from "../algoComponents/Linker";

import Parameter from "../Parameter";
import ParameterContainer from "../ParameterContainer";

import {ClearAll, Color, Position} from 'blacksheep-react-canvas';
import AlgorithmInterface from "./AlgorithmInterface";

import BaseAlgorithm from "./BaseAlgorithm";

import {values} from 'lodash'; 

/***

Separation of concerns.

Parameter objects shouldn't have to worry about how they're being glued to the the DOM?

*/
class NPlanets extends BaseAlgorithm {
  constructor(onChangeCallback) {

    super(onChangeCallback);
    //min, max, step, init, label, lfoRange, lfoMinFreq, lfoMaxFreq, lfoFreqInit, lfoAmountInit phase=0

    //    constructor(speed, distance, color, centre, label) {

    this.initPhase = 0;
    let initPlanet = new Planet(1, 0.05, new Color(255,255, 255, 0.02), new Position(0.5,0.5), "base", this.baseSpeed);
    
    this.settingsPanel.params = [this.globalSpeed, this.baseColor]; 

    this.name = "n-planets";


    this.mParams = {
      initialPlanet: initPlanet,

      nPlanets: new Parameter(1, 10, 1, 4, "Number of planets"),
      baseLinkRate: new Parameter(1, 100, 1, 10, "Link Rate"),
      rFactorSpeed: new Parameter(-2, 2, 0.01, 0.95, "Speed"),
      rFactorDistance: new Parameter(0, 2, 0.01, 1, "Distance"),
      rFactorOpacity: new Parameter(0, 2, 0.01, 1.5, "Opacity"),
    //  rFactorLinkRate: new Parameter(0, 10, 0.01, 1, "Link Rate"),
      rFactorLinkDepth: new Parameter(1, 10, 1, 1, "Link Depth"),



    };



    this.planets = [];
    this.linkers = [];

    this.tickables = this.planets;

    this.recalcPlanets();
    this.clearParams = values(this.mParams);
    super.initRenderMap();
  }

  //Initial planet calculation
  recalcPlanets() {

    //	constructor(speed, distance, color, centre, label) {

    this.mParams.initialPlanet.phase = this.initPhase;

    let previousPlanet = this.mParams.initialPlanet;

    this.planets.splice(0, this.planets.length);
    this.planets.push(previousPlanet);
    this.linkers.splice(0, this.linkers.length);


    for(let i = 1; i < this.mParams.nPlanets.getValue(); i++){
      //    constructor(speed, distance, color, centre, label) {

      let newColor = Object.assign(Object.create(previousPlanet.color), previousPlanet.color);
      newColor.opacity = previousPlanet.color.opacity * this.mParams.rFactorOpacity.getValue();


      let p = new Planet(
        previousPlanet.speed.getValue()*(this.mParams.rFactorSpeed.getValue()),
        previousPlanet.distance.getValue()*(1+this.mParams.rFactorDistance.getValue()),
        newColor,
        previousPlanet.center,
        "p"+i );

        this.planets.push(p);

        for (let j = 1; j <= this.mParams.rFactorLinkDepth.getValue(); j++){

          if (i - j >= 0){
            let linkTarget = this.planets[i-j];
            this.linkers.push(new Linker(
              p,
              linkTarget,
              this.mParams.baseLinkRate.getValue()
            //  Math.round(this.mParams.baseLinkRate.getValue() * Math.pow(this.mParams.rFactorLinkRate.getValue(), i-1))
            ));
          }


        }



        previousPlanet = p;



      }


      this.requiresPaintClear = true;

      super.initRenderMap();
    }


    onChange() {
      super.onChange();

      this.recalcPlanets();
    }

    getParams() {
      let p =  super.getParams().concat([
        new ParameterContainer ([this.mParams.initialPlanet, this.mParams.baseLinkRate], "base", this.mParams.initialPlanet),

        new ParameterContainer(
          [  this.mParams.nPlanets, this.mParams.rFactorDistance,  this.mParams.rFactorLinkDepth, this.mParams.rFactorSpeed, this.mParams.rFactorOpacity],
          "relationships"
        )
      ]);




      return p;
    }

  }

  export default NPlanets;
