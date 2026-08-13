import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

import { images } from "@/constants/images";
import { colors } from "@/constants/theme";

type GreetingHeaderProps = {
  name: string;
  greeting: string;
  flagEmoji: string;
  streak: number;
};

export function GreetingHeader({ name, greeting, flagEmoji, streak }: GreetingHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <View className="h-11 w-11 items-center justify-center rounded-full bg-surface">
          <Text className="text-xl">{flagEmoji}</Text>
        </View>
        <Text className="font-poppins-semibold text-h4 text-text-primary">
          {greeting}, {name}! 👋
        </Text>
      </View>

      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-1">
          <Image source={images.streakFire} style={{ width: 22, height: 22 }} resizeMode="contain" />
          <Text className="font-poppins-semibold text-body-md text-text-primary">{streak}</Text>
        </View>
        <Ionicons name="notifications-outline" size={22} color={colors.neutral.textPrimary} />
      </View>
    </View>
  );
}
