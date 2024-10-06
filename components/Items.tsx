import { IVideoData } from "../app/(tabs)/home/_types";
import VideoCard from "./VideoCard";

export interface IItemsProps {
  item: IVideoData;
}

const Items = (params: IItemsProps) => {
  const { item } = params;

  return <VideoCard videos={item} />;
};

export default Items;
