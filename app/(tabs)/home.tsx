import { useUser } from "@clerk/expo";
import { router } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ContinueLearningCard } from "@/components/home/ContinueLearningCard";
import { DailyGoalCard } from "@/components/home/DailyGoalCard";
import { GreetingHeader } from "@/components/home/GreetingHeader";
import { NextUpCard } from "@/components/home/NextUpCard";
import { TodaysPlanItem } from "@/components/home/TodaysPlanItem";
import { colors } from "@/constants/theme";
import { getLanguageById } from "@/data/languages";
import { getInProgressLesson } from "@/data/lessons";
import { getUnitById } from "@/data/units";
import { useLanguageStore } from "@/store/language-store";

// Placeholder gamification numbers until a progress/XP store is introduced.
const DAILY_GOAL_XP = 20;
const XP_EARNED_TODAY = 15;
const STREAK_COUNT = 12;

// No teacher headshot asset yet — using a Picsum placeholder per prompts/10-home-ui.md.
const NEXT_UP_AVATAR = "https://picsum.photos/seed/ai-teacher-avatar/200/200";

type PlanKey = "lesson" | "conversation" | "words";

export default function HomeScreen() {
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const posthog = usePostHog();
  const [doneItems, setDoneItems] = useState<Record<PlanKey, boolean>>({
    lesson: false,
    conversation: false,
    words: false,
  });

  const language = selectedLanguage ? getLanguageById(selectedLanguage) : undefined;
  const lesson = selectedLanguage ? getInProgressLesson(selectedLanguage) : undefined;
  const unit = lesson ? getUnitById(lesson.unitId) : undefined;
  const conversationActivity = lesson?.activities.find((activity) => activity.type === "conversation");

  const togglePlanItem = (key: PlanKey) => {
    const newDone = !doneItems[key];
    posthog.capture('plan_item_toggled', {
      item_type: key,
      is_done: newDone,
      language_code: selectedLanguage,
    });
    setDoneItems((prev) => ({ ...prev, [key]: newDone }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <ScrollView
        className="px-6"
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <GreetingHeader
          name={user?.firstName ?? "there"}
          greeting={language?.greeting ?? "Hi"}
          flagEmoji={language?.flagEmoji ?? "🌍"}
          streak={STREAK_COUNT}
        />

        <View className="mt-5">
          <DailyGoalCard earnedXp={XP_EARNED_TODAY} goalXp={DAILY_GOAL_XP} />
        </View>

        {language && lesson ? (
          <View className="mt-5">
            <ContinueLearningCard
              languageName={language.name}
              levelLabel={unit ? `${unit.level} • Unit ${unit.order}` : lesson.title}
              onContinue={() => {
                posthog.capture('continue_learning_tapped', {
                  language_code: selectedLanguage,
                  lesson_title: lesson.title,
                });
                router.push('/learn');
              }}
            />
          </View>
        ) : null}

        <View className="mt-6 flex-row items-center justify-between">
          <Text className="font-poppins-semibold text-h4 text-text-primary">Today&apos;s plan</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/learn")}>
            <Text className="font-poppins-medium text-body-md text-lingua-purple">View all</Text>
          </TouchableOpacity>
        </View>

        {lesson ? (
          <View className="mt-3 gap-3">
            <TodaysPlanItem
              icon="book"
              iconBgClassName="bg-lingua-purple"
              title="Lesson"
              subtitle={lesson.title}
              done={doneItems.lesson}
              onPress={() => togglePlanItem("lesson")}
            />
            <TodaysPlanItem
              icon="headset"
              iconBgClassName="bg-lingua-purple"
              title="AI Conversation"
              subtitle={conversationActivity?.instruction ?? `Talk about your day in ${language?.name}`}
              done={doneItems.conversation}
              onPress={() => togglePlanItem("conversation")}
            />
            <TodaysPlanItem
              icon="sparkles"
              iconBgClassName="bg-error"
              title="New words"
              subtitle={`${lesson.vocabulary.length} words`}
              done={doneItems.words}
              onPress={() => togglePlanItem("words")}
            />
          </View>
        ) : (
          <Text className="mt-3 font-poppins-regular text-body-sm text-text-secondary">
            No lessons in progress yet. Head to the Learn tab to get started.
          </Text>
        )}

        <View className="mt-5">
          <NextUpCard
            teacherName={lesson?.aiTeacherPrompt.teacherName ?? "your AI teacher"}
            avatarUri={NEXT_UP_AVATAR}
            onPress={() => {
              posthog.capture('ai_teacher_opened', { language_code: selectedLanguage });
              router.push('/ai-teacher');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
