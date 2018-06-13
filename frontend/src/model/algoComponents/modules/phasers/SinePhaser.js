import Parameter from "../../../Parameter";
import BasePhaser from "./BasePhaser";

/***

 Sine Phaser

 
  Get a given value between -1 * distance and 1 * distance, increase on tick. 


  If you want a cos phaser, use Math.PI * 0.5 as init phase. 

*/
class SinePhaser {


  constructor(speedParam, initPhase = 0, baseSpeed = new Parameter(1, 25, 1, 6, "base-speed"), distance = new Parameter(0, 1, 0.001, 1, "distance")){

    this.speed = speedParam;
    this.baseSpeed = baseSpeed; 
    this.initPhase = initPhase;
    this.basePhaser = new BasePhaser(this.speed, this.initPhase, this.baseSpeed); 
    this.distance = distance; 
    this.reset();
  }

  reset() {
    this.basePhaser.reset();
    this.calcValue();
  }

  calcValue() {
    this.value = Math.sin(this.basePhaser.getPhase()) * this.distance.getValue();
  }

  tick() {
    this.basePhaser.tick(); 
    this.calcValue();
  }

  getValue() {
    return this.value; 
  }


  getPhaser() {
    return this.basePhaser; 
  }

}


export default SinePhaser; 
