import { Models } from "react-native-appwrite";
import { ISignUpRequestTypes } from "../_types";
import { Alert } from "react-native";
import { createUserAsync } from "@/shared/lib/appWrite";
import { router } from "expo-router";

export interface ISignUpOnsubmitRequestTypes {
    form: ISignUpRequestTypes;
    state:{
        setIsSubmitting:React.Dispatch<React.SetStateAction<boolean>>
        SetUser:React.Dispatch<React.SetStateAction<Models.Document | null>>;
        setIsLogged:React.Dispatch<React.SetStateAction<boolean>>
    }
}

export const onSignUpSubmitAsync = async (params: ISignUpOnsubmitRequestTypes) => {
    const { form, state } = params;

    if (!form.userName || !form.email || !form.password) {
        Alert.alert("Error", "Please fill in all fields");
        return;
    }

    state.setIsSubmitting(true);

    try {
        const createUserResult = await createUserAsync({
          email: form.email,
          password: form.password,
          userName: form.userName,
        });
  
        if (createUserResult.isErr()) {
          Alert.alert("Error", createUserResult.error.message);
          return;
        }
  
        // Set it global state...
        state.SetUser(createUserResult.value);
        state.setIsLogged(true);
  
        // Navigate to home screen...
        Alert.alert("Success", "User created successfully");
        router.replace("/(auth)/sign-in");
      } catch (ex) {
        const error = ex as Error;
        Alert.alert("Error", error.message);
      } finally {
        state.setIsSubmitting(false);
      }
}