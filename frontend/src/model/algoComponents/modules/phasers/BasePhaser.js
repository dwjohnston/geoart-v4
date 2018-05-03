import Parameter from "../../../Parameter";


/***

  Base Phaser

  Has a single speed parameter, and returns the phase (a value between 0 - 2pi). Phase is increased on tick().

*/
class BasePhaser {


  constructor(speedParam, initPhase = 0){

		this.speed = speedParam;
    this.initPhase = initPhase;

    this.reset();
  }

  reset() {

    this.phase = this.initPhase;
    this.previousPhase = ((Math.PI * 2) - this.speed.getValue() * Math.PI) % (2* Math.PI);

  }

  tick() {

    this.previousPhase = this.phase;
    this.phase +=  (this.speed.getValue() * Math.PI) ;
    this.phase = this.phase % (2*Math.PI);

  }


  getPreviousPhase() {
    return this.previousPhase;
  }
  getPhase() {
    return this.phase;
  }

}


export default BasePhaser; 
