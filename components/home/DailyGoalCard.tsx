import { Image, Text, View } from "react-native";

import { images } from "@/constants/images";

type DailyGoalCardProps = {
  earnedXp: number;
  goalXp: number;
};

export function DailyGoalCard({ earnedXp, goalXp }: DailyGoalCardProps) {
  const progress = Math.min(earnedXp / goalXp, 1);

  return (
    <View className="flex-row items-center justify-between rounded-3xl bg-gold-tint px-5 py-4">
      <View className="flex-1">
        <Text className="font-poppins-regular text-body-sm text-text-secondary">Daily goal</Text>

        <View className="mt-1 flex-row items-end gap-1">
          <Text className="font-poppins-bold text-h1 text-text-primary">{earnedXp}</Text>
          <Text className="mb-1 font-poppins-medium text-body-md text-text-secondary">
            / {goalXp} XP
          </Text>
        </View>

        <View className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/60">
          <View className="h-full rounded-full bg-streak" style={{ width: `${progress * 100}%` }} />
        </View>
      </View>

      <Image
        source={images.treasure}
        style={{ width: 76, height: 76, marginLeft: 12 }}
        resizeMode="contain"
      />
    </View>
  );
}
