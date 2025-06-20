import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    color: '#fff',
  },
  prepaid: {
    backgroundColor: '#d3f9d8',
    color: '#1a3c7e',
  },
  cod: {
    backgroundColor: '#ffe2b2',
  },
  badgeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: '#555',
    marginVertical: 4,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  address: {
    marginTop: 1,
    color: '#000',
    fontWeight: '500',
    marginVertical: 2,
    fontSize: 16,
  },
  items: {
    marginTop: 9,
    fontWeight: '900',
    fontSize: 17,
    marginHorizontal: 1,
  },
  price: {
    fontWeight: 'bold',
    marginHorizontal: 1,
  },
  buttonContainer: {
    marginTop: -20,
    alignItems: 'flex-end',
  },
  accepted: {
  backgroundColor: '#d1f5d3',
  marginLeft: 8,
},

});
