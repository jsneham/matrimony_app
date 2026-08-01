import {
  useAge,
  useBodyType,
  useCountries,
  useDrinking,
  useEating,
  useEducations,
  useHeight,
  useIncome,
  useLanguages,
  useMaritalStatuses,
  useMultiCastes,
  useMultiCities,
  useOccupations,
  useReligions,
  useSkinTone,
  useSmoking,
  useStates,
  useWorkSector,
} from "@/hooks/useMetadata";
import { LookupItem } from "@/types/metadata";
import { VerticalRangeSlider } from "@/components/VerticalRangeSlider";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Age/Height range pickers are locked to a fixed 6-step window — dragging
// "From" always keeps "To" exactly 6 steps ahead.
const FIXED_RANGE_STEPS = 6;

const TOP_TABS = ["Filters", "ID", "Keyword", "Saved"] as const;
type TopTab = (typeof TOP_TABS)[number];
const TOP_TAB_WIDTH = SCREEN_WIDTH / TOP_TABS.length;

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

export default function SearchMatchesScreen() {
  const insets = useSafeAreaInsets();
  // Footer is position:absolute, so it doesn't reserve space in the row's
  // own flex layout — this is its real rendered height (pt-4 + button + its
  // own bottom safe-area padding), used to reserve matching space above it.
  const footerHeight = 16 + 50 + Math.max(insets.bottom, 16);
  const indicatorLeft = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  const tabLayouts = useRef<Record<string, { x: number; width: number }>>(
    {},
  ).current;

  const [activeTopTab, setActiveTopTab] = useState<TopTab>("Filters");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("state");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedValues, setSelectedValues] = useState<
    Partial<Record<CategoryKey, string[]>>
  >({});

  // Age/Height are range pickers, not single-select radio lists — tracked
  // separately as low/high index pairs into their own options arrays.
  const [ageLowIndex, setAgeLowIndex] = useState(0);
  const [ageHighIndex, setAgeHighIndex] = useState(0);
  const [heightLowIndex, setHeightLowIndex] = useState(0);
  const [heightHighIndex, setHeightHighIndex] = useState(0);
  const ageRangeInitialized = useRef(false);
  const heightRangeInitialized = useRef(false);

  const animateIndicatorTo = (tab: TopTab) => {
    const layout = tabLayouts[tab];
    if (!layout) return;
    Animated.parallel([
      Animated.spring(indicatorLeft, {
        toValue: layout.x,
        useNativeDriver: false,
        tension: 60,
        friction: 10,
      }),
      Animated.spring(indicatorWidth, {
        toValue: layout.width,
        useNativeDriver: false,
        tension: 60,
        friction: 10,
      }),
    ]).start();
  };

  const handleTopTabLayout = (tab: TopTab, x: number, width: number) => {
    tabLayouts[tab] = { x, width };
    if (tab === activeTopTab) {
      indicatorLeft.setValue(x);
      indicatorWidth.setValue(width);
    }
  };

  const handleTopTabPress = (tab: TopTab) => {
    setActiveTopTab(tab);
    animateIndicatorTo(tab);
  };

  const { data: heights } = useHeight();
  const { data: ages } = useAge();

  // Default "From" is 24 for Age and 5ft for Height — matched by value text
  // rather than a hardcoded index, since the exact list position can vary.
  const findAgeDefaultLowIndex = () => {
    const idx = ages.findIndex((a) =>
      a.val.replace(/\s+/g, " ").trim().toLowerCase().startsWith("24"),
    );
    return idx >= 0 ? idx : 0;
  };
  const findHeightDefaultLowIndex = () => {
    const idx = heights.findIndex(
      (h) => h.val.trim().toLowerCase() === "5ft",
    );
    return idx >= 0 ? idx : 0;
  };

  useEffect(() => {
    if (!ageRangeInitialized.current && ages.length > 0) {
      const low = findAgeDefaultLowIndex();
      setAgeLowIndex(low);
      setAgeHighIndex(Math.min(low + FIXED_RANGE_STEPS, ages.length - 1));
      ageRangeInitialized.current = true;
    }
  }, [ages]);

  useEffect(() => {
    if (!heightRangeInitialized.current && heights.length > 0) {
      const low = findHeightDefaultLowIndex();
      setHeightLowIndex(low);
      setHeightHighIndex(
        Math.min(low + FIXED_RANGE_STEPS, heights.length - 1),
      );
      heightRangeInitialized.current = true;
    }
  }, [heights]);

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

  // State/City/Caste are dependent lookups — State defaults to India so it
  // works without requiring a prior Country selection; City/Caste only
  // populate once the user has picked a State/Religion in this same screen.
  const indiaId = useMemo(
    () => countries?.find((c) => c.val.toLowerCase() === "india")?.id,
    [countries],
  );
  const { data: states } = useStates(indiaId);
  const { data: cities } = useMultiCities(selectedValues.state ?? []);
  const { data: castes } = useMultiCastes(selectedValues.religion ?? []);

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

  const isRangeCategory =
    activeCategory === "age" || activeCategory === "height";
  const rangeLabel =
    activeCategory === "age"
      ? `${ages[ageLowIndex]?.val ?? ""} - ${ages[ageHighIndex]?.val ?? ""}`
      : `${heights[heightLowIndex]?.val ?? ""} - ${heights[heightHighIndex]?.val ?? ""}`;

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
      let nextValue: string[] | undefined;
      if (id === "__any__") {
        // "No Preference (Any)" clears the whole selection for this category.
        nextValue = undefined;
      } else {
        const current = prev[activeCategory] ?? [];
        nextValue = current.includes(id)
          ? current.filter((v) => v !== id)
          : [...current, id];
        if (nextValue.length === 0) nextValue = undefined;
      }
      const next = { ...prev, [activeCategory]: nextValue };
      // Changing a parent filter invalidates any dependent child selection.
      if (activeCategory === "religion") next.caste = undefined;
      if (activeCategory === "state") next.city = undefined;
      return next;
    });
  };

  const handleReset = () => {
    setSearchQuery("");
    if (activeCategory === "age") {
      const low = findAgeDefaultLowIndex();
      setAgeLowIndex(low);
      setAgeHighIndex(Math.min(low + FIXED_RANGE_STEPS, Math.max(ages.length - 1, 0)));
      return;
    }
    if (activeCategory === "height") {
      const low = findHeightDefaultLowIndex();
      setHeightLowIndex(low);
      setHeightHighIndex(
        Math.min(low + FIXED_RANGE_STEPS, Math.max(heights.length - 1, 0)),
      );
      return;
    }
    setSelectedValues((prev) => ({ ...prev, [activeCategory]: undefined }));
  };

  const handleSearch = () => {
    console.log("Search filters:", {
      ...selectedValues,
      age: ages[ageLowIndex] &&
        ages[ageHighIndex] && {
          fromId: ages[ageLowIndex].id,
          toId: ages[ageHighIndex].id,
        },
      height: heights[heightLowIndex] &&
        heights[heightHighIndex] && {
          fromId: heights[heightLowIndex].id,
          toId: heights[heightHighIndex].id,
        },
    });
  };

  const isSelected = (id: string) =>
    id === "__any__"
      ? !selectedValues[activeCategory]?.length
      : (selectedValues[activeCategory] ?? []).includes(id);

  return (
    <View style={{ flex: 1 }} className="bg-app-background">
      {/* Top tabs */}
      <View className="bg-white">
        <View className="flex-row h-11 border-b border-inactive-border">
          {TOP_TABS.map((tab) => {
            const isActive = tab === activeTopTab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => handleTopTabPress(tab)}
                onLayout={(e) =>
                  handleTopTabLayout(
                    tab,
                    e.nativeEvent.layout.x,
                    e.nativeEvent.layout.width,
                  )
                }
                style={{ width: TOP_TAB_WIDTH }}
                className="flex-1 items-center justify-center"
                activeOpacity={0.7}
              >
                <Text
                  className={`text-lg font-bold ${
                    isActive ? "text-tab-text-active" : "text-tab-text-inactive"
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Animated Indicator */}
        <Animated.View
          style={{
            width: indicatorWidth,
            transform: [{ translateX: indicatorLeft }],
          }}
          className="absolute bottom-0 h-[2px] bg-black rounded-full"
        />
      </View>

      {activeTopTab === "Filters" ? (
        <View style={{ flex: 1, minHeight: 0, position: "relative" }}>
          <View style={{ flex: 1, minHeight: 0, flexDirection: "row" }}>
            {/* Category sidebar */}
            <ScrollView
              className="bg-app-background"
              style={{
                flex: 1,
                minHeight: 0,
                maxWidth: 145,
                marginTop: 20,
                marginBottom: footerHeight + 60,
              }}
              contentContainerStyle={{ paddingTop: 55, paddingBottom: 100 }}
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
              style={{
                flex: 1,
                minHeight: 0,
                borderRadius: 12,
                marginTop: 20,
                marginBottom: footerHeight + 20,
                marginRight: 20,
              }}
              className="bg-white overflow-hidden"
            >
              <View className="flex-row items-center justify-between px-4 pt-4 pb-3">
                {isRangeCategory ? (
                  <View style={{ height: 24 }} className="justify-center">
                    <Text className="text-sm font-bold text-pink-600">
                      {rangeLabel}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{ flex: 1, flexDirection: "row", height: 24 }}
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
                )}
                <Pressable
                  onPress={handleReset}
                  hitSlop={8}
                  style={{ height: 24, justifyContent: "center" }}
                >
                  <Text className="text-sm font-bold text-gray">Reset</Text>
                </Pressable>
              </View>
              <View className="h-[1px] bg-light-divider-color mx-4" />

              {isRangeCategory ? (
                <View style={{ flex: 1, minHeight: 0 }} className="pt-4 pb-4">
                  <View
                    style={{ flex: 1, minHeight: 0 }}
                    className="items-center"
                  >
                    {activeCategory === "age" ? (
                      <VerticalRangeSlider
                        length={ages.length}
                        lowIndex={ageLowIndex}
                        highIndex={ageHighIndex}
                        labels={ages.map((a) => a.val)}
                        fixedRange={FIXED_RANGE_STEPS}
                        onChange={(low, high) => {
                          setAgeLowIndex(low);
                          setAgeHighIndex(high);
                        }}
                        onSlidingComplete={(low, high) => {
                          setAgeLowIndex(low);
                          setAgeHighIndex(high);
                        }}
                      />
                    ) : (
                      <VerticalRangeSlider
                        length={heights.length}
                        lowIndex={heightLowIndex}
                        highIndex={heightHighIndex}
                        labels={heights.map((h) => h.val)}
                        fixedRange={FIXED_RANGE_STEPS}
                        onChange={(low, high) => {
                          setHeightLowIndex(low);
                          setHeightHighIndex(high);
                        }}
                        onSlidingComplete={(low, high) => {
                          setHeightLowIndex(low);
                          setHeightHighIndex(high);
                        }}
                      />
                    )}
                  </View>
                </View>
              ) : (
                <FlatList
                  style={{ flex: 1, minHeight: 0 }}
                  data={filteredOptions}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
                  renderItem={({ item }) => {
                    const selected = isSelected(item.id);
                    return (
                      <Pressable
                        onPress={() => handleSelectOption(item.id)}
                        className="flex-row items-center px-4 py-4"
                      >
                        <View
                          className={`w-4 h-4 rounded border items-center justify-center mr-2 ${
                            selected
                              ? "bg-pink-600 border-pink-600"
                              : "border-black bg-white"
                          }`}
                        >
                          {selected && (
                            <Ionicons name="checkmark" size={12} color="white" />
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
              )}
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
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-gray text-base font-bold text-center">
            {activeTopTab} coming soon
          </Text>
        </View>
      )}
    </View>
  );
}
