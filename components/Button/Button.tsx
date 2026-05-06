import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { tokens } from '@/theme';

type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  size?: ButtonSize;
  disabled?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const BUTTON_SIZES: Record<ButtonSize, { button: ViewStyle; text: TextStyle }> = {
  sm: {
    button: {
      height: 36,
      paddingHorizontal: 12,
    },
    text: {
      fontSize: 14,
    },
  },
  md: {
    button: {
      height: 44,
      paddingHorizontal: 16,
    },
    text: {
      fontSize: 16,
    },
  },
  lg: {
    button: {
      height: 52,
      paddingHorizontal: 20,
    },
    text: {
      fontSize: 18,
    },
  },
};

export default function Button({
  title,
  size = 'md',
  disabled = false,
  onPress,
  style,
}: ButtonProps) {
  const variantSize = BUTTON_SIZES[size];

  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        variantSize.button,
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.65}
    >
      <Text 
        style={[
            styles.buttonTextBase, 
            variantSize.text,
            disabled && styles.buttonTextDisabled
        ]}
        >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: tokens.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colors.primary[500],
  },
  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: tokens.colors.neutral[100],
  },
  buttonTextBase: {
    color: tokens.colors.text.onPrimary
  },
  buttonTextDisabled: {
    color: tokens.typography.textStyles.bodyM.color
  }
});