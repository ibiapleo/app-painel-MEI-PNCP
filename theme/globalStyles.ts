import { StyleSheet } from 'react-native';
import { tokens } from './tokens';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: tokens.colors.neutral[100],
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
    fontSize: tokens.typography.textStyles.h1.fontSize,
    fontWeight: tokens.typography.textStyles.h1.fontWeight,
    color: tokens.typography.textStyles.h1.color,
  },
  subtitle: {
    fontFamily: tokens.typography.fontFamily.base,
    fontSize: tokens.typography.textStyles.h5.fontSize,
    fontWeight: tokens.typography.textStyles.h5.fontWeight,
    color: tokens.typography.textStyles.h5.color,
  },
  label: {
    fontFamily: tokens.typography.fontFamily.base,
    fontSize: tokens.typography.textStyles.label.fontSize,
    fontWeight: tokens.typography.textStyles.label.fontWeight,
    color: tokens.typography.textStyles.label.color,
  },
  body: {
    fontFamily: tokens.typography.fontFamily.base,
    fontSize: tokens.typography.textStyles.bodyM.fontSize,
    fontWeight: tokens.typography.textStyles.bodyM.fontWeight,
    color: tokens.typography.textStyles.bodyM.color,
  },
  bodyDisabled: {
    fontFamily: tokens.typography.fontFamily.base,
    fontSize: tokens.typography.textStyles.bodyS.fontSize,
    fontWeight: tokens.typography.textStyles.bodyS.fontWeight,
    color: tokens.typography.textStyles.caption.color,
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
