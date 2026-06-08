import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";
class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
            .setProject(conf.appwriteProjectId)
            .setEndpoint(conf.appwriteEndpoint);
        this.account = new Account(this.client);
    }
    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: name
            });
            if(userAccount){
                return await this.login({email,password});
            }
        } catch (e){
            console.error(e)
        }
        return null;
    }
    async login({email,password}){
        try{
            const result = await this.account.createEmailPasswordSession({
                email: email,
                password: password
            });
            return result;
        } catch (e){
            console.error(e)
        }
        return null;
    }

    async getCurrentUser(){
        try{
            const user = await this.account.get();
            return user;
        } catch (e){
            console.error(e)
        }
        return null;
    }
    async logout(){
        try{
            await this.account.deleteSessions();
            return true;
        } catch (e){
            console.error(e)
            return false;
        }
    }
}

const authService = new AuthService();

export default authService;