import {
    useAge,
    useBodyType,
    useCastes,
    useCities,
    useCountries,
    useDrinking,
    useEating,
    useEducations,
    useHeight,
    useIncome,
    useLanguages,
    useMaritalStatuses,
    useOccupations,
    useReligions,
    useSkinTone,
    useSmoking,
    useStates,
    useWorkSector,
} from "@/hooks/useMetadata";
import { useSession } from "@/hooks/useSession";
import { SESSION_KEYS } from "@/types/common";
import { LookupItem } from "@/types/metadata";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    FlatList,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CategoryKey =
  | "height"
  | "age"
  | "maritalStatus"
  | "religion"
  | "caste"
  | "motherTongue"
  | "country"
  | "state"
  | "city"
  | "education"
  | "occupation"
  | "employedIn"
  | "income"
  | "foodChoices"
  | "drinks"
  | "smoking"
  | "bodyType"
  | "skinComplexion";

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "height", label: "Height" },
  { key: "age", label: "Age" },
  { key: "maritalStatus", label: "Marital Status" },
  { key: "religion", label: "Religion" },
  { key: "caste", label: "Caste" },
  { key: "motherTongue", label: "Mother Tongue" },
  { key: "country", label: "Country" },
  { key: "state", label: "State" },
  { key: "city", label: "City" },
  { key: "education", label: "Education" },
  { key: "occupation", label: "Occupation" },
  { key: "employedIn", label: "Employed In" },
  { key: "income", label: "Annual Income" },
  { key: "foodChoices", label: "Food Choices" },
  { key: "drinks", label: "Drinks (Alcohol)" },
  { key: "smoking", label: "Smoking" },
  { key: "bodyType", label: "Body Type" },
  { key: "skinComplexion", label: "Skin Complexion" },
];

const NO_PREFERENCE: LookupItem = { id: "__any__", val: "No Preference (Any)" };

export default function FiltersTab() {
  const insets = useSafeAreaInsets();
  const { data: sessionData } = useSession([
    SESSION_KEYS.USER_ID,
    SESSION_KEYS.GENDER, // TODO: confirm this session key exists
  ]);
  const memberId = sessionData?.[SESSION_KEYS.USER_ID] || "";
  const myGender = sessionData?.[SESSION_KEYS.GENDER] || "";

  const [activeCategory, setActiveCategory] = useState<CategoryKey>("state");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValues, setSelectedValues] = useState<
    Partial<Record<CategoryKey, string>>
  >({});

  const { data: heights } = useHeight();
  const { data: ages } = useAge();
  const { data: maritalStatuses } = useMaritalStatuses();
  const { data: religions } = useReligions();
  const { data: languages } = useLanguages();
  const { data: countries } = useCountries();
  const { data: educations } = useEducations();
  const { data: occupations } = useOccupations();
  const { data: workSector } = useWorkSector();
  const { data: income } = useIncome();
  const { data: eating } = useEating();
  const { data: drinking } = useDrinking();
  const { data: smoking } = useSmoking();
  const { data: bodyType } = useBodyType();
  const { data: skinTone } = useSkinTone();

  const indiaId = useMemo(
    () => countries?.find((c) => c.val.toLowerCase() === "india")?.id,
    [countries],
  );
  const { data: states } = useStates(indiaId);
  const { data: cities } = useCities(selectedValues.state);
  const { data: castes } = useCastes(selectedValues.religion);

  const categoryData: Record<CategoryKey, LookupItem[]> = {
    height: heights ?? [],
    age: ages ?? [],
    maritalStatus: maritalStatuses ?? [],
    religion: religions ?? [],
    caste: castes ?? [],
    motherTongue: languages ?? [],
    country: countries ?? [],
    state: states ?? [],
    city: cities ?? [],
    education: educations ?? [],
    occupation: occupations ?? [],
    employedIn: workSector ?? [],
    income: income ?? [],
    foodChoices: eating ?? [],
    drinks: drinking ?? [],
    smoking: smoking ?? [],
    bodyType: bodyType ?? [],
    skinComplexion: skinTone ?? [],
  };

  const currentOptions = categoryData[activeCategory];

  const filteredOptions = useMemo(() => {
    const base = searchQuery
      ? currentOptions.filter((opt) =>
          opt.val.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [NO_PREFERENCE, ...currentOptions];
    return base;
  }, [currentOptions, searchQuery]);

  const handleSelectCategory = (key: CategoryKey) => {
    setActiveCategory(key);
    setSearchQuery("");
  };

  const handleSelectOption = (id: string) => {
    setSelectedValues((prev) => {
      const next = {
        ...prev,
        [activeCategory]: id === "__any__" ? undefined : id,
      };
      if (activeCategory === "religion") next.caste = undefined;
      if (activeCategory === "state") next.city = undefined;
      return next;
    });
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedValues((prev) => ({ ...prev, [activeCategory]: undefined }));
  };

  const handleSearch = () => {
    const searchParams = {
      member_id: memberId,
      from_age: "", // TODO: wire to actual age-range picker if you have one beyond the lookup list
      to_age: "",
      from_height: "",
      to_height: "",
      looking_for: selectedValues.maritalStatus ?? "",
      religion: selectedValues.religion ?? "",
      caste: selectedValues.caste ?? "",
      mothertongue: selectedValues.motherTongue ?? "",
      country: selectedValues.country ?? "",
      state: selectedValues.state ?? "",
      city: selectedValues.city ?? "",
      education: selectedValues.education ?? "",
      occupation: selectedValues.occupation ?? "",
      employee_in: selectedValues.employedIn ?? "",
      income: selectedValues.income ?? "",
      diet: selectedValues.foodChoices ?? "",
      drink: selectedValues.drinks ?? "",
      smoking: selectedValues.smoking ?? "",
      complexion: selectedValues.skinComplexion ?? "",
      bodytype: selectedValues.bodyType ?? "",
      photo_search: "", // TODO: wire to a checkbox if you add one
      gender: myGender === "Female" ? "Male" : "Female",
    };

    router.push({
      pathname: "/search-results",
      params: { searchData: JSON.stringify(searchParams) },
    });
  };

  const isSelected = (id: string) =>
    id === "__any__"
      ? !selectedValues[activeCategory]
      : selectedValues[activeCategory] === id;

  return (
    <View style={{ flex: 1, minHeight: 0, position: "relative" }}>
      <View style={{ flex: 1, minHeight: 0, flexDirection: "row" }}>
        {/* Category sidebar */}
        <ScrollView
          className="bg-app-background"
          style={{ flex: 1, minHeight: 0, maxWidth: 145 }}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat.key === activeCategory;
            return (
              <Pressable
                key={cat.key}
                onPress={() => handleSelectCategory(cat.key)}
                style={{ paddingVertical: 17 }}
                className={`px-4 ${
                  isActive ? "bg-white border-l-2 border-pink-600" : ""
                }`}
              >
                <Text
                  numberOfLines={1}
                  className={`text-sm font-bold ${
                    isActive ? "text-pink-600" : "text-gray"
                  }`}
                >
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Options panel */}
        <View
          style={{ flex: 1, minHeight: 0, borderRadius: 12 }}
          className="bg-white overflow-hidden"
        >
          <View className="flex-row items-center justify-between px-4 pt-4 pb-3">
            <View
              style={{ flex: 1, flexDirection: "row" }}
              className="items-center"
            >
              <Feather name="search" size={16} color="#8B8B8B" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search"
                placeholderTextColor="#8B8B8B"
                style={{ flex: 1, padding: 0, marginLeft: 8 }}
                className="text-sm font-regular text-black"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <Pressable onPress={handleReset} hitSlop={8}>
              <Text className="text-sm font-bold text-gray underline">
                Reset
              </Text>
            </Pressable>
          </View>
          <View className="h-[1px] bg-light-divider-color mx-4" />

          <FlatList
            style={{ flex: 1, minHeight: 0 }}
            data={filteredOptions}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingTop: 8, paddingBottom: 100 }}
            renderItem={({ item }) => {
              const selected = isSelected(item.id);
              return (
                <Pressable
                  onPress={() => handleSelectOption(item.id)}
                  className="flex-row items-center px-4 py-4"
                >
                  <View
                    className={`w-4 h-4 rounded-full border items-center justify-center mr-2 ${
                      selected ? "border-pink-600" : "border-black"
                    }`}
                  >
                    {selected && (
                      <View className="w-2 h-2 rounded-full bg-pink-600" />
                    )}
                  </View>
                  <Text
                    numberOfLines={1}
                    className={`flex-1 text-sm font-bold ${
                      selected ? "text-pink-600" : "text-gray"
                    }`}
                  >
                    {item.val}
                  </Text>
                </Pressable>
              );
            }}
            ListEmptyComponent={
              <Text className="text-gray text-sm font-regular text-center mt-6">
                No options found
              </Text>
            }
          />
        </View>
      </View>

      {/* Footer */}
      <View
        className="bg-white px-5 pt-4"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: Math.max(insets.bottom, 16),
        }}
      >
        <Pressable
          onPress={handleSearch}
          className="py-4 bg-pink-600 rounded-full items-center active:bg-pink-700"
        >
          <Text className="text-white font-bold text-base">Search</Text>
        </Pressable>
      </View>
    </View>
  );
}
