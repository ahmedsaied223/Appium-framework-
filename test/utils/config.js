const path = require ('path');

class Config {
    constructor () {
        this.platform = process.env.PLATFORM || 'Android';
        this.deviceName = process.env.DEVICE_NAME || 'emulator-5554';
        this.isAndroid = this.platform.toLowerCase () === 'android';
        this.platformVersion = process.env.PLATFORM_VERSION || (this.isAndroid ? '11.0' : '14.5');
        this.isIos = this.platform.toLowerCase () === 'ios';
    
     // set environment variables from .env file if exists
        process.env.DOTENV_CONFIG_PATH = path.resolve (__dirname, '../../.env');
        require ('@dotenv').config ();
    }

    getspecs () {
        const platform = this.platform.toLowerCase ();
        if (platform === 'android') {
            return ['./test/specs/android/**/*.js'];
        }
        else if (platform === 'ios') {
            return ['./test/specs/ios/**/*.js'];
        }
        else {
            throw new Error (`Unsupported platform: ${platform}`);

        }

    }

    getAppPath () {
        const platform = this.platform.toLowerCase ();
        if (platform === 'android') {
            return path.resolve (__dirname, '../../apps/Android/MyApp.apk');
        }
        else if (platform === 'ios') {
            return path.resolve (__dirname, '../../apps/iOS/MyApp.app');
        }
        else {
            throw new Error (`Unsupported platform: ${platform}`);
        }


    }

    getDEVICE_NAME () {
        if (this,this.isAndroid) {
            return process.env.AANDROID_DEVICE_NAME || this.deviceName;
        }
        else if (this.isIos) {
            return process.env.IOS_DEVICE_NAME || this.deviceName;
        }
        else {
            throw new Error (`Unsupported platform: ${this.platform}`);
        }
    }

    getPlatformVersion() {
        if (this.isAndroid) {
            return process.env.AANDROID_PLATFORM_VERSION || this.platformVersion;
        }
        else if (this.isIos) {
            return process.env.IOS_PLATFORM_VERSION || this.platformVersion;
        }
        else {
            throw new Error (`Unsupported platform: ${this.platform}`);

        }

    }
}

module.exports = {
    config: new Config (),
};







