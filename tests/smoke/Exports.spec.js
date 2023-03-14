const {test,expect} = require('@playwright/test');
const {POManager}= require('../../pageobjects/POManager');
const testData = JSON.parse(JSON.stringify(require("../../testdata/Exports/AddExports.json")));


test.beforeEach(async({page},testInfo)=>
{
    console.log(`Running ${testInfo.title}`);
    const poManager = new POManager(page);
  
    await poManager.getLoginPage().goTo();
    await poManager.getLoginPage().validLogin();
    await poManager.getProjectListingsPage().selectProject(testData.project);
    expect(await poManager.getProjectListingsPage().getProjectPageTitle()).toBe(testData.project);
    await poManager.getSiteListingsPage().selectSite(testData.site);
    await poManager.getDashboardPage().isOnDashboardPage();
  
});


test('@exports Validate whether user is able to export data from the platform', async({page})=>
{
    
        const poManager = new POManager(page);

        await poManager.getSideNavigationMenu().navigateToExportAB();
        await poManager.getExportsPage().isOnExportsPage();
        await (await (await poManager.getExportsPage().addExports()).searchForExportChannel(testData.exports)).addExportFromSearchResults();
        await poManager.getExportsPage().openExportChannelSettings();
        await poManager.getExportsPage().addDestination(testData.destination);
        await (await poManager.getExportsPage().checkIfProductsupServerDestiationIsAdded()).navigateBackToExportsOverviewPage();
        await poManager.getSideNavigationMenu().navigateToDataflow();
        await poManager.getDataflowPage().isOnDataflowPage();
        await poManager.getDataflowPage().drawConnectionFromIntermediateToExport();
        await poManager.getPlatformActions().triggerExport();

     await poManager.getSideNavigationMenu().navigateToExportAB();
     await poManager.getExportsPage().isOnExportsPage();
     expect(await poManager.getExportsPage().getExportedProductsCount()).toBe("4");
 
});


test.afterEach(async({page},testInfo)=>
{
    const poManager = new POManager(page);
    console.log(`Running ${testInfo.title}`);
  
   await (await poManager.getExportsPage().openExportChannelSettings()).deleteExportChannel();

});