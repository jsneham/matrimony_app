import { SectionComponent } from "@/components/SectionComponent";
import { PROFILE_SECTIONS_DATA, PROFILE_TABS_CONFIG } from "@/constants/data";
import { SectionRef } from "@/types/profile";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export const EditProfileScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("basics");
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<SectionRef>({});
  const isScrollingRef = useRef(false);

  // Get unique tabs from sections
  const uniqueTabs = useMemo(() => {
    const tabIds = new Set(PROFILE_SECTIONS_DATA.map((s) => s.tabId));
    return PROFILE_TABS_CONFIG.filter((t) => tabIds.has(t.id));
  }, []);

  /**
   * Handle scroll event and update active tab based on visible section
   */
  const handleScroll = useCallback(
    (event: any) => {
      if (isScrollingRef.current) return;

      const scrollY = event.nativeEvent.contentOffset.y;
      let newActiveTab = activeTab;

      // Find the topmost visible section
      for (const section of PROFILE_SECTIONS_DATA) {
        const sectionData = sectionRefs.current[section.sectionId];
        if (!sectionData) continue;

        const { y, height } = sectionData;
        const sectionMiddle = y + height / 2;

        // Check if this section is near the middle of the screen
        if (scrollY < sectionMiddle - 50) {
          newActiveTab = section.tabId;
          break;
        }

        if (scrollY >= y - 100) {
          newActiveTab = section.tabId;
        }
      }

      if (newActiveTab !== activeTab) {
        setActiveTab(newActiveTab);
      }
    },
    [activeTab],
  );

  /**
   * Handle tab press and scroll to that tab's first section
   */
  const handleTabPress = useCallback((tabId: string) => {
    setActiveTab(tabId);

    // Find first section of this tab
    const targetSection = PROFILE_SECTIONS_DATA.find((s) => s.tabId === tabId);
    if (!targetSection) return;

    const sectionData = sectionRefs.current[targetSection.sectionId];
    if (!sectionData) return;

    isScrollingRef.current = true;

    scrollViewRef.current?.scrollTo({
      y: Math.max(0, sectionData.y - 60),
      animated: true,
    });

    // Reset flag after animation
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 300);
  }, []);

  return (
    <View className="flex-1 bg-app-background">
      {/* Subtitle with Update Preferences */}
      <View className="flex-row items-center justify-between mx-5 h-[34px] my-3 bg-white px-3 rounded-xl">
        <Text className="text-gray font-regular text-sm">
          Profile is 100% updated.
        </Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-black text-sm font-bold">Verify Profile</Text>
          <Ionicons
            name="pencil"
            size={14}
            color="black"
            style={{ marginLeft: 6 }}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-2 mx-5">
        {uniqueTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => handleTabPress(tab.id)}
              className={`flex-1 px-3 py-2.5 rounded-lg border ${
                isActive
                  ? "bg-gray-900 border-gray-900"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-sm font-medium text-center ${
                  isActive ? "text-white" : "text-gray-700"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={8}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <View className="px-3 py-4">
          {PROFILE_SECTIONS_DATA.map((section) => (
            <SectionComponent
              key={section.sectionId}
              section={section}
              sectionRefs={sectionRefs}
            />
          ))}

          {/* Bottom spacing */}
          <View className="h-8" />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
