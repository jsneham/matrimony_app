import { View } from "react-native";

export const SkeletonCard = () => (
  <View className="rounded-2xl overflow-hidden bg-white shadow-lg mb-5 mx-5">
    {/* Image Skeleton */}
    <View className="w-full h-96 bg-gray-200 animate-pulse" />
    {/* Content Skeleton */}
    <View className="px-6 py-5 bg-white">
      <View className="flex-row items-center mb-3">
        <View className="h-7 w-36 bg-gray-200 rounded-lg" />
        <View className="h-6 w-10 bg-gray-200 rounded-lg ml-2" />
      </View>
      <View className="h-10 bg-gray-200 rounded-lg mb-2" />
    </View>
  </View>
);
