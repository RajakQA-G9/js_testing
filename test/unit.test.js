const assert = require('assert');
const MyMath = require('../Maths');

describe('Maths test', function() {
    it('Test if 1 + 1 = 2', function() {
        assert.equal(MyMath.add(1, 1), 2);
    });

    it('Test if 1 - 1 = 0', function() {
        assert.equal(MyMath.sub(1, 1), 0);
    });
    
    it('Test if 1 * 1 = 1', function() {
        assert.equal(MyMath.mul(1,1), 1);
    });
    
    it('Test if 1 / 1 = 1', function() {
        assert.equal(MyMath.div(1,1), 1);
    });    
});
