const {test,expect} = require('@playwright/test');



const {POManager}= require('../../pageobjects/POManager');
const {AppCommunication} = require ('../../pageobjects/pages/App-communication/AppCommunication');
const testData = JSON.parse(JSON.stringify(require("../../testdata/Exports/AddExports.json")));
const assertion = JSON.parse(JSON.stringify(require("../../Assertions/AssertionText.json")));

/**
 * Login only once
 */
let webContext;
let beforePage;

test.beforeAll(async({browser})=>
{
    
        const context =  await browser.newContext({viewport: null});
        const page = await context.newPage();
        const poManager = new POManager(page);
        await poManager.getLoginPage().goTo();
        await poManager.getLoginPage().validLogin();
        await context.storageState({path: 'new_state.json'});
        await page.close();
        await context.close();
     
        webContext = await browser.newContext({storageState: 'new_state.json',
    viewport: null});

     
});


test.beforeEach(async()=>
{
    

     beforePage = await webContext.newPage();
    const poManager = new POManager(beforePage);
    await poManager.getLoginPage().goTo();
    await poManager.getProjectListingsPage().selectProject(testData.project);
    expect(await poManager.getProjectListingsPage().getProjectPageTitle()).toBe(testData.project);
    await poManager.getSiteListingsPage().selectSite(testData.site);
    await poManager.getDashboardPage().isOnDashboardPage();
  
 
  
});


test('Validate if user is able to access help center page from Data view page', async () => {

       const poManager = new POManager(beforePage);
       await (await poManager.getSideNavigationMenu().navigateToDataviewPage()).isOnDataviewPage();
       //beforePage.close();
       await assertHelpPage(beforePage);
       
    
});

test('Validate if user is able to access help center page from Exports page', async () => {

    const poManager = new POManager(beforePage);
    await (await poManager.getSideNavigationMenu().navigateToExportAB()).isOnExportsPage();
    await assertHelpPage(beforePage);
 
});

test('@app Validate if user is able to access help center page from Datas Services page', async () => {
    const poManager = new POManager(beforePage);
    await (await poManager.getSideNavigationMenu().navigateToDataservicesPage()).isOnDataServicesPage();
    await assertHelpPage(beforePage);
    
});


test('Validate if user is able to access help center page from Error log page', async () => {
    const poManager = new POManager(beforePage);
    await (await poManager.getSideNavigationMenu().navigateToErrorLog()).isOnErrorLogPage();
    await assertHelpPage(beforePage);

});

test('Validate if user is able to access help center page from Dataflow page', async ({browser}) => {



    const poManager = new POManager(beforePage);
    await (await poManager.getSideNavigationMenu().navigateToDataflow()).isOnDataflowPage();
    await assertHelpPage(beforePage);


});

test.afterEach(async()=>
{
    await beforePage.close();
  
});



const assertHelpPage = async(page) => 
{
   
    const text = await (await new AppCommunication(page).openHelpLink()).navigateToHelpCenter();
    expect(text).toBe(assertion.Communication.helpCenter);
}

