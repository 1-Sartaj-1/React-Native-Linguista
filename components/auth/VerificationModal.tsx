import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { colors } from "@/constants/theme";

const CODE_LENGTH = 6;

type VerifyResult = { success: true } | { success: false; error: string };

type VerificationModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerify: (code: string) => Promise<VerifyResult>;
  onResend?: () => void;
};

export function VerificationModal({
  visible,
  email,
  onClose,
  onVerify,
  onResend,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setCode("");
    setError("");
    setVerifying(false);
    const focusTimeout = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(focusTimeout);
  }, [visible]);

  const handleChangeCode = async (text: string) => {
    const digits = text.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digits);
    setError("");

    if (digits.length === CODE_LENGTH) {
      setVerifying(true);
      const result = await onVerify(digits);
      setVerifying(false);

      if (!result.success) {
        setError(result.error);
        setCode("");
      }
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Pressable className="flex-1 bg-black/40" onPress={onClose} />

        <View className="rounded-t-3xl bg-background px-6 pb-10 pt-6">
          <View className="flex-row justify-end">
            <TouchableOpacity onPress={onClose} hitSlop={12}>
              <Ionicons name="close" size={24} color={colors.neutral.textSecondary} />
            </TouchableOpacity>
          </View>

          <Text className="mt-2 font-poppins-bold text-h2 text-text-primary">
            Check your email
          </Text>
          <Text className="mt-2 font-poppins-regular text-body-md text-text-secondary">
            We sent a 6-digit code to{"\n"}
            <Text className="font-poppins-semibold text-text-primary">{email}</Text>
          </Text>

          <Pressable className="mt-8" onPress={() => inputRef.current?.focus()}>
            <View className="flex-row justify-between">
              {Array.from({ length: CODE_LENGTH }).map((_, index) => {
                const digit = code[index];
                const isActive = index === code.length;
                return (
                  <View
                    key={index}
                    className={`h-14 w-12 items-center justify-center rounded-2xl border ${
                      error ? "border-error" : isActive ? "border-lingua-purple" : "border-border"
                    }`}
                  >
                    <Text className="font-poppins-semibold text-h3 text-text-primary">
                      {digit ?? ""}
                    </Text>
                  </View>
                );
              })}
            </View>

            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChangeCode}
              keyboardType="number-pad"
              maxLength={CODE_LENGTH}
              editable={!verifying}
              style={{ position: "absolute", opacity: 0, height: 1, width: 1 }}
            />
          </Pressable>

          {verifying ? (
            <View className="mt-4 flex-row items-center justify-center gap-2">
              <ActivityIndicator color={colors.primary.linguaPurple} />
              <Text className="font-poppins-regular text-body-sm text-text-secondary">
                Verifying...
              </Text>
            </View>
          ) : null}

          {error ? (
            <Text className="mt-4 text-center font-poppins-regular text-body-sm text-error">
              {error}
            </Text>
          ) : null}

          {onResend ? (
            <TouchableOpacity className="mt-6 items-center" onPress={onResend} hitSlop={12}>
              <Text className="font-poppins-semibold text-body-sm text-lingua-purple">
                Resend code
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
