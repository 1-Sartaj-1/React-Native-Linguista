import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/theme";
import type { Language } from "@/types/learning";

type LanguageListItemProps = {
  language: Language;
  selected: boolean;
  onPress: () => void;
};

export function LanguageListItem({ language, selected, onPress }: LanguageListItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`flex-row items-center gap-3 rounded-2xl border px-4 py-3.5 ${
        selected ? "border-lingua-purple bg-lingua-purple/5" : "border-border bg-background"
      }`}
    >
      <View className="h-11 w-11 items-center justify-center rounded-full bg-surface">
        <Text className="text-2xl">{language.flagEmoji}</Text>
      </View>

      <View className="flex-1">
        <Text className="font-poppins-semibold text-body-lg text-text-primary">
          {language.name}
        </Text>
        <Text className="font-poppins-regular text-body-sm text-text-secondary">
          {language.learners}
        </Text>
      </View>

      {selected ? (
        <View className="h-7 w-7 items-center justify-center rounded-full bg-lingua-purple">
          <Ionicons name="checkmark" size={16} color="#ffffff" />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={20} color={colors.neutral.textSecondary} />
      )}
    </TouchableOpacity>
  );
}
