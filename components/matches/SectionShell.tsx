import PremiumTagSmallCircle from "@/assets/icons/PremiumTagSmallCircle";
import { ViewAllVisitorsCard } from "@/components/matches/ViewAllVisitorsCard";
import { VisitorCard } from "@/components/matches/VisitorCard";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { mapVisitorItem } from "@/utils/mapVisitorItem";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

// ── Shared row shell ───────────────────────────────────────────────────────
type SectionShellProps = {
  title: string;
  description: string;
  isPremiumSection?: boolean;
  wrapperClass?: string;
  isLoading: boolean;
  items: any[];
  cardSize: "large" | "small";
  onViewAll: () => void;
};

export const SectionShell = ({
  title,
  description,
  isPremiumSection,
  wrapperClass = "mt-14 mb-2",
  isLoading,
  items,
  cardSize,
  onViewAll,
}: SectionShellProps) => {
  const { data: sessionData } = useSession([SESSION_KEYS.PLAN_STATUS]);
  const planStatus = sessionData?.[SESSION_KEYS.PLAN_STATUS] ?? "";

  const safeItems: any[] = Array.isArray(items) ? items.slice(0, 5) : [];

  return (
    <View className={wrapperClass}>
      <View className="flex-row items-center gap-2 px-5">
        <Text className="text-2xl font-bold text-black">{title}</Text>
        {isPremiumSection && <PremiumTagSmallCircle size={24} />}
      </View>
      <Text className="px-5 text-base font-regular text-gray-500 mt-3">
        {description}
      </Text>

      {isLoading ? (
        <View className="h-[225px] items-center justify-center">
          <ActivityIndicator color="#db2777" />
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="mt-5"
        >
          {safeItems.map((item, index) => (
            <VisitorCard
              key={`${item.matri_id ?? "item"}-${index}`}
              {...mapVisitorItem(item, cardSize, planStatus)}
              onPress={() => {
                console.log(
                  "Navigating to profile with matri_id:",
                  item.matri_id,
                );
                router.push({
                  pathname: "/profile/[matriId]",
                  params: { matriId: item.id },
                });
              }}
            />
          ))}
          <ViewAllVisitorsCard size={cardSize} onPress={onViewAll} />
        </ScrollView>
      )}
    </View>
  );
};
