import {floor} from 'lodash'; 
/****

  Stage Phaser

  For a given BasePhaser and nStages, tell me what stage the phase is at.

**/
class StagePhaser{


  constructor(nStages, basePhaser) {
    this.basePhaser = basePhaser;
    this.nStages = nStages;


    this.piLength = (2 * Math.PI) / this.nStages;
  }

  reset() {

    this.basePhaser.reset();

    this.calcStagesAndSubPhases();

  }


  getPhase() {
    return this.basePhaser.getPhase();

  }

  getPreviousPhase() {
    return this.basePhaser.getPhase();
  }

  getStage() {
    return this.stage;
  }

  getPreviousStage() {
    return this.previousStage;
  }

  /**
    SubPhase is a 0-1 value, representing the proporition the point is along a given stage.
  */
  getSubPhase() {
    return this.subPhase;
  }

  getPreviousSubPhase() {
    return this.previousSubPhase;
  }


  isOnCorner() {
    return (this.previousSubPhase > this.subPhase);
  }


  calcStagesAndSubPhases() {
    this.previousStage = this.stage;
    this.stage =floor(this.basePhaser.getPhase() / this.piLength);


    this.previousSubPhase = this.subPhase;
    this.subPhase =  (this.basePhaser.getPhase() % this.piLength) /this.piLength;
  }

  tick() {
    this.basePhaser.tick();

    this.calcStagesAndSubPhases();

  }


}

export default StagePhaser;
