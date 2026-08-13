import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LanguageListItem } from "@/components/language/LanguageListItem";
import { images } from "@/constants/images";
import { colors } from "@/constants/theme";
import { popularLanguages } from "@/data/languages";
import { useLanguageStore } from "@/store/language-store";
import type { LanguageCode } from "@/types/learning";

export default function LanguageSelectionScreen() {
  const [search, setSearch] = useState("");
  const [selectedLanguageId, setSelectedLanguageId] = useState<LanguageCode>("es");
  const setSelectedLanguage = useLanguageStore((state) => state.setSelectedLanguage);
  const posthog = usePostHog();

  const filteredLanguages = popularLanguages.filter((language) =>
    language.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const handleConfirm = () => {
    posthog.capture('language_selected', { language_code: selectedLanguageId });
    setSelectedLanguage(selectedLanguageId);
    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <View className="flex-row items-center px-6 pt-2">
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={12}
          className="absolute left-6 z-10"
        >
          <Ionicons name="chevron-back" size={26} color={colors.neutral.textPrimary} />
        </TouchableOpacity>
        <Text className="flex-1 text-center font-poppins-semibold text-h3 text-text-primary">
          Choose a language
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-6 pt-5">
          <View className="flex-row items-center gap-2 rounded-full bg-surface px-4 py-3.5">
            <Ionicons name="search-outline" size={18} color={colors.neutral.textSecondary} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search languages"
              placeholderTextColor={colors.neutral.textSecondary}
              className="flex-1 font-poppins-regular text-body-lg text-text-primary"
              style={{ padding: 0 }}
            />
          </View>

          <Text className="mb-3 mt-6 font-poppins-semibold text-h4 text-text-primary">
            Popular
          </Text>

          <View className="gap-3">
            {filteredLanguages.map((language) => (
              <LanguageListItem
                key={language.id}
                language={language}
                selected={language.id === selectedLanguageId}
                onPress={() => setSelectedLanguageId(language.id)}
              />
            ))}
          </View>

          <TouchableOpacity
            className="mt-5 rounded-2xl bg-lingua-purple py-4"
            activeOpacity={0.85}
            onPress={handleConfirm}
          >
            <Text className="text-center font-poppins-semibold text-body-lg text-white">
              Confirm
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          source={images.earth}
          resizeMode="contain"
          style={{ width: "100%", height: 220, marginTop: 24 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
