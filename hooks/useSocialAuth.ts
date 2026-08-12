import { useSSO } from "@clerk/expo";
import { router } from "expo-router";
import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

// Browser warm-up is a native-only performance optimization; expo-web-browser
// doesn't implement it on web.
function useWarmUpBrowser() {
  useEffect(() => {
    if (Platform.OS === "web") return;

    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
}

export type SocialStrategy = "oauth_google" | "oauth_facebook" | "oauth_apple";

type SocialAuthResult = { success: true } | { success: false; error: string };

export function useSocialAuth() {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();

  const signInWithStrategy = useCallback(
    async (strategy: SocialStrategy): Promise<SocialAuthResult> => {
      try {
        const { createdSessionId, setActive } = await startSSOFlow({ strategy });

        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
          router.replace("/");
          return { success: true };
        }

        return { success: false, error: "Sign-in was cancelled." };
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        };
      }
    },
    [startSSOFlow],
  );

  return { signInWithStrategy };
}
