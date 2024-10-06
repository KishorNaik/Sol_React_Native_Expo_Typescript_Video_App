import { StatusBar } from "expo-status-bar";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "@/components/EmptyState";
import { useEffect, useState } from "react";
import { getAllPosts, getLatestPosts } from "@/shared/lib/appWrite";
import { Models } from "react-native-appwrite";
import useAppWrite from "@/shared/hooks/useAppWrite";
import { useGlobalContext } from "@/shared/contexts/GlobalProvider";
import { IVideoData } from "./_types";
import Header from "./_components/Header";
import Items from "../../../components/Items";
import { onRefresh } from "./_actions/onRefresh";

const Home = () => {
  const { user, SetUser, setIsLoggedIn } = useGlobalContext()!;

  const { data: posts, refetch } = useAppWrite<IVideoData>(getAllPosts);
  const { data: latestPost } = useAppWrite<IVideoData>(getLatestPosts);

  //log.info(`data: ${posts.length} and latestPost: ${latestPost.length}`);

  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item?.$id?.toString()!}
        renderItem={(itemInfo) => (
          <Items item={itemInfo.item} key={itemInfo.item?.$id} />
        )}
        ListHeaderComponent={
          <Header latestVideos={latestPost} userName={user?.username}></Header>
        }
        ListEmptyComponent={
          <EmptyState
            title="No videos found"
            subTitle="Be the first to upload a video"
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() =>
              onRefresh({
                refetch: refetch,
                state: {
                  setRefreshing: setRefreshing,
                },
              })
            }
          />
        }
      />

      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default Home;
