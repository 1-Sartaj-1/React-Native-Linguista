import type { Language, LanguageCode } from "@/types/learning";

// Supported languages. Only "es", "fr", and "ja" have unit/lesson content so
// far (see data/units.ts and data/lessons.ts) — the rest are listed for the
// language selection screen and can be filled in the same way later.
export const languages: Language[] = [
  {
    id: "es",
    name: "Spanish",
    nativeName: "Español",
    flagEmoji: "🇪🇸",
    learners: "28.4M learners",
    popular: true,
    greeting: "Hola",
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Français",
    flagEmoji: "🇫🇷",
    learners: "19.4M learners",
    popular: true,
    greeting: "Salut",
  },
  {
    id: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flagEmoji: "🇯🇵",
    learners: "12.7M learners",
    popular: true,
    greeting: "こんにちは",
  },
  {
    id: "ko",
    name: "Korean",
    nativeName: "한국어",
    flagEmoji: "🇰🇷",
    learners: "9.3M learners",
    popular: true,
    greeting: "안녕하세요",
  },
  {
    id: "de",
    name: "German",
    nativeName: "Deutsch",
    flagEmoji: "🇩🇪",
    learners: "8.1M learners",
    popular: true,
    greeting: "Hallo",
  },
  {
    id: "zh",
    name: "Chinese",
    nativeName: "中文",
    flagEmoji: "🇨🇳",
    learners: "7.4M learners",
    popular: true,
    greeting: "你好",
  },
];

export const popularLanguages = languages.filter((language) => language.popular);

export function getLanguageById(id: LanguageCode) {
  return languages.find((language) => language.id === id);
}
