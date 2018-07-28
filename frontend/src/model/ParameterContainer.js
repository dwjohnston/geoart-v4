
/***
  An object representing a group of parameters to be rendered together
*/

class ParameterContainer {


  constructor(params = [], label="", previewObject = "", tabClassName = null) {
    this.params = params;
    this.label =label;

    this.previewObject = previewObject; 
    this.tabClassName =tabClassName; 

  }


  getParams() {
    return this.params;
  }

  randomize() {
    this.params.forEach(p => p.randomize());
  }


  getHasChanged() {


    let hasChanged = false;

    this.params.forEach((v) => {
      hasChanged = hasChanged || !!(v.hasChanged);
      v.hasChanged = false;
    });

    return hasChanged;
  }

}

export default ParameterContainer;
