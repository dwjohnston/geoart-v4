class Parameter {

  constructor(min, max, step, init, label){
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
