const LoginPage = require('../../pages/LoginPage');
const HomePage = require('../../pages/HomePage');
const { expect } = require('chai');


decribe ('Login Page Tests', () => {
    let loginPage;
    let homePage;

    before(async () => {
        loginPage = new LoginPage(driver);
        homePage = new HomePage(driver);
    }
    );



    beforeEach(async () => {
        await driver.reset();
        await driver.pause(2000); 
        await loginPage.waitForPageToLoad();

    }
    );

    it('should login with valid credentials'), async () => {
        await loginPage.enterUsername('validUser');
        await loginPage.enterPassword('validPassword');
        await loginPage.tapLoginButton();
        await homePage.waitForPageToLoad();
        const isWelcomeMessageDisplayed = await homePage.isWelcomeMessageDisplayed();
        expect(isWelcomeMessageDisplayed).to.be.true;
    }
    it('should not login with invalid credentials', async () => {
        await loginPage.enterUsername('invalidUser');
        await loginPage.enterPassword('invalidPassword');
        await loginPage.tapLoginButton();
        const isErrorMessageDisplayed = await loginPage.isErrorMessageDisplayed();
        expect(isErrorMessageDisplayed).to.be.true;
    }
    );

    afterEach(async () => {
        // Any necessary cleanup after each test
    }
    );

    after(async () => {
        // Any necessary cleanup after all tests
    }
    );
}
);






