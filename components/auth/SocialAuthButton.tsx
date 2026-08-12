import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type SocialAuthButtonProps = {
  label: string;
  icon: ReactNode;
  onPress?: () => void;
};

export function SocialAuthButton({ label, icon, onPress }: SocialAuthButtonProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center rounded-2xl border border-border px-4 py-3.5"
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View className="w-6 items-center">{icon}</View>
      <Text className="flex-1 text-center font-poppins-medium text-body-lg text-text-primary">
        {label}
      </Text>
      <View className="w-6" />
    </TouchableOpacity>
  );
}
