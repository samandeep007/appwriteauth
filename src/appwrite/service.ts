import { ID, Account, Client } from 'appwrite'
import Config from 'react-native-config'
import Snackbar from 'react-native-snackbar'

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string = Config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
}

type LoginUserAccount = {
    email: string;
    password: string;
}

class AppwriteService {
    
    account;

    constructor(){
        appwriteClient
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID)

        this.account = new Account(appwriteClient);  
    }

    //create a new record of user in appwrite
    async createAccount({email, password, name}: CreateUserAccount) {
        try {
          const user = await this.account.create(ID.unique(), email, password, name);
          
            
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.error("Appwrite service :: createAccount() :: ", error)
        }
    }



}