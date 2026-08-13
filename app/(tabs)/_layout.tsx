import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";

import { CustomTabBar } from "@/components/navigation/CustomTabBar";
import { useLanguageStore } from "@/store/language-store";

export default function TabsLayout() {
  const { isSignedIn } = useAuth();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguage) {
    return <Redirect href="/language-selection" />;
  }

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="learn" options={{ title: "Learn" }} />
      <Tabs.Screen name="ai-teacher" options={{ title: "AI Teacher" }} />
      <Tabs.Screen name="chat" options={{ title: "Chat" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
