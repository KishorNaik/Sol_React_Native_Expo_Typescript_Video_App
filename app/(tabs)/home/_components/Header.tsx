import { Text, View } from "react-native";
import { IVideoData } from "../_types";
import WelcomeTitle from "./WelcomeTitle";
import Logo from "./Logo";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";

interface IListHeaderProps {
  latestVideos?: IVideoData[];
  userName?: string;
}
const Header = (params: IListHeaderProps) => {
  //log.info(`data: ${params.latestVideos?.length}`);

  return (
    <View className="px-4 my-6 space-y-6">
      <View className="flex flex-row items-start justify-between mb-4">
        <WelcomeTitle userName={params.userName || ""} />
        <Logo />
      </View>

      <SearchInput />

      {/* <View className="flex flex-1 w-full pt-5 pb-8"> */}
      <Text className="mb-3 text-lg text-gray-100 font-pregular">
        Latest Video's
      </Text>
      {/* </View> */}

      <Trending posts={params.latestVideos || []} />
    </View>
  );
};

export default Header;
