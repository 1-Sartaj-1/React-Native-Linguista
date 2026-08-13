import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/theme";

type SessionHeaderProps = {
  teacherName: string;
  statusLabel: string;
  statusColor: string;
  streak: number;
  remindersOn: boolean;
  onBack: () => void;
  onToggleReminders: () => void;
};

export function SessionHeader({
  teacherName,
  statusLabel,
  statusColor,
  streak,
  remindersOn,
  onBack,
  onToggleReminders,
}: SessionHeaderProps) {
  return (
    <View className="flex-row items-center px-5 pb-3 pt-1">
      <TouchableOpacity activeOpacity={0.7} onPress={onBack} hitSlop={12}>
        <Ionicons name="chevron-back" size={26} color={colors.neutral.textPrimary} />
      </TouchableOpacity>

      <View className="ml-3 flex-1">
        <Text className="font-poppins-semibold text-h3 text-text-primary">AI Teacher</Text>
        <View className="flex-row items-center gap-2">
          <View className="h-2 w-2 rounded-full" style={{ backgroundColor: statusColor }} />
          <Text className="font-poppins-regular text-body-md text-text-secondary">
            {statusLabel} · {teacherName}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-2">
        {/* This lesson is audio only, so the camera stays off for the session. */}
        <View
          className="h-11 w-11 items-center justify-center rounded-full border border-border"
          accessibilityLabel="Audio-only lesson"
        >
          <Ionicons name="videocam-off-outline" size={20} color={colors.neutral.textPrimary} />
        </View>

        <View className="h-11 w-11 items-center justify-center rounded-full border border-border">
          <Text className="font-poppins-semibold text-body-md text-text-primary">{streak}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onToggleReminders}
          className="h-11 w-11 items-center justify-center rounded-full border border-border"
          accessibilityRole="button"
          accessibilityLabel={remindersOn ? "Mute lesson reminders" : "Unmute lesson reminders"}
        >
          <Ionicons
            name={remindersOn ? "notifications-outline" : "notifications-off-outline"}
            size={20}
            color={colors.neutral.textPrimary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
