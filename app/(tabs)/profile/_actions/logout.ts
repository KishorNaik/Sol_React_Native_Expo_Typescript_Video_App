import { signOut } from "@/shared/lib/appWrite";
import { router } from "expo-router";
import { Models } from "react-native-appwrite";

export interface ILogoutRequestTypes {
    state:{
        setUser: React.Dispatch<React.SetStateAction<Models.Document | null>>;
        setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    }
}

export const logoutAsync=async (parmas: ILogoutRequestTypes)=>{
    const {state}=parmas;

    await signOut();
    state.setIsLoggedIn(false);
    state.setUser(null);

    router.replace("/sign-in");
}