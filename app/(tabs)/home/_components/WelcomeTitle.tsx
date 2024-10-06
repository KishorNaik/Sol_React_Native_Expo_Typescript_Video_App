import { Text, View } from "react-native";

interface IWelcomeTitleProps {
  userName?: string;
}

const WelcomeTitle = (params: IWelcomeTitleProps) => {
  const { userName } = params;
  return (
    <View>
      <Text className="text-sm text-gray-100 font-pmedium">Welcome back,</Text>
      <Text className="text-2xl text-white font-psemibold">{userName}</Text>
    </View>
  );
};

export default WelcomeTitle;
