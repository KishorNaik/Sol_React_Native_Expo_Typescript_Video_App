import { Image, View, Text } from "react-native";
import { images } from "../shared/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface IEmptyStateProps {
  title: string;
  subTitle: string;
}

const EmptyState = (params: IEmptyStateProps) => {
  return (
    <View className="items-center justify-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />

      <Text className="mt-2 text-xl text-center text-white font-psemibold">
        {params.title}
      </Text>
      <Text className="text-sm text-gray-100 font-pmedium">
        {params.subTitle}
      </Text>

      <CustomButton
        title="Create Video"
        onPress={() => router.push("/create")}
        containerStyle="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
