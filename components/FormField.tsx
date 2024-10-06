import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../shared/constants";

interface IShowPasswordProps {
  onPress: () => void;
  showPassword: boolean;
}

const ShowPassword = (params: IShowPasswordProps) => {
  return (
    <TouchableOpacity onPress={params.onPress}>
      <Image
        source={!params.showPassword ? icons.eye : icons.eyeHide}
        className="w-6 h-6"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

interface IFormFieldProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText?: (e: string) => void;
  textStyle?: string;
  keyboardType?: string;
  [key: string]: any;
}

const FormField = (params: IFormFieldProps) => {
  const {
    title,
    value,
    handleChangeText,
    textStyle,
    keyboardType,
    placeholder,
    ...rest
  } = params;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${textStyle}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="flex flex-row border-2 border-orange-400 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center">
        <TextInput
          className="flex flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <ShowPassword
            onPress={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
          />
        )}
      </View>
    </View>
  );
};

export default FormField;
