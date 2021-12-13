const webdriver = require('selenium-webdriver');
const assert = require('assert');

describe('Selenium Tests', function() {
    let driver;

    before(function() {
        driver = new webdriver.Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('Open google.com', async function() {
        await driver.get('https://www.google.com/');

        const pageTitle = await driver.getTitle();

        assert.equal(pageTitle, 'Google');
    });
});
