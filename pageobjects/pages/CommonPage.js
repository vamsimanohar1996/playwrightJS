import { expect, Page } from "@playwright/test";

class CommonPage {
    constructor(page) {
        this.page = page;

        const framePage = this.page.frameLocator("//iframe[@id='frame']");
        this.pupLogo = this.page.locator('#logo-inverse');
        this.dataView = this.page.locator("//span[@class='title'][normalize-space()='Data View']");
        this.datamap = this.page.locator("//span[@class='title'][normalize-space()='Data Map']");
        this.authentication = this.page.locator("//span[normalize-space()='Authentication']");
        this.dataServices = this.page.locator("//span[@class='title'][normalize-space()='Data Services']");
        this.dataflow = this.page.locator("//span[@class='title'][normalize-space()='Dataflow']");
        this.exportAB = this.page.locator("//span[normalize-space()='Exports A/B']");
        this.designer = this.page.locator("//span[normalize-space()='Designer']");
        this.dataSources = this.page.locator("//span[@class='title'][normalize-space()='Data Sources']");
        this.lists = this.page.locator("//span[normalize-space()='Lists']");
        this.roi = this.page.locator("//span[normalize-space()='ROI Strategy']");
        this.reporting = this.page.locator("//span[normalize-space()='Reporting']");
        this.errorLog = this.page.locator("//span[@class='title'][normalize-space()='Error Log']");
        this.monitor = this.page.locator("//span[normalize-space()='Monitor']");
        this.activity = this.page.locator("//span[normalize-space()='Activity']");
        this.tracking = this.page.locator("//span[normalize-space()='Tracking']");
        this.settings = this.page.locator("//span[normalize-space()='Settings']");

        this.uiCaption = this.page.locator("span[class='caption']");
        this.uiCaptionInsideFrame = framePage.locator("span[class='caption']");

        this.breadcrumbs = this.page.locator('pup-breadcrumbs pup-link a span'); //this.page.locator("pup-link span");
        this.frameBreadCrumbs = framePage.locator('pup-breadcrumbs pup-link a span');
    }

    async hoverOnPupLogo() {
        await this.pupLogo.hover();
    }

    async openDataSources() {
        await this.dataSources.click();
        await this.page.waitForTimeout(5000);
    }

    async openDataMap() {
        await this.datamap.click();
        await this.page.waitForTimeout(5000);
    }

    async openAuthentication() {
        await this.authentication.click();
        await this.page.waitForTimeout(5000);
    }

    async openDataServices() {
        await this.dataServices.click();
        await this.page.waitForTimeout(5000);
    }

    async openDataView() {
        await this.dataView.click();
        await this.page.waitForTimeout(5000);
    }

    async openDataFlow() {
        await this.dataflow.click();
        await this.page.waitForTimeout(5000);
    }

    async openExportAB() {
        await this.exportAB.click();
        await this.page.waitForTimeout(5000);
    }

    async openDesigner() {
        await this.designer.click();
        await this.page.waitForTimeout(5000);
    }

    async openLists() {
        await this.lists.click();
        await this.page.waitForTimeout(5000);
    }

    async openRoi() {
        await this.roi.click();
        await this.page.waitForTimeout(5000);
    }

    async openReporting() {
        await this.reporting.click();
        await this.page.waitForTimeout(5000);
    }

    async openErrorLog() {
        await this.errorLog.click();
        await this.page.waitForTimeout(5000);
    }

    async openMonitor() {
        await this.monitor.click();
        await this.page.waitForTimeout(5000);
    }

    async openActivity() {
        await this.activity.click();
        await this.page.waitForTimeout(5000);
    }

    async openTracking() {
        await this.tracking.click();
        await this.page.waitForTimeout(5000);
    }

    async openSettings() {
        await this.settings.nth(0).click();
        await this.page.waitForTimeout(5000);
    }

    async validateUiCaption(caption) {
        await this.page.waitForLoadState('networkidle');
        console.log(caption + ' UI Title : ' + await this.uiCaption.innerText());
        expect.soft(await this.uiCaption.innerText()).toEqual(caption);
    }

    async validateUiCaptionInsideFrame(caption) {
        await this.page.waitForLoadState('networkidle');
        var uiTitle = await this.uiCaptionInsideFrame.nth(0).innerText();
        console.log(caption + ' UI Title : ' + uiTitle);
        expect.soft(uiTitle).toEqual(caption);
    }

    async getBreadcrumbs() {
        console.log('breadcrumb size : ' + await this.breadcrumbs.count());
        
        const elementsCount = await this.breadcrumbs.count();
        console.log('elementsCount : ' + elementsCount);
        let texts = [];

        for (var index = 0; index < elementsCount; index++) {
            const element = await this.breadcrumbs.nth(index);
            const innerText = await element.innerText();
            texts.push(innerText);
        }

        for (var index = 0; index < elementsCount; index++) {
            console.log('breadcrumb : ' + texts[index]);
        }
        
    }

    async getLastBreadCrumbText() {
        const elementsCount = await this.breadcrumbs.count();
        const breadcrumb = await this.breadcrumbs.nth(elementsCount - 1).innerText();
        console.log('Page breadcrumb : ' + breadcrumb);
        return breadcrumb;
    }

    async getLastBreadCrumbTextInsideFrame() {
        const elementsCount = await this.frameBreadCrumbs.count();
        const breadcrumb = await this.frameBreadCrumbs.nth(elementsCount - 1).innerText();
        console.log('Page breadcrumb : ' + breadcrumb);
        return breadcrumb;
    }

    async getCurrentPageUrl() {
        await this.page.waitForLoadState('networkidle');
        return this.page.url();
    }
}

export default { CommonPage };