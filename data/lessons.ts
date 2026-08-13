import type {
  AiTeacherPrompt,
  LanguageCode,
  Lesson,
} from "@/types/learning";

const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  es: "Spanish",
  fr: "French",
  ja: "Japanese",
  ko: "Korean",
  de: "German",
  zh: "Chinese",
};

// The AI teacher always speaks English and teaches the target language
// through English (see prompts/14-vision-agents.md). This factory keeps that
// system prompt consistent across every lesson instead of repeating it.
function createAiTeacherPrompt(params: {
  teacherName: string;
  languageId: LanguageCode;
  lessonTitle: string;
  goalTitle: string;
  focusPoints: string[];
}): AiTeacherPrompt {
  const { teacherName, languageId, lessonTitle, goalTitle, focusPoints } = params;
  const languageName = LANGUAGE_NAMES[languageId];

  return {
    teacherName,
    persona: `Warm, encouraging ${languageName} tutor who keeps lessons short and conversational.`,
    instructionalLanguage: "en",
    systemPrompt: `You are ${teacherName}, a friendly AI ${languageName} teacher. You always speak English and teach ${languageName} through English. You are guiding an English-speaking beginner through the lesson "${lessonTitle}". Lesson goal: ${goalTitle}. Introduce new ${languageName} words and phrases one at a time, ask the student to repeat them out loud, and gently correct their pronunciation. Keep responses short, patient, and encouraging. Focus on: ${focusPoints.join(", ")}.`,
    openingLine: `Hi! I'm ${teacherName}. Today we're going to work on "${lessonTitle}". Ready to get started?`,
    focusPoints,
  };
}

export const lessons: Lesson[] = [
  // ─── Spanish · Unit 1 · Fundamentals ────────────────────────────────────
  {
    id: "es-u1-l1",
    unitId: "es-u1",
    languageId: "es",
    order: 1,
    title: "Hello There",
    status: "completed",
    xpReward: 10,
    goal: {
      title: "Greet people and say goodbye",
      description: "Learn how to say hello, goodbye, and ask how someone is doing in Spanish.",
    },
    vocabulary: [
      { id: "es-u1-l1-v1", word: "hola", translation: "hello", partOfSpeech: "other" },
      { id: "es-u1-l1-v2", word: "adiós", translation: "goodbye", partOfSpeech: "other" },
      { id: "es-u1-l1-v3", word: "buenos días", translation: "good morning", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "es-u1-l1-p1", phrase: "¿Cómo estás?", translation: "How are you?" },
      { id: "es-u1-l1-p2", phrase: "Estoy bien, gracias.", translation: "I'm fine, thank you." },
    ],
    activities: [
      { id: "es-u1-l1-a1", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "hola", answer: "hello" },
      { id: "es-u1-l1-a2", type: "speaking", instruction: "Repeat the phrase out loud", prompt: "¿Cómo estás?", answer: "¿Cómo estás?" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Sofía",
      languageId: "es",
      lessonTitle: "Hello There",
      goalTitle: "Greet people and say goodbye",
      focusPoints: ["basic greetings", "saying goodbye", "asking how someone is"],
    }),
  },
  {
    id: "es-u1-l2",
    unitId: "es-u1",
    languageId: "es",
    order: 2,
    title: "Numbers 1-10",
    status: "completed",
    xpReward: 10,
    goal: {
      title: "Count from one to ten",
      description: "Learn to count from one to ten and ask someone's age.",
    },
    vocabulary: [
      { id: "es-u1-l2-v1", word: "uno", translation: "one" },
      { id: "es-u1-l2-v2", word: "cinco", translation: "five" },
      { id: "es-u1-l2-v3", word: "diez", translation: "ten" },
    ],
    phrases: [
      { id: "es-u1-l2-p1", phrase: "¿Cuántos años tienes?", translation: "How old are you?" },
    ],
    activities: [
      { id: "es-u1-l2-a1", type: "translation", instruction: "Translate the word", prompt: "cinco", answer: "five" },
      { id: "es-u1-l2-a2", type: "matching", instruction: "Match each number to its digit", prompt: "diez", answer: "10" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Sofía",
      languageId: "es",
      lessonTitle: "Numbers 1-10",
      goalTitle: "Count from one to ten",
      focusPoints: ["numbers 1-10", "asking about age"],
    }),
  },
  {
    id: "es-u1-l3",
    unitId: "es-u1",
    languageId: "es",
    order: 3,
    title: "Colors & Objects",
    status: "completed",
    xpReward: 10,
    goal: {
      title: "Describe everyday objects using colors",
      description: "Learn common colors and how to describe simple objects with them.",
    },
    vocabulary: [
      { id: "es-u1-l3-v1", word: "rojo", translation: "red", partOfSpeech: "adjective" },
      { id: "es-u1-l3-v2", word: "azul", translation: "blue", partOfSpeech: "adjective" },
      { id: "es-u1-l3-v3", word: "libro", translation: "book", partOfSpeech: "noun" },
    ],
    phrases: [
      { id: "es-u1-l3-p1", phrase: "El libro es rojo.", translation: "The book is red." },
    ],
    activities: [
      { id: "es-u1-l3-a1", type: "vocabulary", instruction: "Match the color to its translation", prompt: "azul", answer: "blue" },
      { id: "es-u1-l3-a2", type: "listening", instruction: "Listen and pick the color you hear", prompt: "rojo", answer: "red", options: ["red", "blue", "green"] },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Sofía",
      languageId: "es",
      lessonTitle: "Colors & Objects",
      goalTitle: "Describe everyday objects using colors",
      focusPoints: ["colors", "describing objects"],
    }),
  },

  // ─── Spanish · Unit 2 · Daily Routines ──────────────────────────────────
  {
    id: "es-u2-l1",
    unitId: "es-u2",
    languageId: "es",
    order: 1,
    title: "My Day",
    status: "completed",
    xpReward: 10,
    goal: {
      title: "Talk about your daily schedule",
      description: "Describe the things you do throughout a typical day.",
    },
    vocabulary: [
      { id: "es-u2-l1-v1", word: "despertarse", translation: "to wake up", partOfSpeech: "verb" },
      { id: "es-u2-l1-v2", word: "desayunar", translation: "to have breakfast", partOfSpeech: "verb" },
      { id: "es-u2-l1-v3", word: "trabajar", translation: "to work", partOfSpeech: "verb" },
    ],
    phrases: [
      { id: "es-u2-l1-p1", phrase: "Me despierto a las siete.", translation: "I wake up at seven." },
    ],
    activities: [
      { id: "es-u2-l1-a1", type: "translation", instruction: "Translate the sentence", prompt: "Me despierto a las siete.", answer: "I wake up at seven." },
      { id: "es-u2-l1-a2", type: "speaking", instruction: "Repeat the phrase out loud", prompt: "Me despierto a las siete.", answer: "Me despierto a las siete." },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Sofía",
      languageId: "es",
      lessonTitle: "My Day",
      goalTitle: "Talk about your daily schedule",
      focusPoints: ["daily routine verbs", "telling time"],
    }),
  },
  {
    id: "es-u2-l2",
    unitId: "es-u2",
    languageId: "es",
    order: 2,
    title: "Family Members",
    status: "completed",
    xpReward: 10,
    goal: {
      title: "Name close family members",
      description: "Learn vocabulary for immediate family and how to introduce them.",
    },
    vocabulary: [
      { id: "es-u2-l2-v1", word: "madre", translation: "mother", partOfSpeech: "noun" },
      { id: "es-u2-l2-v2", word: "padre", translation: "father", partOfSpeech: "noun" },
      { id: "es-u2-l2-v3", word: "hermano", translation: "brother", partOfSpeech: "noun" },
    ],
    phrases: [
      { id: "es-u2-l2-p1", phrase: "Esta es mi familia.", translation: "This is my family." },
    ],
    activities: [
      { id: "es-u2-l2-a1", type: "matching", instruction: "Match the family member to its translation", prompt: "hermano", answer: "brother" },
      { id: "es-u2-l2-a2", type: "vocabulary", instruction: "Fill in the missing word", prompt: "Esta es mi ___.", answer: "familia" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Sofía",
      languageId: "es",
      lessonTitle: "Family Members",
      goalTitle: "Name close family members",
      focusPoints: ["family vocabulary", "introductions"],
    }),
  },
  {
    id: "es-u2-l3",
    unitId: "es-u2",
    languageId: "es",
    order: 3,
    title: "The Weather",
    status: "completed",
    xpReward: 10,
    goal: {
      title: "Describe today's weather",
      description: "Learn how to talk about sun, rain, and temperature.",
    },
    vocabulary: [
      { id: "es-u2-l3-v1", word: "sol", translation: "sun", partOfSpeech: "noun" },
      { id: "es-u2-l3-v2", word: "lluvia", translation: "rain", partOfSpeech: "noun" },
      { id: "es-u2-l3-v3", word: "hace calor", translation: "it's hot", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "es-u2-l3-p1", phrase: "Hoy hace mucho calor.", translation: "It's very hot today." },
    ],
    activities: [
      { id: "es-u2-l3-a1", type: "listening", instruction: "Listen and pick what you hear", prompt: "lluvia", answer: "rain", options: ["sun", "rain", "wind"] },
      { id: "es-u2-l3-a2", type: "translation", instruction: "Translate the sentence", prompt: "Hoy hace mucho calor.", answer: "It's very hot today." },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Sofía",
      languageId: "es",
      lessonTitle: "The Weather",
      goalTitle: "Describe today's weather",
      focusPoints: ["weather vocabulary", "small talk"],
    }),
  },

  // ─── Spanish · Unit 3 · At the Café ─────────────────────────────────────
  {
    id: "es-u3-l1",
    unitId: "es-u3",
    languageId: "es",
    order: 1,
    title: "Greetings & Introductions",
    status: "completed",
    xpReward: 10,
    imageKey: "earth",
    goal: {
      title: "Introduce yourself to someone new",
      description: "Learn how to give your name and ask for someone else's.",
    },
    vocabulary: [
      { id: "es-u3-l1-v1", word: "me llamo", translation: "my name is", partOfSpeech: "phrase" },
      { id: "es-u3-l1-v2", word: "mucho gusto", translation: "nice to meet you", partOfSpeech: "phrase" },
      { id: "es-u3-l1-v3", word: "¿y tú?", translation: "and you?", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "es-u3-l1-p1", phrase: "Me llamo Ana, ¿y tú?", translation: "My name is Ana, and you?" },
    ],
    activities: [
      { id: "es-u3-l1-a1", type: "speaking", instruction: "Introduce yourself out loud", prompt: "Me llamo...", answer: "Me llamo..." },
      { id: "es-u3-l1-a2", type: "conversation", instruction: "Respond to the greeting", prompt: "Mucho gusto, ¿y tú?", answer: "Mucho gusto." },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Sofía",
      languageId: "es",
      lessonTitle: "Greetings & Introductions",
      goalTitle: "Introduce yourself to someone new",
      focusPoints: ["introductions", "polite exchanges"],
    }),
  },
  {
    id: "es-u3-l2",
    unitId: "es-u3",
    languageId: "es",
    order: 2,
    title: "Daily Life",
    status: "completed",
    xpReward: 10,
    goal: {
      title: "Describe your routine and where you go",
      description: "Talk about school, work, and everyday routines.",
    },
    vocabulary: [
      { id: "es-u3-l2-v1", word: "la rutina", translation: "routine", partOfSpeech: "noun" },
      { id: "es-u3-l2-v2", word: "el trabajo", translation: "work", partOfSpeech: "noun" },
      { id: "es-u3-l2-v3", word: "la escuela", translation: "school", partOfSpeech: "noun" },
    ],
    phrases: [
      { id: "es-u3-l2-p1", phrase: "Voy a la escuela por la mañana.", translation: "I go to school in the morning." },
    ],
    activities: [
      { id: "es-u3-l2-a1", type: "translation", instruction: "Translate the sentence", prompt: "Voy a la escuela por la mañana.", answer: "I go to school in the morning." },
      { id: "es-u3-l2-a2", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "el trabajo", answer: "work" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Sofía",
      languageId: "es",
      lessonTitle: "Daily Life",
      goalTitle: "Describe your routine and where you go",
      focusPoints: ["routine vocabulary", "places you go"],
    }),
  },
  {
    id: "es-u3-l3",
    unitId: "es-u3",
    languageId: "es",
    order: 3,
    title: "At the Café",
    status: "in-progress",
    xpReward: 15,
    goal: {
      title: "Order food and drinks at a café",
      description: "Learn how to order coffee, ask for the bill, and make small talk with a waiter.",
    },
    vocabulary: [
      { id: "es-u3-l3-v1", word: "el café", translation: "coffee", partOfSpeech: "noun" },
      { id: "es-u3-l3-v2", word: "la cuenta", translation: "the bill", partOfSpeech: "noun" },
      { id: "es-u3-l3-v3", word: "el mesero", translation: "waiter", partOfSpeech: "noun" },
      { id: "es-u3-l3-v4", word: "quisiera", translation: "I would like", partOfSpeech: "verb" },
    ],
    phrases: [
      { id: "es-u3-l3-p1", phrase: "Quisiera un café, por favor.", translation: "I would like a coffee, please.", context: "Ordering a drink" },
      { id: "es-u3-l3-p2", phrase: "¿Me trae la cuenta, por favor?", translation: "Could you bring me the bill, please?", context: "Asking to pay" },
      { id: "es-u3-l3-p3", phrase: "¿Qué me recomienda?", translation: "What do you recommend?", context: "Making small talk with the waiter" },
    ],
    activities: [
      { id: "es-u3-l3-a1", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "la cuenta", answer: "the bill" },
      { id: "es-u3-l3-a2", type: "translation", instruction: "Translate the phrase", prompt: "Quisiera un café, por favor.", answer: "I would like a coffee, please." },
      { id: "es-u3-l3-a3", type: "conversation", instruction: "Order a drink from the waiter", prompt: "¿Qué le gustaría tomar?", answer: "Quisiera un café, por favor." },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Sofía",
      languageId: "es",
      lessonTitle: "At the Café",
      goalTitle: "Order food and drinks at a café",
      focusPoints: ["ordering drinks", "polite requests", "restaurant vocabulary"],
    }),
  },
  {
    id: "es-u3-l4",
    unitId: "es-u3",
    languageId: "es",
    order: 4,
    title: "Travel & Directions",
    status: "locked",
    xpReward: 15,
    imageKey: "palace",
    goal: {
      title: "Ask for and understand directions",
      description: "Learn how to ask how to get somewhere and understand left/right directions.",
    },
    vocabulary: [
      { id: "es-u3-l4-v1", word: "la estación", translation: "station", partOfSpeech: "noun" },
      { id: "es-u3-l4-v2", word: "a la izquierda", translation: "to the left", partOfSpeech: "phrase" },
      { id: "es-u3-l4-v3", word: "a la derecha", translation: "to the right", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "es-u3-l4-p1", phrase: "¿Cómo llego a la estación?", translation: "How do I get to the station?" },
    ],
    activities: [
      { id: "es-u3-l4-a1", type: "matching", instruction: "Match the direction to its meaning", prompt: "a la derecha", answer: "to the right" },
      { id: "es-u3-l4-a2", type: "listening", instruction: "Listen and pick the direction you hear", prompt: "a la izquierda", answer: "to the left", options: ["to the left", "to the right", "straight ahead"] },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Sofía",
      languageId: "es",
      lessonTitle: "Travel & Directions",
      goalTitle: "Ask for and understand directions",
      focusPoints: ["asking for directions", "left and right"],
    }),
  },
  {
    id: "es-u3-l5",
    unitId: "es-u3",
    languageId: "es",
    order: 5,
    title: "Shopping",
    status: "locked",
    xpReward: 15,
    imageKey: "treasure",
    goal: {
      title: "Ask about prices while shopping",
      description: "Learn how to ask how much something costs and talk about a store.",
    },
    vocabulary: [
      { id: "es-u3-l5-v1", word: "la tienda", translation: "store", partOfSpeech: "noun" },
      { id: "es-u3-l5-v2", word: "el precio", translation: "price", partOfSpeech: "noun" },
      { id: "es-u3-l5-v3", word: "¿cuánto cuesta?", translation: "how much does it cost?", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "es-u3-l5-p1", phrase: "¿Cuánto cuesta esto?", translation: "How much does this cost?" },
    ],
    activities: [
      { id: "es-u3-l5-a1", type: "translation", instruction: "Translate the phrase", prompt: "¿Cuánto cuesta esto?", answer: "How much does this cost?" },
      { id: "es-u3-l5-a2", type: "speaking", instruction: "Repeat the phrase out loud", prompt: "¿Cuánto cuesta esto?", answer: "¿Cuánto cuesta esto?" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Sofía",
      languageId: "es",
      lessonTitle: "Shopping",
      goalTitle: "Ask about prices while shopping",
      focusPoints: ["shopping vocabulary", "asking prices"],
    }),
  },
  {
    id: "es-u3-l6",
    unitId: "es-u3",
    languageId: "es",
    order: 6,
    title: "Family & Friends",
    status: "locked",
    xpReward: 15,
    goal: {
      title: "Talk about plans with family and friends",
      description: "Learn how to talk about meeting up with people you know.",
    },
    vocabulary: [
      { id: "es-u3-l6-v1", word: "el amigo", translation: "friend", partOfSpeech: "noun" },
      { id: "es-u3-l6-v2", word: "la amiga", translation: "friend (female)", partOfSpeech: "noun" },
      { id: "es-u3-l6-v3", word: "reunirse", translation: "to meet up", partOfSpeech: "verb" },
    ],
    phrases: [
      { id: "es-u3-l6-p1", phrase: "Voy a reunirme con mis amigos.", translation: "I'm going to meet up with my friends." },
    ],
    activities: [
      { id: "es-u3-l6-a1", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "reunirse", answer: "to meet up" },
      { id: "es-u3-l6-a2", type: "conversation", instruction: "Say what your plans are", prompt: "¿Qué vas a hacer hoy?", answer: "Voy a reunirme con mis amigos." },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Sofía",
      languageId: "es",
      lessonTitle: "Family & Friends",
      goalTitle: "Talk about plans with family and friends",
      focusPoints: ["making plans", "talking about people you know"],
    }),
  },

  // ─── French · Unit 1 · First Steps ──────────────────────────────────────
  {
    id: "fr-u1-l1",
    unitId: "fr-u1",
    languageId: "fr",
    order: 1,
    title: "Greetings",
    status: "in-progress",
    xpReward: 10,
    imageKey: "earth",
    goal: {
      title: "Greet people and say thank you",
      description: "Learn the basics of saying hello, goodbye, and thank you in French.",
    },
    vocabulary: [
      { id: "fr-u1-l1-v1", word: "bonjour", translation: "hello" },
      { id: "fr-u1-l1-v2", word: "au revoir", translation: "goodbye" },
      { id: "fr-u1-l1-v3", word: "merci", translation: "thank you" },
    ],
    phrases: [
      { id: "fr-u1-l1-p1", phrase: "Comment ça va ?", translation: "How's it going?" },
    ],
    activities: [
      { id: "fr-u1-l1-a1", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "bonjour", answer: "hello" },
      { id: "fr-u1-l1-a2", type: "speaking", instruction: "Repeat the phrase out loud", prompt: "Comment ça va ?", answer: "Comment ça va ?" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Léa",
      languageId: "fr",
      lessonTitle: "Greetings",
      goalTitle: "Greet people and say thank you",
      focusPoints: ["basic greetings", "saying thank you"],
    }),
  },
  {
    id: "fr-u1-l2",
    unitId: "fr-u1",
    languageId: "fr",
    order: 2,
    title: "Numbers",
    status: "locked",
    xpReward: 10,
    goal: {
      title: "Count and share your age",
      description: "Learn numbers one through three and how to say your age.",
    },
    vocabulary: [
      { id: "fr-u1-l2-v1", word: "un", translation: "one" },
      { id: "fr-u1-l2-v2", word: "deux", translation: "two" },
      { id: "fr-u1-l2-v3", word: "trois", translation: "three" },
    ],
    phrases: [
      { id: "fr-u1-l2-p1", phrase: "J'ai vingt ans.", translation: "I am twenty years old." },
    ],
    activities: [
      { id: "fr-u1-l2-a1", type: "matching", instruction: "Match each number to its digit", prompt: "trois", answer: "3" },
      { id: "fr-u1-l2-a2", type: "translation", instruction: "Translate the sentence", prompt: "J'ai vingt ans.", answer: "I am twenty years old." },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Léa",
      languageId: "fr",
      lessonTitle: "Numbers",
      goalTitle: "Count and share your age",
      focusPoints: ["numbers 1-3", "talking about age"],
    }),
  },
  {
    id: "fr-u1-l3",
    unitId: "fr-u1",
    languageId: "fr",
    order: 3,
    title: "Everyday Phrases",
    status: "locked",
    xpReward: 10,
    goal: {
      title: "Use polite everyday expressions",
      description: "Learn how to say please, excuse me, and ask a simple question.",
    },
    vocabulary: [
      { id: "fr-u1-l3-v1", word: "s'il vous plaît", translation: "please" },
      { id: "fr-u1-l3-v2", word: "excusez-moi", translation: "excuse me" },
      { id: "fr-u1-l3-v3", word: "oui", translation: "yes" },
    ],
    phrases: [
      { id: "fr-u1-l3-p1", phrase: "Excusez-moi, où sont les toilettes ?", translation: "Excuse me, where is the restroom?" },
    ],
    activities: [
      { id: "fr-u1-l3-a1", type: "listening", instruction: "Listen and pick what you hear", prompt: "s'il vous plaît", answer: "please", options: ["please", "excuse me", "yes"] },
      { id: "fr-u1-l3-a2", type: "conversation", instruction: "Ask where the restroom is", prompt: "Comment puis-je vous aider ?", answer: "Excusez-moi, où sont les toilettes ?" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Léa",
      languageId: "fr",
      lessonTitle: "Everyday Phrases",
      goalTitle: "Use polite everyday expressions",
      focusPoints: ["politeness", "asking simple questions"],
    }),
  },

  {
    id: "fr-u1-l4",
    unitId: "fr-u1",
    languageId: "fr",
    order: 4,
    title: "At the Café",
    status: "locked",
    xpReward: 15,
    goal: {
      title: "Order a drink at a café",
      description: "Learn how to order politely and ask for the bill.",
    },
    vocabulary: [
      { id: "fr-u1-l4-v1", word: "le café", translation: "coffee", partOfSpeech: "noun" },
      { id: "fr-u1-l4-v2", word: "l'addition", translation: "the bill", partOfSpeech: "noun" },
      { id: "fr-u1-l4-v3", word: "je voudrais", translation: "I would like", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "fr-u1-l4-p1", phrase: "Je voudrais un café, s'il vous plaît.", translation: "I would like a coffee, please.", context: "Ordering a drink" },
      { id: "fr-u1-l4-p2", phrase: "L'addition, s'il vous plaît.", translation: "The bill, please.", context: "Asking to pay" },
    ],
    activities: [
      { id: "fr-u1-l4-a1", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "l'addition", answer: "the bill" },
      { id: "fr-u1-l4-a2", type: "conversation", instruction: "Order a coffee from the waiter", prompt: "Bonjour, vous désirez ?", answer: "Je voudrais un café, s'il vous plaît." },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Léa",
      languageId: "fr",
      lessonTitle: "At the Café",
      goalTitle: "Order a drink at a café",
      focusPoints: ["ordering drinks", "polite requests"],
    }),
  },
  {
    id: "fr-u1-l5",
    unitId: "fr-u1",
    languageId: "fr",
    order: 5,
    title: "Travel & Directions",
    status: "locked",
    xpReward: 15,
    imageKey: "palace",
    goal: {
      title: "Ask for and understand directions",
      description: "Learn how to ask the way and understand left/right directions.",
    },
    vocabulary: [
      { id: "fr-u1-l5-v1", word: "la gare", translation: "train station", partOfSpeech: "noun" },
      { id: "fr-u1-l5-v2", word: "à gauche", translation: "to the left", partOfSpeech: "phrase" },
      { id: "fr-u1-l5-v3", word: "à droite", translation: "to the right", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "fr-u1-l5-p1", phrase: "Comment aller à la gare ?", translation: "How do I get to the train station?" },
    ],
    activities: [
      { id: "fr-u1-l5-a1", type: "matching", instruction: "Match the direction to its meaning", prompt: "à gauche", answer: "to the left" },
      { id: "fr-u1-l5-a2", type: "speaking", instruction: "Ask the way out loud", prompt: "Comment aller à la gare ?", answer: "Comment aller à la gare ?" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Léa",
      languageId: "fr",
      lessonTitle: "Travel & Directions",
      goalTitle: "Ask for and understand directions",
      focusPoints: ["asking for directions", "left and right"],
    }),
  },
  {
    id: "fr-u1-l6",
    unitId: "fr-u1",
    languageId: "fr",
    order: 6,
    title: "Family & Friends",
    status: "locked",
    xpReward: 15,
    goal: {
      title: "Talk about the people close to you",
      description: "Learn how to name family members and talk about meeting friends.",
    },
    vocabulary: [
      { id: "fr-u1-l6-v1", word: "l'ami", translation: "friend", partOfSpeech: "noun" },
      { id: "fr-u1-l6-v2", word: "la famille", translation: "family", partOfSpeech: "noun" },
      { id: "fr-u1-l6-v3", word: "retrouver", translation: "to meet up with", partOfSpeech: "verb" },
    ],
    phrases: [
      { id: "fr-u1-l6-p1", phrase: "Je vais retrouver mes amis.", translation: "I'm going to meet up with my friends." },
    ],
    activities: [
      { id: "fr-u1-l6-a1", type: "translation", instruction: "Translate the sentence", prompt: "Je vais retrouver mes amis.", answer: "I'm going to meet up with my friends." },
      { id: "fr-u1-l6-a2", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "la famille", answer: "family" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Léa",
      languageId: "fr",
      lessonTitle: "Family & Friends",
      goalTitle: "Talk about the people close to you",
      focusPoints: ["family vocabulary", "making plans with friends"],
    }),
  },

  // ─── Japanese · Unit 1 · First Steps ────────────────────────────────────
  {
    id: "ja-u1-l1",
    unitId: "ja-u1",
    languageId: "ja",
    order: 1,
    title: "Hiragana Basics",
    status: "in-progress",
    xpReward: 10,
    goal: {
      title: "Recognize your first hiragana characters",
      description: "Learn to read and pronounce the vowel sounds a, i, and u.",
    },
    vocabulary: [
      { id: "ja-u1-l1-v1", word: "あ", translation: "a", pronunciation: "a" },
      { id: "ja-u1-l1-v2", word: "い", translation: "i", pronunciation: "i" },
      { id: "ja-u1-l1-v3", word: "う", translation: "u", pronunciation: "u" },
    ],
    phrases: [
      { id: "ja-u1-l1-p1", phrase: "これは「あ」です。", translation: "This is 'a'.", pronunciation: "Kore wa \"a\" desu." },
    ],
    activities: [
      { id: "ja-u1-l1-a1", type: "vocabulary", instruction: "Match the character to its sound", prompt: "あ", answer: "a" },
      { id: "ja-u1-l1-a2", type: "listening", instruction: "Listen and pick the character you hear", prompt: "い", answer: "い", options: ["あ", "い", "う"] },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Yuki",
      languageId: "ja",
      lessonTitle: "Hiragana Basics",
      goalTitle: "Recognize your first hiragana characters",
      focusPoints: ["hiragana vowels", "pronunciation"],
    }),
  },
  {
    id: "ja-u1-l2",
    unitId: "ja-u1",
    languageId: "ja",
    order: 2,
    title: "Greetings",
    status: "locked",
    xpReward: 10,
    goal: {
      title: "Greet someone and say thank you",
      description: "Learn common greetings used throughout the day.",
    },
    vocabulary: [
      { id: "ja-u1-l2-v1", word: "こんにちは", translation: "hello", pronunciation: "konnichiwa" },
      { id: "ja-u1-l2-v2", word: "ありがとう", translation: "thank you", pronunciation: "arigatou" },
      { id: "ja-u1-l2-v3", word: "さようなら", translation: "goodbye", pronunciation: "sayounara" },
    ],
    phrases: [
      { id: "ja-u1-l2-p1", phrase: "こんにちは、元気ですか？", translation: "Hello, how are you?", pronunciation: "Konnichiwa, genki desu ka?" },
    ],
    activities: [
      { id: "ja-u1-l2-a1", type: "speaking", instruction: "Repeat the greeting out loud", prompt: "こんにちは", answer: "こんにちは" },
      { id: "ja-u1-l2-a2", type: "translation", instruction: "Translate the word", prompt: "ありがとう", answer: "thank you" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Yuki",
      languageId: "ja",
      lessonTitle: "Greetings",
      goalTitle: "Greet someone and say thank you",
      focusPoints: ["greetings", "expressing thanks"],
    }),
  },
  {
    id: "ja-u1-l3",
    unitId: "ja-u1",
    languageId: "ja",
    order: 3,
    title: "Numbers",
    status: "locked",
    xpReward: 10,
    goal: {
      title: "Count from one to three",
      description: "Learn the kanji and pronunciation for the numbers one through three.",
    },
    vocabulary: [
      { id: "ja-u1-l3-v1", word: "一", translation: "one", pronunciation: "ichi" },
      { id: "ja-u1-l3-v2", word: "二", translation: "two", pronunciation: "ni" },
      { id: "ja-u1-l3-v3", word: "三", translation: "three", pronunciation: "san" },
    ],
    phrases: [
      { id: "ja-u1-l3-p1", phrase: "これはいくつですか？", translation: "How many is this?", pronunciation: "Kore wa ikutsu desu ka?" },
    ],
    activities: [
      { id: "ja-u1-l3-a1", type: "matching", instruction: "Match each number to its pronunciation", prompt: "二", answer: "ni" },
      { id: "ja-u1-l3-a2", type: "vocabulary", instruction: "Match the character to its meaning", prompt: "三", answer: "three" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Yuki",
      languageId: "ja",
      lessonTitle: "Numbers",
      goalTitle: "Count from one to three",
      focusPoints: ["numbers 1-3", "reading kanji"],
    }),
  },
  {
    id: "ja-u1-l4",
    unitId: "ja-u1",
    languageId: "ja",
    order: 4,
    title: "Daily Life",
    status: "locked",
    xpReward: 15,
    goal: {
      title: "Talk about where you go each day",
      description: "Learn words for school, work, and the parts of the day.",
    },
    vocabulary: [
      { id: "ja-u1-l4-v1", word: "学校", translation: "school", pronunciation: "gakkou", partOfSpeech: "noun" },
      { id: "ja-u1-l4-v2", word: "仕事", translation: "work", pronunciation: "shigoto", partOfSpeech: "noun" },
      { id: "ja-u1-l4-v3", word: "朝", translation: "morning", pronunciation: "asa", partOfSpeech: "noun" },
    ],
    phrases: [
      { id: "ja-u1-l4-p1", phrase: "朝、学校へ行きます。", translation: "I go to school in the morning.", pronunciation: "Asa, gakkou e ikimasu." },
    ],
    activities: [
      { id: "ja-u1-l4-a1", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "仕事", answer: "work" },
      { id: "ja-u1-l4-a2", type: "translation", instruction: "Translate the sentence", prompt: "朝、学校へ行きます。", answer: "I go to school in the morning." },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Yuki",
      languageId: "ja",
      lessonTitle: "Daily Life",
      goalTitle: "Talk about where you go each day",
      focusPoints: ["everyday places", "parts of the day"],
    }),
  },
  {
    id: "ja-u1-l5",
    unitId: "ja-u1",
    languageId: "ja",
    order: 5,
    title: "At the Café",
    status: "locked",
    xpReward: 15,
    goal: {
      title: "Order a drink at a café",
      description: "Learn how to order politely and ask for the bill.",
    },
    vocabulary: [
      { id: "ja-u1-l5-v1", word: "コーヒー", translation: "coffee", pronunciation: "koohii", partOfSpeech: "noun" },
      { id: "ja-u1-l5-v2", word: "水", translation: "water", pronunciation: "mizu", partOfSpeech: "noun" },
      { id: "ja-u1-l5-v3", word: "お会計", translation: "the bill", pronunciation: "okaikei", partOfSpeech: "noun" },
    ],
    phrases: [
      { id: "ja-u1-l5-p1", phrase: "コーヒーを一つください。", translation: "One coffee, please.", pronunciation: "Koohii o hitotsu kudasai.", context: "Ordering a drink" },
      { id: "ja-u1-l5-p2", phrase: "お会計をお願いします。", translation: "The bill, please.", pronunciation: "Okaikei o onegaishimasu.", context: "Asking to pay" },
    ],
    activities: [
      { id: "ja-u1-l5-a1", type: "speaking", instruction: "Order a coffee out loud", prompt: "コーヒーを一つください。", answer: "コーヒーを一つください。" },
      { id: "ja-u1-l5-a2", type: "conversation", instruction: "Answer the waiter", prompt: "ご注文はお決まりですか？", answer: "コーヒーを一つください。" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Yuki",
      languageId: "ja",
      lessonTitle: "At the Café",
      goalTitle: "Order a drink at a café",
      focusPoints: ["ordering drinks", "polite requests"],
    }),
  },
  {
    id: "ja-u1-l6",
    unitId: "ja-u1",
    languageId: "ja",
    order: 6,
    title: "Family & Friends",
    status: "locked",
    xpReward: 15,
    goal: {
      title: "Talk about the people close to you",
      description: "Learn how to talk about family and meeting up with friends.",
    },
    vocabulary: [
      { id: "ja-u1-l6-v1", word: "友だち", translation: "friend", pronunciation: "tomodachi", partOfSpeech: "noun" },
      { id: "ja-u1-l6-v2", word: "家族", translation: "family", pronunciation: "kazoku", partOfSpeech: "noun" },
      { id: "ja-u1-l6-v3", word: "会う", translation: "to meet", pronunciation: "au", partOfSpeech: "verb" },
    ],
    phrases: [
      { id: "ja-u1-l6-p1", phrase: "明日、友だちに会います。", translation: "I'm meeting a friend tomorrow.", pronunciation: "Ashita, tomodachi ni aimasu." },
    ],
    activities: [
      { id: "ja-u1-l6-a1", type: "matching", instruction: "Match the word to its meaning", prompt: "家族", answer: "family" },
      { id: "ja-u1-l6-a2", type: "conversation", instruction: "Say what your plans are", prompt: "明日は何をしますか？", answer: "友だちに会います。" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Yuki",
      languageId: "ja",
      lessonTitle: "Family & Friends",
      goalTitle: "Talk about the people close to you",
      focusPoints: ["family vocabulary", "making plans"],
    }),
  },

  // ─── Korean · Unit 1 · Everyday Basics ──────────────────────────────────
  {
    id: "ko-u1-l1",
    unitId: "ko-u1",
    languageId: "ko",
    order: 1,
    title: "Greetings & Introductions",
    status: "completed",
    xpReward: 10,
    imageKey: "earth",
    goal: {
      title: "Introduce yourself to someone new",
      description: "Learn how to greet someone politely and give your name.",
    },
    vocabulary: [
      { id: "ko-u1-l1-v1", word: "안녕하세요", translation: "hello", pronunciation: "annyeonghaseyo", partOfSpeech: "phrase" },
      { id: "ko-u1-l1-v2", word: "감사합니다", translation: "thank you", pronunciation: "gamsahamnida", partOfSpeech: "phrase" },
      { id: "ko-u1-l1-v3", word: "제 이름은", translation: "my name is", pronunciation: "je ireumeun", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "ko-u1-l1-p1", phrase: "제 이름은 민지예요.", translation: "My name is Min-ji.", pronunciation: "Je ireumeun Minji-yeyo." },
    ],
    activities: [
      { id: "ko-u1-l1-a1", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "감사합니다", answer: "thank you" },
      { id: "ko-u1-l1-a2", type: "speaking", instruction: "Introduce yourself out loud", prompt: "제 이름은...", answer: "제 이름은..." },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Min-ji",
      languageId: "ko",
      lessonTitle: "Greetings & Introductions",
      goalTitle: "Introduce yourself to someone new",
      focusPoints: ["polite greetings", "giving your name"],
    }),
  },
  {
    id: "ko-u1-l2",
    unitId: "ko-u1",
    languageId: "ko",
    order: 2,
    title: "Daily Life",
    status: "completed",
    xpReward: 10,
    goal: {
      title: "Describe your routine and where you go",
      description: "Talk about school, work, and the start of your day.",
    },
    vocabulary: [
      { id: "ko-u1-l2-v1", word: "학교", translation: "school", pronunciation: "hakgyo", partOfSpeech: "noun" },
      { id: "ko-u1-l2-v2", word: "일하다", translation: "to work", pronunciation: "ilhada", partOfSpeech: "verb" },
      { id: "ko-u1-l2-v3", word: "아침", translation: "morning", pronunciation: "achim", partOfSpeech: "noun" },
    ],
    phrases: [
      { id: "ko-u1-l2-p1", phrase: "저는 아침에 학교에 가요.", translation: "I go to school in the morning.", pronunciation: "Jeoneun achime hakgyoe gayo." },
    ],
    activities: [
      { id: "ko-u1-l2-a1", type: "translation", instruction: "Translate the sentence", prompt: "저는 아침에 학교에 가요.", answer: "I go to school in the morning." },
      { id: "ko-u1-l2-a2", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "아침", answer: "morning" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Min-ji",
      languageId: "ko",
      lessonTitle: "Daily Life",
      goalTitle: "Describe your routine and where you go",
      focusPoints: ["daily routine", "places you go"],
    }),
  },
  {
    id: "ko-u1-l3",
    unitId: "ko-u1",
    languageId: "ko",
    order: 3,
    title: "At the Café",
    status: "in-progress",
    xpReward: 15,
    goal: {
      title: "Order food and drinks at a café",
      description: "Learn how to order a drink, ask for the bill, and stay polite.",
    },
    vocabulary: [
      { id: "ko-u1-l3-v1", word: "커피", translation: "coffee", pronunciation: "keopi", partOfSpeech: "noun" },
      { id: "ko-u1-l3-v2", word: "물", translation: "water", pronunciation: "mul", partOfSpeech: "noun" },
      { id: "ko-u1-l3-v3", word: "계산서", translation: "the bill", pronunciation: "gyesanseo", partOfSpeech: "noun" },
      { id: "ko-u1-l3-v4", word: "주세요", translation: "please give me", pronunciation: "juseyo", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "ko-u1-l3-p1", phrase: "커피 한 잔 주세요.", translation: "One cup of coffee, please.", pronunciation: "Keopi han jan juseyo.", context: "Ordering a drink" },
      { id: "ko-u1-l3-p2", phrase: "계산서 주세요.", translation: "The bill, please.", pronunciation: "Gyesanseo juseyo.", context: "Asking to pay" },
    ],
    activities: [
      { id: "ko-u1-l3-a1", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "계산서", answer: "the bill" },
      { id: "ko-u1-l3-a2", type: "speaking", instruction: "Order a coffee out loud", prompt: "커피 한 잔 주세요.", answer: "커피 한 잔 주세요." },
      { id: "ko-u1-l3-a3", type: "conversation", instruction: "Answer the barista", prompt: "무엇을 드릴까요?", answer: "커피 한 잔 주세요." },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Min-ji",
      languageId: "ko",
      lessonTitle: "At the Café",
      goalTitle: "Order food and drinks at a café",
      focusPoints: ["ordering drinks", "polite requests", "café vocabulary"],
    }),
  },
  {
    id: "ko-u1-l4",
    unitId: "ko-u1",
    languageId: "ko",
    order: 4,
    title: "Travel & Directions",
    status: "locked",
    xpReward: 15,
    imageKey: "palace",
    goal: {
      title: "Ask for and understand directions",
      description: "Learn how to ask where something is and understand left/right.",
    },
    vocabulary: [
      { id: "ko-u1-l4-v1", word: "역", translation: "station", pronunciation: "yeok", partOfSpeech: "noun" },
      { id: "ko-u1-l4-v2", word: "왼쪽", translation: "left", pronunciation: "oenjjok", partOfSpeech: "noun" },
      { id: "ko-u1-l4-v3", word: "오른쪽", translation: "right", pronunciation: "oreunjjok", partOfSpeech: "noun" },
    ],
    phrases: [
      { id: "ko-u1-l4-p1", phrase: "역이 어디예요?", translation: "Where is the station?", pronunciation: "Yeogi eodiyeyo?" },
    ],
    activities: [
      { id: "ko-u1-l4-a1", type: "matching", instruction: "Match the direction to its meaning", prompt: "오른쪽", answer: "right" },
      { id: "ko-u1-l4-a2", type: "listening", instruction: "Listen and pick the direction you hear", prompt: "왼쪽", answer: "left", options: ["left", "right", "straight ahead"] },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Min-ji",
      languageId: "ko",
      lessonTitle: "Travel & Directions",
      goalTitle: "Ask for and understand directions",
      focusPoints: ["asking for directions", "left and right"],
    }),
  },
  {
    id: "ko-u1-l5",
    unitId: "ko-u1",
    languageId: "ko",
    order: 5,
    title: "Shopping",
    status: "locked",
    xpReward: 15,
    imageKey: "treasure",
    goal: {
      title: "Ask about prices while shopping",
      description: "Learn how to ask how much something costs and say it's expensive.",
    },
    vocabulary: [
      { id: "ko-u1-l5-v1", word: "가게", translation: "store", pronunciation: "gage", partOfSpeech: "noun" },
      { id: "ko-u1-l5-v2", word: "얼마예요?", translation: "how much is it?", pronunciation: "eolmayeyo?", partOfSpeech: "phrase" },
      { id: "ko-u1-l5-v3", word: "비싸요", translation: "it's expensive", pronunciation: "bissayo", partOfSpeech: "adjective" },
    ],
    phrases: [
      { id: "ko-u1-l5-p1", phrase: "이거 얼마예요?", translation: "How much is this?", pronunciation: "Igeo eolmayeyo?" },
    ],
    activities: [
      { id: "ko-u1-l5-a1", type: "translation", instruction: "Translate the phrase", prompt: "이거 얼마예요?", answer: "How much is this?" },
      { id: "ko-u1-l5-a2", type: "speaking", instruction: "Ask the price out loud", prompt: "이거 얼마예요?", answer: "이거 얼마예요?" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Min-ji",
      languageId: "ko",
      lessonTitle: "Shopping",
      goalTitle: "Ask about prices while shopping",
      focusPoints: ["shopping vocabulary", "asking prices"],
    }),
  },
  {
    id: "ko-u1-l6",
    unitId: "ko-u1",
    languageId: "ko",
    order: 6,
    title: "Family & Friends",
    status: "locked",
    xpReward: 15,
    goal: {
      title: "Talk about plans with family and friends",
      description: "Learn how to talk about the people you know and meeting up.",
    },
    vocabulary: [
      { id: "ko-u1-l6-v1", word: "친구", translation: "friend", pronunciation: "chingu", partOfSpeech: "noun" },
      { id: "ko-u1-l6-v2", word: "가족", translation: "family", pronunciation: "gajok", partOfSpeech: "noun" },
      { id: "ko-u1-l6-v3", word: "만나다", translation: "to meet", pronunciation: "mannada", partOfSpeech: "verb" },
    ],
    phrases: [
      { id: "ko-u1-l6-p1", phrase: "내일 친구를 만나요.", translation: "I'm meeting a friend tomorrow.", pronunciation: "Naeil chingureul mannayo." },
    ],
    activities: [
      { id: "ko-u1-l6-a1", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "가족", answer: "family" },
      { id: "ko-u1-l6-a2", type: "conversation", instruction: "Say what your plans are", prompt: "내일 뭐 해요?", answer: "친구를 만나요." },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Min-ji",
      languageId: "ko",
      lessonTitle: "Family & Friends",
      goalTitle: "Talk about plans with family and friends",
      focusPoints: ["family vocabulary", "making plans"],
    }),
  },

  // ─── German · Unit 1 · Everyday Basics ──────────────────────────────────
  {
    id: "de-u1-l1",
    unitId: "de-u1",
    languageId: "de",
    order: 1,
    title: "Greetings & Introductions",
    status: "completed",
    xpReward: 10,
    imageKey: "earth",
    goal: {
      title: "Introduce yourself to someone new",
      description: "Learn how to say hello, thank you, and give your name.",
    },
    vocabulary: [
      { id: "de-u1-l1-v1", word: "hallo", translation: "hello", partOfSpeech: "other" },
      { id: "de-u1-l1-v2", word: "danke", translation: "thank you", partOfSpeech: "other" },
      { id: "de-u1-l1-v3", word: "ich heiße", translation: "my name is", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "de-u1-l1-p1", phrase: "Ich heiße Lukas, und du?", translation: "My name is Lukas, and you?" },
    ],
    activities: [
      { id: "de-u1-l1-a1", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "danke", answer: "thank you" },
      { id: "de-u1-l1-a2", type: "speaking", instruction: "Introduce yourself out loud", prompt: "Ich heiße...", answer: "Ich heiße..." },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Lukas",
      languageId: "de",
      lessonTitle: "Greetings & Introductions",
      goalTitle: "Introduce yourself to someone new",
      focusPoints: ["basic greetings", "giving your name"],
    }),
  },
  {
    id: "de-u1-l2",
    unitId: "de-u1",
    languageId: "de",
    order: 2,
    title: "Daily Life",
    status: "completed",
    xpReward: 10,
    goal: {
      title: "Describe your routine and where you go",
      description: "Talk about getting up, school, and work.",
    },
    vocabulary: [
      { id: "de-u1-l2-v1", word: "die Arbeit", translation: "work", partOfSpeech: "noun" },
      { id: "de-u1-l2-v2", word: "die Schule", translation: "school", partOfSpeech: "noun" },
      { id: "de-u1-l2-v3", word: "aufstehen", translation: "to get up", partOfSpeech: "verb" },
    ],
    phrases: [
      { id: "de-u1-l2-p1", phrase: "Ich stehe um sieben Uhr auf.", translation: "I get up at seven o'clock." },
    ],
    activities: [
      { id: "de-u1-l2-a1", type: "translation", instruction: "Translate the sentence", prompt: "Ich stehe um sieben Uhr auf.", answer: "I get up at seven o'clock." },
      { id: "de-u1-l2-a2", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "die Schule", answer: "school" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Lukas",
      languageId: "de",
      lessonTitle: "Daily Life",
      goalTitle: "Describe your routine and where you go",
      focusPoints: ["daily routine verbs", "telling time"],
    }),
  },
  {
    id: "de-u1-l3",
    unitId: "de-u1",
    languageId: "de",
    order: 3,
    title: "At the Café",
    status: "in-progress",
    xpReward: 15,
    goal: {
      title: "Order food and drinks at a café",
      description: "Learn how to order politely and ask for the bill.",
    },
    vocabulary: [
      { id: "de-u1-l3-v1", word: "der Kaffee", translation: "coffee", partOfSpeech: "noun" },
      { id: "de-u1-l3-v2", word: "das Wasser", translation: "water", partOfSpeech: "noun" },
      { id: "de-u1-l3-v3", word: "die Rechnung", translation: "the bill", partOfSpeech: "noun" },
      { id: "de-u1-l3-v4", word: "ich hätte gern", translation: "I would like", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "de-u1-l3-p1", phrase: "Ich hätte gern einen Kaffee, bitte.", translation: "I would like a coffee, please.", context: "Ordering a drink" },
      { id: "de-u1-l3-p2", phrase: "Die Rechnung, bitte.", translation: "The bill, please.", context: "Asking to pay" },
    ],
    activities: [
      { id: "de-u1-l3-a1", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "die Rechnung", answer: "the bill" },
      { id: "de-u1-l3-a2", type: "translation", instruction: "Translate the phrase", prompt: "Ich hätte gern einen Kaffee, bitte.", answer: "I would like a coffee, please." },
      { id: "de-u1-l3-a3", type: "conversation", instruction: "Order a drink from the waiter", prompt: "Was möchten Sie trinken?", answer: "Ich hätte gern einen Kaffee, bitte." },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Lukas",
      languageId: "de",
      lessonTitle: "At the Café",
      goalTitle: "Order food and drinks at a café",
      focusPoints: ["ordering drinks", "polite requests", "café vocabulary"],
    }),
  },
  {
    id: "de-u1-l4",
    unitId: "de-u1",
    languageId: "de",
    order: 4,
    title: "Travel & Directions",
    status: "locked",
    xpReward: 15,
    imageKey: "palace",
    goal: {
      title: "Ask for and understand directions",
      description: "Learn how to ask the way to the station and understand left/right.",
    },
    vocabulary: [
      { id: "de-u1-l4-v1", word: "der Bahnhof", translation: "train station", partOfSpeech: "noun" },
      { id: "de-u1-l4-v2", word: "links", translation: "left", partOfSpeech: "adverb" },
      { id: "de-u1-l4-v3", word: "rechts", translation: "right", partOfSpeech: "adverb" },
    ],
    phrases: [
      { id: "de-u1-l4-p1", phrase: "Wie komme ich zum Bahnhof?", translation: "How do I get to the train station?" },
    ],
    activities: [
      { id: "de-u1-l4-a1", type: "matching", instruction: "Match the direction to its meaning", prompt: "rechts", answer: "right" },
      { id: "de-u1-l4-a2", type: "listening", instruction: "Listen and pick the direction you hear", prompt: "links", answer: "left", options: ["left", "right", "straight ahead"] },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Lukas",
      languageId: "de",
      lessonTitle: "Travel & Directions",
      goalTitle: "Ask for and understand directions",
      focusPoints: ["asking for directions", "left and right"],
    }),
  },
  {
    id: "de-u1-l5",
    unitId: "de-u1",
    languageId: "de",
    order: 5,
    title: "Shopping",
    status: "locked",
    xpReward: 15,
    imageKey: "treasure",
    goal: {
      title: "Ask about prices while shopping",
      description: "Learn how to ask what something costs and talk about a store.",
    },
    vocabulary: [
      { id: "de-u1-l5-v1", word: "das Geschäft", translation: "store", partOfSpeech: "noun" },
      { id: "de-u1-l5-v2", word: "der Preis", translation: "price", partOfSpeech: "noun" },
      { id: "de-u1-l5-v3", word: "teuer", translation: "expensive", partOfSpeech: "adjective" },
    ],
    phrases: [
      { id: "de-u1-l5-p1", phrase: "Was kostet das?", translation: "How much does that cost?" },
    ],
    activities: [
      { id: "de-u1-l5-a1", type: "translation", instruction: "Translate the phrase", prompt: "Was kostet das?", answer: "How much does that cost?" },
      { id: "de-u1-l5-a2", type: "speaking", instruction: "Ask the price out loud", prompt: "Was kostet das?", answer: "Was kostet das?" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Lukas",
      languageId: "de",
      lessonTitle: "Shopping",
      goalTitle: "Ask about prices while shopping",
      focusPoints: ["shopping vocabulary", "asking prices"],
    }),
  },
  {
    id: "de-u1-l6",
    unitId: "de-u1",
    languageId: "de",
    order: 6,
    title: "Family & Friends",
    status: "locked",
    xpReward: 15,
    goal: {
      title: "Talk about plans with family and friends",
      description: "Learn how to talk about the people you know and meeting up.",
    },
    vocabulary: [
      { id: "de-u1-l6-v1", word: "der Freund", translation: "friend", partOfSpeech: "noun" },
      { id: "de-u1-l6-v2", word: "die Familie", translation: "family", partOfSpeech: "noun" },
      { id: "de-u1-l6-v3", word: "sich treffen", translation: "to meet up", partOfSpeech: "verb" },
    ],
    phrases: [
      { id: "de-u1-l6-p1", phrase: "Ich treffe mich mit meinen Freunden.", translation: "I'm meeting up with my friends." },
    ],
    activities: [
      { id: "de-u1-l6-a1", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "die Familie", answer: "family" },
      { id: "de-u1-l6-a2", type: "conversation", instruction: "Say what your plans are", prompt: "Was machst du heute?", answer: "Ich treffe mich mit meinen Freunden." },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Lukas",
      languageId: "de",
      lessonTitle: "Family & Friends",
      goalTitle: "Talk about plans with family and friends",
      focusPoints: ["family vocabulary", "making plans"],
    }),
  },

  // ─── Chinese · Unit 1 · Everyday Basics ─────────────────────────────────
  {
    id: "zh-u1-l1",
    unitId: "zh-u1",
    languageId: "zh",
    order: 1,
    title: "Greetings & Introductions",
    status: "completed",
    xpReward: 10,
    imageKey: "earth",
    goal: {
      title: "Introduce yourself to someone new",
      description: "Learn how to say hello, thank you, and give your name.",
    },
    vocabulary: [
      { id: "zh-u1-l1-v1", word: "你好", translation: "hello", pronunciation: "nǐ hǎo", partOfSpeech: "phrase" },
      { id: "zh-u1-l1-v2", word: "谢谢", translation: "thank you", pronunciation: "xièxie", partOfSpeech: "phrase" },
      { id: "zh-u1-l1-v3", word: "我叫", translation: "my name is", pronunciation: "wǒ jiào", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "zh-u1-l1-p1", phrase: "我叫美，你呢？", translation: "My name is Mei, and you?", pronunciation: "Wǒ jiào Měi, nǐ ne?" },
    ],
    activities: [
      { id: "zh-u1-l1-a1", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "谢谢", answer: "thank you" },
      { id: "zh-u1-l1-a2", type: "speaking", instruction: "Introduce yourself out loud", prompt: "我叫...", answer: "我叫..." },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Mei",
      languageId: "zh",
      lessonTitle: "Greetings & Introductions",
      goalTitle: "Introduce yourself to someone new",
      focusPoints: ["basic greetings", "giving your name", "tones"],
    }),
  },
  {
    id: "zh-u1-l2",
    unitId: "zh-u1",
    languageId: "zh",
    order: 2,
    title: "Daily Life",
    status: "completed",
    xpReward: 10,
    goal: {
      title: "Describe your routine and where you go",
      description: "Talk about school, work, and the morning.",
    },
    vocabulary: [
      { id: "zh-u1-l2-v1", word: "学校", translation: "school", pronunciation: "xuéxiào", partOfSpeech: "noun" },
      { id: "zh-u1-l2-v2", word: "工作", translation: "work", pronunciation: "gōngzuò", partOfSpeech: "noun" },
      { id: "zh-u1-l2-v3", word: "早上", translation: "morning", pronunciation: "zǎoshang", partOfSpeech: "noun" },
    ],
    phrases: [
      { id: "zh-u1-l2-p1", phrase: "我早上去学校。", translation: "I go to school in the morning.", pronunciation: "Wǒ zǎoshang qù xuéxiào." },
    ],
    activities: [
      { id: "zh-u1-l2-a1", type: "translation", instruction: "Translate the sentence", prompt: "我早上去学校。", answer: "I go to school in the morning." },
      { id: "zh-u1-l2-a2", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "工作", answer: "work" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Mei",
      languageId: "zh",
      lessonTitle: "Daily Life",
      goalTitle: "Describe your routine and where you go",
      focusPoints: ["daily routine", "places you go"],
    }),
  },
  {
    id: "zh-u1-l3",
    unitId: "zh-u1",
    languageId: "zh",
    order: 3,
    title: "At the Café",
    status: "in-progress",
    xpReward: 15,
    goal: {
      title: "Order food and drinks at a café",
      description: "Learn how to order a drink and ask for the bill.",
    },
    vocabulary: [
      { id: "zh-u1-l3-v1", word: "咖啡", translation: "coffee", pronunciation: "kāfēi", partOfSpeech: "noun" },
      { id: "zh-u1-l3-v2", word: "水", translation: "water", pronunciation: "shuǐ", partOfSpeech: "noun" },
      { id: "zh-u1-l3-v3", word: "买单", translation: "the bill", pronunciation: "mǎidān", partOfSpeech: "phrase" },
      { id: "zh-u1-l3-v4", word: "我要", translation: "I would like", pronunciation: "wǒ yào", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "zh-u1-l3-p1", phrase: "我要一杯咖啡。", translation: "I would like a cup of coffee.", pronunciation: "Wǒ yào yì bēi kāfēi.", context: "Ordering a drink" },
      { id: "zh-u1-l3-p2", phrase: "买单，谢谢。", translation: "The bill, please.", pronunciation: "Mǎidān, xièxie.", context: "Asking to pay" },
    ],
    activities: [
      { id: "zh-u1-l3-a1", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "买单", answer: "the bill" },
      { id: "zh-u1-l3-a2", type: "speaking", instruction: "Order a coffee out loud", prompt: "我要一杯咖啡。", answer: "我要一杯咖啡。" },
      { id: "zh-u1-l3-a3", type: "conversation", instruction: "Answer the waiter", prompt: "您要喝什么？", answer: "我要一杯咖啡。" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Mei",
      languageId: "zh",
      lessonTitle: "At the Café",
      goalTitle: "Order food and drinks at a café",
      focusPoints: ["ordering drinks", "polite requests", "café vocabulary"],
    }),
  },
  {
    id: "zh-u1-l4",
    unitId: "zh-u1",
    languageId: "zh",
    order: 4,
    title: "Travel & Directions",
    status: "locked",
    xpReward: 15,
    imageKey: "palace",
    goal: {
      title: "Ask for and understand directions",
      description: "Learn how to ask where a place is and understand left/right.",
    },
    vocabulary: [
      { id: "zh-u1-l4-v1", word: "车站", translation: "station", pronunciation: "chēzhàn", partOfSpeech: "noun" },
      { id: "zh-u1-l4-v2", word: "左边", translation: "left side", pronunciation: "zuǒbiān", partOfSpeech: "noun" },
      { id: "zh-u1-l4-v3", word: "右边", translation: "right side", pronunciation: "yòubiān", partOfSpeech: "noun" },
    ],
    phrases: [
      { id: "zh-u1-l4-p1", phrase: "车站在哪里？", translation: "Where is the station?", pronunciation: "Chēzhàn zài nǎlǐ?" },
    ],
    activities: [
      { id: "zh-u1-l4-a1", type: "matching", instruction: "Match the direction to its meaning", prompt: "右边", answer: "right side" },
      { id: "zh-u1-l4-a2", type: "listening", instruction: "Listen and pick the direction you hear", prompt: "左边", answer: "left side", options: ["left side", "right side", "straight ahead"] },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Mei",
      languageId: "zh",
      lessonTitle: "Travel & Directions",
      goalTitle: "Ask for and understand directions",
      focusPoints: ["asking for directions", "left and right"],
    }),
  },
  {
    id: "zh-u1-l5",
    unitId: "zh-u1",
    languageId: "zh",
    order: 5,
    title: "Shopping",
    status: "locked",
    xpReward: 15,
    imageKey: "treasure",
    goal: {
      title: "Ask about prices while shopping",
      description: "Learn how to ask how much something costs and say it's expensive.",
    },
    vocabulary: [
      { id: "zh-u1-l5-v1", word: "商店", translation: "store", pronunciation: "shāngdiàn", partOfSpeech: "noun" },
      { id: "zh-u1-l5-v2", word: "多少钱", translation: "how much money", pronunciation: "duōshao qián", partOfSpeech: "phrase" },
      { id: "zh-u1-l5-v3", word: "贵", translation: "expensive", pronunciation: "guì", partOfSpeech: "adjective" },
    ],
    phrases: [
      { id: "zh-u1-l5-p1", phrase: "这个多少钱？", translation: "How much is this?", pronunciation: "Zhège duōshao qián?" },
    ],
    activities: [
      { id: "zh-u1-l5-a1", type: "translation", instruction: "Translate the phrase", prompt: "这个多少钱？", answer: "How much is this?" },
      { id: "zh-u1-l5-a2", type: "speaking", instruction: "Ask the price out loud", prompt: "这个多少钱？", answer: "这个多少钱？" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Mei",
      languageId: "zh",
      lessonTitle: "Shopping",
      goalTitle: "Ask about prices while shopping",
      focusPoints: ["shopping vocabulary", "asking prices"],
    }),
  },
  {
    id: "zh-u1-l6",
    unitId: "zh-u1",
    languageId: "zh",
    order: 6,
    title: "Family & Friends",
    status: "locked",
    xpReward: 15,
    goal: {
      title: "Talk about plans with family and friends",
      description: "Learn how to talk about the people you know and meeting up.",
    },
    vocabulary: [
      { id: "zh-u1-l6-v1", word: "朋友", translation: "friend", pronunciation: "péngyou", partOfSpeech: "noun" },
      { id: "zh-u1-l6-v2", word: "家人", translation: "family", pronunciation: "jiārén", partOfSpeech: "noun" },
      { id: "zh-u1-l6-v3", word: "见面", translation: "to meet up", pronunciation: "jiànmiàn", partOfSpeech: "verb" },
    ],
    phrases: [
      { id: "zh-u1-l6-p1", phrase: "我要和朋友见面。", translation: "I'm going to meet up with a friend.", pronunciation: "Wǒ yào hé péngyou jiànmiàn." },
    ],
    activities: [
      { id: "zh-u1-l6-a1", type: "vocabulary", instruction: "Match the word to its meaning", prompt: "家人", answer: "family" },
      { id: "zh-u1-l6-a2", type: "conversation", instruction: "Say what your plans are", prompt: "你今天要做什么？", answer: "我要和朋友见面。" },
    ],
    aiTeacherPrompt: createAiTeacherPrompt({
      teacherName: "Mei",
      languageId: "zh",
      lessonTitle: "Family & Friends",
      goalTitle: "Talk about plans with family and friends",
      focusPoints: ["family vocabulary", "making plans"],
    }),
  },
];

export function getLessonsByUnitId(unitId: string) {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string) {
  return lessons.find((lesson) => lesson.id === id);
}

export function getUnitProgress(unitId: string) {
  const unitLessons = getLessonsByUnitId(unitId);
  const completed = unitLessons.filter((lesson) => lesson.status === "completed").length;
  return { completed, total: unitLessons.length };
}

// Used by the home screen's "Continue learning" card.
export function getInProgressLesson(languageId: LanguageCode) {
  return lessons.find((lesson) => lesson.languageId === languageId && lesson.status === "in-progress");
}
