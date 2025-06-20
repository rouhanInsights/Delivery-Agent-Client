import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  tabButton: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#d1f5d3',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  activeTabText: {
    color: '#1a7f3d',
    fontWeight: '700',
  },
});
