import { Alert } from "react-native";
import { IVideoRequestDTO } from "../_types";
import { Models } from "react-native-appwrite";
import { createVideo } from "@/shared/lib/appWrite";
import { router } from "expo-router";

export interface IOnCreateSubmitRequestTypes {
    form: IVideoRequestDTO;
    user: Models.Document | null;
    state:{
        setUploading:React.Dispatch<React.SetStateAction<boolean>>
        setForm: React.Dispatch<React.SetStateAction<IVideoRequestDTO>>

    }
}

export const onCreateSubmitAsync = async (params:IOnCreateSubmitRequestTypes) => {
    const {form,state,user} =params;

    if (!form.title || !form.prompt || !form.video || !form.thumbnail) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      state.setUploading(true);

      try {
        await createVideo({
          ...form,
          userId: user?.$id,
        });
  
        Alert.alert("Success", "Video uploaded successfully");
        router.replace("/(tabs)/home");
      } catch (ex) {
        const error = ex as Error;
        Alert.alert("Error", error.message);
      } finally {
        state.setForm({
          title: "",
          prompt: "",
          video: null,
          thumbnail: null,
        });
  
        state.setUploading(false);
      }

}