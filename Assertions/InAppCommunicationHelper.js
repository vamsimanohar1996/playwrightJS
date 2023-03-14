const {test,expect} = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const assertion = JSON.parse(JSON.stringify(require("./AssertionText.json")));

class InAppCommunicationHelper{

    constructor(page)
    {
        this.page=page;
    }


    async assertHelpCenterPage()
    {

        console.log(assertion.Communication.helpCenter);
        const poManager = new POManager(this.page);
        const text = await (await poManager.getAppCommunicationsPage().openHelpLink()).navigateToHelpCenter();
        expect(text).toBe(assertion.Communication.helpCenter);
    }
}

module.exports = {InAppCommunicationHelper};