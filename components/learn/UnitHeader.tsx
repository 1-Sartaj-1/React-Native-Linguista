import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/theme";

type UnitHeaderProps = {
  title: string;
  subtitle: string;
  bookmarked: boolean;
  onBack: () => void;
  onToggleBookmark: () => void;
};

export function UnitHeader({
  title,
  subtitle,
  bookmarked,
  onBack,
  onToggleBookmark,
}: UnitHeaderProps) {
  return (
    <View className="flex-row items-start px-5 pb-4 pt-1">
      <TouchableOpacity activeOpacity={0.7} onPress={onBack} hitSlop={12} className="pt-1">
        <Ionicons name="chevron-back" size={26} color={colors.neutral.textPrimary} />
      </TouchableOpacity>

      <View className="ml-3 flex-1">
        <Text className="font-poppins-semibold text-h3 text-text-primary" numberOfLines={1}>
          {title}
        </Text>
        <Text className="font-poppins-regular text-body-lg text-text-secondary">{subtitle}</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onToggleBookmark}
        hitSlop={12}
        className="pt-1"
        accessibilityRole="button"
        accessibilityLabel={bookmarked ? "Remove bookmark" : "Bookmark this unit"}
      >
        <Ionicons
          name={bookmarked ? "bookmark" : "bookmark-outline"}
          size={26}
          color={bookmarked ? colors.semantic.streak : colors.neutral.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
}
