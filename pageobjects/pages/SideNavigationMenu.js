const { DataflowOverview } = require("./Dataflow/DataflowOverview");
const { DataservicesOverviewPage } = require("./Dataservices/DataservicesOverviewPage");
const { DatasourcesPage } = require("./Datasources/DatasourcesPage");
const { DataviewOverviewPage } = require("./Dataview/DataviewOverviewPage");
const { ErrorLogOverview } = require("./ErrorLog/ErrorLogOverview");
const { ExportsOverviewPage } = require("./Exports/ExportOverviewPage");
const { ListsOverviewPage } = require("./Lists/ListsOverviewPage");

class SideNavigationMenu{


    constructor(page)
    {
        this.page=page;
    
        this.sideNavigationIcon=page.locator("svg[class*='arrow']");
        this.exportsMenu=page.locator("ul[class*='menu'] a[href*='export']");
        this.datasourcesMenu=page.locator("ul[class*='menu'] a[href*='import']");
        this.dashboardMenu=page.locator("ul[class*='menu'] a[href*='dashboard']");
        this.dataflowMenu=page.locator("pds-icon[icon*='data-flow']");
        this.errorLogMenu=page.locator("ul[class*='menu'] a[href*='error']");
        this.listsPage=page.locator("ul[class*='menu'] a[href*='lists']");
        this.dataservicesPage= page.locator("ul[class*='menu'] a[href*='services']");
        this.dataviewPage=page.locator("ul[class*='menu'] a[href*='data-view']");
    }



      async  naviagteTo(moduleName)
    {
        await this.sideNavigationIcon.hover();
        await moduleName.click();
        await this.page.waitForLoadState('networkidle');
    }

    
    async navigateToExportAB()
    {
        await this.naviagteTo(this.exportsMenu);
        return new ExportsOverviewPage(this.page);
    }


    async navigateToDatasources()
    {
        await this. naviagteTo(this.datasourcesMenu);
        return new DatasourcesPage(this.page);
        
      
    }

    async navigateToDashboard()
    {
        await this.naviagteTo(this.dashboardMenu);
    }

    async navigateToDataflow()
    {
        await this.naviagteTo(this.dataflowMenu);
        return new DataflowOverview(this.page);
    }


    async navigateToErrorLog()
    {
        await this.naviagteTo(this.errorLogMenu);
        return new ErrorLogOverview(this.page);
    }


    async navigateToListsPage()
    {
        await this.naviagteTo(this.listsPage);
        return new ListsOverviewPage(this.page);
    }



    async  navigateToDataviewPage()
    {
        await this.naviagteTo(this.dataviewPage);
        return new DataviewOverviewPage(this.page);
    }

    async  navigateToDataservicesPage()
    {
        await this.naviagteTo(this.dataservicesPage);
        return new DataservicesOverviewPage(this.page);
    }

}

module.exports ={SideNavigationMenu}