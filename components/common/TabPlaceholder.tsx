import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/theme";

type TabPlaceholderProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

export function TabPlaceholder({ icon, title, description }: TabPlaceholderProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <View className="flex-1 items-center justify-center gap-3 px-8">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-surface">
          <Ionicons name={icon} size={28} color={colors.primary.linguaPurple} />
        </View>
        <Text className="font-poppins-bold text-h2 text-text-primary">{title}</Text>
        <Text className="text-center font-poppins-regular text-body-md text-text-secondary">
          {description}
        </Text>
      </View>
    </SafeAreaView>
  );
}
