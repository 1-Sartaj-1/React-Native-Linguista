import type { ImageSourcePropType } from "react-native";

import earth from "@/assets/images/earth.png";
import mascotAuth from "@/assets/images/mascot-auth.png";
import mascotLogo from "@/assets/images/moscot-logo.png";
import mascotWelcome from "@/assets/images/mascot-welcome.png";
import palace from "@/assets/images/palace.png";
import streakFire from "@/assets/images/streak-fire.png";
import treasure from "@/assets/images/treasure.png";
import type { Lesson, Unit } from "@/types/learning";

export const images = {
  mascotLogo,
  mascotWelcome,
  mascotAuth,
  earth,
  palace,
  streakFire,
  treasure,
};

// Illustrations units and lessons can point at through their `imageKey`.
const artwork: Record<string, ImageSourcePropType> = {
  earth,
  palace,
  treasure,
  mascot: mascotWelcome,
};

// We don't have custom art for every unit and lesson yet, so anything without a
// matching illustration falls back to a stable placeholder (same seed = same
// image every time).
function placeholder(seed: string, size: number) {
  return { uri: `https://picsum.photos/seed/${seed}/${size}/${size}` };
}

export function getUnitImage(unit: Unit): ImageSourcePropType {
  return (unit.imageKey ? artwork[unit.imageKey] : undefined) ?? placeholder(unit.id, 600);
}

export function getLessonImage(lesson: Lesson): ImageSourcePropType {
  return (lesson.imageKey ? artwork[lesson.imageKey] : undefined) ?? placeholder(lesson.id, 200);
}
