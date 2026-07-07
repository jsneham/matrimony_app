import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

// Hooks
import {
  useAge,
  useCastes,
  useCities,
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
  useOccupations,
  useReligions,
  useSmoking,
  useStates,
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
    selectedCountryId,
    selectedStateId,
    selectedReligionId,
    setInitialValues,
    setCountryId,
    setStateId,
    setReligionId,
  } = usePreferenceMetadataStore();

  // ── Master data lists (fetched once, cached forever) ────────────────────────
  const { data: countries } = useCountries();
  const { data: states } = useStates(selectedCountryId);
  const { data: cities } = useCities(selectedStateId);
  const { data: religions } = useReligions();
  const { data: castes } = useCastes(selectedReligionId);
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
    // const religionId =
    //   religions.find((r) => r.val === profile.religion_name)?.id || "";
    setInitialValues(
      profile.country_id || "",
      profile.state_id || "",
      profile.religion || "",
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
    onEditableFieldChange,
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
        message="You will see matches according to set preferences."
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
          eating={eating}
          drinking={drinking}
          smoking={smoking}
          onLayout={registerSection}
          openModal={openModal}
        />

        <LocationPreferenceSection
          sectionId="location"
          profile={profile}
          countries={countries}
          states={states}
          cities={cities}
          selectedCountryId={selectedCountryId}
          selectedStateId={selectedStateId}
          onLayout={registerSection}
          openModal={openModal}
        />

        <ReligionPreferenceSection
          sectionId="religion"
          profile={profile}
          religions={religions}
          castes={castes}
          gotras={gotras}
          mangliks={mangliks}
          horoscope={horoscope}
          moonsign={moonsign}
          selectedReligionId={selectedReligionId}
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
        onEditableFieldChange={onEditableFieldChange}
        handleEditTextSave={handleEditTextSave}
      />
    </View>
  );
};

export default EditPartnerPreferenceScreen;
