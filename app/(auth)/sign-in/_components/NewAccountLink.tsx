import { Link } from "expo-router";
import { View, Text } from "react-native";

const NewAccountLink = () => {
  return (
    <View className="flex flex-row justify-center gap-2 pt-5">
      <Text className="text-lg text-gray-100 font-pregular">
        Don't have an account?
      </Text>
      <Link
        className="text-lg font-psemibold text-secondary"
        href={{
          pathname: "../sign-up",
        }}
      >
        Sign Up
      </Link>
    </View>
  );
};

export default NewAccountLink;
