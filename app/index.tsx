import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/theme";
import { useLanguageStore } from "@/store/language-store";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);

  if (!isLoaded || !hasHydrated) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.background }}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary.linguaPurple} />
        </View>
      </SafeAreaView>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguage) {
    return <Redirect href="/language-selection" />;
  }

  return <Redirect href="/home" />;
}
