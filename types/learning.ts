// Shared types for the hardcoded learning content system.
// See data/languages.ts, data/units.ts, and data/lessons.ts for the actual content.

export type LanguageCode = "es" | "fr" | "ja" | "ko" | "de" | "zh";

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type LessonStatus = "completed" | "in-progress" | "locked";

export type ActivityType =
  | "vocabulary"
  | "translation"
  | "listening"
  | "speaking"
  | "matching"
  | "conversation";

export interface Language {
  id: LanguageCode;
  name: string;
  nativeName: string;
  flagEmoji: string;
  learners: string;
  popular: boolean;
  // Casual greeting shown on the home screen, e.g. "Hola" for Spanish.
  greeting: string;
}

export interface Unit {
  id: string;
  languageId: LanguageCode;
  order: number;
  title: string;
  description: string;
  level: CEFRLevel;
  imageKey?: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
  partOfSpeech?: "noun" | "verb" | "adjective" | "adverb" | "phrase" | "other";
  exampleSentence?: string;
  exampleTranslation?: string;
}

export interface Phrase {
  id: string;
  phrase: string;
  translation: string;
  pronunciation?: string;
  context?: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  instruction: string;
  prompt: string;
  answer: string;
  options?: string[];
}

export interface LessonGoal {
  title: string;
  description: string;
}

// Context for the AI teacher (Stream Vision Agent) that runs the audio lesson.
// The teacher always speaks English and teaches the target language through English.
export interface AiTeacherPrompt {
  teacherName: string;
  persona: string;
  instructionalLanguage: "en";
  systemPrompt: string;
  openingLine: string;
  focusPoints: string[];
}

export interface Lesson {
  id: string;
  unitId: string;
  languageId: LanguageCode;
  order: number;
  title: string;
  status: LessonStatus;
  xpReward: number;
  goal: LessonGoal;
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  aiTeacherPrompt: AiTeacherPrompt;
}
