export const tokens = {
  colors: {
    primary: {
      50: '#EAF2FF',
      100: '#B4DBFF',
      200: '#6FBAFF',
      300: '#2897FF',
      500: '#006FFD',
    },
    neutral: {
      50: '#FFFFFF',
      100: '#F8F9FE',
      200: '#E9EBF1',
      300: '#D4D6DB',
      400: '#A6A6AA',
      700: '#494A50',
      800: '#2F3036',
      900: '#1F2024',
    },
    success: {
      500: '#298267',
      400: '#3ACA80',
      100: '#E7F4E8',
    },
    warning: {
      500: '#E88339',
      400: '#FFB37C',
      100: '#FFF4E4',
    },
    error: {
      500: '#ED3241',
      400: '#FF616D',
      100: '#FFE2E5',
    },
    text: {
      heading: '#000000',
      primary: '#1F2024',
      secondary: '#71727A',
      label: '#2F3036',
      onPrimary: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: {
      base: 'Inter',
    },
    fontSize: {
      h1: 24,
      h2: 18,
      h3: 16,
      h4: 14,
      h5: 12,
      bodyXL: 18,
      bodyL: 16,
      bodyM: 14,
      bodyS: 12,
      bodyXS: 10,
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
      extraBold: '800',
    } as const,
    textStyles: {
      h1: {
        fontSize: 24,
        fontWeight: '800',
        color: '#000000',
      },
      h2: {
        fontSize: 18,
        fontWeight: '800',
        color: '#000000',
      },
      h3: {
        fontSize: 16,
        fontWeight: '800',
        color: '#000000',
      },
      h4: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000000',
      },
      h5: {
        fontSize: 12,
        fontWeight: '700',
        color: '#000000',
      },
      bodyXL: {
        fontSize: 18,
        fontWeight: '400',
        color: '#1F2024',
      },
      bodyL: {
        fontSize: 16,
        fontWeight: '400',
        color: '#1F2024',
      },
      bodyM: {
        fontSize: 14,
        fontWeight: '400',
        color: '#1F2024',
      },
      bodyS: {
        fontSize: 12,
        fontWeight: '400',
        color: '#1F2024',
      },
      bodyXS: {
        fontSize: 10,
        fontWeight: '500',
        color: '#1F2024',
      },
      label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2F3036',
      },
      caption: {
        fontSize: 10,
        fontWeight: '600',
        color: '#71727A',
      },
      actionL: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2024',
      },
      actionM: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1F2024',
      },
      actionS: {
        fontSize: 10,
        fontWeight: '600',
        color: '#1F2024',
      },
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    pill: 999,
  },
} as const;