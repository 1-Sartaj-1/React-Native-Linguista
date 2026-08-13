import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/theme";

// Mock scores until the AI teacher session reports real ones.
const FEEDBACK = [
  { label: "Speaking", value: "Excellent", valueClassName: "text-success" },
  { label: "Pronunciation", value: "Great", valueClassName: "text-info" },
  { label: "Grammar", value: "Good", valueClassName: "text-lingua-purple" },
];

export function LessonFeedbackCard() {
  return (
    <View className="mx-5 mt-4 flex-row rounded-3xl bg-background py-6" style={styles.card}>
      {FEEDBACK.map((item, index) => (
        <View
          key={item.label}
          className={`flex-1 items-center px-2 ${index > 0 ? "border-l border-border" : ""}`}
        >
          <Text className="font-poppins-semibold text-body-lg text-text-primary">{item.label}</Text>
          <Text className={`mt-3 font-poppins-medium text-body-lg ${item.valueClassName}`}>
            {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: colors.neutral.textPrimary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
});
