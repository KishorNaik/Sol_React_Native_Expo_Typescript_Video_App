import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";

const useAppWrite=<T>(fn:Function) =>{
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchVideos = async () => {
        setIsLoading(true);
  
        try {
          const postsResult = await fn();
          if (postsResult.isErr()) {
            Alert.alert("Error", postsResult.error.message);
            return;
          }
  
          setData(postsResult.value);
        } catch (ex) {
          const error = ex as Error;
          Alert.alert("Error", error.message);
        } finally {
          setIsLoading(false);
        }
      };
  
    useEffect(() => {
      fetchVideos();
    }, []);

    const refetch = () => fetchVideos();

    return {data, isLoading, refetch};
};

export default useAppWrite;