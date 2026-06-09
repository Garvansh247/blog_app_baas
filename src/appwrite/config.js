import conf from '../conf/conf.js';
import { Client, TablesDB, Storage, Query,ID } from "appwrite";

class Service{
    client=new Client();
    tablesDB; // in place of legacy databases
    storage;
    constructor(){
        this.client.setEndpoint(conf.appwriteEndpoint)
                    .setProject(conf.appwriteProjectId);
        this.tablesDB = new TablesDB(this.client);
        this.storage=new Storage(this.client);
    }

    async createPost(slug,{title,content,featuredImage,status,userId}){
        try{
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            });
        } catch(err){
            console.log(err);
        }
        return null;
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            });
        } catch(err){
            console.log(err);
        }
        return null;
    }   
    async deletePost(slug){
        try{
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
            });
            return true;
        } catch(err){
            console.log(err);
        }
        return false;
    }
    async getPost(slug){
        try{
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
            });
        } catch(err){
            console.log(err);
        }
        return null;
    }
    async getPosts(queries=[Query.equal('status','active')]){
        try{
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries
            });
        } catch(err){
            console.log(err);
        }
        return null;
    }

    // for files service

    async createFile(file){
        try{
            return await this.storage.createFile({
                            bucketId: conf.appwriteBucketId,
                            fileId: ID.unique(),
                            file: file
                        });
        } catch(err){
            console.log(err);
        }
        return null;
    }
    getFilePreview(fileId){
        try{
            return this.storage.getFilePreview({
                            bucketId: conf.appwriteBucketId,
                            fileId: fileId,
                        });
        } catch(err){
            console.log(err);
        }   
        return null;
    }
    async deleteFile(fileId){
        try{
            await this.storage.deleteFile({
                        bucketId: conf.appwriteBucketId,
                        fileId: fileId  
                    });
            return true;
        } catch(err){
            console.log(err);
        }
        return false;
    }

}

const service=new Service();

export default service;