const { expect } = require("@playwright/test");

class DashboardPage{

    constructor(page)
    {
        this.page=page;
        const framePage=page.frameLocator("#frame");
        this.importButton=framePage.locator("button:has-text('Import')");
        this.pageTitle=framePage.locator("pup-heading[class*='3'] span[class='caption']");
        this.linkToOldDashboard= framePage.locator("pup-paragraph span[class*='link']");
        this.oldDashboard=framePage.locator("span:has-text('switch to the old dashboard.')");
        this.newDashboard=page.locator("#switch-dashboard-version");
        this.importedItemsNew= framePage.locator("app-import-tile pup-heading[class*='2']");
        this.importedItemsOld=page.locator("#chart-products span[class*='desc']");

    }

    async  isOnDashboardPage()
    {
        // await expect(await this.importButton).toBeVisible();
        expect(await this.pageTitle.textContent()).toBe('Dashboard');
    }

    async switchDashboards(moduleName)
    {
        await expect(moduleName).toBeVisible();
        await moduleName.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getImportedItemsCountFromOldDashboard()
    {
        await this.switchDashboards(this.oldDashboard);
        const count= await this.importedItemsOld.textContent();
        await this.switchDashboards(this.newDashboard);
        await this.page.waitForTimeout(3000)
        return count;
    }
    
}

module.exports = {DashboardPage};