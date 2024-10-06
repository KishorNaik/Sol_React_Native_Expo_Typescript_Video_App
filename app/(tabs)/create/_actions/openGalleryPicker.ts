import log from "@/utils/logger";
import { IVideoRequestDTO } from "../_types";
import * as ImagePicker from "expo-image-picker";

export interface IOpenGalleryPickerRequestTypes{
    selectType:string,
    form:IVideoRequestDTO,
    state:{
        setForm:React.Dispatch<React.SetStateAction<IVideoRequestDTO>>
    }  
} 

const openPickerAsync=async(params:IOpenGalleryPickerRequestTypes)=>{

    const {selectType,form,state}=params

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          selectType === `image`
            ? ImagePicker.MediaTypeOptions.Images
            : ImagePicker.MediaTypeOptions.Videos,
        aspect: [4, 3],
        quality: 1,
      });

    if (!result.canceled) {
    if (selectType === `image`) {
        //log.info(`Image Asset URL`, JSON.stringify(result.assets[0]));
        state.setForm({ ...form, thumbnail: result.assets[0] });
    }

    if (selectType === `video`) {
        //log.info(`Video Asset URL`, JSON.stringify(result.assets[0]));
        state.setForm({ ...form, video: result.assets[0] });
    }
    }
}

export default openPickerAsync;