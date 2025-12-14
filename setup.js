const { execSync } = require('child_process');
const fs = require('fs');

// create a directory structure
const directories = [
    './test/specs/android',
    './test/specs/ios',
    './test/specs/common',
    './test/pages',
    './test/utils',
    '/test/data',
    '.apps',
    './logs',
    './screenshots',
    './test-reports/screenshots'
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
}
);

//create a sample apps directory placeholder
const reademeContent = `This directory is intended to hold your mobile application files (APKs for Android and .app or .ipa files for iOS) for testing purposes. Please place your app files here before running the tests.`;

/// palce your APK andorid and iOS .app files here:
/// - andorid-app.apk
/// - ios-app.app

// or updated the path in .env file

if (!fs.existsSync('./apps/README.txt')){
    fs.writeFileSync('./apps/README.txt', reademeContent);
    console.log('Created README.txt in apps directory');
}


// check the node.js version 
const nodeVersion = process.version;
console.log(`Current Node.js version: ${nodeVersion}`);

if (parseInt(nodeVersion.split('.')[0].replace('v', '')) < 16) {
    console.error('Node.js version 14 or higher is required. Please update your Node.js version.');
    process.exit(1);
}


// Install dependencies
console.log('Installing dependencies...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('Dependencies installed successfully.');
}
catch (error) {
    console.error('Error installing dependencies:', error);
    process.exit(1);

}

//check appium installation
console.log('Checking Appium installation...');
try {
    execSync('appium -v', { stdio: 'inherit' });
    console.log('Appium is installed.');
}
catch (error) {
    console.error('Appium is not installed. Please install Appium globally using "npm install -g appium"');
    process.exit(1);
}


// create emulator/simulator setup instructions
console.log('\n Emulator/Simulator Setup Instructions:');
console.log('1. Android Emulator:');
console.log('   - Ensure you have Android Studio installed.');
console.log('   - Open Android Studio and go to AVD Manager to create and start an Android Virtual Device (AVD).');
console.log('   - Make sure the AVD matches the device name and platform version specified in your .env file or configuration.');
console.log('2. iOS Simulator:');
console.log('   - Ensure you have Xcode installed on your Mac.');
console.log('   - Open Xcode and go to Preferences > Components to download the desired iOS simulator versions.');
console.log('   - Use the "Simulator" app to launch the iOS simulator that matches the device name and platform version specified in your .env file or configuration.\n');

console.log('Setup completed successfully. You can now run your tests using "npx wdio wdio.conf.js".');
console.log('\nRun tests:')
console.log(' npm run test:android  # to run android tests');
console.log(' npm run test:ios      # to run ios tests\n');
console.log(' npm run test:all      # to run tests on both platforms\n');
console.log('To generate Allure report after test execution, run:');
console.log(' npm run allure:generate ');
console.log(' npm run allure:open ');





