const lib = require('../lib');

describe("absolute",()=>{
    it('should return a positive number if input is positive',()=>{
        const result = lib.absolute(1);
        expect(result).toBe(1);
    })
    
    it('should return a positive number if input is negative',()=>{
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    })
    
    it('should return 0 if input is 0',()=>{
        const result = lib.absolute(0);
        expect(result).toBe(0);
    })
});

describe('greet',()=>{
    it('Should match the name passed',()=>{
        const result = lib.greet('Ali');
        expect(result).toMatch(/Ali/);
        expect(result).toContain("Ali");
    })
})