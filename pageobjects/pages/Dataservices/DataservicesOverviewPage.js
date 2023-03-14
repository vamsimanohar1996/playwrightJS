const { expect } = require("@playwright/test");
const assertions = JSON.parse(JSON.stringify(require("../../../Assertions/AssertionText.json")));
class DataservicesOverviewPage{

    constructor(page)
    {
        this.page=page;
        this.pageTitle=page.locator("pup-heading[class*='3'] span[class='caption']");
  
    }


    async isOnDataServicesPage()
    {
        
        expect(await this.pageTitle.textContent()).toBe(assertions.Dataservices.pageTitle);
    
    }
}

module.exports ={DataservicesOverviewPage};

