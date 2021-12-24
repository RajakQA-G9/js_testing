const assert = require('assert');
const MyMath = require('../Maths');

describe('Maths test', function() {
    it('Test if 1 + 1 = 2', function() {
        assert.equal(MyMath.add(1, 1), 2);
    });

    it('Test if 1 - 1 = 0', function() {
        assert.equal(MyMath.sub(1, 1), 0);
    });

    it('Test if 3 * 2 = 6', function() {
        assert.equal(MyMath.mul(3, 2),6);
    });

    it('Test if 6 / 2 = 3', function() {
        assert.equal(MyMath.div(6, 2), 3);
    });
    
});