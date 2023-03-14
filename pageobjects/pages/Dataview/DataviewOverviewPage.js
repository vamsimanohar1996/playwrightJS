const { expect } = require("@playwright/test");
const assertions = JSON.parse(JSON.stringify(require("../../../Assertions/AssertionText.json")));
class DataviewOverviewPage{
    constructor(page)
    {
        this.page=page;
       // const dataviewPageFrame= this.page.frameLocator("iframe[class*='view']");
        this.pageTitle=page.locator("pup-heading[class*='3'] span[class='caption']");
  
    }


    async isOnDataviewPage()
    {
        
        expect(await this.pageTitle.textContent()).toBe(assertions.Dataview.pageTitle);
    
    }
}

module.exports ={DataviewOverviewPage};
