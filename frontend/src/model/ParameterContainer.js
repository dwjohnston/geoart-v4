
/***
  An object representing a group of parameters to be rendered together
*/

class ParameterContainer {


  constructor(params = [], label="", className = "") {
    this.params = params;
    this.label =label;
    this.tabClassName = className; 

    this.className = className;
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
