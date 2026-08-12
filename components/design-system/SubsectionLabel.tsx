import { Text, View } from "react-native";

export function SubsectionLabel({ label }: { label: string }) {
  return (
    <View className="mb-3 border-b border-border pb-2">
      <Text className="font-poppins-semibold text-caption tracking-widest text-text-secondary">
        {label}
      </Text>
    </View>
  );
}
