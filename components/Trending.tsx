import { Videos } from "@/app/(tabs)/_types/types";
import { icons } from "@/shared/constants";
import log from "@/utils/logger";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
  ImageBackground,
  Image,
  ViewToken,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { CustomAnimation } from "react-native-animatable";
import { Video, ResizeMode } from "expo-av";

interface ITrendingItemProps {
  item: Videos;
  activeItem?: Videos;
}

const zoomInConfig: CustomAnimation<ViewStyle & TextStyle & ImageStyle> = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1.1 }],
  },
};

const zoomOutConfig: CustomAnimation<ViewStyle & TextStyle & ImageStyle> = {
  0: {
    transform: [{ scale: 1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};

const TrendingItem = (params: ITrendingItemProps) => {
  const [play, setPlay] = useState(false);

  const animation =
    params.item.$id === params.activeItem?.$id ? zoomInConfig : zoomOutConfig;

  return (
    <Animatable.View className="mr-5" animation={animation} duration={500}>
      {play ? (
        <Video
          source={{ uri: params.item.video! }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded === true && status.didJustFinish === true) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative items-center justify-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: params.item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

interface ITrendingProps {
  posts: Videos[];
}

const Trending = (params: ITrendingProps) => {
  //log.info(`Post1: ${JSON.stringify(params.posts[1])}`);
  const [activeItem, setActiveItem] = useState<Videos | undefined>(undefined);

  useEffect(() => {
    if (params.posts && params.posts[1]) {
      setActiveItem(params.posts[1]);
      //log.info(`ActiveItem: ${JSON.stringify(activeItem)}`);
    }
  }, [params.posts]);

  useEffect(() => {
    //log.info(`ActiveItem: ${JSON.stringify(activeItem)}`);
  }, [activeItem]);

  const viewableItemsChangeHandler = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<Videos>[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
    }
  };

  return (
    <FlatList
      data={params.posts}
      keyExtractor={(item) => item?.$id?.toString()!}
      renderItem={({ item }) => (
        <TrendingItem item={item} activeItem={activeItem} />
      )}
      onViewableItemsChanged={viewableItemsChangeHandler}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
