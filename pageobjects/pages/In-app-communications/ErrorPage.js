import { CommunicationStrategy } from './CommunicationStrategy';
import { SideNavigationMenu } from '../../pages/SideNavigationMenu';
import { POManager } from '../../POManager';
class ErrorPage extends CommunicationStrategy
{

   
    
    constructor(page)
    {
    
        super();
        this.page=page;
        this.appCommunication = page.locator("pup-icon[path*='question']");
    }

    async navigateTo()
    {
           

        //    const poManager = new POManager(this.page);
        //    await poManager.getSideNavigationMenu().navigateToErrorLog();
           
    }

    async performAction()
    {
        const side = new SideNavigationMenu(this.page);
        await side.navigateToDatasources();
        console.log("Entered into action method");
        await super.performAction(this.appCommunication);
      
    }

  
    }



export default{ErrorPage};