import { StyleSheet, Platform } from 'react-native';

type Scheme = 'light' | 'dark';

const palette = {
  light: {
    bg: '#F5F5F5',
    text: '#0B1220',
    subText: '#4A5568',
    statusBar: '#F5F5F5',
    accent: '#0E9F6E',
    spinner: '#0E9F6E',
  },
  dark: {
    bg: '#0B0F14',
    text: '#E6E8EA',
    subText: '#A3A9B3',
    statusBar: '#0B0F14',
    accent: '#31D0AA',
    spinner: '#31D0AA',
  },
};

export const getHomeStyles = (scheme: Scheme) => {
  const c = palette[scheme];

  return StyleSheet.create({
    statusBar: {
      backgroundColor: c.statusBar,
    },
    container: {
      flex: 1,
      backgroundColor: c.bg,
    },
    scrollContainer: {
      paddingBottom: 20,
      paddingTop: Platform.select({ ios: 6, android: 0, default: 0 }),
      rowGap: 0,
    },
    tabContainer: {
      paddingHorizontal: 16,
      marginTop: 8,
    },
    loading: {
      marginTop: 40,
    },
    activity: {
      color: c.spinner,
    },
    noOrdersText: {
      textAlign: 'center',
      marginTop: 20,
      color: c.subText,
    },
  });
};
