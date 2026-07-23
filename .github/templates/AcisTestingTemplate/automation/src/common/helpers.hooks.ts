
import { After, Before, Status } from "@cucumber/cucumber";
import allure from '@wdio/allure-reporter';

// After: se ejecuta después de cada escenario
After(async function (scenario) {
    if (scenario.result?.status === Status.PASSED) {
      const screenshot = await browser.takeScreenshot();
      allure.addAttachment('Screenshot on Scenario Failure', Buffer.from(screenshot, 'base64'), 'image/png');
    
   }
    });