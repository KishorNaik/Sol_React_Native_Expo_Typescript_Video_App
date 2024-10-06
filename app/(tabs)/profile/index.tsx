import {
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import EmptyState from "@/components/EmptyState";
import useAppWrite from "@/shared/hooks/useAppWrite";
import { useEffect, useState } from "react";
import {
  getAllPosts,
  getLatestPosts,
  getUserPosts,
  searchPosts,
  signOut,
} from "@/shared/lib/appWrite";
import log from "@/utils/logger";
import { Models, Query } from "react-native-appwrite";
import { useGlobalContext } from "@/shared/contexts/GlobalProvider";
import { IVideoData } from "./_types";
import Items from "@/components/Items";
import Header from "./_components/Header";
import { logoutAsync } from "./_actions/logout";

const Profile = () => {
  const { user, SetUser, setIsLoggedIn } = useGlobalContext()!;
  //log.info(`User: ${JSON.stringify(user)}`);
  //log.info(`userId: ${user?.$id}`);

  const { data: posts, refetch } = useAppWrite<IVideoData>(
    getUserPosts.bind(null, user?.$id!)
  );
  //log.info(`Post Length: ${posts?.length}`);

  // const { data: posts, refetch } = useAppWrite<IVideoData>(() =>
  //   getUserPosts(query as string)
  // );

  //log.info(`data: ${posts.length}`);

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item?.$id?.toString()!}
        renderItem={(itemInfo) => (
          <Items item={itemInfo.item} key={itemInfo.item?.$id} />
        )}
        ListHeaderComponent={
          <Header
            user={user!}
            posts={posts}
            onLogoutPress={() =>
              logoutAsync({
                state: {
                  setUser: SetUser,
                  setIsLoggedIn: setIsLoggedIn,
                },
              })
            }
          />
        }
        ListEmptyComponent={
          <EmptyState
            title="No videos found"
            subTitle="Be the first to upload a video"
          />
        }
      />
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default Profile;
