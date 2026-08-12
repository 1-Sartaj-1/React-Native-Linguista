import { Text, View } from "react-native";

type ColorSwatchProps = {
  name: string;
  hex: string;
};

export function ColorSwatch({ name, hex }: ColorSwatchProps) {
  return (
    <View className="w-[31%]">
      <View
        className="mb-2 aspect-square w-full rounded-xl"
        style={{ backgroundColor: hex }}
      />
      <Text className="font-poppins-semibold text-caption uppercase text-text-primary">
        {name}
      </Text>
      <Text className="font-poppins-regular text-caption text-text-secondary">
        {hex.toUpperCase()}
      </Text>
    </View>
  );
}
