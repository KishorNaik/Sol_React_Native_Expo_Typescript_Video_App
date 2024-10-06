import { TouchableOpacity, Text } from "react-native";

interface ICustomButtonProps {
  title: string;
  onPress?: () => void;
  containerStyle?: string;
  textStyle?: string;
  isLoading?: boolean;
}

const CustomButton = (params: ICustomButtonProps) => {
  const { title, onPress, containerStyle, isLoading, textStyle } = params;

  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      activeOpacity={0.7}
      disabled={isLoading}
      onPress={onPress}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
