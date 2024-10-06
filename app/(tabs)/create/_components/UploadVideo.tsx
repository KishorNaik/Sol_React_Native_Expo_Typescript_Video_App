import { ResizeMode, Video } from "expo-av";
import { IVideoRequestDTO } from "../_types";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { icons } from "@/shared/constants";
import openPickerAsync from "../_actions/openGalleryPicker";

interface UploadVideoProps {
  form: IVideoRequestDTO;
  onPress?: () => void;
}

const UploadVideo = (parmas: UploadVideoProps) => {
  const { form, onPress } = parmas;
  return (
    <View className="space-y-2 mt-7">
      <Text className="text-base text-gray-100 font-pmedium">
        {" "}
        Upload Video
      </Text>
      <TouchableOpacity onPress={onPress}>
        {form.video ? (
          <Video
            source={{ uri: form.video.uri }}
            className="w-full h-64 rounded-xl"
            resizeMode={ResizeMode.COVER}
          />
        ) : (
          <View className="items-center justify-center w-full h-40 px-4 bg-black rounded-2xl">
            <View className="items-center justify-center border border-dashed w-14 h-14 border-secondary-100">
              <Image
                source={icons.upload}
                resizeMode="contain"
                className="w-1/2 h-1/2"
              />
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UploadVideo;
