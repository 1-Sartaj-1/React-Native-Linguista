import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import { colors } from "@/constants/theme";

type GradientButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export function GradientButton({ title, onPress, loading, disabled }: GradientButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={isDisabled}
      style={{ opacity: isDisabled ? 0.7 : 1 }}
    >
      <LinearGradient
        colors={[colors.primary.linguaPurple, colors.primary.linguaDeepPurple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          paddingVertical: 16,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="font-poppins-semibold text-body-lg text-white">{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
