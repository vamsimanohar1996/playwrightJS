const {test,expect} = require('@playwright/test');
const {POManager}= require('../../pageobjects/POManager');
const testData = JSON.parse(JSON.stringify(require("../../testdata/Datsources/AddDataSource.json")));

test.beforeEach(async({page},testInfo)=>
{
  
    console.log(`Running ${testInfo.title}`);
    const poManager = new POManager(page);
    await poManager.getLoginPage().goTo();
    await poManager.getLoginPage().validLogin();
});



/**
 *  This method uses stream-api to import data into the platform
 */
test('@Datasources Validate whether user is able to import data into the platform', async({page})=>
{
    
        const poManager = new POManager(page);

       await poManager.getProjectListingsPage().selectProject(testData.project);
       expect(await poManager.getProjectListingsPage().getProjectPageTitle()).toBe(testData.project);
       await poManager.getSiteListingsPage().selectSite(testData.site);
       await poManager.getDashboardPage().isOnDashboardPage();
       await poManager.getSideNavigationMenu().navigateToDatasources()
       await poManager.getDatasourcesPage().isOnDatasourcePage();
       await (await poManager.getDatasourcesPage().addDatasource()).
       searchDatasource(testData.datasource);
       await (await poManager.getDatasourcesPage().selectDatasourceAndAdd(testData.datasource)).
       selectStreamID(testData.streamId);
       await poManager.getDatasourcesPage().saveDatasource();

       //Importing the data source and verifying count on old dashboard and data view screen

       await poManager.getPlatformActions().triggerImport();
       await poManager.getSideNavigationMenu().navigateToDashboard();
       expect(await poManager.getDashboardPage().getImportedItemsCountFromOldDashboard()).toBe(testData.count);




});


test.afterEach(async({page},testInfo)=>
{
    console.log(`Running ${testInfo.title}`);
    const poManager = new POManager(page);
    await poManager.getSideNavigationMenu().navigateToDatasources();
    await (await (await poManager.getDatasourcesPage().openDataSourceSettings()).navigateToAdavancedSettingsTab()).deleteDatasource();
  

});
