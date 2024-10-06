import { Account, Avatars, Client, Databases, ID, ImageGravity, Models, Query, Storage } from 'react-native-appwrite';
import { Err, Ok, Result } from "neverthrow";
import { Videos } from '@/app/(tabs)/_types/types';
import Enumerable from 'linq';
import log from '@/utils/logger';
import { ImagePickerAsset } from 'expo-image-picker';
import { IVideoRequestDTO } from '@/app/(tabs)/create/_types';

export interface IAppWriteConfig {
    endpoint?: string;
    platform?: string;
    projectId?: string;
    databaseId?: string;
    userCollectionId?: string;
    videoCollectionId?: string;
    storageBucketId?: string;
}


export const appWriteConfig: IAppWriteConfig = {
    endpoint:process.env.EXPO_PUBLIC_ENDPOINT,
    platform: process.env.EXPO_PUBLIC_PLATFORM,
    projectId:  process.env.EXPO_PUBLIC_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_DATABASE_ID,
    userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID,
    videoCollectionId:  process.env.EXPO_PUBLIC_VIDEO_COLLECTION_ID,
    storageBucketId:process.env.EXPO_STORAGE_BUCKET_ID
}

log.info(appWriteConfig);

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appWriteConfig.endpoint!) // Your Appwrite Endpoint
    .setProject(appWriteConfig.projectId!) // Your project ID
    .setPlatform(appWriteConfig.platform!) // Your application ID or bundle ID
    ;

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export interface ICreateUserRequestDTO {
    email: string;
    password: string;
    userName: string;
}
export const createUserAsync = async (params: ICreateUserRequestDTO): Promise<Result<Models.Document, Error>> => {
    try {
        // New User Account for Auth
        const newAccount = await account.create(ID.unique(), params.email, params.password, params.userName);

        if (!newAccount)
            return new Err(new Error("User account creation failed"));

        // New User Avatar
        const avatarUrl = avatar.getInitials(params.userName);

        if (!avatarUrl)
            return new Err(new Error("Avatar creation failed"));

        // Create User Sign In Session
        const signInResult = await signInAsync(params.email, params.password);
        if (signInResult.isErr())
            return new Err(signInResult.error);

        // Create User in Database
        const newUser = await databases.createDocument(appWriteConfig.databaseId!, appWriteConfig.userCollectionId!, ID.unique(), {
            accountId: newAccount.$id,
            username: params.userName,
            avatar: avatarUrl,
            email: params.email
        });

        if (!newUser)
            return new Err(new Error("User creation failed"));

        return new Ok(newUser);
    }
    catch (ex) {
        const error = ex as Error;
        return new Err(new Error(error.message))
    }

}

export const signInAsync = async (email: string, password: string): Promise<Result<Models.Session, Error>> => {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        if (!session)
            return new Err(new Error("User session creation failed"));

        return new Ok(session);
    }
    catch (ex) {
        const error = ex as Error;
        return new Err(new Error(error.message))
    }
}

export const getCurrentUserAsync = async (): Promise<Result<Models.Document, Error>> => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount)
            return new Err(new Error("User account not found"));

        const currentUser = await databases.listDocuments(appWriteConfig.databaseId!, appWriteConfig.userCollectionId!, [Query.equal("accountId", currentAccount.$id)]);

        if (!currentUser)
            return new Err(new Error("User not found"));

        return new Ok(currentUser.documents[0]);
    }
    catch (ex) {
        const error = ex as Error;
        return new Err(new Error(error.message))
    }
}

export const getAllPosts = async (): Promise<Result<Videos[], Error>> => {
    try {
        const posts = await databases.listDocuments(appWriteConfig.databaseId!, appWriteConfig.videoCollectionId!, [Query.orderDesc("$createdAt")]);

        if (!posts)
            return new Err(new Error("Posts not found"));

        const results: Videos[] = Enumerable
            .from(posts.documents)
            .select<Videos>(x => ({
                $id: x.$id,
                title: x.title,
                prompt: x.prompt,
                thumbnail: x.thumbnail,
                video: x.video,
                creator: x.creator
            }))
            .toArray();


        return new Ok(results);
    }
    catch (ex) {
        const error = ex as Error;
        return new Err(new Error(error.message))
    }
}

export const getLatestPosts = async (): Promise<Result<Videos[], Error>> => {
    try {
        const posts = await databases.listDocuments(appWriteConfig.databaseId!, appWriteConfig.videoCollectionId!, [Query.orderDesc("$createdAt"), Query.limit(7)]);

        if (!posts)
            return new Err(new Error("Posts not found"));

        const results: Videos[] = Enumerable
            .from(posts.documents)
            .select<Videos>(x => ({
                $id: x.$id,
                title: x.title,
                prompt: x.prompt,
                thumbnail: x.thumbnail,
                video: x.video,
                creator: x.creator
            }))
            .toArray();

        return new Ok(results);
    }
    catch (ex) {
        const error = ex as Error;
        return new Err(new Error(error.message))
    }
}

export const searchPosts = async (query: string): Promise<Result<Videos[], Error>> => {
    try {
        //log.info("Searching for posts with query: " + query);
        const posts = await databases.listDocuments(appWriteConfig.databaseId!, appWriteConfig.videoCollectionId!, [Query.search("title", query)]);

        if (!posts)
            return new Err(new Error("Posts not found"));

        //log.info("Found " + posts.documents.length + " posts");

        const results: Videos[] = Enumerable
            .from(posts.documents)
            .select<Videos>(x => ({
                $id: x.$id,
                title: x.title,
                prompt: x.prompt,
                thumbnail: x.thumbnail,
                video: x.video,
                creator: x.creator
            }))
            .toArray();

        return new Ok(results);
    }
    catch (ex) {
        const error = ex as Error;
        return new Err(new Error(error.message))
    }
}

export const getUserPosts = async (userId: string): Promise<Result<Videos[], Error>> => {
    try {
        //log.info("Searching for posts with query: " + query);
        const posts = await databases.listDocuments(appWriteConfig.databaseId!, appWriteConfig.videoCollectionId!, [Query.equal("creator", userId), Query.orderDesc("$createdAt")]);

        if (!posts)
            return new Err(new Error("Posts not found"));

        //log.info("Found " + posts.documents.length + " posts");

        const results: Videos[] = Enumerable
            .from(posts.documents)
            .select<Videos>(x => ({
                $id: x.$id,
                title: x.title,
                prompt: x.prompt,
                thumbnail: x.thumbnail,
                video: x.video,
                creator: x.creator
            }))
            .toArray();

        return new Ok(results);
    }
    catch (ex) {
        const error = ex as Error;
        return new Err(new Error(error.message))
    }
}


export const signOut = async (): Promise<Result<{}, Error>> => {
    try {
        const session = await account.deleteSession("current");

        if (!session)
            return new Err(new Error("User session creation failed"));

        return new Ok(session);
    }
    catch (ex) {
        const error = ex as Error;
        return new Err(new Error(error.message))
    }

}

export const getFilePreview = (fileId: string, type: string): URL => {
    let fileUrl: URL;
    try {
        if (type === "video") {
            fileUrl = storage.getFileView(appWriteConfig.storageBucketId!, fileId);
        }
        else if (type === "image") {
            fileUrl = storage.getFilePreview(appWriteConfig.storageBucketId!, fileId, 2000, 2000, ImageGravity.Top, 100);
        }
        else {
            throw new Error("Invalid file type");
        }

        if (!fileUrl)
            throw new Error("File not found");

        return fileUrl;
    }
    catch (ex) {
        const error = ex as Error;
        throw new Error(error.message)
    }
}

export const uploadFile = async (file: ImagePickerAsset, type: string) => {
    try {
        if (!file)
            return;

        const asset = {
            name: file.fileName!,
            type: file.mimeType!,
            size: file.fileSize!,
            uri: file.uri!
        }

        try {
            const uploadFile = await storage.createFile(appWriteConfig.storageBucketId!, ID.unique(), asset!);

            const fileUrl = await getFilePreview(uploadFile.$id, type);

            return fileUrl;
        }
        catch (ex) {
            const error = ex as Error;
            throw new Error(error.message)
        }
    }
    catch (ex) {
        const error = ex as Error;
        throw new Error(error.message)
    }
}

export const createVideo = async (params: IVideoRequestDTO): Promise<Result<Models.Document, Error>> => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(params.thumbnail!, "image"),
            uploadFile(params.video!, "video")
        ]);

        if (!thumbnailUrl || !videoUrl)
            return new Err(new Error("File upload failed"));

        const newVideo = await databases.createDocument(appWriteConfig.databaseId!, appWriteConfig.videoCollectionId!, ID.unique(), {
            title: params.title,
            prompt: params.prompt,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            creator: params.userId
        });

        if (!newVideo)
            return new Err(new Error("Video creation failed"));

        return new Ok(newVideo);
    }
    catch (ex) {
        const error = ex as Error;
        return new Err(new Error(error.message))
    }
}