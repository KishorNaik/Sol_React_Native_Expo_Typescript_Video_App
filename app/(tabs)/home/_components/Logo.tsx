import { images } from "@/shared/constants";
import { Text, View, Image } from "react-native";

const Logo = () => {
  return (
    <View className="mt-1.5">
      <Image
        source={images.logoSmall}
        className="h-10 w-9"
        resizeMode="contain"
      />
    </View>
  );
};

export default Logo;
