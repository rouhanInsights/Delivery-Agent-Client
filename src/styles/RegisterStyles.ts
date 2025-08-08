import { StyleSheet, Platform } from 'react-native';

type Scheme = 'light' | 'dark';

const palette = {
  light: {
    bg: '#FFFFFF',
    card: '#F7FAFC',
    border: '#E2E8F0',
    text: '#0B1220',
    subText: '#4A5568',
    placeholder: '#718096',
    brand: '#0E9F6E',
    brandTextOn: '#FFFFFF',
    statusBar: '#FFFFFF',
    inputBg: '#FFFFFF',
    selection: '#1A9F85',
  },
  dark: {
    bg: '#0B0F14',
    card: '#121821',
    border: '#263241',
    text: '#E6E8EA',
    subText: '#A3A9B3',
    placeholder: '#7E8794',
    brand: '#31D0AA',
    brandTextOn: '#0B0F14',
    statusBar: '#0B0F14',
    inputBg: '#0F151D',
    selection: '#31D0AA',
  },
};

export const getRegisterStyles = (scheme: Scheme) => {
  const c = palette[scheme];

  return StyleSheet.create({
    statusBar: {
      backgroundColor: c.statusBar,
    },
    screen: {
      flex: 1,
      backgroundColor: c.bg,
    },
    container: {
      paddingTop: Platform.select({ ios: 24, android: 16, default: 16 }),
      paddingHorizontal: 20,
      paddingBottom: 40,
      gap: 8,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: c.text,
      marginBottom: 12,
      letterSpacing: 0.3,
    },
    label: {
      fontSize: 14,
      color: c.subText,
      marginTop: 12,
      marginBottom: 6,
    },
    input: {
      backgroundColor: c.inputBg,
      color: c.text,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: Platform.select({ ios: 12, android: 10, default: 10 }),
    },
    placeholder: {
      color: c.placeholder,
    },
    selection: {
      color: c.selection,
    },
    filePicker: {
      backgroundColor: c.inputBg,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 14,
      justifyContent: 'center',
    },
    filePickerText: {
      color: c.subText,
      fontSize: 14,
    },
    govtIdImagePreview: {
      width: '100%',
      height: 180,
      borderRadius: 12,
      marginTop: 10,
      borderWidth: 1,
      borderColor: c.border,
    },
    submitWrap: {
      marginTop: 18,
    },
    // Optional overrides if your Button supports custom styles:
    button: {
      backgroundColor: c.brand,
      borderRadius: 12,
    },
    buttonText: {
      color: c.brandTextOn,
      fontWeight: '700',
    },
  });
};
