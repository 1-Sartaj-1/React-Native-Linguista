import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { images } from "@/constants/images";
import { colors } from "@/constants/theme";

// No learner photo yet when Clerk has none — fall back to a stable placeholder.
const FALLBACK_AVATAR = "https://picsum.photos/seed/learner-avatar/240/320";

type TeacherStageProps = {
  languageLabel: string;
  lessonTitle: string;
  goalTitle: string;
  avatarUrl?: string;
  showPreview: boolean;
  // Teacher bubble + call controls, laid over the bottom of the stage.
  children: ReactNode;
};

export function TeacherStage({
  languageLabel,
  lessonTitle,
  goalTitle,
  avatarUrl,
  showPreview,
  children,
}: TeacherStageProps) {
  return (
    <View className="mx-5 flex-1 overflow-hidden rounded-3xl">
      <LinearGradient
        colors={[colors.primary.linguaPurple, colors.primary.linguaDeepPurple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View className="absolute inset-0 items-center justify-center pb-32">
        <Image source={images.mascotWelcome} resizeMode="contain" style={styles.teacher} />
      </View>

      <LinearGradient
        colors={["transparent", "rgba(13,19,43,0.55)"]}
        style={styles.scrim}
        pointerEvents="none"
      />

      <View className="absolute left-4 top-4 rounded-2xl bg-black/30 px-3 py-2" style={styles.info}>
        <Text className="font-poppins-medium text-caption text-white/80">{languageLabel}</Text>
        <Text className="font-poppins-semibold text-body-md text-white" numberOfLines={1}>
          {lessonTitle}
        </Text>
        <Text className="font-poppins-regular text-caption text-white/80" numberOfLines={2}>
          {goalTitle}
        </Text>
      </View>

      {showPreview ? (
        <View className="absolute right-4 top-4 overflow-hidden rounded-2xl border-2 border-white" style={styles.preview}>
          <Image
            source={{ uri: avatarUrl ?? FALLBACK_AVATAR }}
            resizeMode="cover"
            style={styles.previewImage}
          />
        </View>
      ) : null}

      <View className="absolute inset-x-0 bottom-0 px-4 pb-5">{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  teacher: {
    width: "80%",
    height: "80%",
  },
  scrim: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 260,
  },
  info: {
    maxWidth: "58%",
  },
  preview: {
    width: 96,
    height: 128,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
});
