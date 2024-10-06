import { ImagePickerAsset } from "expo-image-picker";

export interface IVideoRequestDTO {
    title: string;
    prompt: string;
    video: ImagePickerAsset | null;
    thumbnail: ImagePickerAsset | null;
    userId?: string;
}