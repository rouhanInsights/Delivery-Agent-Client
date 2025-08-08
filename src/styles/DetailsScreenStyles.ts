import { StyleSheet } from 'react-native';

type Scheme = 'light' | 'dark';

const palette = {
  light: {
    bg: '#F9FAFB',
    card: '#FFFFFF',
    text: '#1F2937',
    subText: '#4B5563',
    link: '#1A73E8',
    border: '#E5E7EB',
    header: '#111827',
    total: '#111827',
    reject: '#E74C3C',
    accept: '#2ECC71',
    statusAssigned: '#E1A200',
    statusAccepted: '#007B83',
    statusDelivered: '#22C55E',
    statusRejected: '#EF4444',
    overlay: 'rgba(0,0,0,0.45)',
    modalBg: '#FFFFFF',
    placeholder: '#9CA3AF',
    selection: '#0EA5E9',
    activity: '#0EA5E9',
    statusBar: '#F9FAFB',
    itemDivider: '#E5E7EB',
  },
  dark: {
    bg: '#0B0F14',
    card: '#121821',
    text: '#E6E8EA',
    subText: '#A3A9B3',
    link: '#6BB2FF',
    border: '#263241',
    header: '#E6E8EA',
    total: '#E6E8EA',
    reject: '#F87171',
    accept: '#34D399',
    statusAssigned: '#F4C430',
    statusAccepted: '#31D0AA',
    statusDelivered: '#6EE7B7',
    statusRejected: '#F87171',
    overlay: 'rgba(0,0,0,0.6)',
    modalBg: '#141A22',
    placeholder: '#7E8794',
    selection: '#31D0AA',
    activity: '#31D0AA',
    statusBar: '#0B0F14',
    itemDivider: '#1F2A37',
  },
};

export const getDetailsStyles = (scheme: Scheme) => {
  const c = palette[scheme];

  return StyleSheet.create({
    statusBar: { backgroundColor: c.statusBar },

    // paints the whole viewport
    screen: {
      flex: 1,
      backgroundColor: c.bg,
    },

    // paints the scroll viewport
    scroll: {
      flex: 1,
      backgroundColor: c.bg,
    },

    container: {
      padding: 16,
      backgroundColor: c.bg,
      paddingBottom: 24,
    },

    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
      color: c.header,
    },

    section: {
      backgroundColor: c.card,
      padding: 16,
      borderRadius: 10,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: c.border,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 12,
      color: c.text,
    },

    text: {
      fontSize: 16,
      color: c.subText,
      marginBottom: 6,
    },

    bold: { fontWeight: '700', color: c.text },

    underlinedBold: {
      fontWeight: '700',
      textDecorationLine: 'underline',
      color: c.link,
    },

    link: {
      color: c.link,
      textDecorationLine: 'underline',
    },

    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: c.itemDivider,
    },

    itemCol: {
      flex: 1,
      fontSize: 16,
      color: c.text,
    },

    total: {
      fontSize: 18,
      fontWeight: '700',
      textAlign: 'right',
      marginTop: 8,
      marginBottom: 24,
      color: c.total,
    },

    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
      gap: 12,
      paddingHorizontal: 16,
      paddingBottom: 24,
    },

    rejectButton: {
      flex: 1,
      backgroundColor: c.reject,
      padding: 14,
      borderRadius: 10,
      alignItems: 'center',
    },

    rejectText: {
      color: '#FFF',
      fontWeight: '700',
      fontSize: 16,
    },

    acceptButton: {
      flex: 1,
      backgroundColor: c.accept,
      padding: 14,
      borderRadius: 10,
      alignItems: 'center',
    },

    acceptText: {
      color: '#0B0F14',
      fontWeight: '700',
      fontSize: 16,
    },

    statusText: {
      fontSize: 16,
      marginTop: 10,
      fontWeight: '600',
      color: c.text,
    },

    statusBadge: {
      fontSize: 16,
      fontWeight: '800',
      color: c.statusAccepted,
    },

    statusRejected: { color: c.statusRejected },
    statusAssigned: { color: c.statusAssigned },
    statusDelivered: { color: c.statusDelivered },
    statusAccepted: { color: c.statusAccepted },

    // Modal
    modalOverlay: {
      flex: 1,
      backgroundColor: c.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },

    modalCard: {
      width: '100%',
      backgroundColor: c.modalBg,
      borderRadius: 12,
      padding: 20,
      borderWidth: 1,
      borderColor: c.border,
    },

    modalTitle: {
      fontSize: 20,
      fontWeight: '800',
      marginBottom: 12,
      textAlign: 'center',
      color: c.reject,
    },

    textArea: {
      height: 110,
      borderColor: c.border,
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      textAlignVertical: 'top',
      fontSize: 16,
      marginBottom: 10,
      color: c.text,
      backgroundColor: scheme === 'dark' ? '#0F151D' : '#FFFFFF',
    },

    placeholder: { color: c.placeholder },
    selection: { color: c.selection },

    warningText: {
      fontSize: 14,
      color: c.statusAssigned,
      marginBottom: 12,
      textAlign: 'center',
    },

    submitButton: {
      backgroundColor: c.reject,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 6,
    },

    submitButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '700',
    },

    // Optional success card styles
    acceptCard: {
      width: '100%',
      backgroundColor: c.card,
      borderRadius: 12,
      padding: 24,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: c.border,
    },

    successEmoji: {
      fontSize: 48,
      marginBottom: 10,
      color: c.statusDelivered,
    },

    acceptTitle: {
      fontSize: 22,
      fontWeight: '800',
      marginBottom: 6,
      color: c.statusDelivered,
    },

    acceptMessage: {
      fontSize: 16,
      color: c.text,
      marginBottom: 4,
      textAlign: 'center',
    },

    acceptSubtext: {
      fontSize: 14,
      color: c.subText,
      marginBottom: 20,
      textAlign: 'center',
    },

    acceptButtonText: {
      fontSize: 16,
      color: '#0B0F14',
      fontWeight: '700',
    },

    activity: { color: c.activity },
  });
};
