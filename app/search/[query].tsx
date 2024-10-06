import { Text, View, Image, FlatList, RefreshControl } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Videos } from "../(tabs)/_types/types";
import VideoCard from "@/components/VideoCard";
import { images } from "@/shared/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import useAppWrite from "@/shared/hooks/useAppWrite";
import { useEffect, useState } from "react";
import {
  getAllPosts,
  getLatestPosts,
  searchPosts,
} from "@/shared/lib/appWrite";
import log from "@/utils/logger";
import { Query } from "react-native-appwrite";
import { IVideoData } from "./_types";
import Header from "./_components/Header";
import Items from "@/components/Items";

const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: posts, refetch } = useAppWrite<IVideoData>(
    searchPosts.bind(null, query as string)
  );

  useEffect(() => {
    refetch();
  }, [query]);

  //log.info(`data: ${posts.length}`);

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item?.$id?.toString()!}
        renderItem={(itemInfo) => (
          <Items item={itemInfo.item} key={itemInfo.item?.$id} />
        )}
        ListHeaderComponent={<Header query={query as string} />}
        ListEmptyComponent={
          <EmptyState
            title="No videos found"
            subTitle="No Videos found for this search query"
          />
        }
      />

      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default Search;
