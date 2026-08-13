import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/theme";

const ICON_ON = "#ffffff";
const ICON_OFF = colors.neutral.textPrimary;

type CallControlsProps = {
  previewOn: boolean;
  micMuted: boolean;
  subtitlesOn: boolean;
  onTogglePreview: () => void;
  onToggleMic: () => void;
  onToggleSubtitles: () => void;
  onEndCall: () => void;
};

export function CallControls({
  previewOn,
  micMuted,
  subtitlesOn,
  onTogglePreview,
  onToggleMic,
  onToggleSubtitles,
  onEndCall,
}: CallControlsProps) {
  return (
    <View className="flex-row items-start justify-around">
      <ControlButton
        label="Camera"
        filled={previewOn}
        onPress={onTogglePreview}
        icon={
          <Ionicons
            name={previewOn ? "videocam" : "videocam-off"}
            size={26}
            color={previewOn ? ICON_ON : ICON_OFF}
          />
        }
      />

      <ControlButton
        label="Mic"
        filled={micMuted}
        onPress={onToggleMic}
        icon={
          <Ionicons
            name={micMuted ? "mic-off" : "mic"}
            size={26}
            color={micMuted ? ICON_ON : ICON_OFF}
          />
        }
      />

      <ControlButton
        label="Subtitles"
        filled={!subtitlesOn}
        onPress={onToggleSubtitles}
        icon={
          <MaterialIcons name="translate" size={26} color={subtitlesOn ? ICON_OFF : ICON_ON} />
        }
      />

      <ControlButton
        label="End Call"
        danger
        onPress={onEndCall}
        icon={<MaterialIcons name="call-end" size={26} color={ICON_ON} />}
      />
    </View>
  );
}

type ControlButtonProps = {
  label: string;
  icon: ReactNode;
  onPress: () => void;
  // Filled buttons read as "turned off" in a call UI, white ones as "on".
  filled?: boolean;
  danger?: boolean;
};

function ControlButton({ label, icon, onPress, filled, danger }: ControlButtonProps) {
  const circleClassName = danger ? "bg-error" : filled ? "bg-text-primary" : "bg-background";

  return (
    <View className="items-center">
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
        className={`h-16 w-16 items-center justify-center rounded-full ${circleClassName}`}
      >
        {icon}
      </TouchableOpacity>

      <Text className="mt-2 font-poppins-medium text-body-sm text-white">{label}</Text>
    </View>
  );
}
