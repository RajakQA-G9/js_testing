'use strict';

const { Builder, By, until, Key } = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;
const chrome = require('selenium-webdriver/chrome');

describe('QA Shop Tests', function() {
    let driver;

    before(async function() {
        let service = new chrome.ServiceBuilder('E:\\QA kurs\\js_testing\\chromedriver\\chromedriver.exe').build()
        chrome.setDefaultService(service);

        chrome.setDefaultService(service);

        driver = await new Builder().forBrowser('chrome').build();
    });

    after(function() {
        return driver.quit();
    });

    it('Opens shop.qa.rs homepage', async function() {
        await driver.get('http://shop.qa.rs/');

        expect(await driver.findElement(By.css('h1')).getText()).to.contain('(QA) Shop');
    });

    it('Goes to registration page', async function() {
        const register = await driver.findElement(By.linkText('Register'));
        await register.click();

        expect(await driver.findElement(By.name('register')).getAttribute('value')).to.contain('Register');
    });

    it('Successfully performs registration', async function() {
        const ime = await driver.findElement(By.name('ime'));
        ime.sendKeys('Bob');

        const prezime = await driver.findElement(By.name('prezime'));
        prezime.sendKeys('Buttons');

        const email = await driver.findElement(By.name('email'));
        email.sendKeys('bob.buttons@example.local');

        const korisnicko = await driver.findElement(By.name('korisnicko'));
        korisnicko.sendKeys('bob.buttons');

        const lozinka = await driver.findElement(By.name('lozinka'));
        lozinka.sendKeys('nekaLozinka123');

        const lozinkaOpet = await driver.findElement(By.name('lozinkaOpet'));
        lozinkaOpet.sendKeys('nekaLozinka123');

        const registracija = await driver.findElement(By.name('register'));
        await registracija.click();

        expect(await driver.findElement(By.className('alert alert-success')).getText()).to.contain('Uspeh!');
    });

    it('Goes to login page', async function() {
        const login = await driver.findElement(By.linkText('Login'))
        await login.click();

        expect(await driver.findElement(By.css('h2')).getText()).to.contain('Prijava');
    });

    it('Successfully performs login', async function() {
        const username = await driver.findElement(By.name('username'));
        username.sendKeys('aaa');

        const password = await driver.findElement(By.name('password'));
        password.sendKeys('aaa');

        const login = await driver.findElement(By.name('login'));
        await login.click();

        expect(await driver.findElement(By.css('h2')).getText()).to.contain('Welcome back');
    });

    it('Adds item to cart - Starter, 2 items', async function() {
        const packageName = await driver.findElement(By.xpath('//h3[contains(text(), "starter")]/ancestor::div[contains(@class, "panel")]'));
        const quantity = await packageName.findElement(By.name('quantity'));
        const options = await quantity.findElements(By.css('option'));

        await Promise.all(options.map(async function(option) {
            const text = await option.getText();
            if (text === '2') {
                await option.click();

                const selectedValue = await quantity.getAttribute('value');
                expect(selectedValue).to.contain('2');

                const orderButton = await packageName.findElement(By.className('btn btn-primary'));
                await orderButton.click();

                const url = await driver.getCurrentUrl();
                expect(url).to.contain('http://shop.qa.rs/order');                
            }
        }));
    });

    it('Opens shopping cart', async function() {
        const showCart = await driver.findElement(By.partialLinkText('View shopping'));
        await showCart.click();

        expect(await driver.findElement(By.css('h1')).getText()).to.contain('Order');
    });

    it('Verifies items are in cart - Starter, 2 items', async function() {
        const orderTable = await driver.findElement(By.css('table'));
        const orderRow = await orderTable.findElement(
            By.xpath('//table//td[contains(., "STARTER")]/parent::tr')
        );
        const orderQty = await orderRow.findElement(By.xpath('//td[2]'))

        expect(await orderQty.getText()).to.eq('2');
    });

    it('Verifies total item price is correct', async function() {
        const orderTable = await driver.findElement(By.css('table'));
        const orderRow = await orderTable.findElement(
            By.xpath('//table//td[contains(., "STARTER")]/parent::tr')
        );
        const orderQty = await orderRow.findElement(By.xpath('//td[2]'))
        const orderPrice = await orderRow.findElement(By.xpath('//td[3]'));
        const orderTotal = await orderRow.findElement(By.xpath('//td[4]'));

        const price = Number((await orderPrice.getText()).substring(1));
        const total = Number((await orderTotal.getText()).substring(1));
        const qntty = Number(await orderQty.getText());

        const calculatedTotal = qntty * price;

        expect(calculatedTotal).to.be.eq(total);
    });

    it('Performs checkout', async function() {
        const checkoutBtn = await driver.findElement(By.name('checkout'));
        await checkoutBtn.click();

        expect(await driver.findElement(By.css('h2')).getText()).to.contain('(Order #');
    });

    it('Verifies checkout success', async function() {
        const orderSuccess = await driver.findElement(By.css('h2')).getText();
        
        const orderNum = orderSuccess.replace(/\D/g, '');
        /*
            // regex (gore) ili bez regex (dole)

            const orderSuccess2 = orderSuccess.substring(orderSuccess.indexOf('#') + 1);
            const orderNum2 = orderSuccess2.substring(0, orderSuccess2.indexOf(')'));
        */

        const orderHistory = await driver.findElement(By.linkText('Order history'));
        await orderHistory.click();
 
        expect(await driver.findElement(By.css('h1')).getText()).to.contain('Order History');
 
        const historyTable = await driver.findElement(By.css('table'));
        const historyRow = await historyTable.findElement(By.xpath(`//td[contains(., "#${orderNum}")]/parent::tr`));
        const historyStatus = await historyRow.findElement(By.className('status'));

        expect(await historyStatus.getText()).to.be.eq('Ordered');
    });

    it('Performs logout', async function() {
        const logout = await driver.findElement(By.partialLinkText('Logout'));
        await logout.click();

        expect(await driver.findElement(By.linkText('Login')).isDisplayed()).to.be.true;
    });
});