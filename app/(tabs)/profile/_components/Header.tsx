import { Models } from "react-native-appwrite";
import { IVideoData } from "../_types";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "@/shared/constants";
import InfoBox from "@/components/InfoBox";

export interface IHeaderProps {
  user: Models.Document;
  posts?: IVideoData[];
  onLogoutPress?: () => void;
}

const Header = (params: IHeaderProps) => {
  return (
    <View className="items-center justify-center w-full px-4 mt-6 mb-12">
      <TouchableOpacity
        className="items-end w-full mb-10"
        onPress={params.onLogoutPress}
      >
        <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
      </TouchableOpacity>

      <View className="items-center justify-center w-16 h-16 border rounded-lg border-secondary">
        <Image
          source={{ uri: params?.user?.avatar }}
          className="w-[90%] h-[90%] rounded-lg"
          resizeMode="contain"
        />
      </View>

      <InfoBox
        title={params?.user?.username}
        containerStyles="mt-5"
        titleStyles="text-lg"
      />

      <View className="flex flex-row mt-5">
        <InfoBox
          title={params.posts?.length || 0}
          subTitle="Posts"
          containerStyles="mr-10"
          titleStyles="text-xl"
        />

        <InfoBox title="1.2k" subTitle="Followers" titleStyles="text-xl" />
      </View>
    </View>
  );
};

export default Header;
