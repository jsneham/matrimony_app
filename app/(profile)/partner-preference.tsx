import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSession } from "@/hooks/useSession";
import { useMyProfile } from "@/hooks/useProfile";
import { useUpdatePartnerPreference } from "@/hooks/useProfileMutations";
import { SESSION_KEYS } from "@/types/common";
import {
  useCountries,
  useStates,
  useCities,
  useReligions,
  useCastes,
  useEducations,
  useOccupations,
  useLanguages,
  useMaritalStatuses,
  useMangliks,
} from "@/hooks/useMetadata";
import { SearchableSelectorModal } from "@/components/ui/SearchableSelectorModal";
import { PROFILE_TABS_CONFIG } from "@/constants/data";
import { SectionRef } from "@/types/profile";

interface ModalConfig {
  visible: boolean;
  title: string;
  field: string;
  options: { id: string; name: string }[];
  selectedValue?: string;
}

export const EditPartnerPreferenceScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("basics");
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<SectionRef>({});
  const isScrollingRef = useRef(false);

  // 1. Fetch user session for memberId
  const { data: sessionData, isLoading: isLoadingSession } = useSession([
    SESSION_KEYS.USER_ID,
  ]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";

  // 2. Fetch profile preferences
  const { data: profileResponse, isLoading: isLoadingProfile } = useMyProfile({
    memberId,
  });
  const profile = profileResponse?.data;

  // 3. Mutator for partner preferences
  const updatePreferenceMutation = useUpdatePartnerPreference();

  // 4. Local filtering state for partner preferences (keeps it separate from profile selections)
  const [prefCountryId, setPrefCountryId] = useState("");
  const [prefStateId, setPrefStateId] = useState("");
  const [prefReligionId, setPrefReligionId] = useState("");

  // 5. Fetch master data
  const { data: countries } = useCountries();
  const { data: states } = useStates(prefCountryId);
  const { data: cities } = useCities(prefStateId);
  const { data: religions } = useReligions();
  const { data: castes } = useCastes(prefReligionId);
  const { data: educations } = useEducations();
  const { data: occupations } = useOccupations();
  const { data: languages } = useLanguages();
  const { data: maritalStatuses } = useMaritalStatuses();
  const { data: mangliks } = useMangliks();

  // Static income options mapping
  const incomeOptions = useMemo(() => [
    { id: "< 25 Lakh", name: "< 25 Lakh" },
    { id: "25-50 Lakh", name: "25-50 Lakh" },
    { id: "50-1 Cr", name: "50-1 Cr" },
    { id: "1-5 Cr", name: "1-5 Cr" },
    { id: "5+ Cr", name: "5+ Cr" }
  ], []);

  // 6. Selection Modal state config
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    visible: false,
    title: "",
    field: "",
    options: [],
    selectedValue: "",
  });

  // Prepopulate partner dropdown filtering indexes on load
  useEffect(() => {
    if (profile) {
      setPrefCountryId(profile.partCountryLiving || "");
      setPrefStateId(profile.partState || "");
      if (profile.partReligion) {
        const match = religions.find(r => r.name === profile.partReligion || r.id === profile.partReligion);
        if (match) setPrefReligionId(match.id);
      }
    }
  }, [profile, religions]);

  const openSelectionModal = (
    title: string,
    field: string,
    options: { id: string; name: string }[],
    currentValue?: string
  ) => {
    setModalConfig({
      visible: true,
      title,
      field,
      options,
      selectedValue: currentValue,
    });
  };

  const handleSelect = (field: string, item: { id: string; name: string }) => {
    if (!profile) return;
    const payload: any = {};

    switch (field) {
      case "partReligion":
        setPrefReligionId(item.id);
        payload.partReligion = item.id;
        payload.partReligionStr = item.name;
        payload.partCaste = "";
        payload.partCasteStr = "";
        break;
      case "partCaste":
        payload.partCaste = item.id;
        payload.partCasteStr = item.name;
        break;
      case "partMotherTongue":
        payload.partMotherTongue = item.id;
        payload.partMotherTongueStr = item.name;
        break;
      case "partCountryLiving":
        setPrefCountryId(item.id);
        setPrefStateId("");
        payload.partCountryLiving = item.id;
        payload.partCountryLivingStr = item.name;
        payload.partState = "";
        payload.partStateStr = "";
        payload.partCity = "";
        payload.partCityStr = "";
        break;
      case "partState":
        setPrefStateId(item.id);
        payload.partState = item.id;
        payload.partStateStr = item.name;
        payload.partCity = "";
        payload.partCityStr = "";
        break;
      case "partCity":
        payload.partCity = item.id;
        payload.partCityStr = item.name;
        break;
      case "partEducation":
        payload.partEducation = item.id;
        payload.partEducationStr = item.name;
        break;
      case "partOccupation":
        payload.partOccupation = item.id;
        payload.partOccupationStr = item.name;
        break;
      case "partIncome":
        payload.partIncome = item.name;
        break;
      case "partManglik":
        payload.partManglik = item.name;
        break;
      default:
        return;
    }

    updatePreferenceMutation.mutate(payload, {
      onError: (err) => {
        Alert.alert("Update Failed", "Something went wrong while saving your preference.");
        console.error(err);
      }
    });
  };

  const handleScroll = useCallback(
    (event: any) => {
      if (isScrollingRef.current) return;

      const scrollY = event.nativeEvent.contentOffset.y;
      let newActiveTab = activeTab;

      const sections = [
        { id: "basics_pref", tabId: "basics" },
        { id: "location_pref", tabId: "basics" },
        { id: "religion_pref", tabId: "faith" },
        { id: "education_pref", tabId: "career" },
      ];

      for (const section of sections) {
        const sectionData = sectionRefs.current[section.id];
        if (!sectionData) continue;

        const { y, height } = sectionData;
        const sectionMiddle = y + height / 2;

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
    [activeTab]
  );

  const handleTabPress = useCallback((tabId: string) => {
    setActiveTab(tabId);
    let targetSectionId = "";
    if (tabId === "basics") targetSectionId = "basics_pref";
    else if (tabId === "faith") targetSectionId = "religion_pref";
    else if (tabId === "career") targetSectionId = "education_pref";
    else if (tabId === "lifestyle") targetSectionId = "education_pref"; // Lifestyle tab maps to bottom section

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

  const handleSectionLayout = useCallback((sectionId: string, event: any) => {
    const { y, height } = event.nativeEvent.layout;
    sectionRefs.current[sectionId] = { y, height };
  }, []);

  if (isLoadingSession || isLoadingProfile) {
    return (
      <View className="flex-1 items-center justify-center bg-app-background">
        <ActivityIndicator size="large" color="#db2777" />
        <Text className="mt-3 text-gray-500 font-medium">Loading preferences...</Text>
      </View>
    );
  }

  // Row selection component
  const EditRow = ({
    label,
    value,
    onPress,
    placeholder,
  }: {
    label: string;
    value?: string;
    onPress: () => void;
    placeholder?: string;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="px-5 py-4 border-b border-gray-100 flex-row justify-between items-center bg-white"
    >
      <View className="flex-1">
        <Text className="text-xs font-semibold text-gray-400 mb-1">{label}</Text>
        <Text
          className={`text-base ${
            value ? "text-gray-900 font-medium" : "text-gray-300 font-normal"
          }`}
        >
          {value || placeholder || `Select Preferred ${label}`}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <View className="px-5 py-3 bg-gray-50 border-b border-gray-100">
      <Text className="text-black font-bold text-sm">{title}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-app-background">
      {/* Saving Indicator Overlay */}
      {updatePreferenceMutation.isPending && (
        <View className="absolute inset-0 bg-white/60 z-50 items-center justify-center">
          <ActivityIndicator size="large" color="#db2777" />
          <Text className="mt-2 text-pink-600 font-bold text-sm">Saving preferences...</Text>
        </View>
      )}

      {/* Info notice bar */}
      <View className="flex-row items-center justify-between mx-5 h-[34px] my-3 bg-white px-3 rounded-xl">
        <View className="flex-row items-center">
          <Ionicons
            name="information-circle-outline"
            size={14}
            color="#9ca3af"
            style={{ marginRight: 6 }}
          />
          <Text className="text-gray font-regular text-sm">
            Matches are calculated based on these preferences.
          </Text>
        </View>
      </View>

      {/* Accordion Tabs */}
      <View className="flex-row gap-2 mx-5 mb-2">
        {PROFILE_TABS_CONFIG.map((tab) => {
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
                className={`text-[11px] font-semibold text-center ${
                  isActive ? "text-white" : "text-gray-700"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Preference ScrollView */}
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* Basics Section */}
        <View
          id="basics_pref"
          onLayout={(e) => handleSectionLayout("basics_pref", e)}
          className="bg-white mb-4"
        >
          <SectionHeader title="Basics Preference" />
          <EditRow
            label="Mother Tongue"
            value={profile?.partMotherTongueStr}
            onPress={() =>
              openSelectionModal(
                "Preferred Mother Tongue",
                "partMotherTongue",
                languages,
                profile?.partMotherTongue
              )
            }
          />
        </View>

        {/* Location Section */}
        <View
          id="location_pref"
          onLayout={(e) => handleSectionLayout("location_pref", e)}
          className="bg-white mb-4"
        >
          <SectionHeader title="Location Preference" />
          <EditRow
            label="Country Living In"
            value={profile?.partCountryLivingStr}
            onPress={() =>
              openSelectionModal(
                "Preferred Country",
                "partCountryLiving",
                countries,
                profile?.partCountryLiving
              )
            }
          />
          <EditRow
            label="State living In"
            value={profile?.partStateStr}
            onPress={() => {
              if (!prefCountryId) {
                Alert.alert("Select Country", "Please select a preferred Country first.");
                return;
              }
              openSelectionModal("Preferred State", "partState", states, profile?.partState);
            }}
          />
          <EditRow
            label="City Living In"
            value={profile?.partCityStr}
            onPress={() => {
              if (!prefStateId) {
                Alert.alert("Select State", "Please select a preferred State first.");
                return;
              }
              openSelectionModal("Preferred City", "partCity", cities, profile?.partCity);
            }}
          />
        </View>

        {/* Religion Section */}
        <View
          id="religion_pref"
          onLayout={(e) => handleSectionLayout("religion_pref", e)}
          className="bg-white mb-4"
        >
          <SectionHeader title="Religion & Caste Preference" />
          <EditRow
            label="Religion"
            value={profile?.partReligion}
            onPress={() =>
              openSelectionModal("Preferred Religion", "partReligion", religions, prefReligionId)
            }
          />
          <EditRow
            label="Caste"
            value={profile?.partCasteStr}
            onPress={() => {
              if (!prefReligionId) {
                Alert.alert("Select Religion", "Please select a preferred Religion first.");
                return;
              }
              openSelectionModal("Preferred Caste", "partCaste", castes, profile?.partCaste);
            }}
          />
          <EditRow
            label="Manglik Preference"
            value={profile?.partManglik}
            onPress={() =>
              openSelectionModal(
                "Preferred Manglik",
                "partManglik",
                mangliks,
                profile?.partManglik
              )
            }
          />
        </View>

        {/* Education & Career Section */}
        <View
          id="education_pref"
          onLayout={(e) => handleSectionLayout("education_pref", e)}
          className="bg-white mb-4"
        >
          <SectionHeader title="Education & Career Preference" />
          <EditRow
            label="Education"
            value={profile?.partEducationStr}
            onPress={() =>
              openSelectionModal(
                "Preferred Education",
                "partEducation",
                educations,
                profile?.partEducation
              )
            }
          />
          <EditRow
            label="Occupation"
            value={profile?.partOccupationStr}
            onPress={() =>
              openSelectionModal(
                "Preferred Occupation",
                "partOccupation",
                occupations,
                profile?.partOccupation
              )
            }
          />
          <EditRow
            label="Annual Income"
            value={profile?.partIncome}
            onPress={() =>
              openSelectionModal(
                "Preferred Annual Income",
                "partIncome",
                incomeOptions,
                profile?.partIncome
              )
            }
          />
        </View>

        <View className="h-12" />
      </ScrollView>

      {/* Shared Selector Modal */}
      <SearchableSelectorModal
        visible={modalConfig.visible}
        title={modalConfig.title}
        options={modalConfig.options}
        selectedValue={modalConfig.selectedValue}
        onClose={() => setModalConfig((prev) => ({ ...prev, visible: false }))}
        onSelect={(item) => handleSelect(modalConfig.field, item)}
      />
    </View>
  );
};

export default EditPartnerPreferenceScreen;
