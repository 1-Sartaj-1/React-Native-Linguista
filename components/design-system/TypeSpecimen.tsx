import { Text, View } from "react-native";

type TypeSpecimenProps = {
  specimen: string;
  specimenClassName: string;
  usage: string;
  sizePx: number;
  weightLabel: string;
  lineHeight: number;
};

export function TypeSpecimen({
  specimen,
  specimenClassName,
  usage,
  sizePx,
  weightLabel,
  lineHeight,
}: TypeSpecimenProps) {
  return (
    <View className="border-b border-border py-4 last:border-b-0">
      <Text className={specimenClassName}>{specimen}</Text>
      <Text className="mt-1 font-poppins-regular text-caption text-text-secondary">
        {usage} · {sizePx}px · {weightLabel} · {lineHeight}
      </Text>
    </View>
  );
}
