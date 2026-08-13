import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/theme";

type TeacherBubbleProps = {
  // What the teacher is saying right now (the phrase in the target language).
  text: string;
  pronunciation?: string;
  // English translation, hidden when subtitles are turned off.
  translation?: string;
  onPlay: () => void;
};

export function TeacherBubble({ text, pronunciation, translation, onPlay }: TeacherBubbleProps) {
  return (
    <View className="pb-4">
      <View className="flex-row items-center rounded-3xl bg-background px-5 py-4" style={styles.bubble}>
        <View className="flex-1 pr-3">
          <Text className="font-poppins-medium text-body-lg text-text-primary">{text}</Text>

          {pronunciation ? (
            <Text className="mt-0.5 font-poppins-regular text-body-sm text-text-secondary">
              {pronunciation}
            </Text>
          ) : null}

          {translation ? (
            <Text className="mt-1 font-poppins-medium text-body-lg text-text-primary">
              {translation}
            </Text>
          ) : null}
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPlay}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Hear the next phrase"
        >
          <Ionicons name="volume-high" size={28} color={colors.primary.linguaPurple} />
        </TouchableOpacity>
      </View>

      <View style={styles.tail} />
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    shadowColor: colors.neutral.textPrimary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },
  // Little pointer under the bubble, aimed at the teacher.
  tail: {
    position: "absolute",
    right: 40,
    bottom: 4,
    height: 20,
    width: 20,
    borderRadius: 3,
    backgroundColor: colors.neutral.background,
    transform: [{ rotate: "45deg" }],
  },
});
