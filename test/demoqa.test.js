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
            By.xpath('//h5[contains(., "Elements")]/parent::div[contains(@class, "card")]')
        );
        await elementsPage.click();

        expect(await driver.findElement(By.className('main-header')).getText()).to.eq('Elements');
        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/elements');
    });

    it('Opens TextBox page, fills the form, and submits', async function() {
        const textBoxPage = await driver.findElement(By.id('item-0'));
        await textBoxPage.click();
 
        expect(await driver.findElement(By.className('main-header')).getText()).to.eq('Text Box');

        const fillUserName = 'John Doe';
        const fillUserEmail = 'john.doe@example.org';
        const fillCurrentAddress = 'Unknown rd. 167 apt 26';
        const fillPermanentAddress = 'Unknown rd. 167 apt 26';

        const fullName = await driver.findElement(By.id('userName'));
        fullName.sendKeys(fillUserName);
  
        const email = await driver.findElement(By.id('userEmail'));
        email.sendKeys(fillUserEmail);
  
        const currentAddress = await driver.findElement(By.id('currentAddress'));
        currentAddress.sendKeys(fillCurrentAddress);
  
        const permanentAddress = await driver.findElement(By.id('permanentAddress'));
        permanentAddress.sendKeys(fillPermanentAddress);

        const buttonSubmit = await driver.findElement(By.id('submit'));
        await buttonSubmit.click();
  
        const output = await driver.findElement(By.id('output'));
        expect(await output.isDisplayed()).to.eq(true);

        const outUserName = await output.findElement(By.id('name'));
        const outUserEmail = await output.findElement(By.id('email'));
        const outCurrentAddress = await output.findElement(By.id('currentAddress'));
        const outPermanentAddress = await output.findElement(By.id('permanentAddress'));

        expect(await outUserName.getText()).to.contain(fillUserName);
        expect(await outUserEmail.getText()).to.contain(fillUserEmail);
        expect(await outCurrentAddress.getText()).to.contain(fillCurrentAddress);
        expect(await outPermanentAddress.getText()).to.contain(fillPermanentAddress);
    });
});