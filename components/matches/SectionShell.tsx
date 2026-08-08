import PremiumTagSmallCircle from "@/assets/icons/PremiumTagSmallCircle";
import { ViewAllVisitorsCard } from "@/components/matches/ViewAllVisitorsCard";
import { VisitorCard } from "@/components/matches/VisitorCard";
import { UpgradePlanSheet } from "@/components/messages/UpgradePlanSheet";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { PlanStatus } from "@/types/profile";
import { mapVisitorItem } from "@/utils/mapVisitorItem";
import { normalizePlanStatus } from "@/utils/profileHelpers";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

// ── Shared row shell ───────────────────────────────────────────────────────
type SectionShellProps = {
  title: string;
  description: React.ReactNode;
  isPremiumSection?: boolean;
  wrapperClass?: string;
  isLoading: boolean;
  items: any[];
  cardSize: "large" | "small";
  onViewAll: () => void;
  hideViewAll?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
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
  hideViewAll,
  titleClassName = "px-5",
  descriptionClassName = "px-5 text-base font-regular text-gray-500 mt-3",
}: SectionShellProps) => {
  const { data: sessionData, isLoading: isLoadingSession } = useSession([
    SESSION_KEYS.PLAN_STATUS,
  ]);
  const planStatus = sessionData?.[SESSION_KEYS.PLAN_STATUS] ?? "";
  const [showUpgradeSheet, setShowUpgradeSheet] = React.useState(false);

  const safeItems: any[] = Array.isArray(items) ? items.slice(0, 5) : [];

  const handleViewAll = () => {
    if (
      !isLoadingSession &&
      normalizePlanStatus(planStatus) !== PlanStatus.PAID
    ) {
      setShowUpgradeSheet(true);
      return;
    }

    onViewAll();
  };

  console.log("items", items, title);

  return (
    <View className={wrapperClass}>
      <View className={`flex-row items-center gap-2 ${titleClassName}`}>
        <Text className="text-2xl font-bold text-black">{title}</Text>
        {isPremiumSection && <PremiumTagSmallCircle size={24} />}
      </View>
      {typeof description === "string" ? (
        <Text className={descriptionClassName}>{description}</Text>
      ) : (
        description
      )}

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
          {!hideViewAll && (
            <ViewAllVisitorsCard size={cardSize} onPress={handleViewAll} />
          )}
        </ScrollView>
      )}

      <UpgradePlanSheet
        visible={showUpgradeSheet}
        message="Please subscribe to a paid membership to view all members in this section."
        onClose={() => setShowUpgradeSheet(false)}
      />
    </View>
  );
};
