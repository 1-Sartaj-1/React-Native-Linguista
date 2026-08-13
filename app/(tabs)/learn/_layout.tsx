import { Stack } from "expo-router";

// A stack inside the Learn tab so opening a lesson keeps the bottom tab bar
// visible, exactly like the design.
export default function LearnLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
