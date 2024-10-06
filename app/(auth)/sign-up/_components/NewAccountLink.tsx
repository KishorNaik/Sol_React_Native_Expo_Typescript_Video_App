import { Link } from "expo-router";
import { View, Text } from "react-native";

const ExistingAccountLink = () => {
  return (
    <View className="flex flex-row justify-center gap-2 pt-5">
      <Text className="text-lg text-gray-100 font-pregular">
        Have an account already?
      </Text>
      <Link
        className="text-lg font-psemibold text-secondary"
        href={{
          pathname: "../sign-in",
        }}
      >
        Sign In
      </Link>
    </View>
  );
};

export default ExistingAccountLink;
