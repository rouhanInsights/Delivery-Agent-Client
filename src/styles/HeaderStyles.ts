import { StyleSheet, Platform } from 'react-native';

type Scheme = 'light' | 'dark';

const palette = {
  light: {
    bg: '#FFFFFF',
    text: '#1B4332',
    border: '#E0E0E0',
    icon: '#1B4332',
    shadow: 'rgba(0,0,0,0.06)',
  },
  dark: {
    bg: '#0B0F14',
    text: '#E6E8EA',
    border: '#1F2A37',
    icon: '#E6E8EA',
    shadow: 'rgba(0,0,0,0.5)',
  },
};

export const getHeaderStyles = (scheme: Scheme) => {
  const c = palette[scheme];

  return StyleSheet.create({
    wrapper: {
      backgroundColor: c.bg,
    },
    container: {
      paddingHorizontal: 16,
      paddingVertical: 14,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: c.bg,
      borderBottomColor: c.border,
      borderBottomWidth: 1,
      ...Platform.select({
        ios: {
          shadowColor: c.shadow,
          shadowOpacity: 0.08,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
        },
        android: {
          elevation: 2,
        },
      }),
    },
    title: {
      flex: 1,
      fontSize: 20,
      fontWeight: '600',
      color: c.text,
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginLeft: 10,
      // Tint makes monochrome icons adapt to theme; if your PNG is multicolor, remove this.
      tintColor: c.icon,
    },
  });
};
