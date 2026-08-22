import { View } from "react-native";

export const SkeletonCard = () => (
  <View className="flex-1 overflow-hidden rounded-[20px] bg-gray-200 shadow-lg">
    <View className="flex-1 bg-gray-300">
      <View className="absolute right-3 top-3 h-7 w-12 rounded-full bg-black/30" />

      <View className="absolute bottom-0 left-0 right-0 bg-black/50">
        <View className="px-4 pb-3 pt-6">
          <View className="mb-2 h-3 w-24 rounded bg-white/40" />

          <View className="mb-2 flex-row items-center">
            <View className="h-7 w-36 rounded bg-white/50" />
            <View className="ml-2 h-6 w-10 rounded bg-white/40" />
          </View>

          <View className="mb-2 h-3 w-4/5 rounded bg-white/40" />
          <View className="mb-2 h-3 w-3/5 rounded bg-white/40" />
          <View className="h-3 w-2/5 rounded bg-white/30" />

          <View className="mt-4 flex-row items-center justify-between">
            {[1, 2, 3, 4].map((item) => (
              <View key={item} className="flex-1 items-center">
                <View className="h-6 w-6 rounded-full bg-white/40" />
                <View className="mt-2 h-2 w-12 rounded bg-white/30" />
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  </View>
);
