const conf={
    appwriteProjectId:import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteProjectName:import.meta.env.VITE_APPWRITE_PROJECT_NAME,
    appwriteEndpoint:import.meta.env.VITE_APPWRITE_ENDPOINT,
    appwriteDatabaseId:import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appwriteCollectionId:import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    appwriteBucketId:import.meta.env.VITE_APPWRITE_BUCKET_ID
}

export default conf;