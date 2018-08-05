import _ from 'lodash'; 
import {AbstractParameter} from "./AbstractParameter"; 

function round(number, increment, offset) {
  return Math.ceil((number - offset) / increment ) * increment + offset;
}

class Parameter extends AbstractParameter {

  constructor(min, max, step, init, label){
    super();
    this.min = min;
    this.max = max;
    this.step = step;
    this.value = init;
    this.label = label;
    this.hasChanged = false;
  }

  getValue(){
    return this.value;
  }

  randomize() {
    this.value = round(_.random(this.min, this.max), this.step, 0); 
    this.hasChanged = true; 
  }


  setMax(v) {
    this.max = v;
  }

  setMin(v) {
    this.min = v;
  }

  getHasChanged() {

    let v = this.hasChanged;
    this.hasChanged = false;

    return v; 

  }

}

export default Parameter;
