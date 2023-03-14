const { expect } = require("@playwright/test");

class ExportsOverviewPage
{


    constructor(page)
    {
        this.page=page;
        const framePage=page.frameLocator("#frame");
        this.addExportsBtn=page.locator("pup-icon[path*='plus']");
        this.pageHeading=framePage.locator("pup-heading[class*='6']");
        this.searchExportsField=framePage.locator("input[placeholder*='Search']");
        this.exportSearchResults=framePage.locator("pup-table-row");
        this.exportSettingsIcon=page.locator("a[uib-tooltip='Setup']");
        this.destinationSettingsIcon=page.locator("button[data-target*='destination']");
        this.channelDestination=page.locator("#js-channelDestination");
        this.addDestinationBtn=page.locator("#js-addDestination");
        this.newDestinationBanner=page.locator("#js-newFiles");
        this.exportsOverviewBreadcrumb=page.locator("pup-link a[href*='export']");
        this.exportedProductsCounts=page.locator("td span[ng-if*='products']");
        this.feedDestinationItem=page.locator("#js-feedDestinationItems");
        this.feedDestinationURL=page.locator("#js-feedDestinationItems a[href]");
        this.deleteExportButton=page.locator("button[class*='remove']");
        this.confirmDelete=page.locator("button:has-text('Yes')");
    }


    async isOnExportsPage()
    {
        await expect(this.addExportsBtn).toBeVisible();
        return this;
    }


    async addExports()
    {
        await this.addExportsBtn.click();
        await this.page.waitForLoadState('networkidle');
        expect(await this.pageHeading.textContent()).toBe("Add exports");
        return this;
   
    }

    async searchForExportChannel(exportChannel)
    {
       // const framePage1=page.frameLocator("#frame");
        await this.searchExportsField.fill(exportChannel);
        await this.page.keyboard.press('Enter');
       // await this.framePage.press('Enter');
        return this;

    }

    async addExportFromSearchResults()
    {
        await expect(this.exportSearchResults).toBeVisible();
        await this.exportSearchResults.locator("span:has-text('Add')").click();
        await expect(this.exportSettingsIcon).toBeVisible();
        return this;

    }

    async openExportChannelSettings()
    {
        await this.exportSettingsIcon.click();
        await expect(this.destinationSettingsIcon).toBeVisible();
        return this;
    }

    async addDestination(destination)
    {
           await this.destinationSettingsIcon.click();
           await this.selectDestinationSettings(destination);
           await this.addDestinationBtn.click();
           return this;

    } 


    
    async selectDestinationSettings(destination)
    {
        const option= await this.channelDestination;
        await option.selectOption(destination);
        return this;
    }

    async navigateBackToExportsOverviewPage()
    {
         await this.exportsOverviewBreadcrumb.click();
        await expect(this.addExportsBtn).toBeVisible();
    }


    async checkIfProductsupServerDestiationIsAdded()
    {
        await expect(this.newDestinationBanner).toBeVisible();
        return this;
    }


    async deleteExportChannel()
    {
        await this.deleteExportButton.click();
        expect(await this.confirmDelete).toBeVisible();
        await this.confirmDelete.click();
    }

    async getExportedProductsCount()
    {
        expect(this.exportedProductsCounts.first()).toBeVisible();
        return await this.exportedProductsCounts.first().textContent();
    }

    async getFeedDestinationURL()
    {
        expect(await this.feedDestinationItem).toBeVisible();
        return await this.feedDestinationURL.textContent();
    }


    async isOnExporteSettingsPage()
    {
        return await this.addDestinationBtn.toBeVisible();
    }
}

module.exports = {ExportsOverviewPage};