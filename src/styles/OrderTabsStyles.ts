import { StyleSheet } from 'react-native';

type Scheme = 'light' | 'dark';

const palette = {
  light: {
    bg: 'transparent',
    chipBg: '#F1F5F9',        // slate-100
    chipText: '#334155',      // slate-700
    chipActiveBg: '#DCFCE7',  // green-100
    chipActiveText: '#166534',// green-800
    border: '#E2E8F0',        // slate-200
  },
  dark: {
    bg: 'transparent',
    chipBg: '#111827',        // gray-900
    chipText: '#E5E7EB',      // gray-200
    chipActiveBg: '#064E3B',  // emerald-900
    chipActiveText: '#A7F3D0',// emerald-200
    border: '#1F2937',        // gray-800
  },
};

export const getOrderTabsStyles = (scheme: Scheme) => {
  const c = palette[scheme];

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 12,
      paddingHorizontal: 12,
      gap: 8,
      backgroundColor: c.bg,
    },
    tabButton: {
      paddingVertical: 9,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: c.chipBg,
      borderWidth: 1,
      borderColor: c.border,
    },
    activeTab: {
      backgroundColor: c.chipActiveBg,
      borderColor: c.chipActiveBg,
    },
    tabText: {
      fontSize: 16,
      fontWeight: '500',
      color: c.chipText,
    },
    activeTabText: {
      color: c.chipActiveText,
      fontWeight: '700',
    },
  });
};
