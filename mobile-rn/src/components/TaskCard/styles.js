import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  card: {
    width: '47%',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    margin: 5,
    padding: 20,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 0.3,
    borderRadius: 10,
  },
  cardLeft: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  typeActive: {
    width: 45,
    height: 45,
    marginTop: 10,
    resizeMode: 'contain',
  },
  iconDone: {
    width: 38,
    height: 35,
    marginTop: 10,
  },
  cardTitle: {
    fontWeight: '100',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
  },
  cardRight: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  cardDate: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardHour: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
  cardDone: {
    opacity: 0.4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default style;
