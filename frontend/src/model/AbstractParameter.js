export class AbstractParameter {


    randomize() {
        throw "Error, randomize() not initialized"; 
    }

    toJson() {
        const obj = {}; 
        obj[this.label] = this.value; 
        return obj; 
    }
}