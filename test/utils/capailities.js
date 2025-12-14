const { config } = require ('./config');

const { getCapailities } = require ('./test/utils/capailities');

function getAndroidCapabilities () {
    return [
        {
            platformName: 'Android',
            'appium:deviceName': config.getDeviceName (),
            'appium:platformVersion': config.getPlatformVersion (),
            'appium:automationName': 'UiAutomator2',
            'appium:app': config.getAppPath (),
            'appium:autoGrantPermissions': true,
            'appium:newCommandTimeout': 240,
            'appium:noReset': true,
            'appium:fullReset': false,
            'appium:adbExecTimeout': 240000,
            'appium:systemPort': 8200,
            'appium:udid':  process.env.AANDROID_UDID || '',
            'appium:avd': process.env.AANDROID_AVD || '',
            'appium:avdargs': process.env.AANDROID_AVD_ARGS ? process.env.AANDROID_AVD_ARGS.split(' ') : [],
        },


    ];

}
function getIOSCapabilities () {
    return [
        {
            platformName: 'iOS',
            'appium:deviceName': config.getDeviceName (),
            'appium:platformVersion': config.getPlatformVersion (),
            'appium:automationName': 'XCUITest',
            'appium:app': config.getAppPath (),
            'appium:autoGrantPermissions': true,
            'appium:newCommandTimeout': 240,
            'appium:noReset': true,
            'appium:fullReset': false,
            'appium:wdaLaunchTimeout': 240000,
            'appium:udid': process.env.IOS_UDID || '',
            'appium:xcodeOrgId': process.env.IOS_XCODE_ORG_ID || '',
            'appium:xcodeSigningId': process.env.IOS_XCODE_SIGNING_ID || 'iPhone Developer',
            'appium:updatedWDABundleId': process.env.IOS_WDA_BUNDLE_ID || '',
            'appium:webkitDebugProxyPort': 27753,
        },
        ];

}

function getCapailities () {
    const platform = config.getPlatform ().toLowerCase ();
    if (platform === 'android') {
        return getAndroidCapabilities ();
    } else if (platform === 'ios') {
        return getIOSCapabilities ();
    } else {
        throw new Error (`Unsupported platform: ${platform}`);
    }
}

module.exports = { getCapailities,
    getAndroidCapabilities,
    getIOSCapabilities,
};









