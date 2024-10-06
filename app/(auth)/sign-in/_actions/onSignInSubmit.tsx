import { Models } from "react-native-appwrite";
import { ISignInRequestTypes } from "../_types";
import { Alert } from "react-native";
import { getCurrentUserAsync, signInAsync } from "@/shared/lib/appWrite";
import { router } from "expo-router";

export interface ISignInOnSubmitRequestTypes {
  form: ISignInRequestTypes;
  state: {
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    SetUser: React.Dispatch<React.SetStateAction<Models.Document | null>>;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const onSignInSubmitAsync = async (params: ISignInOnSubmitRequestTypes) => {
  const { form, state } = params;

  if (!form.email || !form.password) {
    Alert.alert("Error", "Please fill in all fields");
    return;
  }

  state.setIsSubmitting(true);

  try {
    await signInAsync(form.email, form.password);

    const result = await getCurrentUserAsync();

    // Set it global state...
    if (result.isOk()) {
      state.SetUser(result.value);
      state.setIsLogged(true);
    }

    // Navigate to home screen...
    //Alert.alert("Success", "Login successful");
    router.replace("/(tabs)/home");
  } catch (ex) {
    const error = ex as Error;
    Alert.alert("Error", error.message);
  } finally {
    state.setIsSubmitting(false);
  }
};

export default onSignInSubmitAsync;
