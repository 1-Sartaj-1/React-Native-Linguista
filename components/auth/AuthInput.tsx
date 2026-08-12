import { ReactNode } from "react";
import { Text, TextInput, View } from "react-native";

import { colors } from "@/constants/theme";

type AuthInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
  rightElement?: ReactNode;
};

export function AuthInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
  rightElement,
}: AuthInputProps) {
  return (
    <View className="flex-row items-center rounded-2xl border border-border px-4 py-3">
      <View className="flex-1">
        <Text className="font-poppins-regular text-body-sm text-text-secondary">{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral.textSecondary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          className="font-poppins-regular text-body-lg text-text-primary"
          style={{ padding: 0 }}
        />
      </View>
      {rightElement}
    </View>
  );
}
