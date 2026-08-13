import { router } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TabPlaceholder } from "@/components/common/TabPlaceholder";
import { LessonListItem } from "@/components/learn/LessonListItem";
import { UnitHeader } from "@/components/learn/UnitHeader";
import { UnitTabs, type UnitTabKey } from "@/components/learn/UnitTabs";
import { getUnitImage, images } from "@/constants/images";
import { colors } from "@/constants/theme";
import { getLessonsByUnitId, getUnitProgress } from "@/data/lessons";
import { getCurrentUnit } from "@/data/units";
import { useLanguageStore } from "@/store/language-store";

const HERO_HEIGHT = 200;

export default function LearnScreen() {
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const posthog = usePostHog();

  const [tab, setTab] = useState<UnitTabKey>("lessons");
  const [bookmarked, setBookmarked] = useState(true);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const unit = selectedLanguage ? getCurrentUnit(selectedLanguage) : undefined;
  const unitLessons = unit ? getLessonsByUnitId(unit.id) : [];

  if (!unit || unitLessons.length === 0) {
    return (
      <TabPlaceholder
        icon="book"
        title="Learn"
        description="There are no lessons for this language yet. Pick another language to keep going."
      />
    );
  }

  // Falls back to the in-progress lesson from the content data, so the screen
  // always highlights something even before the learner taps a card.
  const activeLesson =
    unitLessons.find((lesson) => lesson.id === selectedLessonId) ??
    unitLessons.find((lesson) => lesson.status === "in-progress");

  const progress = getUnitProgress(unit.id);
  const wordCount = unitLessons.reduce((total, lesson) => total + lesson.vocabulary.length, 0);

  // "3 / 6 lessons" in the header = how far into the unit the learner is.
  const lessonPosition = activeLesson
    ? unitLessons.indexOf(activeLesson) + 1
    : progress.completed;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.navigate("/home");
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <UnitHeader
        title={unit.title}
        subtitle={`Unit ${unit.order} • ${lessonPosition} / ${progress.total} lessons`}
        bookmarked={bookmarked}
        onBack={handleBack}
        onToggleBookmark={() => setBookmarked((previous) => !previous)}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={getUnitImage(unit)}
          resizeMode="cover"
          style={{ width: "100%", height: HERO_HEIGHT }}
        />

        <View className="-mt-7 px-5">
          <UnitTabs value={tab} onChange={setTab} />
        </View>

        {tab === "lessons" ? (
          <View className="mt-5 gap-3 px-5">
            {unitLessons.map((lesson, index) => (
              <LessonListItem
                key={lesson.id}
                lesson={lesson}
                index={index + 1}
                active={lesson.id === activeLesson?.id}
                totalLessons={unitLessons.length}
                onPress={() => {
                  posthog.capture("lesson_selected", {
                    language_code: selectedLanguage,
                    unit_id: unit.id,
                    lesson_id: lesson.id,
                    lesson_title: lesson.title,
                    lesson_status: lesson.status,
                  });
                  setSelectedLessonId(lesson.id);
                  router.push({
                    pathname: "/learn/[lessonId]",
                    params: { lessonId: lesson.id },
                  });
                }}
              />
            ))}
          </View>
        ) : (
          <View className="mx-5 mt-5 items-center rounded-2xl border border-border bg-surface px-6 py-8">
            <Image source={images.mascotWelcome} resizeMode="contain" style={{ width: 96, height: 96 }} />
            <Text className="mt-3 font-poppins-semibold text-h4 text-text-primary">
              Practice is warming up
            </Text>
            <Text className="mt-1 text-center font-poppins-regular text-body-md text-text-secondary">
              The {wordCount} words from {unit.title} will show up here for review once practice
              sessions land.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
