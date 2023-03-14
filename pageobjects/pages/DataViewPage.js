import { expect } from "@playwright/test";

class DataViewPage {
    constructor(page) {
        this.page = page;
        const framePage = this.page.frameLocator("//iframe[@class='viewFrame']"); //this.page.frameLocator(".viewFrame");

        this.channelDropDown = framePage.locator("button[class='btn btn-default btn-sm dropdown-toggle']"); //this.page.locator("//div[@class='btn-group stage-menu-container open']//span[@class='caret']");
        this.exportChannels = framePage.locator("ul[class='dropdown-menu stage-menu'] li a");
        this.channelDropDownText = framePage.locator("button[class='btn btn-default btn-sm stage-menu-btn']");

        this.hamburgerIcon = framePage.locator("button[class='btn btn-default btn-sm pull-right btn-show-options']");
        this.rightDrawerHeading = framePage.locator("div[class='container-fluid ng-scope'] h5[class='ng-binding']");

        this.productExportCounts = framePage.locator("div[class='btn-wrapper pull-right']");
    }

    async getChannelDropdownItems() {
        await this.channelDropDown.nth(0).click();
        const elementsCount = await this.exportChannels.count();
        console.log('elementsCount : ' + elementsCount);
        
        let texts = [];

        for (var index = 0; index < elementsCount; index++) {
            const element = await this.exportChannels.nth(index);
            const innerText = await element.innerText();
            texts.push(innerText);
        }

        for (var index = 0; index < elementsCount; index++) {
            console.log('dropdown element : ' + texts[index]);
        }

        await this.exportChannels.nth(elementsCount - 1).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(3000);
        var selectedChannel = await this.channelDropDownText.nth(0).innerText();
        selectedChannel = selectedChannel.trim();
        console.log('selected channel : ' + selectedChannel);
        var expectedChannelName = await this.exportChannels.nth(elementsCount - 1).innerText();
        expectedChannelName = expectedChannelName.trim();
        expect.soft(selectedChannel).toEqual(expectedChannelName);
    }

    async hamburgerMenuOperation() {
        await this.hamburgerIcon.click();
        await this.page.waitForTimeout(3000);
        var drawerTitle = await this.rightDrawerHeading.innerText();
        drawerTitle = drawerTitle.trim();
        console.log('right drawer default title : ' + drawerTitle);
        expect.soft(drawerTitle).toEqual('Product Quickfilter');
    }

    async exportedItemValidation() {
        const elementsCount = await this.productExportCounts.count();
        console.log('elementsCount : ' + elementsCount);
        expect(elementsCount).toEqual(3);

        //console.log(await this.productExportCounts.nth(0).innerText());
        
        var allItems = await this.productExportCounts.nth(0).innerText();
        var exportedItems = await this.productExportCounts.nth(1).innerText();
        var skippedItems = await this.productExportCounts.nth(2).innerText();

        allItems = parseFloat(allItems.replaceAll('/,/g', ''));
        exportedItems = parseFloat(exportedItems.replaceAll(',', ''));
        skippedItems = parseFloat(skippedItems.replaceAll(',', ''));

        expect(allItems).toBeGreaterThanOrEqual(1);
        expect(exportedItems).toBeGreaterThanOrEqual(1);

        let sumOfExportedAndSkipped = exportedItems + skippedItems;
        console.log('total items : ' + allItems);
        console.log('sumOfExportedAndSkipped : ' + sumOfExportedAndSkipped);
        expect(sumOfExportedAndSkipped).toEqual(allItems);
    }
}

export default { DataViewPage };