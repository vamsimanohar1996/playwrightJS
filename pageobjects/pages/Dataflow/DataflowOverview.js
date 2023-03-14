const { expect } = require("@playwright/test");
const assertions = JSON.parse(JSON.stringify(require("../../../Assertions/AssertionText.json")));

class DataflowOverview {


    constructor(page)
    {
        this.page=page;
        const dataflowFrame= this.page.frameLocator("#dataflowFrame");
        this.pageHeading=this.page.locator("pup-heading[class*='3'] span[class='caption']");
        this.intermediateAttributes=dataflowFrame.locator("div[mode='output']");
        this.dropOnExport=dataflowFrame.locator("ul[class*='export']>li");
        this.toasterMessage=page.locator("div[class*='ajs-visible']");
    }


    async isOnDataflowPage()
    {
        
        expect(await this.pageHeading.textContent()).toBe(assertions.Dataflow.pageTitle);
    
    }


    async drawConnectionFromIntermediateToExport()
    {
         const count= await this.intermediateAttributes.count();
         console.log(count);
         for(let i=0;i<count;i++)
         {
           await this.intermediateAttributes.nth(i).dragTo(this.dropOnExport);
           await expect(this.toasterMessage.nth(i)).toContainText("added");
    
         }
    }
    
    async navigateToHelpCenter()
    {
          const app = new AppCommunication(this.page);
          await app.openHelpLink();
          return await app.navigateToHelpCenter();
    }


}

module.exports ={DataflowOverview};