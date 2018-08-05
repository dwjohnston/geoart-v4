import {AbstractParameter} from "./AbstractParameter"; 

export class ColorParameter {

    constructor(color, label) {
        this.color = color; 
        this.label = label; 
    }

    randomize() {
        this.color.randomize(); 
    }

    toJson() {
        const obj = {}; 
        obj[this.label] = {
            r: this.color.r, 
            g: this.color.g, 
            b: this.color.a, 
            a: this.color.a
        }

        return obj; 
    }
}