import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ColorSwatch } from "@/components/design-system/ColorSwatch";
import { SectionCard } from "@/components/design-system/SectionCard";
import { SubsectionLabel } from "@/components/design-system/SubsectionLabel";
import { TypeSpecimen } from "@/components/design-system/TypeSpecimen";
import { colors } from "@/constants/theme";

const primaryColors = [
  { name: "Lingua Purple", hex: colors.primary.linguaPurple },
  { name: "Lingua Deep Purple", hex: colors.primary.linguaDeepPurple },
  { name: "Lingua Blue", hex: colors.primary.linguaBlue },
  { name: "Lingua Green", hex: colors.primary.linguaGreen },
];

const semanticColors = [
  { name: "Success", hex: colors.semantic.success },
  { name: "Warning", hex: colors.semantic.warning },
  { name: "Streak", hex: colors.semantic.streak },
  { name: "Error", hex: colors.semantic.error },
  { name: "Info", hex: colors.semantic.info },
];

const neutralColors = [
  { name: "Text / Primary", hex: colors.neutral.textPrimary },
  { name: "Text / Secondary", hex: colors.neutral.textSecondary },
  { name: "Border", hex: colors.neutral.border },
  { name: "Surface", hex: colors.neutral.surface },
  { name: "Background", hex: colors.neutral.background },
];

const typeSpecimens = [
  {
    specimen: "H1",
    specimenClassName: "font-poppins-bold text-h1 text-text-primary",
    usage: "Page / Screen Title",
    sizePx: 32,
    weightLabel: "Bold",
    lineHeight: 1.2,
  },
  {
    specimen: "H2",
    specimenClassName: "font-poppins-semibold text-h2 text-text-primary",
    usage: "Section Title",
    sizePx: 24,
    weightLabel: "SemiBold",
    lineHeight: 1.3,
  },
  {
    specimen: "H3",
    specimenClassName: "font-poppins-semibold text-h3 text-text-primary",
    usage: "Card / Module Title",
    sizePx: 20,
    weightLabel: "SemiBold",
    lineHeight: 1.3,
  },
  {
    specimen: "H4",
    specimenClassName: "font-poppins-medium text-h4 text-text-primary",
    usage: "Subheading",
    sizePx: 16,
    weightLabel: "Medium",
    lineHeight: 1.4,
  },
  {
    specimen: "Body Large",
    specimenClassName: "font-poppins-regular text-body-lg text-text-primary",
    usage: "Important content",
    sizePx: 16,
    weightLabel: "Regular",
    lineHeight: 1.6,
  },
  {
    specimen: "Body Medium",
    specimenClassName: "font-poppins-regular text-body-md text-text-primary",
    usage: "Body text",
    sizePx: 14,
    weightLabel: "Regular",
    lineHeight: 1.6,
  },
  {
    specimen: "Body Small",
    specimenClassName: "font-poppins-regular text-body-sm text-text-primary",
    usage: "Supporting text",
    sizePx: 13,
    weightLabel: "Regular",
    lineHeight: 1.6,
  },
  {
    specimen: "Caption",
    specimenClassName: "font-poppins-regular text-caption text-text-primary",
    usage: "Labels, meta text",
    sizePx: 11,
    weightLabel: "Regular",
    lineHeight: 1.4,
  },
];

export default function DesignSystemScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.surface }}>
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <Link href="/onboarding" asChild>
          <TouchableOpacity
            className="flex-row items-center justify-center gap-2 self-center rounded-full bg-lingua-purple px-5 py-3"
            activeOpacity={0.85}
          >
            <Text className="font-poppins-semibold text-body-md text-white">
              View Onboarding Screen
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#ffffff" />
          </TouchableOpacity>
        </Link>

        <SectionCard title="BRAND">
          <View className="items-center gap-2 py-4">
            <Text style={{ fontSize: 56, lineHeight: 64 }}>🦊</Text>
            <Text className="font-poppins-bold text-h1 text-text-primary">
              lingua
            </Text>
          </View>
        </SectionCard>

        <SectionCard title="COLORS">
          <View className="gap-6">
            <View>
              <SubsectionLabel label="PRIMARY" />
              <View className="flex-row flex-wrap gap-x-[3.5%] gap-y-4">
                {primaryColors.map((color) => (
                  <ColorSwatch key={color.name} name={color.name} hex={color.hex} />
                ))}
              </View>
            </View>

            <View>
              <SubsectionLabel label="SEMANTIC" />
              <View className="flex-row flex-wrap gap-x-[3.5%] gap-y-4">
                {semanticColors.map((color) => (
                  <ColorSwatch key={color.name} name={color.name} hex={color.hex} />
                ))}
              </View>
            </View>

            <View>
              <SubsectionLabel label="NEUTRALS" />
              <View className="flex-row flex-wrap gap-x-[3.5%] gap-y-4">
                {neutralColors.map((color) => (
                  <ColorSwatch key={color.name} name={color.name} hex={color.hex} />
                ))}
              </View>
            </View>
          </View>
        </SectionCard>

        <SectionCard title="TYPOGRAPHY">
          <View className="mb-4 gap-1">
            <Text className="font-poppins-semibold text-caption uppercase tracking-widest text-text-secondary">
              Font Family
            </Text>
            <Text className="font-poppins-bold text-h2 text-text-primary">
              Poppins
            </Text>
            <Text className="font-poppins-regular text-body-sm text-text-secondary">
              Poppins is a modern, geometric sans-serif typeface that provides
              excellent readability and a friendly personality.
            </Text>
          </View>

          <View>
            {typeSpecimens.map((spec) => (
              <TypeSpecimen key={spec.specimen} {...spec} />
            ))}
          </View>
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}
