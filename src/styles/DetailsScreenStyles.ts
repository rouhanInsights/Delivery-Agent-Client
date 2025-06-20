import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F9F9F9',
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#2C3E50',
  },

  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#34495E',
  },

  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },

  underlinedBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#1A73E8',
  },

  link: {
    color: '#1A73E8',
    textDecorationLine: 'underline',
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#E0E0E0',
  },

  itemCol: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 8,
    marginBottom: 24,
    color: '#2C3E50',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },

  rejectButton: {
    flex: 1,
    backgroundColor: '#E74C3C',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  rejectText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  acceptButton: {
    flex: 1,
    backgroundColor: '#2ECC71',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  acceptText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalCard: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#E74C3C',
  },

  textArea: {
    height: 100,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },

  warningText: {
    fontSize: 14,
    color: '#E67E22',
    marginBottom: 10,
    textAlign: 'center',
  },

  submitButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },

  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  acceptCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },

  successEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },

  acceptTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#27AE60',
  },

  acceptMessage: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
    textAlign: 'center',
  },

  acceptSubtext: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },

  acceptButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  statusText: {
  fontSize: 16,
  marginTop: 10,
  fontWeight: '600',
  color: '#333',
},

statusBadge: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#007B83', // teal/dark green
},

statusRejected: {
  color: 'red',
},
statusAssigned: {
  color: '#E1A200', // deep yellow
},
statusDelivered: {
  color: 'green',
},
statusAccepted: {
  color: '#007B83', // teal/dark green
 },
 bold: {
  fontWeight: 'bold',
},

});

export default styles;
