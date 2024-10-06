import "react-native-url-polyfill/auto";
import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../shared/constants/images";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/shared/contexts/GlobalProvider";
import log from "@/utils/logger";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext()!;
  log.info(`isLoading: ${isLoading}` + `isLoggedIn: ${isLoggedIn}`);

  if (!isLoading && isLoggedIn) {
    return <Redirect href="./(tabs)/home" />;
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center w-full h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          ></Image>

          <View className="relative mt-5">
            <Text className="text-3xl font-bold text-center text-white">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            ></Image>
          </View>
          <Text className="text-sm text-center text-gray-100 font-pregular mt-7">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            containerStyle="w-full mt-7"
            onPress={() => router.push("/(auth)/sign-in")}
          ></CustomButton>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
