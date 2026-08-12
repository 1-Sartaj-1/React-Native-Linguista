import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/constants/theme";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <View className="flex-1 px-6 pb-6">
        <View className="flex-row items-center justify-center gap-2 pt-2">
          <Image source={images.mascotLogo} className="h-10 w-10" resizeMode="contain" />
          <Text className="font-poppins-bold text-h2 text-text-primary">Linguista</Text>
        </View>

        <View className="mt-8">
          <Text className="font-poppins-bold text-h1 text-text-primary">
            Your AI language{"\n"}
            <Text className="text-lingua-purple">teacher.</Text>
          </Text>
          <Text className="mt-3 font-poppins-regular text-body-lg text-text-secondary">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        <View className="flex-1 items-center justify-center">
          <View className="relative h-64 w-64 items-center justify-center">
            <View
              className="absolute -left-3 top-2 rounded-2xl bg-lingua-blue/10 px-4 py-2.5"
              style={{ transform: [{ rotate: "-6deg" }] }}
            >
              <Text className="font-poppins-medium text-body-md text-text-primary">
                Hello!
              </Text>
            </View>

            <View
              className="absolute -right-4 -top-6 rounded-2xl bg-lingua-purple/10 px-4 py-2.5"
              style={{ transform: [{ rotate: "4deg" }] }}
            >
              <Text className="font-poppins-medium text-body-md text-lingua-purple">
                ¡Hola!
              </Text>
            </View>

            <View
              className="absolute -right-8 top-28 rounded-2xl bg-[#FDEEE4] px-4 py-2.5"
              style={{ transform: [{ rotate: "6deg" }] }}
            >
              <Text className="font-poppins-medium text-body-md text-[#E2574C]">你好!</Text>
            </View>

            <Image source={images.mascotWelcome} className="h-64 w-64" resizeMode="contain" />
          </View>
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center gap-2 rounded-full bg-lingua-purple py-4"
          activeOpacity={0.85}
        >
          <Text className="font-poppins-semibold text-body-lg text-white">Get Started</Text>
          <Ionicons name="chevron-forward" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
