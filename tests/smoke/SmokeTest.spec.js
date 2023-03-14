const {test,expect} = require('@playwright/test');
const {POManager}= require('../../pageobjects/POManager');
const projectDetails = JSON.parse(JSON.stringify(require('../../testdata/projectdetails.json')));
const menuItems = JSON.parse(JSON.stringify(require('../../testdata/menuitems.json')));
const breadcrumbs = JSON.parse(JSON.stringify(require('../../testdata/breadcrumbs.json')));
const url = JSON.parse(JSON.stringify(require('../../testdata/urltexts.json')));
test('@Z Smoke Test Suite', async ({ page }) => {
    //login
    const username = details[1].username;
    const projectName = projectDetails[0].projectName;
    const siteName = projectDetails[0].siteName;

    const poManager = new POManager(page);
    await poManager.getLoginPage().goTo();
    await poManager.getLoginPage().validLogin();
    await page.waitForLoadState('networkidle');

    //validate account level
    await poManager.getAccountOverviewPage().selectAccount(username);
    const accountLevelUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Account Level Url : ' + accountLevelUrl);
    expect.soft(accountLevelUrl).toContain(url.account);
    await poManager.getAccountOverviewPage().validateAccountUiTitle();
    var breadcrumb = await poManager.getCommonPage().getLastBreadCrumbText();
    expect.soft(breadcrumb).toEqual(username);

    //validate project dashboard
    await poManager.getProjectListingsPage().clickOnProjectByName(projectName);
    await poManager.getCommonPage().validateUiCaption(projectName);
    const projectDashboardUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Project Dashboard Url : ' + projectDashboardUrl);
    expect.soft(projectDashboardUrl).toContain(url.projectDashboard);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbText();
    expect.soft(breadcrumb).toContain(projectName);

    //validate site dashboard
    await poManager.getSiteListingsPage().clickOnSite();
    await poManager.getCommonPage().validateUiCaptionInsideFrame(menuItems.siteLevelMenuItems.dashboard);
    //await poManager.getSiteListingsPage().clickOnSiteByName('Client Tools Inc.');
    const siteDashboardUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Site Dashboard Url : ' + siteDashboardUrl);
    expect.soft(siteDashboardUrl).toContain(url.siteDashboard);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbTextInsideFrame();
    expect.soft(breadcrumb).toEqual(breadcrumbs.dashboard);

    //validate data map
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openDataMap();
    await poManager.getCommonPage().validateUiCaption(menuItems.siteLevelMenuItems.dataMap);
    const dataMapUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Data Map Url : ' + dataMapUrl);
    expect.soft(dataMapUrl).toContain(url.dataMap);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbText();
    expect.soft(breadcrumb).toEqual(breadcrumbs.dataMap);

    //validate authentication
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openAuthentication();
    await poManager.getCommonPage().validateUiCaption(menuItems.siteLevelMenuItems.authentication);
    const authenticationUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Authentication Url : ' + authenticationUrl);
    expect.soft(authenticationUrl).toContain(url.authentication);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbText();
    expect.soft(breadcrumb).toEqual(breadcrumbs.authentication);

    //validate data sources
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openDataSources();
    await poManager.getCommonPage().validateUiCaption(menuItems.siteLevelMenuItems.dataSources);
    const dataSourcesUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Datasources Url : ' + dataSourcesUrl);
    expect.soft(dataSourcesUrl).toContain(url.dataSources);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbText();
    expect.soft(breadcrumb).toEqual(breadcrumbs.dataSources);

    //validate data services
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openDataServices();
    await poManager.getCommonPage().validateUiCaption(menuItems.siteLevelMenuItems.dataServices);
    const dataServicesUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Data Services Url : ' + dataServicesUrl);
    expect.soft(dataServicesUrl).toContain(url.dataServices);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbText();
    expect.soft(breadcrumb).toEqual(breadcrumbs.dataServices);

    //validate exports a/b
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openExportAB();
    await poManager.getCommonPage().validateUiCaption(menuItems.siteLevelMenuItems.exportAB + siteName);
    const exportABUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Exports A/B Url : ' + exportABUrl);
    expect.soft(exportABUrl).toContain(url.exportAB);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbText();
    expect.soft(breadcrumb).toEqual(breadcrumbs.exportAB);

    //validate designer
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openDesigner();
    await poManager.getCommonPage().validateUiCaption(menuItems.siteLevelMenuItems.imageDesigner);
    const designerUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Designer Url : ' + designerUrl);
    expect.soft(designerUrl).toContain(url.imageDesigner);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbText();
    expect.soft(breadcrumb).toEqual(breadcrumbs.imageDesigner);

    //validate dataflow
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openDataFlow();
    await poManager.getCommonPage().validateUiCaption(menuItems.siteLevelMenuItems.dataflow);
    const dataFlowUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Dataflow Url : ' + dataFlowUrl);
    expect.soft(dataFlowUrl).toContain(url.dataflow);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbText();
    expect.soft(breadcrumb).toEqual(breadcrumbs.dataflow);

    //validate data view
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openDataView();
    await poManager.getCommonPage().validateUiCaption(menuItems.siteLevelMenuItems.dataView);
    const dataViewUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Data View Url : ' + dataViewUrl);
    expect.soft(dataViewUrl).toContain(url.dataView);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbText();
    expect.soft(breadcrumb).toEqual(breadcrumbs.dataView);

    //validate lists
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openLists();
    await poManager.getCommonPage().validateUiCaptionInsideFrame(menuItems.siteLevelMenuItems.lists);
    const listsUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Lists Url : ' + listsUrl);
    expect.soft(listsUrl).toContain(url.lists);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbTextInsideFrame();
    expect.soft(breadcrumb).toEqual(breadcrumbs.lists);

    //validate roi strategy
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openRoi();
    await poManager.getCommonPage().validateUiCaption(menuItems.siteLevelMenuItems.roi);
    const roiUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Roi Strategy Url : ' + roiUrl);
    expect.soft(roiUrl).toContain(url.roi);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbText();
    expect.soft(breadcrumb).toEqual(breadcrumbs.roi);

    //validate reporting
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openReporting();
    await poManager.getCommonPage().validateUiCaption(menuItems.siteLevelMenuItems.reporting + siteName);
    const reportUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Reporting Url : ' + reportUrl);
    expect.soft(reportUrl).toContain(url.reporting);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbText();
    expect.soft(breadcrumb).toEqual(breadcrumbs.reporting);

    //validate error log
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openErrorLog();
    await poManager.getCommonPage().validateUiCaption(menuItems.siteLevelMenuItems.errorLog);
    const errorLogUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Error Log Url : ' + errorLogUrl);
    expect.soft(errorLogUrl).toContain(url.errorLog);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbText();
    expect.soft(breadcrumb).toEqual(breadcrumbs.errorLog);

    //validate monitor
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openMonitor();
    await poManager.getCommonPage().validateUiCaptionInsideFrame(menuItems.siteLevelMenuItems.monitor);
    const monitorUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Monitor Url : ' + monitorUrl);
    expect.soft(monitorUrl).toContain(url.monitor);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbTextInsideFrame();
    expect.soft(breadcrumb).toEqual(breadcrumbs.monitor);

    //validate activity
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openActivity();
    await poManager.getActivityPage().validateUiCaptionInsideFrame(menuItems.siteLevelMenuItems.activity);
    const activityUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Activity Url : ' + activityUrl);
    expect.soft(activityUrl).toContain(url.activity);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbTextInsideFrame();
    expect.soft(breadcrumb).toEqual(breadcrumbs.activity);

    //validate tracking
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openTracking();
    await poManager.getCommonPage().validateUiCaption(menuItems.siteLevelMenuItems.tracking);
    const trackingUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Tracking Url : ' + trackingUrl);
    expect.soft(trackingUrl).toContain(url.tracking);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbText();
    expect.soft(breadcrumb).toEqual(breadcrumbs.tracking);

    //validate site settings
    await poManager.getCommonPage().hoverOnPupLogo();
    await poManager.getCommonPage().openSettings();
    await poManager.getCommonPage().validateUiCaption(menuItems.siteLevelMenuItems.settings);
    const settingsUrl = await poManager.getCommonPage().getCurrentPageUrl();
    console.log('Settings Url : ' + settingsUrl);
    expect.soft(settingsUrl).toContain(url.settings);
    breadcrumb = await poManager.getCommonPage().getLastBreadCrumbText();
    expect.soft(breadcrumb).toEqual(breadcrumbs.settings);
});