const {expect} = require('@playwright/test');
class SiteListingsPage{



    constructor(page)
    {
        this.page=page;
        this.addSiteBtn=page.locator("span:has-text('Add Site')");
        this.siteNameTextBox=page.locator("#domain");
        this.saveSiteBtn=page.locator("#js-save-site");
        this.siteUrls = page.locator('tr td a');
        this.searchSiteTextBox=page.locator("disv[class*='area'] input[name='search']");
        this.searchIcon=page.locator("i[class*='search']");
        this.searchResults=page.locator("#js-projectList td[class='emphasis'] a[class*='site'] span");

    }


    async addNewSite(siteName)
    {
        await this.page.waitForLoadState('networkidle');
        await this.addSiteBtn.click();
        await this.siteNameTextBox.type(siteName);
        await this.saveSiteBtn.click();
        await this.page.waitForLoadState('networkidle');


    }

    async searchSite(siteName)
    {
       await this.searchSiteTextBox.fill(siteName);
       await this.searchIcon.click();
       await this.page.waitForLoadState('networkidle');
       return this;

    }



    async selectSite(siteName)
    {
        
       expect(this.searchResults.first()).toBeVisible();
       const count =await this.searchResults.count();
       console.log(count);
       for(let i=0;i<count;i++)
       {
        const site = await this.searchResults.nth(i).textContent();
        console.log(site);
        console.log(i);
        if(site.includes(siteName))
         {
            console.log("Site Name  Matched");
            await this.searchResults.nth(i).click();
            await this.page.waitForLoadState('networkidle');
            break;
         }

        else if(i==count-1)
        {
         
            throw new Error("Please check the site name provided! Seems like provided site is not available on the platform");
        }
       } 

        return this;
        
      
    }

    async getSitePageTitle(name)
    {
        return await this.pageTitle.textContent();
    }

    async clickOnSiteByName(siteName) {
        const xpath = "//span[normalize-space()='" + siteName + "']";
        //console.log('site name : ' + await this.page.locator(xpath).innerText());
        await this.page.locator(xpath).click();
    }

    async clickOnSite() {
        //await this.page.waitForLoadState('networkidle');
        await this.siteUrls.nth(1).click();
        await this.page.waitForTimeout(5000);
        //await this.page.waitForLoadState('networkidle');
    }
}

export default { SiteListingsPage };