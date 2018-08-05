import {Color} from "blacksheep-react-canvas"; 
import {ColorParameter} from "../ColorParameter"; 
describe("ColorParameter", () => {

    it ("toJson() returns {color: {r: 0, b:0, g:0, a:0}}", () => {
        const cp = new ColorParameter(new Color(0,0,0,0), "color"); 

        expect(cp.toJson()).toEqual({color: {
            r: 0, 
            g: 0, 
            b: 0, 
            a: 0
        }}); 
    }); 
}); 