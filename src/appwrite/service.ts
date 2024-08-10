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