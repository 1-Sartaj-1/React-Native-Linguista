import { useUser } from "@clerk/expo";
import { router, useLocalSearchParams } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { TabPlaceholder } from "@/components/common/TabPlaceholder";
import { CallControls } from "@/components/lesson/CallControls";
import { LessonFeedbackCard } from "@/components/lesson/LessonFeedbackCard";
import { SessionHeader } from "@/components/lesson/SessionHeader";
import { TeacherBubble } from "@/components/lesson/TeacherBubble";
import { TeacherStage } from "@/components/lesson/TeacherStage";
import { colors } from "@/constants/theme";
import { getLanguageById } from "@/data/languages";
import { getLessonById } from "@/data/lessons";

// Placeholder streak until a progress store exists (same as the home screen).
const STREAK_COUNT = 12;

// The audio session is mocked until Stream Vision Agents are wired up
// (see prompts/13-stream-integration.md), so we fake the connecting step.
const CONNECT_DELAY_MS = 1200;

export default function AudioLessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { user } = useUser();
  const posthog = usePostHog();

  const [connected, setConnected] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [subtitlesOn, setSubtitlesOn] = useState(true);
  const [previewOn, setPreviewOn] = useState(true);
  const [remindersOn, setRemindersOn] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setConnected(true), CONNECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const lesson = getLessonById(lessonId);

  if (!lesson) {
    return (
      <TabPlaceholder
        icon="headset"
        title="Lesson not found"
        description="This lesson isn't part of your course. Head back and pick another one."
      />
    );
  }

  const language = getLanguageById(lesson.languageId);
  const teacher = lesson.aiTeacherPrompt;
  const phrase = lesson.phrases[phraseIndex];

  // The teacher greets you while connecting, then works through the lesson's
  // phrases one tap at a time.
  const bubbleText = connected && phrase ? phrase.phrase : teacher.openingLine;

  const statusLabel = !connected ? "Connecting…" : micMuted ? "Muted" : "Online";
  const statusColor = !connected
    ? colors.semantic.warning
    : micMuted
      ? colors.semantic.error
      : colors.semantic.success;

  const handlePlayNextPhrase = () => {
    if (lesson.phrases.length === 0) return;
    setPhraseIndex((current) => (current + 1) % lesson.phrases.length);
  };

  const handleEndCall = () => {
    posthog.capture("ai_lesson_ended", {
      language_code: lesson.languageId,
      lesson_id: lesson.id,
      lesson_title: lesson.title,
      teacher_name: teacher.teacherName,
    });
    router.back();
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: colors.neutral.background, paddingBottom: 16 }}
    >
      <SessionHeader
        teacherName={teacher.teacherName}
        statusLabel={statusLabel}
        statusColor={statusColor}
        streak={STREAK_COUNT}
        remindersOn={remindersOn}
        onBack={() => router.back()}
        onToggleReminders={() => setRemindersOn((previous) => !previous)}
      />

      <TeacherStage
        languageLabel={`${language?.flagEmoji ?? "🌍"} ${language?.name ?? ""}`}
        lessonTitle={lesson.title}
        goalTitle={lesson.goal.title}
        avatarUrl={user?.imageUrl}
        showPreview={previewOn}
      >
        <TeacherBubble
          text={bubbleText}
          pronunciation={connected ? phrase?.pronunciation : undefined}
          translation={connected && subtitlesOn ? phrase?.translation : undefined}
          onPlay={handlePlayNextPhrase}
        />

        <CallControls
          previewOn={previewOn}
          micMuted={micMuted}
          subtitlesOn={subtitlesOn}
          onTogglePreview={() => setPreviewOn((previous) => !previous)}
          onToggleMic={() => setMicMuted((previous) => !previous)}
          onToggleSubtitles={() => setSubtitlesOn((previous) => !previous)}
          onEndCall={handleEndCall}
        />
      </TeacherStage>

      <LessonFeedbackCard />
    </SafeAreaView>
  );
}
