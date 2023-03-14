const { expect } = require("@playwright/test");
const assertions = JSON.parse(JSON.stringify(require("../../../Assertions/AssertionText.json")));
class ListsOverviewPage


{
    constructor(page)
    {
        this.page=page;
        
        const framePage = this.page.frameLocator("#frame");
        this.pageTitle=framePage.locator("pup-heading[class*='3'] span[class='caption']");
        this.helpLink =framePage.locator("pup-icon[path*='question']");
  
    }


    async isOnListsPage()
    {
        
        expect(await this.pageTitle.textContent()).toBe(assertions.Lists.pageTitle);
    
    }
}

module.exports ={ListsOverviewPage};