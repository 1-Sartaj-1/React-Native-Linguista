import { useSignUp } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthInput } from "@/components/auth/AuthInput";
import { GradientButton } from "@/components/auth/GradientButton";
import { SocialAuthButton } from "@/components/auth/SocialAuthButton";
import { VerificationModal } from "@/components/auth/VerificationModal";
import { images } from "@/constants/images";
import { colors } from "@/constants/theme";
import { useSocialAuth } from "@/hooks/useSocialAuth";

export default function SignUpScreen() {
  const { signUp } = useSignUp();
  const { signInWithStrategy } = useSocialAuth();
  const posthog = usePostHog();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verificationVisible, setVerificationVisible] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSignUp = async () => {
    setError("");
    setSubmitting(true);

    posthog.capture('sign_up_submitted', { method: 'email' });

    const { error: passwordError } = await signUp.password({ emailAddress: email, password });
    if (passwordError) {
      setError(passwordError.longMessage ?? passwordError.message);
      setSubmitting(false);
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    setSubmitting(false);
    if (sendError) {
      setError(sendError.longMessage ?? sendError.message);
      return;
    }

    setVerificationVisible(true);
  };

  const handleVerify = async (code: string) => {
    const { error: verifyError } = await signUp.verifications.verifyEmailCode({ code });
    if (verifyError) {
      return { success: false as const, error: verifyError.longMessage ?? verifyError.message };
    }

    if (signUp.status !== "complete") {
      return {
        success: false as const,
        error: "Additional information is required to finish signing up.",
      };
    }

    const { error: finalizeError } = await signUp.finalize();
    if (finalizeError) {
      return {
        success: false as const,
        error: finalizeError.longMessage ?? finalizeError.message,
      };
    }

    posthog.capture('sign_up_completed', { method: 'email' });
    router.replace("/");
    return { success: true as const };
  };

  const handleResend = async () => {
    await signUp.verifications.sendEmailCode();
  };

  const handleSocial = async (strategy: Parameters<typeof signInWithStrategy>[0]) => {
    setError("");
    posthog.capture('social_auth_attempted', { strategy, screen: 'sign_up' });
    const result = await signInWithStrategy(strategy);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pb-6">
            <TouchableOpacity
              onPress={() => router.back()}
              hitSlop={12}
              className="self-start pt-2"
            >
              <Ionicons name="chevron-back" size={26} color={colors.neutral.textPrimary} />
            </TouchableOpacity>

            <Text className="mt-6 font-poppins-bold text-h1 text-text-primary">
              Create your account
            </Text>
            <Text className="mt-2 font-poppins-regular text-body-lg text-text-secondary">
              Start your language journey today ✨
            </Text>

            <View className="items-center justify-center py-6">
              <View className="relative h-52 w-52 items-center justify-center">
                <Text className="absolute -left-2 top-4 text-h3 text-streak">✦</Text>
                <Text className="absolute right-2 top-0 text-h4 text-lingua-blue">✦</Text>
                <Text className="absolute bottom-6 right-0 text-body-lg text-lingua-purple">
                  ✦
                </Text>
                <Image
                  source={images.mascotAuth}
                  resizeMode="contain"
                  style={{ height: 192, width: 192 }}
                />
              </View>
            </View>

            <View className="gap-4">
              <AuthInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="alex@gmail.com"
                keyboardType="email-address"
              />
              <AuthInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                rightElement={
                  <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} hitSlop={12}>
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color={colors.neutral.textSecondary}
                    />
                  </TouchableOpacity>
                }
              />
            </View>

            {error ? (
              <Text className="mt-3 font-poppins-regular text-body-sm text-error">{error}</Text>
            ) : null}

            <View className="mt-6">
              <GradientButton title="Sign Up" onPress={handleSignUp} loading={submitting} />
            </View>

            {/* Renders Clerk's bot-protection challenge on web; Clerk skips it on iOS/Android. */}
            <View nativeID="clerk-captcha" />

            <View className="mt-6 flex-row items-center gap-3">
              <View className="h-px flex-1 bg-border" />
              <Text className="font-poppins-regular text-body-sm text-text-secondary">
                or continue with
              </Text>
              <View className="h-px flex-1 bg-border" />
            </View>

            <View className="mt-6 gap-3">
              <SocialAuthButton
                label="Continue with Google"
                icon={<Ionicons name="logo-google" size={20} color="#4285F4" />}
                onPress={() => handleSocial("oauth_google")}
              />
              <SocialAuthButton
                label="Continue with Facebook"
                icon={<Ionicons name="logo-facebook" size={20} color="#1877F2" />}
                onPress={() => handleSocial("oauth_facebook")}
              />
              <SocialAuthButton
                label="Continue with Apple"
                icon={<Ionicons name="logo-apple" size={20} color={colors.neutral.textPrimary} />}
                onPress={() => handleSocial("oauth_apple")}
              />
            </View>

            <View className="mt-8 flex-1 items-center justify-end pb-2">
              <Text className="font-poppins-regular text-body-md text-text-secondary">
                Already have an account?{" "}
                <Link href="/sign-in" className="font-poppins-semibold text-lingua-purple">
                  Log in
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={verificationVisible}
        email={email || "your email"}
        onClose={() => setVerificationVisible(false)}
        onVerify={handleVerify}
        onResend={handleResend}
      />
    </SafeAreaView>
  );
}
