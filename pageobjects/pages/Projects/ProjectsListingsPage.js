const {expect} = require('@playwright/test');
class ProjectsListingsPage
{
    constructor(page)
    {
        this.page=page;
        
        this.accountBreadcrumb=page.locator("pup-link span");
        this.projectSearchField= page.locator("div[class*='search'] input[name='search']");
        this.projectsList=page.locator("table td a[class*='project']");
        this.projectSearchBtn=page.locator("i[class*='search']");
        this.visibleProject=page.locator("tr[class='cursor-pointer project-container ng-scope'] a");
        this.hiddenProjects=page.locator("tr[class*='ng-hide'] a");
        this.clearFiltersBtn=page.locator("span[ng-click*='reset']");
        this.hiddenProjectsNew=page.locator("tr[class*='ng-hide']");


        this.addProjectButton=page.locator("pup-icon[path*='plus']");
        this.projectNameTextBox=page.locator("#name");
        this.saveProjectBtn=page.locator("#js-save-project");
        this.projectResultsLink=page.locator("a[ng-href*='projects']");
        this.projectResults=page.locator("a[ng-href*='projects'] span");

        this.pageTitle=page.locator("pup-heading[class*='3'] span[class='caption']");

    }


    async validateUserOnProjectListingsPage(username)
    {
        await expect(this.accountBreadcrumb).toContainText(username);
        return this;
       
    }


    async searchProjectAndSitesByName(name)
    {
         await this.projectSearchField.type(name);   
         await this.projectSearchBtn.click();
         await this.page.waitForLoadState('networkidle');
         //await this.validateProjectSearch();
       
      
    
    }

     async validateProjectSearch()
    {
        await expect(this.visibleProject).toContainText("Services Demo");
        await expect(this.hiddenProjects).not.toHaveCount(0);
       
    }

    async validateClearFilters()
    {
        
       // await expect(this.hiddenProjectsNew).toHaveCount(1);
       
    }


    async clearFilters()
    {
        await this.clearFiltersBtn.click();
        await this.page.waitForLoadState('networkidle');
        await this.validateClearFilters();

      
     
    }

    async addNewProject(projectName)
    {
      await this.page.waitForLoadState('networkidle');
      await this.addProjectButton.click();
      await this.projectNameTextBox.type(projectName);
      await this.saveProjectBtn.click();

    }


    async selectProject(projectName)
    {
        
       expect(await this.projectResults.first()).toBeVisible();
       const count =await this.projectResults.count();
       console.log(count);
       for(let i=0;i<count;i++)
       {
        const site = await this.projectResults.nth(i).textContent();
        console.log(site);
        if(site.includes(projectName))
         {
            await this.projectResultsLink.nth(i).click();
            await this.page.waitForLoadState('networkidle');
            break;
         }

         else if(i==count-1)
         {
          
             throw new Error("Please check the project name provided! Seems like provided project is not available on the platform");
         }

       } 

       return this;
      
    }

    async getProjectPageTitle()
    {
        return await this.pageTitle.textContent();
    }

    async clickOnProjectByName(projectName) {
        const xpath = "//span[normalize-space()='" + projectName + "']";
        await this.page.locator(xpath).click();
    }

}

module.exports = {ProjectsListingsPage}