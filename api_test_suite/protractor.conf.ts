import {Config, browser, ProtractorBrowser } from 'protractor';
import protractor = require('protractor');

var HtmlReporter = require('protractor-beautiful-reporter');

export const config:Config = {
    directConnect: 'true',
    capabilities: {
        'browserName': 'chrome',
        chromeOptions: {
            args: ["--headless", "--gpu"]        
        },
    },
    framework: 'jasmine',
    specs: [
        './course_pages_api/dsc/spec/*.spec.js'
    ],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 120000
    },

    onPrepare: async() => {
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'Reports/screenshots',
            screenshotsSubfolder: 'images'
        }).getJasmine2Reporter());
        let globals = require('protractor');
        let browser: ProtractorBrowser  = globals.browser;
        await browser.waitForAngularEnabled(false);
        await browser.driver.manage().window().maximize();
        await browser.driver.manage().window().setPosition(0,0);
        await browser.driver.manage().timeouts().implicitlyWait(5000);
    },
    
    onComplete: () => {
        browser.close();
    }
};