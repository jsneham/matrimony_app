import { RangeSlider } from "@/components/RangeSlider";
import { DummyIcon } from "@/constants/icons";
import { LookupItem } from "@/types/metadata";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/Text";

type RangeSliderRowProps = {
  label: string;
  options: LookupItem[]; // sorted low → high, e.g. age or height lookup list
  fromId?: string;
  toId?: string;
  onCommit: (fromItem: LookupItem, toItem: LookupItem) => void;
  isLast?: boolean;
};

export const RangeSliderRow: React.FC<RangeSliderRowProps> = ({
  label,
  options,
  fromId,
  toId,
  onCommit,
  isLast = false,
}) => {
  const findIndex = (id?: string, fallback = 0) => {
    const idx = options.findIndex((o) => o.id === id);
    return idx >= 0 ? idx : fallback;
  };

  const [lowIndex, setLowIndex] = useState(findIndex(fromId, 0));
  const [highIndex, setHighIndex] = useState(
    findIndex(toId, Math.max(options.length - 1, 0)),
  );

  useEffect(() => {
    setLowIndex(findIndex(fromId, 0));
  }, [fromId, options]);

  useEffect(() => {
    setHighIndex(findIndex(toId, Math.max(options.length - 1, 0)));
  }, [toId, options]);

  if (options.length === 0) return null;

  const lowVal = options[lowIndex]?.val ?? "";
  const highVal = options[highIndex]?.val ?? "";

  return (
    <View
      className={`px-5 py-4 bg-white ${isLast ? "" : "border-b border-gray-100"}`}
      style={
        isLast
          ? { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }
          : undefined
      }
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <DummyIcon />
          <Text className="text-base font-bold text-black">{label}</Text>
        </View>
        <Text className="text-base text-gray-400 font-regular">
          {lowVal} - {highVal}
        </Text>
      </View>

      <RangeSlider
        length={options.length}
        lowIndex={lowIndex}
        highIndex={highIndex}
        onChange={(low, high) => {
          setLowIndex(low);
          setHighIndex(high);
        }}
        onSlidingComplete={(low, high) => {
          setLowIndex(low);
          setHighIndex(high);
          const fromItem = options[low];
          const toItem = options[high];
          if (fromItem && toItem) onCommit(fromItem, toItem);
        }}
      />
    </View>
  );
};

export default RangeSliderRow;
