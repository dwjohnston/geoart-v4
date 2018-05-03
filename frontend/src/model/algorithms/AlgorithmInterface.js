
/*
Again, just defining an interface/way of doing things here.
*/

class AlgorithmInterface {


  constructor() {

    this.name ="some-name";

    this.params = []; //These are just the parameters to be rendered on the screen and controled by the user.
    //You can still have other parameters defined.

    /*
    All this.params objects must be some kind of ParameterContainer object.

    eg. ParameterContainer
    Planet
    LfoPlanet

    This is so they render to be tabs.

    */

  }

  getParams() {
    throw new Error("This method should be overridden by extending class");

    return [];
  }

  tick() {

    throw new Error("This method should be overridden by extending class");

    return [] //A list of drawable objects
  }

}

export default AlgorithmInterface;
