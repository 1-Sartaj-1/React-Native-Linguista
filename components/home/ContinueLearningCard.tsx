import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants/images";
import { colors } from "@/constants/theme";

type ContinueLearningCardProps = {
  languageName: string;
  levelLabel: string;
  onContinue: () => void;
};

export function ContinueLearningCard({
  languageName,
  levelLabel,
  onContinue,
}: ContinueLearningCardProps) {
  return (
    <LinearGradient
      colors={[colors.primary.linguaPurple, colors.primary.linguaDeepPurple]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 24, overflow: "hidden" }}
    >
      <View className="p-6" style={{ minHeight: 190 }}>
        <Text className="font-poppins-medium text-body-sm text-white/80">Continue learning</Text>
        <Text className="mt-1 font-poppins-bold text-h1 text-white">{languageName}</Text>
        <Text className="mt-1 font-poppins-medium text-body-md text-white/80">{levelLabel}</Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onContinue}
          className="mt-5 self-start rounded-full bg-white px-6 py-2.5"
        >
          <Text className="font-poppins-semibold text-body-md text-lingua-purple">Continue</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={images.palace}
        resizeMode="contain"
        style={{ position: "absolute", right: -16, bottom: -12, width: 170, height: 170 }}
      />
    </LinearGradient>
  );
}
