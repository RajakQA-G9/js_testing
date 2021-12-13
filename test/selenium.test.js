const webdriver = require('selenium-webdriver');
const assert = require('assert');
const MyMath = require('../Maths');

describe('Selenium Tests', function() {
    it('Test if 1 equals 1', async function() {
        assert.equal(1, 1);
    });

    it('Test if 1 equals 2', async function() {
        assert.equal(1, 2);
    });
});

describe('Maths test', function() {
    it('Test if 1 + 1 = 2', function() {
        assert.equal(MyMath.add(1, 1), 2);
    });
});