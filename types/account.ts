export type ActionCardProps = {
  icon: string;
  subtitle: string;
  title: string;
  onPress: () => void;
};

export type MenuItemProps = {
  icon: string;
  iconSet?: "material" | "feather";
  title: string;
  subtitle?: string;
  onPress: () => void;
  isLast?: boolean;
};
