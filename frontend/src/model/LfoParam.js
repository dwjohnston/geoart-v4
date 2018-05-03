import Parameter from "./Parameter";

class LfoParam extends Parameter {



  constructor(min, max, step, init, label, lfoRange, lfoMinFreq, lfoMaxFreq, lfoFreqInit, lfoAmountInit =0, phase=0){

    //  constructor(min, max, step, init, label){

    super (min, max, step, init, label);

    //The actual value to be used
    this.adjustedValue = init;

    //Min max values for LFO
    this.lfoRange = lfoRange;
    this.lfoMinFreq = lfoMinFreq;
    this.lfoMaxFreq = lfoMaxFreq;

    //The user set LFO values
    this.lfoFreq = lfoFreqInit;
    this.lfoAmount = lfoAmountInit;

    //The LFO phase
    this.phase = phase;
  }

  getValue(){
    return this.adjustedValue;
  }

  tick() {

    this.phase += this.lfoFreq * Math.PI *2;


    this.adjustedValue = this.value + Math.sin(this.phase) * this.lfoAmount;

  }

}

export default LfoParam;
