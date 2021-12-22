const { Builder, By, Key, until } = require('selenium-webdriver');
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
<<<<<<< HEAD
});

describe('Maths test', function() {
    it('Test if 1 - 1 = 0', function() {
        assert.equal(MyMath.sub(1, 1), 0);
    });
});
=======

    it('Perform a search on Google', async function() {
        await driver.get('https://www.google.com/');

        expect(await driver.getTitle()).to.contain('Google');

        const searchInput = await driver.findElement(By.name('q'));
        searchInput.click();
        searchInput.sendKeys('nodejs mocha selenium', Key.ENTER);

        await driver.wait(until.elementLocated(By.id('search')));

        expect(await driver.getTitle()).to.contain('nodejs mocha selenium');

        const navigation = await driver.findElement(By.xpath('(//div[@role="navigation"])[2]'));

        const nextPage = await navigation.findElement(By.css('a'));
        nextPage.click();

        await driver.wait(until.elementLocated(By.id('search')));
        
        await driver.sleep(5000);
    });
});
>>>>>>> a0b8ca57daf1fff40aac129eeb4f8ee9412d0c10
