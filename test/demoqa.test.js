'use strict';

const { Builder, By, until, Key } = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;
const chrome = require('selenium-webdriver/chrome');

describe('DemoQA test', function() {
    let driver;

    before(async function() {
        let service = new chrome.ServiceBuilder('D:\\Kurs\\chromedriver\\chromedriver.exe').build()
        chrome.setDefaultService(service);

        driver = await new Builder().forBrowser('chrome').build();
    });

    after(function() {
        return driver.quit();
    });

    it('Opens demoqa.com homepage', async function() {
        await driver.get('https://demoqa.com/');

        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/');
    });

    it('Opens Elements page', async function() {
        const elementsPage = await driver.findElement(
            By.xpath('//h5[contains(., "Elements")]')
        );
        await elementsPage.click();

        expect(await driver.findElement(By.className('main-header')).getText()).to.eq('Elements');
        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/elements');
    });
});