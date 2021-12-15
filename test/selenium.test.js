const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

describe('Selenium Tests', function() {
    let driver;

    before(async function() {
        let service = new chrome.ServiceBuilder('D:\\Kurs\\chromedriver\\chromedriver.exe').build()
        chrome.setDefaultService(service);

        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('Open google.com', async function() {
        await driver.get('https://www.google.com/');

        const pageTitle = await driver.getTitle();

        expect(pageTitle).to.contain('Google');
    });
});
