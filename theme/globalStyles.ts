import { StyleSheet } from 'react-native';
import { tokens } from './tokens';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: tokens.colors.neutral,
    padding: tokens.spacing.lg,
  },
  content: {
    gap: tokens.spacing.md,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.lg,
  },
  title: {
    fontFamily: tokens.typography.fontFamily.base,
    fontSize: tokens.typography.fontSize.title,
    fontWeight: tokens.typography.fontWeight.extraBold,
    color: tokens.colors.text.title,
  },
  subtitle: {
    fontFamily: tokens.typography.fontFamily.base,
    fontSize: tokens.typography.fontSize.subtitle,
    fontWeight: tokens.typography.fontWeight.regular,
    color: tokens.colors.text.subtitle,
  },
  label: {
    fontFamily: tokens.typography.fontFamily.base,
    fontSize: tokens.typography.fontSize.label,
    fontWeight: tokens.typography.fontWeight.bold,
    color: tokens.colors.text.label,
  },
  body: {
    fontFamily: tokens.typography.fontFamily.base,
    fontSize: tokens.typography.fontSize.body,
    fontWeight: tokens.typography.fontWeight.regular,
    color: tokens.colors.text.body,
  },
  bodyDisabled: {
    fontFamily: tokens.typography.fontFamily.base,
    fontSize: tokens.typography.fontSize.body,
    fontWeight: tokens.typography.fontWeight.regular,
    color: tokens.colors.text.bodyDisabled,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
