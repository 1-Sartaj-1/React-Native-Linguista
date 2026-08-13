import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type IoniconName = keyof typeof Ionicons.glyphMap;

type TodaysPlanItemProps = {
  icon: IoniconName;
  iconBgClassName: string;
  title: string;
  subtitle: string;
  done: boolean;
  onPress: () => void;
};

export function TodaysPlanItem({
  icon,
  iconBgClassName,
  title,
  subtitle,
  done,
  onPress,
}: TodaysPlanItemProps) {
  return (
    <View className="flex-row items-center">
      <View className={`h-11 w-11 items-center justify-center rounded-2xl ${iconBgClassName}`}>
        <Ionicons name={icon} size={20} color="#ffffff" />
      </View>

      <View className="ml-3 flex-1">
        <Text className="font-poppins-semibold text-body-lg text-text-primary">{title}</Text>
        <Text className="font-poppins-regular text-body-sm text-text-secondary">{subtitle}</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        hitSlop={8}
        className={`h-7 w-7 items-center justify-center rounded-full ${
          done ? "bg-lingua-purple" : "border-2 border-border"
        }`}
      >
        {done ? <Ionicons name="checkmark" size={16} color="#ffffff" /> : null}
      </TouchableOpacity>
    </View>
  );
}
