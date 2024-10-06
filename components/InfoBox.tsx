import { View, Text } from "react-native";

export interface IInfoBoxProps {
  title: string | any;
  subTitle?: string;
  containerStyles?: string;
  titleStyles?: string;
}

export const InfoBox = (params: IInfoBoxProps) => {
  return (
    <View className={params.containerStyles}>
      <Text
        className={`text-white text-center font-psemibold ${params.titleStyles}`}
      >
        {params.title}
      </Text>
      <Text className="text-sm text-center text-gray-100 font-pregular">
        {params.subTitle}
      </Text>
    </View>
  );
};

export default InfoBox;
