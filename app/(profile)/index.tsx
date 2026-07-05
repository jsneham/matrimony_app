import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

// Hooks
import {
  useAge,
  useBloodGroup,
  useBodyType,
  useCastes,
  useCities,
  useCountries,
  useDesignation,
  useDrinking,
  useEating,
  useEducations,
  useFamilyStatus,
  useFamilyType,
  useGotras,
  useHealth,
  useHeight,
  useHoroscope,
  useIncome,
  useLanguages,
  useMangliks,
  useMaritalStatuses,
  useMoonSign,
  useNoOfBrothers,
  useNoOfMarriedBrothers,
  useNoOfMarriedSisters,
  useNoOfSisters,
  useOccupations,
  useProfileBy,
  useReferences,
  useReligions,
  useSkinTone,
  useSmoking,
  useStates,
  useStatusChildren,
  useTotalChildren,
  useWeight,
  useWorkSector,
} from "@/hooks/useMetadata";
import { useProfileMetadataStore } from "@/hooks/useMetadataStore";
import { useMyProfile } from "@/hooks/useProfile";
import { useScrollTabs } from "@/hooks/useScrollTabs";
import { useSession } from "@/hooks/useSession";

// Components
import {
  LoadingOverlay,
  ProfileProgressBanner,
} from "@/components/profile/ProfileEditComponents";
import { ProfileTabBar } from "@/components/profile/ProfileTabBar";
import { BasicsSection } from "@/components/profile/sections/BasicSection";
import { EducationSection } from "@/components/profile/sections/EducationSection";
import { FamilySection } from "@/components/profile/sections/FamilySection";
import { LifestyleSection } from "@/components/profile/sections/LifestyleSection";
import { LocationSection } from "@/components/profile/sections/LocationSection";
import { ReligionSection } from "@/components/profile/sections/ReligionSection";
import { SearchableSelectorModal } from "@/components/SearchableSelectorModal";

// Constants & Types
import { PROFILE_TABS_CONFIG } from "@/constants/data";
import { useProfileEditModal } from "@/hooks/useProfileEditModal";
import { SESSION_KEYS } from "@/types/common";

// Section → tab mapping (drives scroll tracking)
const SECTION_TAB_MAP = [
  { sectionId: "basics_main", tabId: "basics" },
  { sectionId: "location", tabId: "basics" },
  { sectionId: "religion", tabId: "faith" },
  { sectionId: "education", tabId: "career" },
  { sectionId: "lifestyle", tabId: "lifestyle" },
  { sectionId: "family", tabId: "family" },
];

export const EditProfileScreen: React.FC = () => {
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
  } = useProfileMetadataStore();

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
  const { data: profileby } = useProfileBy();
  const { data: reference } = useReferences();
  const { data: weight } = useWeight();
  const { data: bodyType } = useBodyType();
  const { data: eating } = useEating();
  const { data: drinking } = useDrinking();
  const { data: smoking } = useSmoking();
  const { data: skinTone } = useSkinTone();
  const { data: bloodGroup } = useBloodGroup();
  const { data: health } = useHealth();
  const { data: horoscope } = useHoroscope();
  const { data: moonsign } = useMoonSign();
  const { data: workSector } = useWorkSector();
  const { data: designation } = useDesignation();
  const { data: familyType } = useFamilyType();
  const { data: familyStatus } = useFamilyStatus();
  const { data: noOfBrothers } = useNoOfBrothers();
  const { data: noOfMarriedBrothers } = useNoOfMarriedBrothers();
  const { data: noOfSisters } = useNoOfSisters();
  const { data: noOfMarriedSisters } = useNoOfMarriedSisters();
  const { data: totalChildren } = useTotalChildren();
  const { data: statusChildren } = useStatusChildren();

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

      <ProfileProgressBanner percentage={profile?.percentage || 0} />

      <ProfileTabBar
        tabs={PROFILE_TABS_CONFIG}
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
        <BasicsSection
          sectionId="basics_main"
          profile={profile}
          maritalStatuses={maritalStatuses}
          languages={languages}
          height={height}
          age={age}
          profileby={profileby}
          reference={reference}
          totalChildren={totalChildren}
          statusChildren={statusChildren}
          onLayout={registerSection}
          openModal={openModal}
        />

        <LocationSection
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

        <ReligionSection
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

        <EducationSection
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

        <LifestyleSection
          sectionId="lifestyle"
          profile={profile}
          languages={languages}
          weight={weight}
          bodyType={bodyType}
          eating={eating}
          drinking={drinking}
          smoking={smoking}
          skinTone={skinTone}
          bloodGroup={bloodGroup}
          health={health}
          onLayout={registerSection}
          openModal={openModal}
        />

        <FamilySection
          sectionId="family"
          profile={profile}
          familyType={familyType}
          familyStatus={familyStatus}
          noOfBrothers={noOfBrothers}
          noOfMarriedBrothers={noOfMarriedBrothers}
          noOfSisters={noOfBrothers}
          noOfMarriedSisters={noOfMarriedSisters}
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

export default EditProfileScreen;
