const { config } = require ('./test/utils/config');
const { getCapailities } = require ('./test/utils/capabilities');

exports.config = {
    runner: 'local',
    path: '/wd/hub',

    //framework coniguration
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        retries: 60000
    },


    //Reporters
    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]],

        // Hooks
        beforeSeession: function (config, capabilities, specs) {
            require ('@dotenv').config ();
        },

        beforetest: function (test, context) {
            console.log (`\nStarting test: ${test.title}\n`);
        },

        aftertest: function (test, context, { error, result, duration, passed, retries }) {
            if (error) {
                console.log (`\nTest failed: ${test.title}\n`);
            }
        },

        // parallel execution
        maxInstances: 5,

    // Capabilities
    capabilities: getCapailities (),

    // Services
    services: [
        ['appium', {
            args: {
                relaxedSecurity: true,
                allowInsecure: ['adb_shell'],
            },
            command: 'appium',
            logs: './appium-logs',
        }],
    ],


    // Specs pattern 
    specs: config.getspecs (),

    //Global timeout
    waitforTimeout: 20000,

    connectionRetryTimeout: 90000,

    connectionRetryCount: 3,
};





