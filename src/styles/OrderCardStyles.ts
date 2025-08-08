import { StyleSheet, Platform } from 'react-native';

type Scheme = 'light' | 'dark';

const palette = {
  light: {
    cardBg: '#FFFFFF',
    textPrimary: '#0B1220',
    textSecondary: '#556070',
    price: '#0B1220',
    border: '#E2E8F0',
    shadow: '#000000',
    badgePrepaidBg: '#DCFCE7', // pale green
    badgePrepaidText: '#065F46',
    badgeCODBg: '#FEF3C7',     // pale amber
    badgeCODText: '#92400E',
  },
  dark: {
    cardBg: '#121821',
    textPrimary: '#E6E8EA',
    textSecondary: '#A3A9B3',
    price: '#E6E8EA',
    border: '#1F2A37',
    shadow: '#000000',
    badgePrepaidBg: '#0E2A22', // deep green
    badgePrepaidText: '#31D0AA',
    badgeCODBg: '#2A1E0E',     // deep amber/brown
    badgeCODText: '#F8D477',
  },
};

export const getOrderCardStyles = (scheme: Scheme) => {
  const c = palette[scheme];

  return StyleSheet.create({
    card: {
      backgroundColor: c.cardBg,
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      borderWidth: Platform.OS === 'ios' ? 0.5 : 0,
      borderColor: c.border,
      shadowColor: c.shadow,
      shadowOpacity: scheme === 'dark' ? 0.3 : 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 3,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    orderId: {
      fontWeight: '700',
      fontSize: 18,
      color: c.textPrimary,
    },
    badge: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: c.border,
    },
    badgePrepaid: {
      backgroundColor: c.badgePrepaidBg,
    },
    badgeCOD: {
      backgroundColor: c.badgeCODBg,
    },
    badgeTextPrepaid: {
      fontSize: 14,
      fontWeight: '700',
      color: c.badgePrepaidText,
    },
    badgeTextCOD: {
      fontSize: 14,
      fontWeight: '700',
      color: c.badgeCODText,
    },
    date: {
      fontSize: 14,
      color: c.textSecondary,
      marginVertical: 6,
    },
    name: {
      fontWeight: '700',
      fontSize: 16,
      color: c.textPrimary,
      marginTop: 2,
    },
    address: {
      marginTop: 2,
      color: c.textPrimary,
      fontWeight: '500',
      marginVertical: 2,
      fontSize: 15,
    },
    items: {
      marginTop: 10,
      fontWeight: '700',
      fontSize: 15,
      color: c.textPrimary,
    },
    price: {
      fontWeight: '800',
      color: c.price,
    },
    buttonContainer: {
      marginTop: 12,
      alignItems: 'flex-end',
    },

    // Optional overrides for a custom Button component if it supports them:
    button: {
      borderRadius: 12,
    },
    buttonText: {
      fontWeight: '700',
    },
  });
};
