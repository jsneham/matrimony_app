import { UserProfile } from "@/types/profile";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const EditProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    basics: true,
    preferences: false,
    location: false,
    religion: false,
    education: false,
    lifestyle: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateProfile = (key: keyof UserProfile, value: any) => {
    // setProfile((prev) => ({
    //   ...prev,
    //   [key]: value,
    // }));
  };

  const SectionHeader = ({
    title,
    section,
  }: {
    title: string;
    section: string;
  }) => (
    <TouchableOpacity
      onPress={() => toggleSection(section)}
      className="flex-row justify-between items-center px-5 py-4 bg-gray-50 border-b border-gray-200"
    >
      <Text className="text-lg font-medium text-gray-900">{title}</Text>
      <Text className="text-2xl text-gray-400">
        {expandedSections[section] ? "−" : "+"}
      </Text>
    </TouchableOpacity>
  );

  const SelectOption = ({
    label,
    value,
    onSelect,
    options,
  }: {
    label: string;
    value: string;
    onSelect: (val: string) => void;
    options: string[];
  }) => (
    <View className="px-5 py-4 border-b border-gray-100">
      <Text className="text-sm font-medium text-gray-600 mb-2">{label}</Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => onSelect(option)}
            className={`px-4 py-2 rounded-full border ${
              value === option
                ? "bg-pink-500 border-pink-500"
                : "bg-white border-gray-300"
            }`}
          >
            <Text
              className={`font-medium ${
                value === option ? "text-white" : "text-gray-700"
              }`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const SliderInput = ({
    label,
    value,
    onChange,
    min,
    max,
  }: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    min: string;
    max: string;
  }) => (
    <View className="px-5 py-4 border-b border-gray-100">
      <Text className="text-sm font-medium text-gray-600 mb-3">{label}</Text>
      <View className="flex-row items-center gap-3">
        <Text className="text-sm text-gray-500">{min}</Text>
        <View className="flex-1 h-1 bg-gray-300 rounded-full" />
        <Text className="text-sm text-gray-500">{max}</Text>
      </View>
      <View className="flex-row items-center gap-2 mt-2">
        <Text className="text-xs text-gray-400">↔</Text>
        <Text className="text-sm font-medium text-gray-700">{value}</Text>
      </View>
    </View>
  );

  const TextInputField = ({
    label,
    value,
    onChange,
    placeholder,
  }: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
  }) => (
    <View className="px-5 py-4 border-b border-gray-100">
      <Text className="text-sm font-medium text-gray-600 mb-2">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder || label}
        placeholderTextColor="#999"
        className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
      />
    </View>
  );

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
      <ScrollView className="flex-1 bg-white">
        {/* Basics Section */}
        <SectionHeader title="Basics" section="basics" />
        {expandedSections.basics && (
          <>
            <SelectOption
              label="Marital Status"
              value={profile?.maritalStatus ?? ""}
              onSelect={(val) => updateProfile("maritalStatus", val)}
              options={["Never Married", "Divorced", "Widowed", "Separated"]}
            />
            <TextInputField
              label="Height"
              value={profile?.height ?? ""}
              onChange={(val) => updateProfile("height", val)}
              placeholder="e.g., 5'8\"
            />
            <SliderInput
              label="Age Preference"
              value={`${profile?.partFrmAge[0] || "18"} - ${profile?.partToAge[1] || "35"}`}
              onChange={() => {}}
              min="18"
              max="80"
            />
            <SliderInput
              label="Height Preference"
              value={`${profile?.partHeightTo[0] || `5'0\"`} - ${profile?.partHeightStr[1] || `6'6\"`}`}
              onChange={() => {}}
              min="4'8\"
              max="6'10\"
            />
          </>
        )}

        {/* Location Section */}
        <SectionHeader title="Location" section="location" />
        {expandedSections.location && (
          <>
            <SelectOption
              label="Country"
              value={profile?.countryName ?? ""}
              onSelect={(val) => updateProfile("countryName", val)}
              options={["India", "USA", "Canada", "Australia", "UAE"]}
            />
            <TextInputField
              label="State"
              value={profile?.stateName ?? ""}
              onChange={(val) => updateProfile("stateName", val)}
            />
            <SelectOption
              label="City"
              value={profile?.cityName ?? ""}
              onSelect={(val) => updateProfile("cityName", val)}
              options={["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad"]}
            />
          </>
        )}

        {/* Religion & Caste Section */}
        <SectionHeader title="Religion" section="religion" />
        {expandedSections.religion && (
          <>
            <SelectOption
              label="Religion"
              value={profile?.religion ?? ""}
              onSelect={(val) => updateProfile("religion", val)}
              options={["Hindu", "Muslim", "Christian", "Sikh", "Buddhist"]}
            />
            <SelectOption
              label="Caste"
              value={profile?.caste ?? ""}
              onSelect={(val) => updateProfile("caste", val)}
              options={[
                "Select Caste",
                "Brahmin",
                "Kshatriya",
                "Vaishya",
                "Shudra",
              ]}
            />
            <TextInputField
              label="Mother Tongue"
              value={profile?.motherTongue ?? ""}
              onChange={(val) => updateProfile("motherTongue", val)}
            />
            <TextInputField
              label="Gotra"
              value={profile?.gothra ?? ""}
              onChange={(val) => updateProfile("gothra", val)}
            />
            <SelectOption
              label="Manglik"
              value={profile?.manglik ?? ""}
              onSelect={(val) => updateProfile("manglik", val)}
              options={["Yes", "No", "Do not know"]}
            />
          </>
        )}

        {/* Education & Career Section */}
        <SectionHeader title="Education & Career" section="education" />
        {expandedSections.education && (
          <>
            <SelectOption
              label="Education"
              value={profile?.educationName ?? ""}
              onSelect={(val) => updateProfile("educationName", val)}
              options={[
                "10th Pass",
                "12th Pass",
                "Bachelors",
                "Masters",
                "PhD",
              ]}
            />
            <TextInputField
              label="Occupation"
              value={profile?.occupation ?? ""}
              onChange={(val) => updateProfile("occupation", val)}
            />
            <SelectOption
              label="Work Sector"
              value={profile?.designation ?? ""}
              onSelect={(val) => updateProfile("designation", val)}
              options={["IT", "Finance", "Healthcare", "Education", "Business"]}
            />
            <SelectOption
              label="Annual Income"
              value={profile?.income ?? ""}
              onSelect={(val) => updateProfile("income", val)}
              options={[
                "< 25 Lakh",
                "25-50 Lakh",
                "50-1 Cr",
                "1-5 Cr",
                "5+ Cr",
              ]}
            />
          </>
        )}

        {/* Lifestyle Section */}
        <SectionHeader title="Lifestyle" section="lifestyle" />
        {expandedSections.lifestyle && (
          <View className="px-5 py-4">
            <LifestyleOption
              icon="🍽️"
              label="Food Choices"
              value="Non-Vegetarian"
              color="bg-pink-50"
            />
            <LifestyleOption
              icon="🚬"
              label="Smoking"
              value="No Preference"
              color="bg-blue-50"
            />
            <LifestyleOption
              icon="🍷"
              label="Drinking (Alcohol)"
              value="Select Drinking Habit"
              color="bg-purple-50"
            />
          </View>
        )}

        <View className="h-20" />
      </ScrollView>
    </View>
  );
};

const LifestyleOption = ({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: string;
  color: string;
}) => (
  <View className={`flex-row items-center gap-3 p-3 rounded-lg mb-2 ${color}`}>
    <Text className="text-2xl">{icon}</Text>
    <View className="flex-1">
      <Text className="text-sm font-medium text-gray-700">{label}</Text>
      <Text className="text-xs text-gray-500">{value}</Text>
    </View>
  </View>
);

export default EditProfileScreen;
