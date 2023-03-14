class BasicUIActions

{
    constructor(page)
    {
        this.page=page;
    }



    async selectValuesFromDropdown(dropdownLocator,value)
    {
   
        console.log(typeof(dropdownLocator));
        console.log(typeof(value));
        await this.page.locator(dropdownLocator).selectOption(value);
    }
}

export default {BasicUIActions};