import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons} from "@expo/vector-icons";

import { tokens } from "@/theme";

interface SettingsMenuButtonProps {
  title: string;
  onPress?: () => void;
  expanded?: boolean;
}

export default function SettingsMenuButton({ title, onPress, expanded }: SettingsMenuButtonProps) {
  const iconName = expanded === undefined
    ? "chevron-forward-outline"
    : expanded
      ? "chevron-down-outline"
      : "chevron-forward-outline";

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
      <Ionicons
        name={iconName}
        size={16}
        color={tokens.colors.neutral["400"]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    color: tokens.colors.text.primary,
  },
});