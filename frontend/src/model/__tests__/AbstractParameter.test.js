import {AbstractParameter} from "../AbstractParameter";

describe("AbstractParameter", () => {
    it ("randomize() throws error if not implmented", ()=> {
        const a = new AbstractParameter(); 
        expect(a.randomize).toThrow();
    }); 

    it ("toJson() to return {foo: 'bar'}", ()=> {
        const a = new AbstractParameter();
        a.label = "foo"; 
        a.value = "bar";  
        expect(a.toJson()).toEqual({foo: "bar"});
    }); 
}); 