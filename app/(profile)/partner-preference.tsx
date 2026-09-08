import { Text } from "@/components/ui/Text";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

// Hooks
import {
  useAge,
  useCountries,
  useDesignation,
  useDrinking,
  useEating,
  useEducations,
  useGotras,
  useHeight,
  useHoroscope,
  useIncome,
  useLanguages,
  useMangliks,
  useMaritalStatuses,
  useMoonSign,
  useMultiCastes,
  useMultiCities,
  useMultiStates,
  useOccupations,
  useReligions,
  useSmoking,
  useWorkSector,
} from "@/hooks/useMetadata";
import { useMyProfile } from "@/hooks/useProfile";
import { useProfileEditModal } from "@/hooks/useProfileEditModal";
import { useScrollTabs } from "@/hooks/useScrollTabs";
import { useSession } from "@/hooks/useSession";

// Components
import {
  LoadingOverlay,
  ProfileProgressBanner,
} from "@/components/profile/ProfileEditComponents";
import { ProfileTabBar } from "@/components/profile/ProfileTabBar";
import { SearchableSelectorModal } from "@/components/SearchableSelectorModal";

// Constants & Types
import { BasicsPreferenceSection } from "@/components/profile/preference/BasicsPreferenceSection";
import { EducationPreferenceSection } from "@/components/profile/preference/EducationPreferenceSection";
import { LifestylePreferenceSection } from "@/components/profile/preference/LifestylePreferenceSection";
import { LocationPreferenceSection } from "@/components/profile/preference/LocationPreferenceSection";
import { ReligionPreferenceSection } from "@/components/profile/preference/ReligionPreferenceSection";
import { PROFILE_TABS_CONFIG } from "@/constants/data";
import { usePreferenceMetadataStore } from "@/hooks/useMetadataStore";
import { SESSION_KEYS } from "@/types/common";

// Section → tab mapping (drives scroll tracking)
const SECTION_TAB_MAP = [
  { sectionId: "basics_main", tabId: "basics" },
  { sectionId: "location", tabId: "basics" },
  { sectionId: "religion", tabId: "faith" },
  { sectionId: "education", tabId: "career" },
  { sectionId: "lifestyle", tabId: "lifestyle" },
  // { sectionId: "family", tabId: "family" },
];

export const EditPartnerPreferenceScreen: React.FC = () => {
  // ── Session & profile data ──────────────────────────────────────────────────
  const { data: sessionData, isLoading: isLoadingSession } = useSession([
    SESSION_KEYS.USER_ID,
  ]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";

  const { data: profileResponse, isLoading: isLoadingProfile } = useMyProfile({
    memberId,
  });

  const profile = profileResponse?.data;

  // ── Global selection store ──────────────────────────────────────────────────
  const {
    selectedCountryIds,
    selectedStateIds,
    selectedReligionIds,
    setInitialValues,
    setCountryId,
    setStateId,
    setReligionId,
  } = usePreferenceMetadataStore();

  // ── Dependent lists — driven by ALL selected parent ids, not just one ──────
  const { data: states } = useMultiStates(selectedCountryIds);
  const { data: cities } = useMultiCities(selectedStateIds);
  const { data: castes } = useMultiCastes(selectedReligionIds);

  // ── Master data lists (fetched once, cached forever) ────────────────────────
  const { data: countries } = useCountries();
  const { data: religions } = useReligions();
  const { data: educations } = useEducations();
  const { data: occupations } = useOccupations();
  const { data: languages } = useLanguages();
  const { data: gotras } = useGotras();
  const { data: mangliks } = useMangliks();
  const { data: maritalStatuses } = useMaritalStatuses();
  const { data: income } = useIncome();
  const { data: height } = useHeight();
  const { data: age } = useAge();
  const { data: eating } = useEating();
  const { data: drinking } = useDrinking();
  const { data: smoking } = useSmoking();
  const { data: horoscope } = useHoroscope();
  const { data: moonsign } = useMoonSign();
  const { data: workSector } = useWorkSector();
  const { data: designation } = useDesignation();
  // ── Seed Zustand with profile's current IDs on first load ───────────────────

  useEffect(() => {
    if (!profile) return;
    setInitialValues(
      profile.part_country_living?.split(",").filter(Boolean) ?? [],
      profile.part_state?.split(",").filter(Boolean) ?? [],
      profile.part_religion?.split(",").filter(Boolean) ?? [],
    );
  }, [profile, setInitialValues]);

  // ── Modal logic (open / close / save) ──────────────────────────────────────
  const {
    modalConfig,
    openModal,
    closeModal,
    handleSelect,
    handleMultiSelect,
    isSaving,
    handleEditTextSave,
    editableFieldsData,
    // onEditableFieldChange,
  } = useProfileEditModal({
    memberId,
    setCountryId,
    setStateId,
    setReligionId,
  });

  // ── Scroll ↔ Tab sync ───────────────────────────────────────────────────────
  const {
    activeTab,
    scrollViewRef,
    handleScroll,
    handleTabPress,
    registerSection,
  } = useScrollTabs(SECTION_TAB_MAP);

  // ── Loading state ───────────────────────────────────────────────────────────
  if (isLoadingSession || isLoadingProfile) {
    return (
      <View className="flex-1 items-center justify-center bg-app-background">
        <ActivityIndicator size="large" color="#db2777" />
        <Text className="mt-3 text-gray-500 font-medium">
          Loading profile...
        </Text>
      </View>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <View className="flex-1 bg-app-background">
      <LoadingOverlay visible={isSaving} label="Saving changes..." />

      <ProfileProgressBanner
        percentage={profile?.percentage || 0}
        message="You will see matches based on your preferences."
        showVerify={false}
      />

      <ProfileTabBar
        tabs={PROFILE_TABS_CONFIG.filter((tab) => tab.id !== "family")}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <BasicsPreferenceSection
          sectionId="basics_main"
          profile={profile}
          maritalStatuses={maritalStatuses}
          languages={languages}
          height={height}
          age={age}
          onLayout={registerSection}
          openModal={openModal}
        />

        <LocationPreferenceSection
          sectionId="location"
          profile={profile}
          countries={countries}
          states={states}
          cities={cities}
          selectedCountryId={selectedCountryIds}
          selectedStateId={selectedStateIds}
          onLayout={registerSection}
          openModal={openModal}
        />

        <ReligionPreferenceSection
          sectionId="religion"
          profile={profile}
          religions={religions}
          castes={castes}
          mangliks={mangliks}
          selectedReligionId={selectedReligionIds}
          onLayout={registerSection}
          openModal={openModal}
        />

        <EducationPreferenceSection
          sectionId="education"
          profile={profile}
          educations={educations}
          workSector={workSector}
          income={income}
          occupations={occupations}
          designation={designation}
          onLayout={registerSection}
          openModal={openModal}
        />

        <LifestylePreferenceSection
          sectionId="lifestyle"
          profile={profile}
          eating={eating}
          drinking={drinking}
          smoking={smoking}
          onLayout={registerSection}
          openModal={openModal}
        />

        <View className="h-12" />
      </ScrollView>

      <SearchableSelectorModal
        visible={modalConfig.visible}
        title={modalConfig.title}
        options={modalConfig?.options ?? []}
        selectedValue={modalConfig.selectedValue}
        onClose={closeModal}
        onSelect={(item) => {
          if (Array.isArray(item)) {
            // Handle multi-select
            handleMultiSelect(modalConfig.field, item);
          } else {
            // Handle single-select
            handleSelect(modalConfig.field, item);
          }
        }}
        editableTextFields={modalConfig.editableTextFields}
        isMultiSelect={modalConfig.isMultiSelect}
        editableFieldsData={editableFieldsData}
        // onEditableFieldChange={onEditableFieldChange}
        handleEditTextSave={handleEditTextSave}
      />
    </View>
  );
};

export default EditPartnerPreferenceScreen;
