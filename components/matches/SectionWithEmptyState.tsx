import { SectionShell } from "@/components/matches/SectionShell";
import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/Text";

type SectionWithEmptyStateProps = {
  title: string;
  description: string;
  isPremiumSection?: boolean;
  wrapperClass?: string;
  isLoading: boolean;
  items: any[];
  cardSize: "large" | "small";
  onViewAll: () => void;
  // Shown inside the dotted box when `items` is empty (and not loading)
  emptyDescriptionLine1?: string;
  emptyDescriptionLine2?: string;
};

export const SectionWithEmptyState: React.FC<SectionWithEmptyStateProps> = ({
  title,
  description,
  isPremiumSection,
  wrapperClass = "mt-14 mb-2",
  isLoading,
  items,
  cardSize,
  onViewAll,
  emptyDescriptionLine1,
  emptyDescriptionLine2,
}) => {
  const isEmpty = !isLoading && (!items || items.length === 0);

  if (isEmpty) {
    return (
      <View className="mx-5 mt-14 p-5 rounded-2xl border border-dashed border-gray-400 bg-white">
        <SectionShell
          title={title}
          description={
            <>
              <Text className="text-base font-regular text-gray mt-3">
                {emptyDescriptionLine1 ?? description}
              </Text>
              {emptyDescriptionLine2 && (
                <Text className="text-base font-regular text-gray mt-10">
                  {emptyDescriptionLine2}
                </Text>
              )}
            </>
          }
          wrapperClass=""
          titleClassName="px-0"
          isPremiumSection={isPremiumSection}
          isLoading={false}
          items={[]}
          cardSize={cardSize}
          hideViewAll
          onViewAll={onViewAll}
        />
      </View>
    );
  }

  return (
    <SectionShell
      title={title}
      description={description}
      isPremiumSection={isPremiumSection}
      wrapperClass={wrapperClass}
      isLoading={isLoading}
      items={items}
      cardSize={cardSize}
      onViewAll={onViewAll}
    />
  );
};

export default SectionWithEmptyState;
