import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

import type { AppTheme } from '@/hooks/useTheme';
import type { ThemeMode } from '@/stores/theme/types';

export type CompatibilityLevel = 'high' | 'partial' | 'low';
export type CompatibilityIconName = ComponentProps<typeof Ionicons>['name'];

interface CompatibilityColorPalette {
  background: string;
  icon: string;
  text: string;
  iconForeground: string;
}

export interface CompatibilityPalette extends CompatibilityColorPalette {
  iconName: CompatibilityIconName;
  displayLabel: string;
}

const COMPATIBILITY_ICONS: Record<CompatibilityLevel, CompatibilityIconName> = {
  high: 'checkmark',
  partial: 'remove',
  low: 'close',
};

const COMPATIBILITY_LABELS: Record<CompatibilityLevel, string> = {
  high: 'Alta Compatibilidade',
  partial: 'Parcialmente Compatível',
  low: 'Baixa Compatibilidade',
};

export const COMPATIBILITY_ICON_SIZE = 22;
export const COMPATIBILITY_ICON_GLYPH_SIZE = 14;

function normalizeLabel(label: string): string {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function resolveCompatibilityLevel(label: string, score?: number): CompatibilityLevel {
  const normalized = normalizeLabel(label);

  if (normalized.includes('baixa')) return 'low';
  if (normalized.includes('parcial')) return 'partial';
  if (normalized.includes('alta') || normalized.includes('altamente')) return 'high';

  if (score !== undefined) {
    if (score >= 70) return 'high';
    if (score >= 40) return 'partial';
    return 'low';
  }

  return 'high';
}

function getPalettes(theme: AppTheme, isDark: boolean): Record<CompatibilityLevel, CompatibilityColorPalette> {
  if (isDark) {
    return {
      high: {
        background: theme.colors.primary.muted,
        icon: theme.colors.primary.main,
        text: theme.colors.text.primary,
        iconForeground: theme.colors.text.onPrimary,
      },
      partial: {
        background: '#3D3520',
        icon: '#F5A623',
        text: theme.colors.text.primary,
        iconForeground: theme.colors.text.onPrimary,
      },
      low: {
        background: '#3D2A1A',
        icon: theme.warning[500],
        text: theme.colors.text.primary,
        iconForeground: theme.colors.text.onPrimary,
      },
    };
  }

  return {
    high: {
      background: theme.colors.primary.muted,
      icon: theme.colors.primary.main,
      text: theme.colors.text.primary,
      iconForeground: theme.colors.text.onPrimary,
    },
    partial: {
      background: '#FFF8E1',
      icon: '#F5A623',
      text: theme.colors.text.primary,
      iconForeground: theme.colors.text.onPrimary,
    },
    low: {
      background: theme.warning[100],
      icon: theme.warning[500],
      text: theme.colors.text.primary,
      iconForeground: theme.colors.text.onPrimary,
    },
  };
}

export function getCompatibilityPalette(
  theme: AppTheme,
  label: string,
  mode: ThemeMode,
  score?: number,
): CompatibilityPalette {
  const level = resolveCompatibilityLevel(label, score);
  return {
    ...getPalettes(theme, mode === 'dark')[level],
    iconName: COMPATIBILITY_ICONS[level],
    displayLabel: COMPATIBILITY_LABELS[level],
  };
}
