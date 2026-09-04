/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#004bfe";
const tintColorDark = "#fff";

export const colors = {
  text: "#11181C",
  background: "#fff",
  tint: tintColorLight,
  icon: "#687076",
  tabIconDefault: "#8B8B8B",
  tabIconSelected: tintColorLight,
  primary: "#116FB1",
  accent: "#F33E6D",
  white: "#fff",
  black: "#000",
  gray100: "#f7fafc",
  placeholder: "#fc1572",
};
// export const colors = {
//   light: {
//     text: "#11181C",
//     background: "#fff",
//     tint: tintColorLight,
//     icon: "#687076",
//     tabIconDefault: "#687076",
//     tabIconSelected: tintColorLight,
//   },
//   dark: {
//     text: "#ECEDEE",
//     background: "#151718",
//     tint: tintColorDark,
//     icon: "#9BA1A6",
//     tabIconDefault: "#9BA1A6",
//     tabIconSelected: tintColorDark,
//   },
// };

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  18: 72,
  20: 80,
  24: 96,
  30: 120,
} as const;

export const components = {
  tabBar: {
    height: spacing[18],
    horizontalInset: spacing[5],
    radius: spacing[8],
    iconFrame: spacing[12],
    itemPaddingVertical: spacing[2],
  },
} as const;

export const theme = {
  colors,
  spacing,
  components,
} as const;
