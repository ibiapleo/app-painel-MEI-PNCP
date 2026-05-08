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
type ButtonVariant = 'solid' | 'outlined';

interface ButtonProps {
  title: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
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
  variant = 'solid',
  disabled = false,
  onPress,
  style,
}: ButtonProps) {
  const variantSize = BUTTON_SIZES[size];
  const isOutlined = variant === 'outlined';

  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        variantSize.button,
        isOutlined && styles.buttonOutlined,
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
            disabled && styles.buttonTextDisabled,
            isOutlined && styles.buttonTextOutlined
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
  buttonOutlined: {
    borderWidth: 1,
    borderColor: tokens.colors.primary[500],
    backgroundColor: tokens.colors.neutral[50],
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
  },
  buttonTextOutlined: {
    color: tokens.colors.primary[500],
  }
});