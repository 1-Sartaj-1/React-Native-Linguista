import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/theme";

type IoniconName = keyof typeof Ionicons.glyphMap;

// Keyed by route name (the tab screen's filename under app/(tabs)/).
const TAB_ICONS: Record<string, { active: IoniconName; inactive: IoniconName }> = {
  home: { active: "home", inactive: "home-outline" },
  learn: { active: "book", inactive: "book-outline" },
  "ai-teacher": { active: "chatbubble-ellipses", inactive: "chatbubble-ellipses-outline" },
  chat: { active: "chatbubble", inactive: "chatbubble-outline" },
  profile: { active: "person", inactive: "person-outline" },
};

const CIRCLE_SIZE = 44;
const ICON_TOP_OFFSET = 8;

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [tabBarWidth, setTabBarWidth] = useState(0);
  const tabWidth = tabBarWidth / state.routes.length;
  const indicatorX = useSharedValue(0);
  const hasMeasured = useRef(false);

  useEffect(() => {
    if (tabWidth <= 0) return;

    const target = state.index * tabWidth + (tabWidth - CIRCLE_SIZE) / 2;

    if (!hasMeasured.current) {
      indicatorX.value = target;
      hasMeasured.current = true;
    } else {
      indicatorX.value = withSpring(target, { damping: 18, stiffness: 180 });
    }
  }, [state.index, tabWidth, indicatorX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      <View
        className="flex-row border-t border-border bg-background"
        onLayout={(event) => setTabBarWidth(event.nativeEvent.layout.width)}
      >
        {tabBarWidth > 0 ? <Animated.View pointerEvents="none" style={[styles.indicator, indicatorStyle]} /> : null}

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isFocused = state.index === index;
          const icons = TAB_ICONS[route.name];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              className="flex-1 items-center pb-2 pt-2"
            >
              <View style={styles.iconBox}>
                <Ionicons
                  name={isFocused ? icons.active : icons.inactive}
                  size={22}
                  color={isFocused ? "#FFFFFF" : colors.neutral.textSecondary}
                />
              </View>
              <Text
                className="mt-1 font-poppins-medium text-caption text-text-secondary"
                style={{ opacity: isFocused ? 0 : 1 }}
                numberOfLines={1}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.neutral.background,
  },
  indicator: {
    position: "absolute",
    top: ICON_TOP_OFFSET,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.primary.linguaPurple,
  },
  iconBox: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
});
