const { LoginPage } = require("./LoginPage").default;
const { AccountOverviewPage } = require("./pages/AccountOverviewPage").default;
const { CommonPage } = require("./pages/CommonPage").default;
const { BasicUIActions } = require("./pages/BasicUIActions").default;
const { ActivityPage } = require("./pages/ActivityPage").default;
const { DatasourcesPage } = require("./pages/Datasources/DatasourcesPage");
const { DataViewPage } = require("./pages/DataViewPage").default;
const {ProjectsListingsPage} = require("./pages/Projects/ProjectsListingsPage");
const { SiteListingsPage } = require("./pages/Sites/SiteListingsPage").default;
const {SideNavigationMenu} = require("./pages/SideNavigationMenu");
const { ExportsOverviewPage } = require("./pages/Exports/ExportOverviewPage");
const { PlatformActions } = require("./pages/PlatformActions");
const { DataflowOverview } = require("./pages/Dataflow/DataflowOverview");
const {DashboardPage} = require("./pages/Sites/DashboardPage");
const {ErrorLogOverview} = require ("./pages/ErrorLog/ErrorLogOverview");
const { AppCommunication } = require("./pages/App-communication/AppCommunication");


class POManager
{
    constructor(page)
    {
        this.page=page;
        this.loginPage= new LoginPage(this.page);
        this.accountOverviewPage= new AccountOverviewPage(this.page);
        this.projectListingsPage=new ProjectsListingsPage(this.page);
        this.siteListingsPage=new SiteListingsPage(this.page);
        this.datasourcesPage=new DatasourcesPage(this.page);
        this.basicUIActions = new BasicUIActions(this.page);
        this.commonPage = new CommonPage(this.page);
        this.dataViewPage = new DataViewPage(this.page);
        this.activityPage = new ActivityPage(this.page);
        this.sideNavigationsMenu=new SideNavigationMenu(this.page);
        this.exportsPage=new ExportsOverviewPage(this.page);
        this.dashboardPage= new DashboardPage(this.page);
        this.plaformActions= new PlatformActions(this.page);
        this.dataflowPage= new DataflowOverview(this.page);
        this.errorLogPage=new ErrorLogOverview(this.page);
        this.appCommunication= new AppCommunication(this.page);
    }



    getLoginPage()
    {
        return this.loginPage;
    }

    getAccountOverviewPage()
    {
        return this.accountOverviewPage;
    }

    getProjectListingsPage()
    {
        return this.projectListingsPage;
    }


    getSiteListingsPage()
    {
        return this.siteListingsPage;
    }

    getDatasourcesPage()
    {
        return this.datasourcesPage;
    }

    getUIActions()
    {
        return this.basicUIActions;
    }

    getCommonPage() {
        return this.commonPage;
    }

    getDataViewPage() {
        return this.dataViewPage;
    }

    getActivityPage() {
        return this.activityPage;
    }

    getPlatformActions()
    {
        return this.plaformActions;
    }


    getDataflowPage()
    {
        return this.dataflowPage;
    }


    getSideNavigationMenu()
    {
        return this.sideNavigationsMenu;
    }

    getExportsPage()
    {
        return this.exportsPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getErrorLogPage()

    {
        return this.errorLogPage;
        
    }

    getAppCommunicationsPage()
    {
        return this.appCommunication;
    }
}

module.exports = {POManager};