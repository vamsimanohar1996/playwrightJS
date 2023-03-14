const {test,expect} = require('@playwright/test');
const {POManager}= require('../../pageobjects/POManager');


// test.describe.configure({ mode: 'serial' });

// test.beforeAll(async ({ page }) => {
//         const poManager = new POManager(page);
//         await poManager.getLoginPage().goTo();
// });

//       test.afterAll(async () => {
//         await page.close();
//       });

test('@T Product Count Check', async ({ page }) => {
        const username = details[1].username;

        const poManager = new POManager(page);
        await poManager.getLoginPage().goTo();
        await poManager.getLoginPage().validLogin();
        await page.waitForLoadState('networkidle');
        await poManager.getAccountOverviewPage().selectAccount(username);
        await poManager.getProjectListingsPage().validateUserOnProjectListingsPage(username);

        await poManager.getProjectListingsPage().clickOnProjectByName('Automation Sites');
        await poManager.getCommonPage().validateUiCaption('Automation Sites');
        //await poManager.getCommonPage().getBreadcrumbs();
        await poManager.getSiteListingsPage().clickOnSiteByName('Client Tools Inc.');
        //await poManager.getCommonPage().getBreadcrumbs();

        await poManager.getCommonPage().hoverOnPupLogo();
        await poManager.getCommonPage().openDataView();
        await poManager.getCommonPage().validateUiCaption('Data View');

        await poManager.getDataViewPage().getChannelDropdownItems();
        await poManager.getDataViewPage().hamburgerMenuOperation();
        await poManager.getDataViewPage().exportedItemValidation();
});