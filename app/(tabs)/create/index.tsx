import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/shared/contexts/GlobalProvider";
import { IVideoRequestDTO } from "./_types";
import UploadVideo from "./_components/UploadVideo";
import openPickerAsync from "./_actions/openGalleryPicker";
import UploadImage from "./_components/UploadImage";
import { onCreateSubmitAsync } from "./_actions/onCreateSubmit";

const Create = () => {
  const { user } = useGlobalContext()!;
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<IVideoRequestDTO>({
    title: "",
    prompt: "",
    video: null,
    thumbnail: null,
  });

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a title"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          textStyle="mt-10"
        ></FormField>

        <UploadVideo
          form={form}
          onPress={() =>
            openPickerAsync({
              selectType: `video`,
              form: form,
              state: {
                setForm: setForm,
              },
            })
          }
        />

        <UploadImage
          form={form}
          onPress={() =>
            openPickerAsync({
              selectType: `image`,
              form: form,
              state: {
                setForm: setForm,
              },
            })
          }
        />

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          textStyle="mt-7"
        ></FormField>

        <CustomButton
          title="Submit & Publish"
          onPress={() =>
            onCreateSubmitAsync({
              form: form,
              state: {
                setUploading: setUploading,
                setForm: setForm,
              },
              user: user,
            })
          }
          containerStyle="mt-7"
          isLoading={uploading}
        ></CustomButton>
      </ScrollView>

      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default Create;
