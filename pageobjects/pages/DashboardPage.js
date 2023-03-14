class DashboardPage {


    constructor(page)
    {
        this.page = page;
        const framePage = this.page.frameLocator("#frame");
    }
}

export default { DashboardPage };