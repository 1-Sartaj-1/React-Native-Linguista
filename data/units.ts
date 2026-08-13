import { getInProgressLesson } from "@/data/lessons";
import type { LanguageCode, Unit } from "@/types/learning";

export const units: Unit[] = [
  // Spanish
  {
    id: "es-u1",
    languageId: "es",
    order: 1,
    title: "Fundamentals",
    description: "Greetings, numbers, and everyday objects.",
    level: "A1",
    imageKey: "fundamentals",
  },
  {
    id: "es-u2",
    languageId: "es",
    order: 2,
    title: "Daily Routines",
    description: "Talk about your day, family, and the weather.",
    level: "A1",
    imageKey: "daily-routines",
  },
  {
    id: "es-u3",
    languageId: "es",
    order: 3,
    title: "At the Café",
    description: "Order food and drinks, and get around town.",
    level: "A1",
    imageKey: "cafe",
  },

  // French
  {
    id: "fr-u1",
    languageId: "fr",
    order: 1,
    title: "First Steps",
    description: "Greetings, numbers, and everyday phrases.",
    level: "A1",
    imageKey: "first-steps",
  },

  // Japanese
  {
    id: "ja-u1",
    languageId: "ja",
    order: 1,
    title: "First Steps",
    description: "Hiragana basics, greetings, and numbers.",
    level: "A1",
    imageKey: "first-steps",
  },

  // Korean
  {
    id: "ko-u1",
    languageId: "ko",
    order: 1,
    title: "Everyday Basics",
    description: "Greet people, order food, and get around town.",
    level: "A1",
    imageKey: "everyday-basics",
  },

  // German
  {
    id: "de-u1",
    languageId: "de",
    order: 1,
    title: "Everyday Basics",
    description: "Greet people, order food, and get around town.",
    level: "A1",
    imageKey: "everyday-basics",
  },

  // Chinese
  {
    id: "zh-u1",
    languageId: "zh",
    order: 1,
    title: "Everyday Basics",
    description: "Greet people, order food, and get around town.",
    level: "A1",
    imageKey: "everyday-basics",
  },
];

export function getUnitsByLanguageId(languageId: LanguageCode) {
  return units
    .filter((unit) => unit.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getUnitById(id: string) {
  return units.find((unit) => unit.id === id);
}

// The unit the Learn screen opens on: the one holding the in-progress lesson,
// or the first unit of the language when nothing is in progress yet.
export function getCurrentUnit(languageId: LanguageCode): Unit | undefined {
  const languageUnits = getUnitsByLanguageId(languageId);
  const inProgressLesson = getInProgressLesson(languageId);

  return (
    languageUnits.find((unit) => unit.id === inProgressLesson?.unitId) ?? languageUnits[0]
  );
}
