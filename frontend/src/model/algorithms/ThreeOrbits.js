import Planet from "../algoComponents/Planet";
import Linker from "../algoComponents/Linker";

import { Color, Position} from 'blacksheep-react-canvas';
import BaseAlgorithm from "./BaseAlgorithm";

/***

*/
class ThreeOrbits extends BaseAlgorithm {
  constructor(onChangeCallback) {

    //BaseAlgorithm basically sets up some standard reusable functionality, that can be overridden if you wish.
    super(onChangeCallback);


    //Define a center point
    let center = new Position (0.5, 0.5);

    //Define three planets with their initial speeds, distances and colors - and set the center of each one as the previous planet's position
    //Planet constructor(speed, distance, color, center, label, phase =0) {
    let p1 = new Planet(6, 0.3, new Color(255,0,0,0.3), center, "p1", this.baseSpeed);
    let p2 =new Planet(-6, 0.2, new Color(0,255,0,0.3), p1.position, "p2", this.baseSpeed);
    let p3 = new Planet(12, 0.4, new Color(0,0,255,0.3), p2.position, "p3", this.baseSpeed);

    this.planets = [p1,p2,p3];


    //Add some linkers
    //Linker constructor(o1, o2, linkrate = 10) {
    this.linkers = [
      new Linker(p1,p2, 3),
      new Linker(p2,p3, 3),
      new Linker(p1,p3, 3),
    ];



    this.name = "three-orbits";

    //Tell it all the planets need to tick
    this.tickables = this.tickables.concat(this.planets);


    //Use default BaseAlgorithm clearing and rendering
    //ie. clear whenever a control changes
    //ie. render orbit preview, planet preview, planet paint, all linkers.
    super.initPaintClearFunction();
    super.initRenderMap();

  }


  /***
    The list of parameters that will be rendered to be controlled by the user.
  */
  getParams() {

    //Tell it to do standard full render of the planets controls
    return super.getParams().concat(this.planets);
  }

}

export default ThreeOrbits;
