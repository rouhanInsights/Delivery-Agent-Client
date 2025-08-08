import { StyleSheet, Platform } from 'react-native';

type Scheme = 'light' | 'dark';

const palette = {
  light: {
    bg: '#FFFFFF',
    textPrimary: '#0B1220',
    textSecondary: '#4A5568',
    brand: '#0E9F6E', // teal-ish accent
    card: '#F7FAFC',
    border: '#E2E8F0',
    statusBar: '#FFFFFF',
  },
  dark: {
    bg: '#0B0F14',
    textPrimary: '#E6E8EA',
    textSecondary: '#A3A9B3',
    brand: '#31D0AA',
    card: '#121821',
    border: '#1F2A37',
    statusBar: '#0B0F14',
  },
};

export const getWelcomeStyles = (scheme: Scheme) => {
  const c = palette[scheme];

  return StyleSheet.create({
    statusBar: {
      backgroundColor: c.statusBar,
    },
    container: {
      flex: 1,
      backgroundColor: c.bg,
      paddingHorizontal: 24,
      paddingTop: Platform.select({ ios: 32, android: 24, default: 24 }),
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    },
    title: {
      fontSize: 30,
      fontWeight: '700',
      color: c.textPrimary,
      letterSpacing: 0.4,
    },
    brand: {
      fontSize: 18,
      fontWeight: '600',
      color: c.brand,
      marginBottom: 6,
    },
    image: {
      width: '80%',
      height: 240,
      marginVertical: 12,
    },
    subtitle: {
      fontSize: 16,
      color: c.textSecondary,
      marginBottom: 20,
    },
    ctaWrap: {
      width: '100%',
      marginTop: 8,
      paddingHorizontal: 8,
    },
    // If you want to override your Button styles from here:
    button: {
      backgroundColor: c.brand,
      borderColor: c.border,
    },
    buttonText: {
      color: scheme === 'dark' ? '#0B0F14' : '#FFFFFF',
      fontWeight: '700',
    },
  });
};
