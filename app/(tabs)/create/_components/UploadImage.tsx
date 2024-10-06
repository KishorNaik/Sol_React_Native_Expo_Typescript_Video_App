import { icons } from "@/shared/constants";
import { IVideoRequestDTO } from "../_types";
import { Text, View, Image, TouchableOpacity } from "react-native";

export interface IUploadImageProps {
  form: IVideoRequestDTO;
  onPress?: () => void;
}

const UploadImage = (parmas: IUploadImageProps) => {
  const { form, onPress } = parmas;

  return (
    <View className="space-y-2 mt-7">
      <Text className="text-base text-gray-100 font-pmedium">
        Thumbnail Image
      </Text>
      <TouchableOpacity onPress={onPress}>
        {form.thumbnail ? (
          <Image
            source={{ uri: form.thumbnail.uri }}
            resizeMode="cover"
            className="w-full h-64 rounded-2xl"
          />
        ) : (
          <View className="flex flex-row items-center justify-center w-full h-16 px-4 space-x-2 bg-black border-2 rounded-2xl border-black-200">
            <Image
              source={icons.upload}
              resizeMode="contain"
              className="w-5 h-5"
            />
            <Text className="text-sm text-gray-100 font-pmedium">
              Choose a File
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UploadImage;
