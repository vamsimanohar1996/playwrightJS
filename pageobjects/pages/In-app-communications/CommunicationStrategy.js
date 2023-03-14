import { expect } from "@playwright/test";
class CommunicationStrategy{



    //Module Navigation
    //



   async performAction(locator)
    {
        await expect(locator).toBeVisible();
        await locator.click();
      
    }



}

module.exports= {CommunicationStrategy};