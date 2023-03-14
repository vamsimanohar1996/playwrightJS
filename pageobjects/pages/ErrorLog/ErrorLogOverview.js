
const { expect } = require("@playwright/test");
const assertions = JSON.parse(JSON.stringify(require("../../../Assertions/AssertionText.json")));

class ErrorLogOverview{


    constructor(page)
    {
    
        this.page=page;
        this.pageTitle=page.locator("pup-heading[class*='3'] span");
        this.sideNavigationIcon=page.locator("svg[class*='arrow']");
        this.errorLogMenu=page.locator("ul[class*='menu'] a[href*='error']");

    }


    async isOnErrorLogPage()
    {
   
        expect(await this.pageTitle.textContent()).toBe(assertions.Errors.pageTitle);
    }
}

module.exports = {ErrorLogOverview};