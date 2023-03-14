import { expect } from "@playwright/test";

class ActivityPage {
    constructor(page) {
        this.page = page;
        const framePage = this.page.frameLocator("//iframe[@id='frame']");
        this.activityUiTitle = framePage.locator("//pup-heading[@class='title-heading heading level-1']//span");
    }

    async validateUiCaptionInsideFrame(caption) {
        await this.page.waitForLoadState('networkidle');
        var uiTitle = await this.activityUiTitle.innerText();
        uiTitle = uiTitle.trim();
        console.log(caption + ' UI Title : ' + uiTitle);
        expect.soft(uiTitle).toEqual(caption);
    } 
}

export default { ActivityPage };