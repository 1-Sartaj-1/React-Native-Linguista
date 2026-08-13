import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/theme";

export type UnitTabKey = "lessons" | "practice";

const TABS: { key: UnitTabKey; label: string }[] = [
  { key: "lessons", label: "Lessons" },
  { key: "practice", label: "Practice" },
];

type UnitTabsProps = {
  value: UnitTabKey;
  onChange: (tab: UnitTabKey) => void;
};

export function UnitTabs({ value, onChange }: UnitTabsProps) {
  return (
    <View className="flex-row rounded-3xl bg-surface">
      {TABS.map((tab) => {
        const active = tab.key === value;

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.85}
            onPress={() => onChange(tab.key)}
            className="flex-1 items-center justify-center rounded-3xl py-4"
            style={active ? styles.activeTab : undefined}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <Text
              className={`font-poppins-semibold text-body-lg ${
                active ? "text-lingua-purple" : "text-text-secondary"
              }`}
            >
              {tab.label}
            </Text>

            {active ? (
              <View className="absolute inset-x-6 bottom-0 h-1 rounded-full bg-lingua-purple" />
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: colors.neutral.background,
    shadowColor: colors.neutral.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
});
