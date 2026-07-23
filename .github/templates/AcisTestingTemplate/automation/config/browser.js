// const {configBuild} = require("@testing/wdio-config");
// const {config} = require("./base.conf");
const {configBuild} = import("@testing/wdio-config");
const {config} = import("/home/RECONQUISTA/t061938/mep-automation-frontend-develop@95fee96b5f8/automation/config/base.conf.js");

const isHeadless = process.env.HEADLESS_MODE === 'true';
const chromedriverVersion = process.env.CHROMEDRIVER_VERSION || '130.0.6723.69';
const chromedriverPath = process.env.CHROMEDRIVER_PATH || './node_modules/chromedriver/bin/chromedriver';
const CHROME_VERSION='130.0.6723.69'
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4444;

const chrome = {
    browserName: 'chrome',
    'goog:chromeOptions': {
        args: [
            isHeadless ? '--headless' : '',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--window-size=1920,1080',
            '--ignore-certificate-errors'
        ].filter(Boolean)
    }
};

const firefox = {
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: [
            isHeadless ? '-headless' : '',
            '-disable-gpu',
            '-ignore-certificate-errors',
            '-allow-insecure-localhost',
            '-disable-web-security',
        ].filter(Boolean)
    },
    maxInstances: 1,
};

const allowedBrowsers = process.env.NAVIGATOR ? process.env.NAVIGATOR.split(',') : [];
const navigators = [];

if (allowedBrowsers.includes('chrome')) {
    navigators.push(chrome);
}
if (allowedBrowsers.includes('firefox')) {
    navigators.push(firefox);
}
const all = navigators;

exports.chrome = chrome;
exports.firefox = firefox;
exports.all = all;

exports.config = {
    capabilities: all,
    port: PORT,

    // services: [
    //     ['selenium-standalone', {
    //         drivers: {
    //             chrome: {
    //                 version: chromedriverVersion,
    //                 arch: process.arch,
    //                 baseURL: 'https://chromedriver.storage.googleapis.com'
    //             }
    //         },
    //         args:{
    //             seleniumArgs: ['--port', PORT.toString()]
    //         } 
    //     }],
    // ]
}

// exports.config = configBuild(config, {
//     capabilities: all,
//     port: PORT,

//     services: [
//         ['selenium-standalone', {
//             drivers: {
//                 chrome: {
//                     version: chromedriverVersion,
//                     arch: process.arch,
//                     baseURL: 'https://chromedriver.storage.googleapis.com'
//                 }
//             },
//             args:{
//                 seleniumArgs: ['--port', PORT.toString()]
//             } 
//         }],
//     ]
// });
