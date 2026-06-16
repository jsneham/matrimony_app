// hooks/useScrollTabs.ts
import { useRef, useState, useCallback } from "react";
import { ScrollView } from "react-native";
import { SectionRef } from "@/types/profile";

interface SectionTabMap {
  sectionId: string;
  tabId: string;
}

// Maps each tab id to the first section that belongs to it
const TAB_TO_SECTION_MAP: Record<string, string> = {
  basics: "basics_main",
  faith: "religion",
  career: "education",
  lifestyle: "lifestyle",
};

export const useScrollTabs = (sectionTabMap: SectionTabMap[]) => {
  const [activeTab, setActiveTab] = useState("basics");
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<SectionRef>({});
  const isScrollingRef = useRef(false);

  // Called from ScrollView's onLayout to record each section's y position
  const registerSection = useCallback((sectionId: string, event: any) => {
    const { y, height } = event.nativeEvent.layout;
    sectionRefs.current[sectionId] = { y, height };
  }, []);

  // Called from ScrollView's onScroll to sync the active tab
  const handleScroll = useCallback(
    (event: any) => {
      if (isScrollingRef.current) return;

      const scrollY = event.nativeEvent.contentOffset.y;
      let newActiveTab = activeTab;

      for (const { sectionId, tabId } of sectionTabMap) {
        const sectionData = sectionRefs.current[sectionId];
        if (!sectionData) continue;

        const { y, height } = sectionData;
        if (scrollY < y + height / 2 - 50) {
          newActiveTab = tabId;
          break;
        }
        if (scrollY >= y - 100) {
          newActiveTab = tabId;
        }
      }

      if (newActiveTab !== activeTab) setActiveTab(newActiveTab);
    },
    [activeTab, sectionTabMap]
  );

  // Called when user taps a tab — scrolls to the first section for that tab
  const handleTabPress = useCallback((tabId: string) => {
    setActiveTab(tabId);
    const targetSectionId = TAB_TO_SECTION_MAP[tabId];
    if (!targetSectionId) return;

    const sectionData = sectionRefs.current[targetSectionId];
    if (!sectionData) return;

    isScrollingRef.current = true;
    scrollViewRef.current?.scrollTo({
      y: Math.max(0, sectionData.y - 60),
      animated: true,
    });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 300);
  }, []);

  return {
    activeTab,
    scrollViewRef,
    handleScroll,
    handleTabPress,
    registerSection,
  };
};
