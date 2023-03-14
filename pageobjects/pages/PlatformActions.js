const {test,expect} = require('@playwright/test');
class PlatformActions{


    constructor(page)
    {
        this.page=page;
        this.importButton=page.locator("button:has-text('Import')");
        this.exportButton=page.locator("button:has-text('Export')");
        this.runButton=page.locator("button:has-text('Run')");
        this.siteRefresh=page.locator("pup-icon[path*='refresh']");
    }


    async triggerAction(moduleName)
    {
        await moduleName.click();
        await this.page.waitForLoadState('networkidle')
        await expect(this.siteRefresh).toHaveCount(0);
    }


    async triggerImport()
    {
        await this.triggerAction(this.importButton);
    }

    async triggerExport()
    {
       await  this.triggerAction(this.exportButton);

    }

    async triggerRun()
    {
        await this.triggerAction(this.runButton);
    }
}

module.exports = {PlatformActions};