import SearchInput from "@/components/SearchInput";
import { Text, View } from "react-native";
interface IListHeaderProps {
  query: string;
}

const Header = (params: IListHeaderProps) => {
  return (
    <View className="px-4 my-6">
      <Text className="text-sm text-gray-100 font-pmedium">Search Result</Text>
      <Text className="text-2xl text-white font-psemibold">{params.query}</Text>

      <View className="mt-6 mb-8">
        <SearchInput initialQuery={params.query} />
      </View>
    </View>
  );
};

export default Header;
