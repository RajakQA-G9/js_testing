'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;
chai.should();

describe('Test promises', function() {
    it('Tests a resolved promise', async function() {
        const promise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                /*
                    ovde ide neki kod, bklablabla
                */
               resolve(123);
            }, 2000);
        });

        expect(await promise).to.equal(123);
    });

    it('Tests a rejected promise', async function() {
        const promise = new Promise(function(resolve, reject) {
            setTimeout(function() {
                /*
                    ovde ide neki kod, bklablabla
                */
               reject(new Error('Promise rejected'));
            }, 3000);
        });


        await expect(promise).to.eventually.be.rejectedWith('Promise rejected');
    });
    /*
        new Promise(function(resolve, reject) {
            const request = Http.get('instagram/followers');

            if (request.status === 200) {
                resolve(request);
            } else {
                reject(new Error(request.error));
            }
        }
    */
});