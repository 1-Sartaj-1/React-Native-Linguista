import { useAuth, useClerk, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/theme";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <View className="flex-1 items-center justify-center gap-3 px-6">
        <Ionicons name="checkmark-circle" size={56} color={colors.primary.linguaGreen} />
        <Text className="font-poppins-bold text-h2 text-text-primary">You&apos;re signed in!</Text>
        <Text className="text-center font-poppins-regular text-body-md text-text-secondary">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
        <Text className="text-center font-poppins-regular text-body-sm text-text-secondary">
          The home screen is coming in a later step.
        </Text>
        <TouchableOpacity
          className="mt-4 rounded-full bg-lingua-purple px-6 py-3.5"
          activeOpacity={0.85}
          onPress={() => signOut()}
        >
          <Text className="font-poppins-semibold text-body-lg text-white">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
