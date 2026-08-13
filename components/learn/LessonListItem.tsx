import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { getLessonImage } from "@/constants/images";
import { colors } from "@/constants/theme";
import type { Lesson } from "@/types/learning";

type LessonListItemProps = {
  lesson: Lesson;
  // Position inside the unit, e.g. "Lesson 3".
  index: number;
  // The lesson the learner is currently on — highlighted like the design.
  active: boolean;
  totalLessons: number;
  onPress: () => void;
};

export function LessonListItem({
  lesson,
  index,
  active,
  totalLessons,
  onPress,
}: LessonListItemProps) {
  const completed = !active && lesson.status === "completed";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className={`flex-row items-center rounded-2xl border px-4 py-4 ${
        active ? "border-lingua-purple bg-lingua-purple/5" : "border-border bg-background"
      }`}
    >
      <View className="flex-1">
        <Text
          className={`font-poppins-regular text-body-md ${
            active ? "text-lingua-purple" : "text-text-secondary"
          }`}
        >
          Lesson {index}
        </Text>

        <Text
          className={`mt-1 text-h4 text-text-primary ${
            active ? "font-poppins-semibold" : "font-poppins-medium"
          }`}
        >
          {lesson.title}
        </Text>

        {active ? (
          <Text className="mt-1 font-poppins-regular text-body-sm text-lingua-purple">
            In progress
          </Text>
        ) : null}

        {!active && !completed ? (
          <Text className="mt-1 font-poppins-regular text-body-sm text-text-secondary">
            0 / {totalLessons} lessons
          </Text>
        ) : null}
      </View>

      {active ? (
        <Image
          source={getLessonImage(lesson)}
          resizeMode="contain"
          style={{ width: 48, height: 48, marginLeft: 12 }}
        />
      ) : completed ? (
        <View className="ml-3 h-7 w-7 items-center justify-center rounded-full bg-success">
          <Ionicons name="checkmark" size={18} color="#ffffff" />
        </View>
      ) : (
        <View className="ml-3">
          <Ionicons name="lock-closed-outline" size={24} color={colors.neutral.textPrimary} />
        </View>
      )}
    </TouchableOpacity>
  );
}
