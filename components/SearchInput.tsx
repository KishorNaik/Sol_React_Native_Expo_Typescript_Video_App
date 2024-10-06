import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../shared/constants";
import { router, usePathname } from "expo-router";
import log from "@/utils/logger";

interface ISearchInputProps {
  initialQuery?: string;
  [key: string]: any;
}

const SearchInput = (params: ISearchInputProps) => {
  const { initialQuery = "", ...rest } = params;

  const pathName = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex flex-row items-center w-full h-16 px-4 space-x-4 border-2 border-orange-400 bg-black-100 rounded-2xl focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white font-pregular flex flex-1"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search results across the database"
            );
          }
          //log.info(`query: ${query}`);
          //log.info(`pathName: ${pathName}`);
          if (pathName.startsWith(`/search`)) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
