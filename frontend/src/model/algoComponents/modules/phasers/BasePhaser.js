import Parameter from "../../../Parameter";

/***

  Base Phaser

  Has a single speed parameter, and returns the phase (a value between 0 - 2pi). Phase is increased on tick().

*/
class BasePhaser {


  constructor(speedParam, initPhase = 0, baseSpeed = new Parameter(1, 25, 1, 6, "base-speed")){

    this.speed = speedParam;
    this.baseSpeed = baseSpeed; 
    this.initPhase = initPhase;

    this.reset();
  }

  reset() {

    this.phase = this.initPhase;
    this.previousPhase = ((Math.PI * 2) - this.speed.getValue() * Math.PI) % (2* Math.PI);

  }

  tick() {

    this.previousPhase = this.phase;
    let realSpeed = this.speed.getValue() / this.baseSpeed.getValue();
    this.phase +=  ((realSpeed/1000) * Math.PI) ;
		this.phase = (this.phase + 2*Math.PI)   % (2*Math.PI);

  }


  getPreviousPhase() {
    return this.previousPhase;
  }
  getPhase() {
    return this.phase;
  }

}


export default BasePhaser; 
