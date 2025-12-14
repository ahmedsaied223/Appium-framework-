const BasePage = require('./BasePage');

class LoginPage extends BasePage {
    constructor(driver) {
        super(driver);
        // Locators
        this.userFieldLocator = this.resolveLocator(
          'android=//android.widget.EditText[@content-desc="username"]',
          'ios=//XCUIElementTypeTextField[@name="username"]'
        );
    
        this.passwordFieldLocator = this.resolveLocator( 
            'android=//android.widget.EditText[@content-desc="password"]',
            'ios=//XCUIElementTypeSecureTextField[@name="password"]'
        );

        this.loginButtonLocator = this.resolveLocator(
            'android=//android.widget.Button[@content-desc="login-button"]',
            'ios=//XCUIElementTypeButton[@name="login-button"]'
        );

        this.errorMessageLocator = this.resolveLocator(
            'android=//android.widget.TextView[@content-desc="error-message"]',
            'ios=//XCUIElementTypeStaticText[@name="error-message"]'
        );

    }

    async login(username, password) {
        await this.setValue(this.userFieldLocator, username);
        await this.setValue(this.passwordFieldLocator, password);
        await this.clickElement(this.loginButtonLocator);
    }

    async isLoginButtonDisplayed() {
        return await this.isDisplayed(this.loginButtonLocator);
    }


    async getErrorMessage() {
        return await this.getText(this.errorMessageLocator);
    }

    resolveLocator(androidLocator, iosLocator) {
        return this.isAndroid() ? androidLocator.replace('android=', '') : iosLocator.replace('ios=', '');
    }
}




module.exports = LoginPage;



