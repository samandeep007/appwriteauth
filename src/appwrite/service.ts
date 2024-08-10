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

    constructor() {
        appwriteClient
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(APPWRITE_PROJECT_ID)

        this.account = new Account(appwriteClient);
    }

    //create a new record of user in appwrite
    async createAccount({ email, password, name }: CreateUserAccount) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name);
            if (user) {
                return this.loginAccount({ email, password });
            } else {
                return user;
            }

        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.error("Appwrite service :: createAccount() :: ", error)
        }
    }

    async loginAccount({ email, password }: LoginUserAccount) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.error("Appwrite service :: loginAccount() :: ", error)
        }
    }

    async getCurrenUser() {
        try {
            return await this.account.get();     
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser() :: ", error)
        }
    }


    async logout() {
        try {
            await this.account.deleteSession('current')
        } catch (error) {
            console.error("Appwrite service :: logout() :: ", error)
        }
    }

}

export default AppwriteService;
