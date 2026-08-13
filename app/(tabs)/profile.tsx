import { useClerk, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/theme";
import { getLanguageById } from "@/data/languages";
import { useLanguageStore } from "@/store/language-store";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const clearSelectedLanguage = useLanguageStore((state) => state.clearSelectedLanguage);
  const posthog = usePostHog();

  const language = selectedLanguage ? getLanguageById(selectedLanguage) : undefined;

  // Identify the signed-in user so their actions are linked to a stable Clerk ID.
  // Using user.id (not email) as the distinct ID to avoid PII in the identifier.
  useEffect(() => {
    if (user?.id) {
      posthog.identify(user.id, {
        $set: {
          full_name: user.fullName,
          learning_language: selectedLanguage,
        },
        $set_once: {
          first_seen_at: new Date().toISOString(),
        },
      });
    }
  }, [user?.id, user?.fullName, posthog, selectedLanguage]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <View className="flex-1 items-center justify-center gap-3 px-6">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-surface">
          <Ionicons name="person" size={28} color={colors.primary.linguaPurple} />
        </View>
        <Text className="font-poppins-bold text-h2 text-text-primary">Profile</Text>
        <Text className="text-center font-poppins-regular text-body-sm text-text-secondary">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>

        {language ? (
          <View className="mt-2 flex-row items-center gap-2 rounded-full bg-surface px-4 py-2">
            <Text className="text-xl">{language.flagEmoji}</Text>
            <Text className="font-poppins-semibold text-body-md text-text-primary">
              Learning {language.name}
            </Text>
          </View>
        ) : null}

        <TouchableOpacity
          className="mt-4 rounded-full bg-lingua-purple px-6 py-3.5"
          activeOpacity={0.85}
          testID="change-language-button"
          onPress={() => {
            posthog.capture('language_changed', {
              current_language: selectedLanguage,
            });
            router.push('/language-selection');
          }}
        >
          <Text className="font-poppins-semibold text-body-lg text-white">Change Language</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          testID="sign-out-button"
          onPress={async () => {
            posthog.capture('user_signed_out');
            posthog.reset();
            await signOut();
          }}
        >
          <Text className="mt-2 font-poppins-semibold text-body-md text-text-secondary">
            Sign Out
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.85} onPress={() => clearSelectedLanguage()}>
          <Text className="mt-2 font-poppins-semibold text-body-md text-error">
            Clear Async Storage (Dev)
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
