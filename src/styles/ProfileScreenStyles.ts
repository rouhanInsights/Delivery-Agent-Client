import { StyleSheet } from 'react-native';

type Scheme = 'light' | 'dark';

const palette = {
  light: {
    bg: '#FFFFFF',
    text: '#111827',
    subText: '#4B5563',
    border: '#E5E7EB',
    card: '#F9FAFB',
    accent: '#1a3c7e',
    danger: '#F4511E',
    statusBar: '#FFFFFF',
  },
  dark: {
    bg: '#0B0F14',
    text: '#E6E8EA',
    subText: '#A3A9B3',
    border: '#263241',
    card: '#121821',
    accent: '#31D0AA',
    danger: '#F87171',
    statusBar: '#0B0F14',
  },
};

export const getProfileStyles = (scheme: Scheme) => {
  const c = palette[scheme];

  return StyleSheet.create({
    statusBar: {
      backgroundColor: c.statusBar,
    },

    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 60,
      paddingHorizontal: 20,
      backgroundColor: c.bg,
    },

    header: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: c.text,
    },

    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 15,
      borderWidth: 2,
      borderColor: c.border,
      backgroundColor: c.card,
    },

    name: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 25,
      color: c.text,
    },

    infoBox: {
      width: '100%',
      marginBottom: 15,
      borderBottomWidth: 1,
      borderColor: c.border,
      paddingBottom: 10,
    },

    label: {
      fontWeight: 'bold',
      fontSize: 14,
      color: c.subText,
    },

    value: {
      fontSize: 16,
      color: c.text,
      marginTop: 2,
    },

    logoutButton: {
      marginTop: 30,
      backgroundColor: c.danger,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
    },

    logoutText: {
      color: scheme === 'dark' ? '#0B0F14' : '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
    },

    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: c.bg,
      gap: 10,
    },

    loadingText: {
      color: c.subText,
      fontSize: 14,
    },

    activity: {
      color: c.accent,
    },
  });
};
