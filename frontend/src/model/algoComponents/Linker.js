
import {GradientLine, ColorPoint} from 'blacksheep-react-canvas';

class Linker {

  constructor(o1, o2, linkrate = 10) {
    this.o1 =o1;
    this.o2 =o2;


    this.linkrate = linkrate;
    this.linkcount = 0;

  }


  getSprite() {

    if (((this.linkcount++) %this.linkrate) ===0){
      return new GradientLine(new ColorPoint(this.o1.getPosition(), this.o1.getColor()), new ColorPoint(this.o2.getPosition(),this.o2.getColor()));

    }

    return;

  }
}

export default Linker;
