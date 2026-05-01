export const tokens = {
  colors: {
    primary: '#006FFD',
    highlight: '#EAF2FF',
    neutral: '#F8F9FE',
    text: {
      title: '#000000',
      subtitle: '#71727A',
      label: '#2F3036',
      body: '#1F2024',
      bodyDisabled: '#71727A',
      onPrimary: '#FFFFFF'
    },
  },
  typography: {
    fontFamily: {
      base: 'Inter',
    },
    fontSize: {
      title: 24,
      label: 14,
      body: 12,
      subtitle: 12,
    },
    fontWeight: {
      regular: '400',
      bold: '700',
      extraBold: '800',
    } as const,
    textStyles: {
      title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#000000',
      },
      subtitle: {
        fontSize: 12,
        fontWeight: '400',
        color: '#71727A',
      },
      label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2F3036',
      },
      body: {
        fontSize: 12,
        fontWeight: '400',
        color: '#1F2024',
      },
      bodyDisabled: {
        fontSize: 12,
        fontWeight: '400',
        color: '#71727A',
      },
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    pill: 999,
  },
} as const;