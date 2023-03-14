const { expect } = require("@playwright/test");
class DatasourcesPage{



    constructor(page)
    {
        this.page=page;
        this.addDatasourceBtn=page.locator("pup-icon[path*='plus']");
        this.searchDatasourceBox=page.locator("input[ng-model*='search']");
        this.searchIcon=page.locator("i[class*='search']");
        this.availableDatasources=page.locator("div[class='import-box ng-scope']");
        this.continueBtn=page.locator("a[class*='primary']");
        this.streamDropdown=page.locator("#import_stream");
        this.saveDatasourceBtn=page.locator("#js-addImport");
        this.datasourceSettingsIcon=page.locator("div[class*='pull'] a");
        this.radioButtons=page.locator("input[type='radio'][name='content']");
        this.importButton=page.locator("button:has-text('Import')");
        this.importRunning=page.locator("pup-icon[path*='refresh']");

        this.pageTitle=page.locator("pup-heading[class*='3'] span[class='caption']");

        this.settingsIcon= page.locator("a[href*='import-edit']");
        this.deleteImport= page.locator("a[href*='delete-import']");
        this.deleteImportButton= page.locator("button[class*='delete-import']");
      
        this.advancedSettingsTab=page.locator("span:has-text('Advanced Settings')");
        this.confirmDelete=page.locator("button:has-text('Yes')");
     



    }


    async isOnDatasourcePage()
    {
        await expect(await this.addDatasourceBtn).toBeVisible();
        expect(await this.pageTitle.textContent()).toBe('Data Sources');
    }


    async addDatasource()
    {
        await this.addDatasourceBtn.click();
        //await this.page.waitForLoadState('networkidle');
        return this;
    }

    async searchDatasource(name)
    {
        await this.searchDatasourceBox.type(name);
        return this;
    }

    async selectDatasourceAndAdd(datasource)
    {
        
        expect(this.availableDatasources.first()).toBeVisible();
        const count =await this.availableDatasources.count();
        for(let i=0;i<count;i++)
        {
            const datasources = await this.availableDatasources.nth(i).locator("strong").textContent();
            if(datasources.includes(datasource))
         {
            await this.availableDatasources.nth(i).locator("button[class*='success']").click();
            break;
         }
       } 

       await this.continueBtn.click();
       await this.page.waitForLoadState('networkidle');
       return this;
      
    }

    async selectStreamID(id)
    {
         const option= await this.streamDropdown;
        await option.selectOption(id);
        return this;
    }


    async saveDatasource()
    {
        await this.saveDatasourceBtn.click();
        await this.page.waitForLoadState('networkidle');
        //await this.page.pause();
        return this;
    }



    async configureAdditionalDatasource()
    {
        await this.datasourceSettingsIcon.last().click();
        await this.page.waitForLoadState('networkidle');
        await this.radioButtons.last().click();
        await expect(this.radioButtons.last()).toBeChecked();
        await this.page.pause();
    }


    async triggerPlatformAction()
    {
        await this.importButton.click();
       // await expect(this.importRunning).toBeVisible();
       await this.page.waitForLoadState('networkidle')
       await expect(this.importRunning).toHaveCount(0);
       
    }


    async openDataSourceSettings()
    {
       await this.settingsIcon.click();
       await expect(this.advancedSettingsTab).toBeVisible();
       return this;
    }

    async navigateToAdavancedSettingsTab()
    {
        await this.advancedSettingsTab.click();
        await expect(this.deleteImport).toBeVisible();
        return this;

    }

    async deleteDatasource()
    {
         await this.deleteImport.click();
         await expect(this.deleteImportButton).toBeVisible();
         await this.deleteImportButton.click();
         await expect(this.confirmDelete).toBeVisible();
         await this.confirmDelete.click();
      


    }
}




module.exports = {DatasourcesPage}