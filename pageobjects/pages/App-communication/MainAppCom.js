class MainAppCom{
    constructor(page)
    {
        this.page=page;
    }


    async navigateToModule(strategy)
    {
           strategy.navigateToModule(this);
           strategy.openHelpLink();
           strategy.navigateToHelpCenter();

    }
}

module.exports ={MainAppCom};