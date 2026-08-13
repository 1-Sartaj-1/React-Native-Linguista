import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/theme";

type NextUpCardProps = {
  teacherName: string;
  avatarUri: string;
  onPress: () => void;
};

export function NextUpCard({ teacherName, avatarUri, onPress }: NextUpCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="flex-row items-center justify-between rounded-3xl bg-mint-tint px-5 py-4"
    >
      <View className="flex-1 pr-3">
        <Text className="font-poppins-regular text-body-sm text-text-secondary">Next up</Text>
        <Text className="mt-0.5 font-poppins-semibold text-h4 text-text-primary">AI Video Call</Text>
        <Text className="mt-0.5 font-poppins-regular text-body-sm text-text-secondary">
          Practice speaking with {teacherName}
        </Text>
      </View>

      <View style={{ width: 64, height: 64 }}>
        <Image source={{ uri: avatarUri }} style={{ width: 64, height: 64, borderRadius: 32 }} />
        <View
          className="items-center justify-center rounded-full bg-lingua-green"
          style={{
            position: "absolute",
            right: -4,
            bottom: -4,
            width: 28,
            height: 28,
            borderWidth: 2,
            borderColor: colors.tint.mint,
          }}
        >
          <Ionicons name="videocam" size={14} color="#ffffff" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
