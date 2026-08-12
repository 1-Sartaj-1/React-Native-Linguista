import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";

import { colors } from "@/constants/theme";

type GradientButtonProps = {
  title: string;
  onPress: () => void;
};

export function GradientButton({ title, onPress }: GradientButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
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
        <Text className="font-poppins-semibold text-body-lg text-white">{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
