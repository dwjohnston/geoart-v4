import AlgorithmInterface from "./AlgorithmInterface";


import Parameter from "../Parameter";
import ParameterContainer from "../ParameterContainer";
import {Color} from 'blacksheep-react-canvas';

import {ClearAll} from "blacksheep-react-canvas";

class BaseAlgorithm extends AlgorithmInterface {

  constructor(onChangeCallback) {

    super();

    this.globalSpeed = new Parameter(1,50, 1, 1, "super-speed");
    this.baseSpeed = new Parameter(1, 8, 1, 6, "base-speed");
    this.baseColor = new Color(0, 0, 0, 1); 
    this.baseColor.hasChanged = false; 
    this.baseColor.getHasChanged = function(){
      let hc = this.hasChanged;
      this.hasChanged = false; 
      return hc;
    };

    this.settingsPanel = new ParameterContainer([this.globalSpeed, this.baseSpeed, this.baseColor], "", null,  "fas fa-wrench");


    this.planets = [];
    this.linkers = [];

    this.tickables = [];
    this.renderMap = {};

    this.clearParams = []; // Parameters which - if they've changed, should clear the whole thing


    this.onChangeCallback = onChangeCallback;

    this.requiresClear = true; 

    /**
    Structure should look like this:

    And the functions will be called on each tick

    //   this.renderMap = {
    //   0: [someFunction, someFunction]
    //   1: [someFunction, someFunction]
    //
    // }
    */

  }


  toJson() {

  }


  randomize() {

    [...this.planets, this.settingsPanel].forEach( p => p.randomize()); 
    this.onChange();


  }


  onChange() {


    this.requiresClear = true;
    this.reset();


    if (this.onChangeCallback){
      this.onChangeCallback();
    }
  }

  hasChanged() {

    let hasChanged = false;

    this.clearParams.forEach((v)=> {
      hasChanged = hasChanged ||  v.getHasChanged();
    });


    return hasChanged;
  }


  reset() {
    // this.planets.forEach((v)=> {
    //   v.resetPhase();
    // });
  }

  initPaintClearFunction() {
    this.clearParams = [].concat(this.planets).concat([this.baseColor, this.baseSpeed]);
    
  }

  /***
  I'm just going to chuck this here for now.


  It's the basic rendering for all planets and linkers.
  ***/
  initRenderMap() {

    let paints = this.planets.reduce((acc,cur) => {
      return acc.concat([cur.getPaint.bind(cur)]);
    }, [() => {

      //I don't like this, but works for now.
      if (this.requiresClear) {

        this.requiresClear = false;
        return new ClearAll(this.baseColor);

      }
    }])
    .concat(this.linkers.reduce((acc,cur) => {
      return acc.concat([cur.getSprite.bind(cur)]);
    }, [
    ]));

    let previews = this.planets.reduce((acc,cur) => {
      return acc.concat([cur.getPreview.bind(cur), cur.getOrbitPreview.bind(cur)]);
    }, [() => {return new ClearAll(true);}]);



    this.renderMap = {
      0: paints,
      1: previews,
    }
  }


  getParams() {
    return [this.settingsPanel];
  }

  tick() {
    let draws = {};


    if (this.hasChanged()) {
      this.onChange();
    }


    for (const key of Object.keys(this.renderMap)) {
      draws[key] = [];
    }
    for (let i = 0; i < this.globalSpeed.getValue(); i++){

      for (let tick of this.tickables) {

        tick.tick();
      }






      for (const key of Object.keys(this.renderMap)) {

        for (let fn of this.renderMap[key]){
          draws[key] = draws[key].concat(fn());
        }

      }




    }

    return draws;

  }

}


export default BaseAlgorithm;
