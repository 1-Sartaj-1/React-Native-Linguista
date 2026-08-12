import { Text, View } from "react-native";

type SectionCardProps = {
  title: string;
  children: React.ReactNode;
};

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <View className="rounded-2xl border border-border bg-background p-6 shadow-sm shadow-black/5">
      <View className="mb-5 flex-row items-center gap-3">
        <Text className="font-poppins-bold text-body-md tracking-widest text-lingua-deep-purple">
          {title}
        </Text>
        <View className="h-px flex-1 bg-border" />
      </View>
      {children}
    </View>
  );
}
