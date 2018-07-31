import Parameter from "../Parameter";
import ParameterContainer from "../ParameterContainer";

import Planet from "../algoComponents/Planet";

import {Color, Position} from 'blacksheep-react-canvas';
import BaseAlgorithm from "./BaseAlgorithm";


/***

Separation of concerns.

Parameter objects shouldn't have to worry about how they're being glued to the the DOM?

*/
class RecursiveOrbits  extends BaseAlgorithm{
  constructor(onChangeCallback) {

    super(onChangeCallback);

    let center = new Position (0.5, 0.5);
    this.p1 = new Planet(1, 0, new Color(250,250,50,0.4), center, "base");


    this.recursionLevel = new Parameter(1, 5, 1, 2, "recursion level");
    this.planetsPerLevel = new Parameter(1, 5, 1, 2, "planets per level");
    this.distanceFactor = new Parameter(0, 0.5, 0.01, 0.1, "distance factor");
    this.speedFactor = new Parameter(-2, 2, 0.01, -1.1, "speed factor");


    this.mParams = [
      new ParameterContainer([this.p1.speed, this.p1.color], "base", this.p1),
      new ParameterContainer([this.recursionLevel, this.planetsPerLevel], "recursion"),
      new ParameterContainer([this.distanceFactor, this.speedFactor], "relationships")
    ];


    this.planets = [];
    this.linkers = [];

    this.tickables = this.planets;

    this.clearParams = this.mParams;


    this.name = "recursive-orbits";


    this.recalcPlanets();

    //super.initPaintClearFunction();
    this.settingsPanel.params = [this.globalSpeed, this.baseColor]; 
    this.clearParams = [this.p1, this.baseColor].concat(this.mParams); 
    super.initRenderMap();



  }

  getParams() {
    return super.getParams().concat(this.mParams);
  }


  recalcPlanets() {


    this.planets.splice(0, this.planets.length);
    this.planets.push(this.p1);
    this.linkers.splice(0, this.linkers.length);




    let addPlanets = (parentPlanet, depth)=>  {

      if (depth++ < this.recursionLevel.getValue()){

        for (let i = 0; i < this.planetsPerLevel.getValue(); i++){

          let p = new Planet(
           (parentPlanet.speed.getValue() * this.speedFactor.getValue()),
            parentPlanet.distance.getValue() + this.distanceFactor.getValue(),
            parentPlanet.color,
            parentPlanet.position,
            ["p", depth, i].join("-"),
            this.baseSpeed,
            (i / this.planetsPerLevel.getValue()) * (Math.PI * 2)
          );




          this.planets.push(p);
          // this.linkers.push(new Linker(p, parentPlanet));

          addPlanets(p, depth);

        }

      }


    }


    addPlanets(this.p1, 0);

    super.initRenderMap();


  }

  onChange() {
    super.onChange();

    this.recalcPlanets();
  }

}

export default RecursiveOrbits;
