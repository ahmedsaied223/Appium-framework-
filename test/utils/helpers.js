class Helpers {
    static async launchApp(driver) {
        await driver.launchApp();
        await driver.pause(1000); // Wait for app to launch
    }

    static async resetApp(driver) {
        await driver.reset();
        await driver.pause(1000); // Wait for app to reset


    }

    static async closeApp(driver) {
        await driver.closeApp();
        await driver.pause(1000); // Wait for app to close
    }


    static async takeScreenshot(driver, testname) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotPath = `./screenshots/${testname}_${timestamp}.png`;
        await driver.saveScreenshot(screenshotPath);
        console.log(`Screenshot saved to ${screenshotPath}`)
        return screenshotPath;
    }

    static async waitForNetWorkIdle(driver, timeout = 5000) {
        await driver.pause(timeout);
    }

    static async hideKeyboard(driver) {
        try {
            if (process.env.PLATFORM.toLowerCase() === 'android') {
                await driver.hideKeyboard('pressKey', 'Done');
            } else if (process.env.PLATFORM.toLowerCase() === 'ios') {
                await driver.hideKeyboard('pressKey', 'Return');
            }
        }
            
        catch (error) {
            console.warn('Keyboard not visible, skipping hideKeyboard step.');
        }

    }
}

module.exports = Helpers;






