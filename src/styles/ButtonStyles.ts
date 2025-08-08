import { StyleSheet, Platform } from 'react-native';

type Scheme = 'light' | 'dark';

const palette = {
  light: {
    bg: '#FFFFFF',
    // Default button
    btnBg: '#d9e6ff',
    btnText: '#1a3c7e',
    // Welcome variant
    welcomeBg: '#1f6f34',
    welcomeText: '#FFFFFF',
    // Borders/shadows
    border: '#D0D7E2',
    disabledBg: '#E5EAF2',
    disabledText: '#8B95A7',
  },
  dark: {
    bg: '#0B0F14',
    // Default button
    btnBg: '#243447',     // muted blue/gray for dark
    btnText: '#E6E8EA',
    // Welcome variant
    welcomeBg: '#31D0AA', // teal accent pops on dark
    welcomeText: '#0B0F14',
    // Borders/shadows
    border: '#2C3A4A',
    disabledBg: '#1B2530',
    disabledText: '#7E8794',
  },
};

export const getButtonStyles = (scheme: Scheme) => {
  const c = palette[scheme];

  return StyleSheet.create({
    button: {
      backgroundColor: c.btnBg,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: c.border,
      ...Platform.select({
        ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
        android: { elevation: 2 },
        default: {},
      }),
    },
    buttonText: {
      color: c.btnText,
      fontWeight: '700',
      fontSize: 16,
      textAlign: 'center',
      letterSpacing: 0.2,
    },

    // Welcome variant
    welcomeButton: {
      backgroundColor: c.welcomeBg,
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: c.border,
      marginTop: 40,
      ...Platform.select({
        ios: { shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
        android: { elevation: 3 },
        default: {},
      }),
    },
    welcomeText: {
      color: c.welcomeText,
      fontWeight: '700',
      fontSize: 18,
      textAlign: 'center',
      letterSpacing: 0.3,
    },

    disabled: {
      backgroundColor: c.disabledBg,
      borderColor: c.border,
      opacity: 0.7,
    },
  });
};
