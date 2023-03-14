const { expect } = require("@playwright/test");

class AppCommunication{



    constructor(page)
    {
        this.page=page;
        this.helpLink =page.locator("pup-icon[path*='question']");
        this.links=page.locator("div[class*='item-content'] pup-heading");
      
    }


 

    async openHelpLink()
    {
      
            await expect(this.helpLink).toBeVisible();
            await this.helpLink.click();
            return this;
    }

    async openHelpLink1(locator)
    {
      
            await expect(locator).toBeVisible();
            await locator.click();
            return this;
    }

    async navigateToHelpCenter()
    {
        await expect(this.links.first()).toBeVisible();
        const [helpCenterPage] = await Promise.all([
               
              this.page.waitForEvent("popup"),
             
              await this.links.first().click()
     
             
        ])
        await this.page.close();
      
        await helpCenterPage.waitForLoadState();        
        const text = await helpCenterPage.locator("header[class*='header'] h1").textContent();
        //await helpCenterPage.close();
        return text;
        //return await helpCenterPage.locator("header[class*='header'] h1").textContent();
      
  
     

  
    }

}

module.exports ={AppCommunication};