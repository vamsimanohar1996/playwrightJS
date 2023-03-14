class LoginPage {


    constructor(page)
    {
        this.page = page;
        const framePage = this.page.frameLocator("#frame");
        this.username = framePage.locator("input[name='username']");
        this.nextButton = framePage.locator("button:has-text('Next')");
        this.password = framePage.locator("input[name*='password']");
        this.loginButton = framePage.locator("button:has-text('Log In')");
    }




    async goTo()
    {
        await this.page.goto("https://platform.productsup.com/login");
        return this;
    }

    async validLogin()
    {

        if(process.env.EMAIL===undefined ||process.env.PASSWORD===undefined)
        {
            throw error("Please provide user credentials via command line. Please use the syntax as --> EMAIL=<email_id> PASSWORD=<password> npx playwright <command>");
        }
           await this.username.type(process.env.EMAIL.toString());
           await this.nextButton.click();
           await this.password.type(process.env.PASSWORD.toString());
           await this.loginButton.click();
           await this.page.waitForLoadState('networkidle')
        

    }

    async getAccountDashboardPageTitle()
    {
        const title = await this.pageCaption.textContent();
        return title;
     
    }




}

export default { LoginPage };