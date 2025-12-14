const BasePage = require('./BasePage');

class HomePage extends BasePage {
    constructor(driver) {
        super(driver);
        
        this.welcomeMessage = this.resolveLocator(
            '//android.widget.TextView[@text="Welcome to the Login Page"]',
            '//XCUIElementTypeStaticText[@name="Welcome to the Login Page"]'
        );
        
        this.logingButton = this.resolveLocator(
            '//android.widget.Button[@content-desc="loginButton"]',
            '//XCUIElementTypeButton[@name="loginButton"]'

        );
    }

    async isWelcomeMessageDisplayed() {
        const element = await this.driver.$(this.welcomeMessage);
        return element.isDisplayed();
    }

    async clickLoginButton() {
        const button = await this.driver.$(this.logingButton);
        await button.click();
    }


    async waitForPageToLoad() {    
        await this.waitForElementToBeVisible(this.welcomeMessage);


    }
    
    async logout() {
        // Implementation for logout if applicable





    }


}
module.exports = HomePage;







