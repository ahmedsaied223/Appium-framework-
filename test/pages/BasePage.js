class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async navigateTo(url) {
        await this.driver.get(url);
    }

    async waitforElement(loactor, timeout = 5000) {
        const element = await this.driver.$(loactor);
        await element.waitForDisplayed({ timeout });
        return element;

    }

    async clickElement(loactor, timeout = 5000) {
        const element = await this.waitforElement(loactor, timeout);
        await element.click();
    }

    async setValue(loactor, value, timeout = 5000) {
        const element = await this.waitforElement(loactor, timeout);
        await element.setValue(value);
    }

    async getText(loactor, timeout = 5000) {
        const element = await this.waitforElement(loactor, timeout);
        return await element.getText();

    }

    async isDisplayed(loactor, timeout = 5000) {
        const element = await this.waitforElement(loactor, timeout);
        return await element.isDisplayed();
    }

    async scrollToElement(loactor, timeout = 5000) {

        const element = await this.waitforElement(loactor, timeout);
        await element.scrollIntoView();
    }

    async takeScreenshot(name) {
        const screenshot = await this.driver.takeScreenshot();
        const fs = require('fs');
        fs.writeFileSync(name, screenshot, 'base64');
    }

    // platform specific locators
    get platform() {
        return this.platform.env.PLATFORM || 'android';
    }

    isAndroid() {
        return this.platform.toLowerCase() === 'android';
    }

    isIOS() {
        return this.platform.toLowerCase() === 'ios';
    }


    // common locators resolver
    getLocator(androidLocator, iosLocator) {
        return this.isAndroid() ? androidLocator : iosLocator;
    }

}

module.exports = BasePage;


